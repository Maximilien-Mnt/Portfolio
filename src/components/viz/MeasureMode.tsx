/** Measure mode - overlays 32px grid and shows coordinates of hovered elements */
"use client";

import {useState, useEffect, useRef} from "react";
import { cn } from "@/lib/utils";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

/** Coordinate display component */
export function MeasureMode({
  isOpen: propIsOpen,
  onOpenChange,
}: {
  isOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
}) {
  const [isOpen, setIsOpen] = useState(propIsOpen ?? false);
  const [coordinates, setCoordinates] = useState<{x: number; y: number} | null>(null);
  const [gridOverlay] = useState<boolean | null>(null);
  const hoverRef = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();

  // Track mouse position and grid coordinates
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!hoverRef.current) return;

      const rect = hoverRef.current.getBoundingClientRect();
      const x = Math.round((e.clientX - rect.left) / 32) * 32;
      const y = Math.round((e.clientY - rect.top) / 32) * 32;

      setCoordinates({x, y});
    };

    const handleMouseLeave = () => {
      setCoordinates(null);
    };

    const container = document.getElementById("measure-container");
    if (container) {
      container.addEventListener("mousemove", handleMouseMove);
      container.addEventListener("mouseleave", handleMouseLeave);

      return () => {
        container.removeEventListener("mousemove", handleMouseMove);
        container.removeEventListener("mouseleave", handleMouseLeave);
      };
    }
  }, []);

  // Close on Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsOpen(false);
        onOpenChange?.(false);
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onOpenChange]);

  if (!isOpen) return null;

  return (
    <div
      id="measure-container"
      className={cn(
        "fixed inset-0 z-40 pointer-events-none overflow-hidden",
        "bg-bg-2/80 backdrop-blur-sm"
      )}
      onClick={() => setIsOpen(false)}
    >
      {/* Grid overlay - 32px grid */}
      <div
        className={cn(
          "absolute inset-0",
          gridOverlay &&
            !reduced &&
            `background-image:
            linear-gradient(var(--grid) 1px, transparent 1px),
            linear-gradient(90deg, var(--grid) 1px, transparent 1px);
            background-size: 32px 32px;
            background-position: center top;
            animation: grid-shift 20s linear infinite`
        )}
      />

      {/* Coordinate readout following cursor */}
      {coordinates && (
        <div
          className={cn(
            "absolute pointer-events-none transform transition-all duration-150",
            "bg-bg-2 border border-line rounded-md px-3 py-1 text-xs text-fg-2 font-mono shadow-sm",
            "z-50"
          )}
          style={{left: `${coordinates.x + 16}px`, top: `${coordinates.y + 16}px`}}
        >
          <div className="font-mono text-signal text-xs">({coordinates.x}, {coordinates.y})</div>
          <div className="mt-1 text-fg-3/70 opacity-80">Origin: Luxembourg (0, 0)</div>
        </div>
      )}

      {/* Instruction text */}
      <div
        className="absolute bottom-6 left-1/2 -translate-x-1/2 text-fg-3/70 text-xs font-mono"
      >
        Press Esc to close • Move mouse over elements to see coordinates
      </div>
    </div>
  );
}