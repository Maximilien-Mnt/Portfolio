"use client";

import { useCallback, useEffect, useState } from "react";
import { usePathname } from "next/navigation";

import { Toggle } from "@/components/ui/Toggle";
import { TrackFilter } from "@/components/timeline/TrackFilter";
import { CurveView } from "@/components/timeline/CurveView";
import { LedgerView } from "@/components/timeline/LedgerView";
import { TRACKS, TrackId } from "@/content/schema";
import type { TimelineEvent } from "@/content/schema";

export interface TimelineControlsProps {
  events: TimelineEvent[];
  initialView?: "curve" | "ledger";
  initialTracks?: TrackId[];
}

/**
 * Owns the `?view=curve|ledger` and `?tracks=…` URL state and renders the
 * active view. View/track changes are written with pushState (no Next.js
 * transition) because this is purely client UI state.
 */
export function TimelineControls({
  events,
  initialView,
  initialTracks,
}: TimelineControlsProps) {
  const pathname = usePathname();
  const [view, setView] = useState<"curve" | "ledger">(initialView ?? "curve");
  const [tracks, setTracks] = useState<TrackId[]>(() =>
    (initialTracks ?? []).filter((t): t is TrackId => TRACKS.includes(t as TrackId)),
  );
  const isMobile = useIsMobile();

  useEffect(() => {
    const params = new URLSearchParams();
    params.set("view", view);
    if (tracks.length) params.set("tracks", tracks.join(","));
    const qs = params.toString();
    if (qs !== window.location.search.slice(1)) {
      const base = pathname.replace(/\/+$/, "");
      window.history.pushState(null, "", `${base}?${qs}`);
    }
  }, [view, tracks, pathname]);

  const filtered = tracks.length ? events.filter((e) => tracks.includes(e.track)) : events;
  const showLedger = isMobile || view === "ledger";

  const handleToggleTrack = useCallback((track: TrackId) => {
    setTracks((prev) =>
      prev.includes(track) ? prev.filter((t) => t !== track) : [...prev, track],
    );
  }, []);

  return (
    <>
      {!isMobile && (
        <Toggle
          options={[
            { value: "curve", label: "Curve" },
            { value: "ledger", label: "Ledger" },
          ]}
          value={showLedger ? "ledger" : view}
          onChange={(next) => setView(next as "curve" | "ledger")}
          ariaLabel="Timeline view"
        />
      )}
      <TrackFilter tracks={tracks} onToggle={handleToggleTrack} />
      <p className="label mb-4 block">
        {filtered.length} event{filtered.length !== 1 ? "s" : ""}
      </p>
      {showLedger ? (
        <LedgerView events={filtered} />
      ) : (
        <CurveView events={filtered} />
      )}
    </>
  );
}

function useIsMobile(): boolean {
  const [mobile, setMobile] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(pointer: coarse)");
    const onChange = () => setMobile(mq.matches);
    setMobile(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);
  return mobile;
}
