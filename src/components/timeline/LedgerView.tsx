import Link from "next/link";

import type { TimelineEvent } from "@/content/schema";
import { TRACK_COLOR } from "@/content/schema";
import { groupByYear, formatTimelineDate } from "@/lib/viz/timeline";

export interface LedgerViewProps {
  events: TimelineEvent[];
}

/** Vertical ledger grouped by year. Each row: date · title · track · summary · optional proof link.
 *  This is also the text alternative for the curve view. */
export function LedgerView({ events }: LedgerViewProps) {
  const groups = groupByYear(events);
  if (groups.length === 0) {
    return <p className="label text-fg-2">No events match the current filters.</p>;
  }

  return (
    <div className="space-y-6">
      {groups.map(({ year, events: evs }) => (
        <section key={year}>
          <h2 className="font-mono text-[0.72rem] uppercase tracking-wider text-fg-3">
            {year}
          </h2>
          <ol className="mt-2 space-y-4">
            {evs.map((event) => (
              <li key={event.id} className="flex flex-col sm:flex-row sm:items-start sm:gap-4 gap-2">
                <time
                  dateTime={event.date}
                  className="font-mono text-[0.72rem] text-fg-2 shrink-0 w-[120px] sm:w-auto"
                >
                  {formatTimelineDate(event.date)}
                </time>
                <div className="flex flex-col sm:flex-row sm:items-start gap-2 flex-1">
                  <h3 className="font-display text-lg leading-tight">{event.title}</h3>
                  <span
                    className="inline-flex items-center gap-1.5 rounded-md border border-line px-2.5 py-0.5 text-fg-2 font-mono text-[0.72rem] uppercase tracking-wider"
                  >
                    <span
                      className="w-1.5 h-1.5 rounded-full"
                      style={{ backgroundColor: TRACK_COLOR[event.track] }}
                      aria-hidden="true"
                    />
                    {event.track.charAt(0).toUpperCase() + event.track.slice(1)}
                  </span>
                </div>
                <p className="text-sm text-fg flex-1">{event.summary}</p>
                {event.href && (
                  <Link
                    href={event.href}
                    className="text-xs font-mono text-signal-ink decoration-signal-ink underline underline-offset-2 hover:text-signal shrink-0"
                  >
                    Proof &rarr;
                  </Link>
                )}
              </li>
            ))}
          </ol>
        </section>
      ))}
    </div>
  );
}