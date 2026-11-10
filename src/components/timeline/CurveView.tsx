"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useId } from "react";

import {
  cumulativePoints,
  curveSamples,
  formatTimelineDate,
  tangentSlope,
  timelineDateToUTC,
  parseTimelineDate,
} from "@/lib/viz/timeline";
import { TRACK_COLOR } from "@/content/schema";
import type { TimelineEvent } from "@/content/schema";
import { cn } from "@/lib/utils";
import { PointTooltip } from "./PointTooltip";

const SVG_W = 1200;
const SVG_H = 520;
const M = { left: 70, right: 26, top: 28, bottom: 56 };
const PLOT_W = SVG_W - M.left - M.right;
const PLOT_H = SVG_H - M.top - M.bottom;
const TANGENT_LEN = 96;

export interface CurveViewProps {
  events: TimelineEvent[];
}

export function CurveView({ events }: CurveViewProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const tooltipId = useId();

  const points = cumulativePoints(events);
  const maxY = points.length ? points[points.length - 1]!.y : 1;
  const samples = curveSamples(points);

  const xs = points.map((p) => M.left + p.t * PLOT_W);
  const ys = points.map((p) => M.top + PLOT_H - (p.y / maxY) * PLOT_H);

  const reduceRef = useRef(
    typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );
  const [drawn, setDrawn] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null);
  const [tooltipRect, setTooltipRect] = useState<{
    left: number;
    top: number;
  } | null>(null);
  const pathLengthRef = useRef(0);

  const screenX = (t: number) => M.left + t * PLOT_W;
  const screenY = (y: number) => M.top + PLOT_H - (y / maxY) * PLOT_H;

  useEffect(() => {
    pathLengthRef.current = pathRef.current ? pathRef.current.getTotalLength() : 0;
  });

  useEffect(() => {
    if (reduceRef.current) {
      setDrawn(true);
      return;
    }
    const el = containerRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) setDrawn(true);
      },
      { threshold: 0 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = () => {
      reduceRef.current = mq.matches;
      if (mq.matches) setDrawn(true);
    };
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  // ── drag + inertia pan ──────────────────────────────────────────────
  const isDraggingRef = useRef(false);
  const startXRef = useRef(0);
  const scrollStartRef = useRef(0);
  const lastDxRef = useRef(0);
  const lastTimeRef = useRef(0);
  const rafRef = useRef<ReturnType<typeof requestAnimationFrame> | null>(null);

  const cancelInertia = useCallback(() => {
    if (rafRef.current !== null) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
  }, []);

  const onPointerDown = useCallback((e: React.PointerEvent) => {
    if (e.button !== 0) return;
    cancelInertia();
    const el = containerRef.current;
    if (!el) return;
    isDraggingRef.current = true;
    startXRef.current = e.clientX;
    scrollStartRef.current = el.scrollLeft;
    el.setPointerCapture(e.pointerId);
  }, [cancelInertia]);

  const onPointerMove = useCallback((e: React.PointerEvent) => {
    if (!isDraggingRef.current) return;
    const el = containerRef.current;
    if (!el) return;
    const dx = e.clientX - startXRef.current;
    el.scrollLeft = scrollStartRef.current - dx;
    lastDxRef.current = dx;
    lastTimeRef.current = performance.now();
  }, []);

  const onPointerUp = useCallback(
    (e: React.PointerEvent) => {
      if (!isDraggingRef.current) return;
      isDraggingRef.current = false;
      containerRef.current?.releasePointerCapture(e.pointerId);
      const reduced = reduceRef.current;
      if (reduced) return;
      const now = performance.now();
      const dt = now - lastTimeRef.current;
      const v = dt > 0 && dt < 60 ? lastDxRef.current / dt : 0;
      if (Math.abs(v) < 30) return;
      let velocity = v;
      const tick = () => {
        velocity *= 0.92;
        const el = containerRef.current;
        if (!el || Math.abs(velocity) < 0.5) return;
        el.scrollLeft += velocity;
        rafRef.current = requestAnimationFrame(tick);
      };
      rafRef.current = requestAnimationFrame(tick);
    },
    [],
  );

  const onWheel = useCallback((e: React.WheelEvent) => {
    e.preventDefault();
    const el = containerRef.current;
    if (!el) return;
    el.scrollLeft += e.deltaY;
  }, []);

  useEffect(() => {
    return () => cancelInertia();
  }, [cancelInertia]);

  // ── axis: year ticks ────────────────────────────────────────────────
  let firstMs: number | null = null;
  let lastMs: number | null = null;
  if (points.length) {
    firstMs = timelineDateToUTC(parseTimelineDate(points[0]!.event.date)).getTime();
    lastMs = timelineDateToUTC(parseTimelineDate(points[points.length - 1]!.event.date)).getTime();
  }
  const spanMs = firstMs !== null && lastMs !== null ? Math.max(1, lastMs - firstMs) : 1;
  const yearTicks: { year: number; t: number }[] = [];
  if (firstMs !== null && lastMs !== null) {
    const startYear = new Date(firstMs).getUTCFullYear();
    const endYear = new Date(lastMs).getUTCFullYear();
    for (let Y = startYear; Y <= endYear; Y++) {
      const ms = Date.UTC(Y, 0, 1);
      if (ms >= firstMs && ms <= lastMs) {
        yearTicks.push({ year: Y, t: (ms - firstMs) / spanMs });
      }
    }
  }

  const placeTooltip = useCallback((x: number, y: number) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const W = 260;
    const H = 150;
    let left = rect.left + x - W / 2;
    let top = rect.top + y - H - 16;
    if (top < 10) top = rect.top + y + 20;
    const vpW = window.innerWidth;
    left = Math.min(Math.max(left, 10), vpW - W - 10);
    setTooltipRect({ left, top });
  }, []);

  // Reposition the tooltip while scrolling so it stays on its point.
  useEffect(() => {
    if (activeIndex === null) return;
    let id: ReturnType<typeof requestAnimationFrame> | null = null;
    const onScroll = () => {
      if (id) cancelAnimationFrame(id);
      const i = activeIndex;
      id = requestAnimationFrame(() => {
        if (activeIndex !== i) return;
        placeTooltip(xs[i]!, ys[i]!);
      });
    };
    const el = containerRef.current;
    el?.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      el?.removeEventListener("scroll", onScroll);
      window.removeEventListener("scroll", onScroll);
      if (id) cancelAnimationFrame(id);
    };
  }, [activeIndex, placeTooltip, xs, ys]);

  const openPoint = useCallback(
    (i: number) => {
      setFocusedIndex(i);
      setActiveIndex(i);
      placeTooltip(xs[i]!, ys[i]!);
    },
    [placeTooltip, xs, ys],
  );

  const closePoint = useCallback(() => {
    setActiveIndex(null);
    setTooltipRect(null);
  }, []);

  // ── path string ─────────────────────────────────────────────────────
  let d = "";
  if (samples.length) {
    d = samples
      .map((s, i) => `${i === 0 ? "M" : "L"}${screenX(s.t)} ${screenY(s.y)}`)
      .join("");
  }

  return (
    <div
      ref={containerRef}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerLeave={onPointerUp}
      onWheel={onWheel}
      className={cn(
        "relative w-full overflow-x-auto overflow-y-hidden",
        reduceRef.current ? "cursor-default" : "cursor-grab active:cursor-grabbing",
      )}
      style={{ height: SVG_H }}
    >
      <svg
        width={SVG_W}
        height={SVG_H}
        viewBox={`0 0 ${SVG_W} ${SVG_H}`}
        role="img"
        aria-label="Timeline curve f(t) — cumulative momentum over time"
        aria-describedby="timeline-desc"
      >
        <title>Timeline curve</title>
        <desc id="timeline-desc">
          Cumulative momentum over time: x is time (one tick per year), y is
          cumulative momentum. Points are coloured by track; the curve rises
          by the weight of each event at its date. Hover or focus a point for
          its tangent and details.
        </desc>
        {Array.from({ length: Math.ceil(maxY) }, (_, k) => k + 1).map((n) => (
          <line
            key={n}
            x1={M.left}
            x2={M.left + PLOT_W}
            y1={screenY(n)}
            y2={screenY(n)}
            stroke="var(--line)"
            strokeWidth={1}
          />
        ))}
        <line
          x1={M.left}
          x2={M.left + PLOT_W}
          y1={M.top + PLOT_H}
          y2={M.top + PLOT_H}
          stroke="var(--line)"
          strokeWidth={1}
        />
        <line
          x1={M.left}
          x2={M.left}
          y1={M.top}
          y2={M.top + PLOT_H}
          stroke="var(--line)"
          strokeWidth={1}
        />
        <path
          ref={pathRef}
          d={d}
          fill="none"
          stroke="var(--fg)"
          strokeWidth={1.5}
          strokeDasharray={pathLengthRef.current}
          strokeDashoffset={drawn ? 0 : pathLengthRef.current}
          style={{ transition: "stroke-dashoffset 900ms cubic-bezier(0.65, 0, 0.35, 1)" }}
        />
        {points.map((p, i) => {
          const x = xs[i]!;
          const y = ys[i]!;
          const active = activeIndex === i;
          const focused = focusedIndex === i;
          const slope = tangentSlope(points, i);
          const screenSlope = (-(slope / maxY) * PLOT_H) / PLOT_W;
          const norm = Math.hypot(1, screenSlope);
          const hx = (1 / norm) * (TANGENT_LEN / 2);
          const hy = (screenSlope / norm) * (TANGENT_LEN / 2);
          return (
            <g
              key={p.event.id}
              role="button"
              tabIndex={focusedIndex === i ? 0 : -1}
              aria-label={`${p.event.title}, ${formatTimelineDate(p.event.date)}`}
              aria-describedby={active ? tooltipId : undefined}
              onFocus={() => openPoint(i)}
              onBlur={() => {
                if (focusedIndex === i) closePoint();
              }}
              onClick={() => openPoint(i)}
              onMouseEnter={() => openPoint(i)}
              onMouseLeave={closePoint}
              onKeyDown={(e) => {
                if (e.key === "Escape") {
                  closePoint();
                  return;
                }
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  if (activeIndex === i) closePoint();
                  else openPoint(i);
                  return;
                }
                if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
                  e.preventDefault();
                  const step = e.key === "ArrowLeft" ? -1 : 1;
                  const j = (i + step + points.length) % points.length;
                  setFocusedIndex(j);
                  openPoint(j);
                }
              }}
            >
              <circle cx={x} cy={y} r={22} fill="transparent" />
              <circle cx={x} cy={y} r={3} fill={TRACK_COLOR[p.event.track]} />
              {focused && (
                <circle
                  cx={x}
                  cy={y}
                  r={6}
                  fill="none"
                  stroke="var(--signal)"
                  strokeWidth={2}
                  pointerEvents="none"
                />
              )}
              {active && (
                <line
                  x1={x - hx}
                  y1={y - hy}
                  x2={x + hx}
                  y2={y + hy}
                  stroke="var(--fg-2)"
                  strokeWidth={1}
                  pointerEvents="none"
                />
              )}
            </g>
          );
        })}
        {yearTicks.map(({ year, t }) => {
          const x = screenX(t);
          const base = M.top + PLOT_H;
          return (
            <g key={year}>
              <line
                x1={x}
                x2={x}
                y1={base}
                y2={base + 6}
                stroke="var(--line)"
                strokeWidth={1}
              />
              <text
                x={x}
                y={base + 20}
                textAnchor="middle"
                className="font-mono text-[0.72rem] text-fg-3"
              >
                {year}
              </text>
            </g>
          );
        })}
        <text
          x={M.left - 6}
          y={M.top + PLOT_H}
          textAnchor="end"
          className="font-mono text-[0.72rem] text-fg-3"
        >
          0
        </text>
        <text
          x={M.left - 6}
          y={M.top}
          textAnchor="end"
          className="font-mono text-[0.72rem] text-fg-3"
        >
          {maxY}
        </text>
      </svg>
      {activeIndex !== null && points[activeIndex] !== undefined && tooltipRect && (
        <PointTooltip
          point={points[activeIndex]!}
          id={tooltipId}
          left={tooltipRect.left}
          top={tooltipRect.top}
        />
      )}
    </div>
  );
}
