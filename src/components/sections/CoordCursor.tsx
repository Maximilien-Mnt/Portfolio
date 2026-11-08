"use client";

import { useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";

export interface CoordCursorProps {
  className?: string;
}

// Desktop-only custom cursor: a Signal dot following the pointer with a live
// (x, y) readout relative to the viewport centre. Disabled on touch (pointer:
// coarse), narrow viewports and prefers-reduced-motion. Never blocks interaction
// (pointer-events: none) and cancels rAF on unmount.
export function CoordCursor({ className }: CoordCursorProps = {}) {
  const [enabled, setEnabled] = useState(false);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const rafRef = useRef<ReturnType<typeof requestAnimationFrame> | null>(null);
  const pointerRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const mq = window.matchMedia(
      "(pointer: fine) and (min-width: 768px) and (prefers-reduced-motion: no-preference)",
    );
    const check = () => setEnabled(mq.matches);
    check();
    mq.addEventListener("change", check);
    return () => mq.removeEventListener("change", check);
  }, []);

  useEffect(() => {
    if (!enabled) return;

    const handleMove = (e: MouseEvent) => {
      pointerRef.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener("mousemove", handleMove, { passive: true });

    const loop = () => {
      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;
      setPos({ x: pointerRef.current.x - cx, y: pointerRef.current.y - cy });
      rafRef.current = requestAnimationFrame(loop);
    };
    rafRef.current = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("mousemove", handleMove);
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, [enabled]);

  if (!enabled) return null;

  const sign = (n: number) => (n >= 0 ? "+" : "−");

  return (
    <div
      className={cn("coord-cursor fixed pointer-events-none z-50", className)}
      style={{
        left: `calc(50% + ${pos.x}px)`,
        top: `calc(50% + ${pos.y}px)`,
        transform: "translate(-50%, -50%)",
      }}
    >
      <div className="relative" aria-label="Cursor coordinates" role="img">
        <span
          className="absolute -top-8 left-1/2 -translate-x-1/2 font-mono text-[0.72rem] uppercase tracking-wider text-fg-3 whitespace-nowrap"
        >
          x {sign(pos.x)}${Math.abs(pos.x)} · y {sign(pos.y)}${Math.abs(pos.y)}
        </span>
        <div className="w-3 h-3 rounded-full bg-signal ring-1 ring-signal" aria-hidden="true" />
      </div>
    </div>
  );
}
