"use client";

import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { useCallback } from "react";

/** Filtered by project type — e.g. ?type=app */
export function TypeFilter() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  const update = useCallback(
    (type: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (type) {
        params.set("type", type);
      } else {
        params.delete("type");
      }
      const qs = params.toString();
      const base = pathname.replace(/\/+$/, "");
      router.push(`${base}?${qs}`);
    },
    [pathname, searchParams, router],
  );

  return (
    <div className="flex items-center gap-2">
      <label className="label" htmlFor="type-filter">
        By type
      </label>
      <select
        id="type-filter"
        name="type"
        className="min-h-[44px] rounded border border-line bg-bg-2 px-2 font-mono text-[0.72rem] text-fg-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-signal focus-visible:ring-offset-3"
        defaultValue=""
        onChange={(e) => update(e.target.value)}
      >
        <option value="">All</option>
        <option value="app">app</option>
        <option value="website">website</option>
        <option value="paper">paper</option>
        <option value="experience">experience</option>
        <option value="concept">concept</option>
      </select>
    </div>
  );
}
