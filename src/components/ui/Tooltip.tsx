"use client";

import { cn } from "@/lib/utils";
import { useCallback, useId, useState } from "react";

export interface TooltipProps {
  children: React.ReactElement;
  content: string;
  side?: "top" | "bottom" | "left" | "right";
}

export function Tooltip({ children, content, side = "top" }: TooltipProps) {
  const [open, setOpen] = useState(false);
  const tooltipId = useId();

  const show = useCallback(() => setOpen(true), []);
  const hide = useCallback(() => setOpen(false), []);

  return (
    <>
      <span
        onMouseEnter={show}
        onMouseLeave={hide}
        onFocus={show}
        onBlur={hide}
        className="inline-block"
        aria-describedby={tooltipId}
      >
        {children}
      </span>
      <span
        id={tooltipId}
        role="tooltip"
        className={cn(
          "absolute z-50 px-2.5 py-1 rounded-sm border border-line bg-fg text-bg font-mono text-[0.72rem] whitespace-nowrap pointer-events-none transition-opacity duration-120 ease-snap",
          open ? "opacity-100" : "opacity-0",
          side === "top" && "-bottom-[calc(100%+0.5rem)] left-1/2 -translate-x-1/2 mb-1",
          side === "bottom" && "top-[calc(100%+0.5rem)] left-1/2 -translate-x-1/2 mt-1",
          side === "left" && "-right-[calc(100%+0.5rem)] top-1/2 -translate-y-1/2 mr-1",
          side === "right" && "left-[calc(100%+0.5rem)] top-1/2 -translate-y-1/2 ml-1",
        )}
      >
        {content}
      </span>
    </>
  );
}
