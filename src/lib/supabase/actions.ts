"use server";

import { z } from "zod";
import { Resend } from "resend";
import { createAdminClient, serviceRoleConfigured } from "@/lib/supabase/admin";

export type ActionResult<T> =
  | { ok: true; data: T }
  | { ok: false; error: string };

function toResult<T>(data: T): ActionResult<T> {
  return { ok: true, data };
}
function toError(error: string): ActionResult<never> {
  return { ok: false, error };
}

const TURNSTILE_VERIFY_URL = "https://challenges.cloudflare.com/turnstile/v0/siteverify";

// Honeypot field name. Humans leave it blank; bots tend to fill every field.
const HONEYPOT_FIELD = "website";

function formField(fd: FormData, key: string): string {
  const value = fd.get(key);
  return typeof value === "string" ? value : "";
}

async function verifyTurnstile(token: string): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) return false;
  try {
    const res = await fetch(TURNSTILE_VERIFY_URL, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({ secret, response: token }),
      cache: "no-store",
    });
    const json = (await res.json()) as {
      success?: boolean;
      "error-codes"?: string[];
    };
    return Boolean(json.success);
  } catch {
    return false;
  }
}

const guestbookSchema = z.object({
  name: z.string().max(40).optional().transform((v) => (v === undefined || v === "" ? null : v)),
  message: z.string().min(1).max(140),
  x: z.coerce.number().min(0).max(1),
  y: z.coerce.number().min(0).max(1),
  country: z.string().length(2).optional().transform((v) => (v === undefined || v === "" ? null : v)),
  [HONEYPOT_FIELD]: z.string().optional().refine((v) => v === undefined || v === "", {
    message: "invalid submission",
  }),
  turnstileToken: z.string().min(1),
});

const contactSchema = z.object({
  name: z.string().min(1).max(80),
  email: z.string().email().max(200),
  message: z.string().min(5).max(2000),
  [HONEYPOT_FIELD]: z.string().optional().refine((v) => v === undefined || v === "", {
    message: "invalid submission",
  }),
  turnstileToken: z.string().min(1),
});

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;
const CONTACT_FROM_EMAIL = process.env.CONTACT_FROM_EMAIL ?? "onboarding@resend.dev";
const CONTACT_TO_EMAIL = process.env.CONTACT_TO_EMAIL;

async function notifyContact(params: {
  name: string;
  email: string;
  message: string;
}): Promise<void> {
  if (!resend || !CONTACT_TO_EMAIL) return;
  try {
    await resend.emails.send({
      from: CONTACT_FROM_EMAIL,
      to: [CONTACT_TO_EMAIL],
      subject: `New contact message from ${params.name}`,
      replyTo: params.email,
      text: `From: ${params.name} <${params.email}>\n\n${params.message}`,
    });
  } catch {
    // Best-effort notification; never fail a submission because email failed.
  }
}

export async function submitGuestbook(
  formData: FormData,
): Promise<ActionResult<{ id: string }>> {
  "use server";

  const raw = {
    name: formField(formData, "name"),
    message: formField(formData, "message"),
    x: String(Number(formData.get("x") ?? 0)),
    y: String(Number(formData.get("y") ?? 0)),
    country: formField(formData, "country"),
    [HONEYPOT_FIELD]: formField(formData, HONEYPOT_FIELD),
    turnstileToken: formField(formData, "turnstileToken"),
  };
  const parsed = guestbookSchema.safeParse(raw);
  if (!parsed.success) {
    return toError("Invalid submission.");
  }

  const { name, message, x, y, country, turnstileToken } = parsed.data;

  const verified = await verifyTurnstile(turnstileToken);
  if (!verified) {
    return toError("Verification failed. Please try again.");
  }

  if (!serviceRoleConfigured()) {
    return toError("Guestbook is not configured.");
  }

  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from("pf_guestbook")
    .insert({ name, message, x, y, country, approved: false })
    .select("id")
    .single();

  if (error || !data) {
    return toError("Could not save your mark. Please try again.");
  }

  return toResult({ id: data.id });
}

export async function submitContact(
  formData: FormData,
): Promise<ActionResult<{ id: string }>> {
  "use server";

  const raw = {
    name: formField(formData, "name"),
    email: formField(formData, "email"),
    message: formField(formData, "message"),
    [HONEYPOT_FIELD]: formField(formData, HONEYPOT_FIELD),
    turnstileToken: formField(formData, "turnstileToken"),
  };
  const parsed = contactSchema.safeParse(raw);
  if (!parsed.success) {
    return toError("Invalid submission.");
  }

  const { name, email, message, turnstileToken } = parsed.data;

  const verified = await verifyTurnstile(turnstileToken);
  if (!verified) {
    return toError("Verification failed. Please try again.");
  }

  if (!serviceRoleConfigured()) {
    return toError("Contact form is not configured.");
  }

  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from("pf_messages")
    .insert({ name, email, message, handled: false })
    .select("id")
    .single();

  if (error || !data) {
    return toError("Could not send your message. Please try again.");
  }

  await notifyContact({ name, email, message });

  return toResult({ id: data.id });
}
