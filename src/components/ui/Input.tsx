"use client";

import { cn } from "@/lib/utils";
import { useId } from "react";
import { Label } from "./Label";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  htmlFor?: string;
}

export function Input({ label, htmlFor, className, id, ...props }: InputProps) {
  const generatedId = useId();
  const inputId = id ?? htmlFor ?? generatedId;

  return (
    <div className="flex flex-col gap-1">
      {label && <Label htmlFor={inputId}>{label}</Label>}
      <input
        id={inputId}
        className={cn(
          "min-h-[44px] rounded-md border border-line bg-bg-2 text-fg placeholder-fg-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-signal focus-visible:ring-offset-3",
          className,
        )}
        {...props}
      />
    </div>
  );
}