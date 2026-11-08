"use client";

import { cn } from "@/lib/utils";
import { useId } from "react";
import { Label } from "./Label";

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  htmlFor?: string;
}

export function Textarea({ label, htmlFor, className, id, ...props }: TextareaProps) {
  const generatedId = useId();
  const inputId = id ?? htmlFor ?? generatedId;

  return (
    <div className="flex flex-col gap-1">
      {label && <Label htmlFor={inputId}>{label}</Label>}
      <textarea
        id={inputId}
        className={cn(
          "min-h-[120px] rounded-md border border-line bg-bg-2 text-fg placeholder-fg-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-signal focus-visible:ring-offset-3 resize-y",
          className,
        )}
        {...props}
      />
    </div>
  );
}