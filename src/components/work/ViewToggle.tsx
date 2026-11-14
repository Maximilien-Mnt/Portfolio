"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { useCallback, useState } from "react";

export interface ViewOption {
  value: "grid" | "ledger" | "map";
  label: string;
}

export function ViewToggle({ options }: { options: ViewOption[] }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [focusIndex, setFocusIndex] = useState(0);

  const update = useCallback(
    (next: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set("view", next);
      const qs = params.toString();
      const base = pathname.replace(/\/+$/, "");
      window.history.pushState(null, "", `${base}?${qs}`);
    },
    [pathname, searchParams],
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent, index: number) => {
      switch (e.key) {
        case "ArrowRight":
          e.preventDefault();
          setFocusIndex((i) => (i + 1) % options.length);
          break;
        case "ArrowLeft":
          e.preventDefault();
          setFocusIndex((i) => (i - 1 + options.length) % options.length);
          break;
        case "Enter":
        case " ":
          e.preventDefault();
          update(options[index]!.value);
          break;
        case "Home":
          e.preventDefault();
          setFocusIndex(0);
          break;
        case "End":
          e.preventDefault();
          setFocusIndex(options.length - 1);
          break;
      }
    },
    [options, update],
  );

  if (!options.length) return null;

  return (
    <div role="radiogroup" aria-label="Work view" className="inline-flex rounded-md border border-line bg-bg-2">
      {options.map((option, index) => {
        const selected = searchParams.get("view") === option.value;
        return (
          <button
            key={option.value}
            role="radio"
            aria-checked={selected}
            type="button"
            tabIndex={focusIndex === index ? 0 : -1}
            onClick={() => {
              setFocusIndex(index);
              update(option.value);
            }}
            onKeyDown={(e) => handleKeyDown(e, index)}
            className={`flex-1 min-h-[44px] text-center text-fg-2 font-mono text-[0.72rem] uppercase tracking-wider transition-colors duration-120 ease-snap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-signal focus-visible:ring-offset-3 ${
              selected ? "bg-fg text-bg" : "hover:bg-bg"
            }`}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}
