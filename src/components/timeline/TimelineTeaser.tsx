import { cn } from "@/lib/utils";
import { cumulativePoints, curveSamples } from "@/lib/viz/timeline";
import { TRACK_COLOR } from "@/content/schema";
import type { TimelineEvent } from "@/content/schema";
import { timeline } from "@/content/timeline";

const SVG_W = 700;
const SVG_H = 220;
const M = { left: 44, right: 18, top: 10, bottom: 32 };
const PLOT_W = SVG_W - M.left - M.right;
const PLOT_H = SVG_H - M.top - M.bottom;

/** Mini static curve for the home page. No axes, no interaction, no animation. */
export function TimelineTeaser({
  events,
  className,
}: {
  events?: TimelineEvent[];
  className?: string;
} = {}) {
  const data = events ?? timeline;
  const points = cumulativePoints(data);
  const maxY = points.length ? points[points.length - 1]!.y : 1;
  const samples = curveSamples(points);

  const screenX = (t: number) => M.left + t * PLOT_W;
  const screenY = (y: number) => M.top + PLOT_H - (y / maxY) * PLOT_H;

  let d = "";
  if (samples.length) {
    d = samples
      .map((s, i) => `${i === 0 ? "M" : "L"}${screenX(s.t)} ${screenY(s.y)}`)
      .join("");
  }

  return (
    <svg
      width={SVG_W}
      height={SVG_H}
      viewBox={`0 0 ${SVG_W} ${SVG_H}`}
      role="img"
      aria-label="Timeline teaser"
      className={cn("block max-w-full", className)}
    >
      <title>Timeline teaser</title>
      <desc>Mini curve of cumulative momentum over time (static, no interaction).</desc>
      <path d={d} fill="none" stroke="var(--fg)" strokeWidth={1.5} />
      {points.map((p) => (
        <circle
          key={p.event.id}
          cx={screenX(p.t)}
          cy={screenY(p.y)}
          r={2.5}
          fill={TRACK_COLOR[p.event.track]}
        />
      ))}
    </svg>
  );
}
