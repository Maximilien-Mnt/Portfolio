"use client";

import { useCallback, useEffect, useState, useRef } from "react";
import { cn } from "@/lib/utils";
import { Tooltip } from "@/components/ui/Tooltip";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Turnstile } from "@marsidev/react-turnstile";
import { submitGuestbook } from "@/lib/supabase/actions";

export interface PlaneBoardPoint {
  id: string;
  x: number;
  y: number;
  name?: string | null;
  message: string;
  created_at: string;
}

export interface PlaneBoardProps {
  points: PlaneBoardPoint[];
  ownerPointId?: string;
  canCreate?: boolean;
}

const DOT = 44;

export function PlaneBoard({ points, ownerPointId, canCreate = false }: PlaneBoardProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const [open, setOpen] = useState(false);
  const [formX, setFormX] = useState(0);
  const [formY, setFormY] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [token, setToken] = useState<string | null>(null);
  const [formData, setFormData] = useState({ name: "", message: "" });

  const onPlaneClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!canCreate || (e.target as Element).closest("button, form")) return;
    const container = containerRef.current;
    if (!container) return;
    const rect = container.getBoundingClientRect();
    const nx = (e.clientX - rect.left) / rect.width;
    const ny = (e.clientY - rect.top) / rect.height;
    if (nx < 0 || nx > 1 || ny < 0 || ny > 1) return;
    setFormX(nx); setFormY(ny); setToken(null); setStatus("idle");
    setErrorMessage(""); setOpen(true);
  }, [canCreate]);

  useEffect(() => {
    if (open) formRef.current?.focus();
  }, [open]);

  const onSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) { setErrorMessage("Please complete the verification above."); setStatus("error"); return; }
    setSubmitting(true);
    const fd = new FormData();
    fd.append("name", formData.name);
    fd.append("message", formData.message);
    fd.append("x", String(formX));
    fd.append("y", String(formY));
    fd.append("website", "");
    fd.append("turnstileToken", token);
    const result = await submitGuestbook(fd);
    setSubmitting(false);
    if (result.ok) { setStatus("success"); setOpen(false); }
    else { setStatus("error"); setErrorMessage(result.error || "Could not save your mark."); }
  }, [token, formData, formX, formY]);

  const turnstileKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

  return (
    <div ref={containerRef} onClick={onPlaneClick} className="relative w-full min-h-[560px] border border-line rounded-sm bg-bg/40">
      {points.map((p) => {
        const isOwner = p.id === ownerPointId;
        return (
          <span key={p.id} className="relative inline-block">
            <Tooltip content={p.message} side="top">
              <button type="button" aria-label={p.name ? `Mark by ${p.name}` : "Anonymous mark"}
                className={cn("absolute z-10 rounded-full border-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-0 transition-transform duration-120 ease-snap active:scale-90", isOwner ? "bg-signal border-fg text-white" : "bg-fg border-line text-fg")}
                style={{ left: `${Math.round(p.x * 100)}%`, top: `${Math.round(p.y * 100)}%`, width: DOT, height: DOT, marginLeft: `-${DOT / 2}px`, marginTop: `-${DOT / 2}px` }}>
                <span className="sr-only">{p.message}</span>
              </button>
            </Tooltip>
            {isOwner && (
              <p className="absolute -top-8 left-1/2 -translate-x-1/2 z-10 font-mono text-[0.65rem] uppercase tracking-wider text-signal-ink" aria-hidden="true">
                {p.name ?? "Owner"}
              </p>
            )}
          </span>
        );
      })}
      {open && canCreate && (
        <form ref={formRef} tabIndex={-1} onSubmit={onSubmit} className="absolute z-30 w-[270px] outline-none">
          <div style={{ left: `${Math.round(formX * 100)}%`, top: `${Math.round(formY * 100)}%`, transform: "translate(-50%, -110%)", position: "absolute" }}>
            <div className="plate p-4">
              <h3 className="font-display text-sm">Leave a mark</h3>
              <p className="mt-1 text-fg-2 font-mono text-[0.72rem] mb-3">Name is optional. Message ≤ 140 characters.</p>
              <Input label="Name" id="plane-name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} maxLength={40} placeholder="Optional" />
              <Textarea label="Message" id="plane-message" value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} maxLength={140} />
              <input name="website" type="text" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />
              {turnstileKey ? (<Turnstile siteKey={turnstileKey} onSuccess={setToken} onExpire={() => setToken(null)} className="mt-3" />) : (<p className="mt-3 text-fg-3 font-mono text-[0.68rem]">Verification unavailable.</p>)}
              {errorMessage && (<p className="mt-2 text-sm text-signal-ink" role="alert">{errorMessage}</p>)}
              <div className="mt-4 flex items-end justify-between gap-2">
                <span className="font-mono text-[0.72rem] text-fg-3">{formData.message.length}/140</span>
                <Button type="submit" disabled={submitting || !formData.message || !token}>{submitting ? "Saving…" : "Save"}</Button>
              </div>
            </div>
          </div>
          {status === "success" && (<p className="mt-2 text-sm text-signal-ink font-medium" role="status">Awaiting approval — your mark will appear once it&rsquo;s reviewed.</p>)}
        </form>
      )}
    </div>
  );
}
