"use client";

import { useCallback } from "react";

import { TRACKS, TrackId, TRACK_COLOR } from "@/content/schema";
import { cn } from "@/lib/utils";

export interface TrackFilterProps {
  tracks: TrackId[];
  onToggle: (track: TrackId) => void;
}

/** Pill toggles for the five tracks. Multi-select (OR semantics); state lives
 *  in the URL, owned by TimelineControls. */
export function TrackFilter({ tracks, onToggle }: TrackFilterProps) {
  const isActive = (track: TrackId) => tracks.includes(track);
  const handleToggle = useCallback(
    (track: TrackId) => () => onToggle(track),
    [onToggle],
  );

  return (
    <div className="flex flex-wrap gap-2 items-center">
      <span id="track-filter-label" className="label mr-2">
        Tracks
      </span>
      <div role="group" aria-labelledby="track-filter-label" className="inline-flex gap-1.5">
        {TRACKS.map((track) => (
          <button
            key={track}
            role="checkbox"
            aria-checked={isActive(track)}
            type="button"
            onClick={handleToggle(track)}
            className={cn(
              "min-h-[44px] min-w-[44px] rounded-md border border-line px-3 py-1.5 text-center font-mono text-[0.72rem] uppercase tracking-wider transition-colors duration-120 ease-snap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-signal focus-visible:ring-offset-3",
              isActive(track) ? "bg-fg text-bg" : "bg-transparent text-fg-2 hover:bg-bg-2",
            )}
          >
            <span
              className="mr-1.5 w-1.5 h-1.5 rounded-full"
              style={{ backgroundColor: TRACK_COLOR[track] }}
              aria-hidden="true"
            />
            {track.charAt(0).toUpperCase() + track.slice(1)}
          </button>
        ))}
      </div>
    </div>
  );
}