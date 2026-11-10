"use client";

import { createPortal } from "react-dom";
import Link from "next/link";

import type { MomentumPoint } from "@/lib/viz/timeline";
import { formatTimelineDate } from "@/lib/viz/timeline";

export interface PointTooltipProps {
  point: MomentumPoint;
  id: string;
  left: number;
  top: number;
}

/** Absolutely positioned Plate tooltip (title, date, summary, proof link).
 *  Rendered into document.body so it is never clipped by the scroll container. */
export function PointTooltip({ point, id, left, top }: PointTooltipProps) {
  return createPortal(
    <div
      id={id}
      role="tooltip"
      style={{ position: "fixed", left, top, width: 260 }}
      className="plate p-3 z-50"
    >
      <h3 className="font-display text-base leading-tight">{point.event.title}</h3>
      <p className="mt-1 font-mono text-[0.72rem] uppercase tracking-wider text-fg-2">
        {formatTimelineDate(point.event.date)}
      </p>
      <p className="mt-2 text-sm text-fg">{point.event.summary}</p>
      {point.event.href && (
        <Link
          href={point.event.href}
          className="mt-3 inline-block text-xs font-mono text-signal-ink decoration-signal-ink underline underline-offset-2 hover:text-signal"
        >
          Proof &rarr;
        </Link>
      )}
    </div>,
    document.body,
  );
}