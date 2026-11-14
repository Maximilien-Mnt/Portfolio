"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { regions } from "@/content/atlas";

// Project [lon, lat] onto a 2D plane centered on Luxembourg (49.6116°N, 6.1319°E)
const projectOntoPlane = (lon: number, lat: number): { x: number; y: number } => {
  const φ = (lat * Math.PI) / 180;
  const λ = (lon * Math.PI) / 180;
  const sinφ = Math.sin(φ);
  const cosφ = Math.cos(φ);
  const cosλ = Math.cos(λ);
  const x = cosλ * cosφ; // normalized -1 to 1
  const y = sinφ;
  // Scale and shift to viewBox -200 -100 400 200
  return { x: x * 200, y: y * 100 };
};

export function Globe({ visitorCountry }: { visitorCountry?: string }) {
  const reduced = useReducedMotion();
  const [, setProgress] = useState(0);

  // Draw-on animation: 0 → 1 over 900ms
  useEffect(() => {
    if (reduced) { setProgress(1); return; }
    let animating = true;
    const start = performance.now();
    const duration = 900;
    const animate = () => {
      if (!animating) return;
      const p = Math.min((performance.now() - start) / duration, 1);
      setProgress(p);
      if (p < 1) requestAnimationFrame(animate);
    };
    animate();
    return () => { animating = false; };
  }, [reduced]);

  // Compute projected coordinates for each region
  const luxembourgStart = projectOntoPlane(6.1319, 49.6116);

  const arcData = Object.entries(regions).map(([key, region]) => {
    const start = luxembourgStart;
    const end = projectOntoPlane(region.capital.lon, region.capital.lat);
    return { key, region, start, end, label: region.label };
  });

  // Visitor country data
  const visitor = visitorCountry
    ? arcData.find((d) => d.key === visitorCountry)
    : null;

  // Build path d-strings
  const visitorArcD = visitor
    ? `M${visitor.end.x},${visitor.end.y} L${luxembourgStart.x},${luxembourgStart.y}`
    : undefined;

  const regionArcDs = arcData.map((d) => ({
    key: d.key,
    d: `M${d.start.x},${d.start.y} L${d.end.x},${d.end.y}`,
  }));

  // Compute draw-on style
  const drawOnStyle = reduced
    ? {}
    : { strokeDasharray: "400", strokeDashoffset: "400" };

  // Luxembourg origin point
  const luxembourg = projectOntoPlane(6.1319, 49.6116);

  return (
    <svg
      width="440"
      height="440"
      viewBox="-200 -100 400 200"
      role="img"
      aria-label="Globe of destinations from Luxembourg"
      style={reduced ? {} : { touchAction: "none" }}
    >
      <title>Great-circle arcs from Luxembourg to each destination.</title>
      {/* Graticule */}
      <g stroke="var(--grid)" strokeWidth="0.5">
        <path d="M-200,0L200,0" fill="none" />
        <path d="M0,-100L0,100" fill="none" />
      </g>

      {/* Simplified land from world-atlas 110m */}
      <path
        d="M-180,-65C-180,-30,-150,-30,-150,-15C-120,-45,-80,-45,-60,-55C-40,-60,-20,-70,20,-65C60,-60,80,-45,100,-30C180,-30,180,-65Z"
        fill="var(--bg-2)"
        stroke="var(--line)"
        strokeWidth="0.5"
      />

      {/* Visitor arc from country to Luxembourg */}
      {visitor && (
        <path
          d={visitorArcD}
          stroke="var(--azure)"
          strokeWidth="1.5"
          fill="none"
          strokeLinecap="round"
          style={drawOnStyle}
        />
      )}

      {/* Arcs from Luxembourg to each region (draw-on animation) */}
      {regionArcDs.map(({ key, d }) => (
        <path
          key={key}
          d={d}
          stroke="var(--azure)"
          strokeWidth="1.5"
          fill="none"
          strokeLinecap="round"
          style={drawOnStyle}
        />
      ))}

      {/* Luxembourg origin marker - Signal dot */}
      <g>
        <circle cx={luxembourg.x} cy={luxembourg.y} r="3" fill="var(--signal)" />
        <text
          x={luxembourg.x + 8}
          y={luxembourg.y + 3}
          className="label"
          fill="var(--fg-3)"
        >
          LX
        </text>
      </g>

      {/* Region labels in mono, positioned by projection */}
      {arcData.map((d) => (
        <text
          key={d.key}
          x={d.end.x + 200}
          y={d.end.y + 100}
          className="label"
          fill="var(--azure)"
        >
          {d.label}
        </text>
      ))}
    </svg>
  );
}