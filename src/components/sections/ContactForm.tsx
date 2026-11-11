"use client";

import { useCallback, useState } from "react";
import { cn } from "@/lib/utils";
import { submitContact } from "@/lib/supabase/actions";
import { Turnstile } from "@marsidev/react-turnstile";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";

export interface ContactFormProps {
  className?: string;
}

export function ContactForm({ className }: ContactFormProps = {}) {
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [token, setToken] = useState<string | null>(null);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });

  const turnstileKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
  const enabled = Boolean(turnstileKey);

  const handleChange =
    (key: "name" | "email" | "message") =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setFormData((prev) => ({ ...prev, [key]: e.target.value }));

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) {
      setErrorMessage("Please complete the verification above.");
      setStatus("error");
      return;
    }
    setSubmitting(true);
    setErrorMessage("");
    const fd = new FormData();
    fd.append("name", formData.name);
    fd.append("email", formData.email);
    fd.append("message", formData.message);
    fd.append("website", "");
    fd.append("turnstileToken", token);
    const result = await submitContact(fd);
    setSubmitting(false);
    if (result.ok) {
      setStatus("success");
      setFormData({ name: "", email: "", message: "" });
      setToken(null);
    } else {
      setStatus("error");
      setErrorMessage(result.error || "Could not send your message.");
    }
  }, [token, formData]);

  if (!enabled) {
    return (
      <div
        className={cn(
          "text-fg-3 font-mono text-[0.72rem] leading-relaxed",
          className,
        )}
      >
        Contact form not configured — set the Turnstile environment variables
        to enable it.
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={cn("grid gap-3 md:grid-cols-2 md:gap-5", className)}
    >
      <div className="md:col-span-2">
        <Input
          label="Name"
          id="contact-name"
          name="name"
          value={formData.name}
          onChange={handleChange("name")}
          maxLength={80}
          placeholder="Optional"
        />
      </div>
      <div className="md:col-span-2">
        <Input
          label="Email"
          id="contact-email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange("email")}
          maxLength={200}
          placeholder="you@example.com"
        />
      </div>
      <div className="md:col-span-2">
        <Textarea
          label="Message"
          id="contact-message"
          name="message"
          value={formData.message}
          onChange={handleChange("message")}
          maxLength={2000}
          placeholder="What would you like to discuss?"
        />
      </div>
      {/* Honeypot: hidden from humans, filled by careless bots. */}
      <input
        name="website"
        type="text"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        style={{ display: "none" }}
      />
      {turnstileKey && (
        <div className="md:col-span-2">
          <Turnstile
            siteKey={turnstileKey}
            onSuccess={setToken}
            onExpire={() => setToken(null)}
            className="mt-2"
          />
        </div>
      )}
      {errorMessage && (
        <div className="md:col-span-2" role="alert">
          <p className="text-sm text-signal-ink">{errorMessage}</p>
        </div>
      )}
      <div className="md:col-span-2 flex items-end gap-2">
        <span className="font-mono text-[0.72rem] text-fg-3">
          {formData.message.length}/2000
        </span>
        <Button
          type="submit"
          disabled={
            submitting ||
            !formData.email ||
            !formData.message ||
            !token
          }
        >
          {submitting ? "Sending…" : "Send message"}
        </Button>
      </div>
      {status === "success" && (
        <div className="md:col-span-2" role="status">
          <p className="text-sm text-signal-ink font-medium">
            Thanks — your message was sent.
          </p>
        </div>
      )}
    </form>
  );
}
