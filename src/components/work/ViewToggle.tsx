"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { useCallback } from "react";

export interface ViewOption {
  value: "grid" | "ledger" | "map";
  label: string;
}

export function ViewToggle({ options }: { options: ViewOption[] }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

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

  return (
    <div role="radiogroup" aria-label="Work view" className="inline-flex rounded-md border border-line bg-bg-2">
      {options.map((option) => {
        const selected = searchParams.get("view") === option.value;
        return (
          <button
            key={option.value}
            role="radio"
            aria-checked={selected}
            type="button"
            onClick={() => update(option.value)}
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
