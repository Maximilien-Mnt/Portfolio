// Pure math for the timeline f(t) view.
//
// x is time (earliest -> latest event), y is a cumulative "momentum" value
// derived from each event's weight. All functions are pure and unit-testable.

import type { TimelineEvent } from "@/content/schema";

export interface ParsedDate {
  year: number;
  month: number | undefined; // 0-11, undefined when not given
  day: number | undefined; // 1-31, undefined when not given
}

/** Parse a YYYY / YYYY-MM / YYYY-MM-DD string. */
export function parseTimelineDate(date: string): ParsedDate {
  const m = /^(\d{4})(?:-(\d{2})(?:-(\d{2}))?)?$/.exec(date);
  if (!m) throw new Error(`[viz/timeline] invalid date: ${date}`);
  return {
    year: Number(m[1]),
    month: m[2] ? Number(m[2]) - 1 : undefined,
    day: m[3] ? Number(m[3]) : undefined,
  };
}

export function timelineDateToUTC(p: ParsedDate): Date {
  return new Date(Date.UTC(p.year, p.month ?? 0, p.day ?? 1));
}

/** Format a stored date string for display. "2022" | "Mar 2025" | "6 Mar 2025". */
export function formatTimelineDate(date: string): string {
  const p = parseTimelineDate(date);
  const d = timelineDateToUTC(p);
  if (p.month === undefined) return String(p.year);
  if (p.day === undefined) {
    return new Intl.DateTimeFormat("en-GB", { year: "numeric", month: "short" }).format(d);
  }
  return new Intl.DateTimeFormat("en-GB", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(d);
}

export interface MomentumPoint {
  t: number; // [0, 1] relative time position earliest -> latest
  y: number; // cumulative momentum
  event: TimelineEvent;
  index: number;
}

/** Sort events by date; y is the running total of weight; t is the relative
 *  date position in [0, 1]. Identical timestamps are nudged apart so curve
 *  segments keep a non-zero length. */
export function cumulativePoints(events: TimelineEvent[]): MomentumPoint[] {
  const byDate = [...events].sort((a, b) => {
    const da = timelineDateToUTC(parseTimelineDate(a.date)).getTime();
    const db = timelineDateToUTC(parseTimelineDate(b.date)).getTime();
    return da !== db ? da - db : a.id.localeCompare(b.id);
  });
  if (byDate.length === 0) return [];
  const t0 = timelineDateToUTC(parseTimelineDate(byDate[0]!.date)).getTime();
  const t1 = timelineDateToUTC(parseTimelineDate(byDate[byDate.length - 1]!.date)).getTime();
  const span = Math.max(1, t1 - t0);

  let prevT = -1;
  let y = 0;
  return byDate.map((event, index) => {
    const ms = timelineDateToUTC(parseTimelineDate(event.date)).getTime();
    let t = byDate.length === 1 ? 0.5 : (ms - t0) / span;
    if (t <= prevT) t = Math.min(prevT + 1e-6, 0.999999);
    prevT = t;
    y += event.weight;
    return { t, y, event, index };
  });
}

// Slopes dy/dt at each point (central difference; one-sided at the ends).
function pointSlopes(points: MomentumPoint[]): number[] {
  const n = points.length;
  const out: number[] = [];
  for (let i = 0; i < n; i++) {
    if (n === 1) {
      out.push(0);
    } else if (i === 0) {
      out.push((points[1]!.y - points[0]!.y) / (points[1]!.t - points[0]!.t));
    } else if (i === n - 1) {
      out.push((points[n - 1]!.y - points[n - 2]!.y) / (points[n - 1]!.t - points[n - 2]!.t));
    } else {
      out.push((points[i + 1]!.y - points[i - 1]!.y) / (points[i + 1]!.t - points[i - 1]!.t));
    }
  }
  return out;
}

/** Dense samples of a C1 cubic Hermite curve through the points, in (t, y) space. */
export function curveSamples(points: MomentumPoint[], count = 400): { t: number; y: number }[] {
  const n = points.length;
  if (n === 0) return [];
  if (n === 1) return [{ t: points[0]!.t, y: points[0]!.y }];

  const m = pointSlopes(points);
  const out: { t: number; y: number }[] = [];
  const perSegment = Math.max(2, Math.floor(count / (n - 1)));

  for (let i = 0; i < n - 1; i++) {
    const p0 = points[i]!;
    const p1 = points[i + 1]!;
    const dt = p1.t - p0.t;
    const steps = i === n - 2 ? perSegment + (count % (n - 1)) : perSegment;
    for (let k = 0; k <= steps; k++) {
      const s = k / steps;
      const s2 = s * s;
      const s3 = s2 * s;
      const h00 = 2 * s3 - 3 * s2 + 1;
      const h10 = s3 - 2 * s2 + s;
      const h01 = -2 * s3 + 3 * s2;
      const h11 = s3 - s2;
      const y = h00 * p0.y + h10 * m[i]! * dt + h01 * p1.y + h11 * m[i + 1]! * dt;
      out.push({ t: p0.t + s * dt, y });
      // skip the shared endpoint on non-final segments
      if (k === steps && i < n - 2) out.pop();
    }
  }
  return out;
}

/** Slope dy/dt of the curve at the given point index (for tangents). */
export function tangentSlope(points: MomentumPoint[], index: number): number {
  return pointSlopes(points)[index] ?? 0;
}

/** Group events by year, newest groups last, events in date order within a year. */
export function groupByYear(
  events: TimelineEvent[]
): { year: number; events: TimelineEvent[] }[] {
  const map = new Map<number, TimelineEvent[]>();
  for (const event of events) {
    const year = parseTimelineDate(event.date).year;
    const bucket = map.get(year);
    if (bucket) bucket.push(event);
    else map.set(year, [event]);
  }
  return [...map.entries()]
    .map(([year, evs]) => ({
      year,
      events: [...evs].sort((a, b) => {
        const da = timelineDateToUTC(parseTimelineDate(a.date)).getTime();
        const db = timelineDateToUTC(parseTimelineDate(b.date)).getTime();
        return da - db || a.id.localeCompare(b.id);
      }),
    }))
    .sort((a, b) => a.year - b.year);
}