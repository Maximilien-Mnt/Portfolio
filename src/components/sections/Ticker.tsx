"use client";

import { useEffect, useRef, useState } from "react";

import { site } from "@/config/site";
import { cn } from "@/lib/utils";

export interface TickerProps {
  className?: string;
}

export function Ticker({ className }: TickerProps = {}) {
  const [time, setTime] = useState(() => formatTime(new Date()));
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    const update = () => setTime(formatTime(new Date()));
    update();
    intervalRef.current = setInterval(update, 1000);
    return () => {
      if (intervalRef.current !== null) clearInterval(intervalRef.current);
    };
  }, []);

  const status = "online"; // TODO(P11/P14): real status source.

  return (
    <div className={cn("border-b border-line bg-bg", className)}>
      <div className="mx-auto max-w-7xl flex items-center justify-between h-10 px-4 md:px-6">
        <span className="font-mono text-[0.72rem] uppercase tracking-wider text-fg-3">
          ORIGIN {site.origin.lat}°N {site.origin.lon}°E · LUX{" "}
          <span suppressHydrationWarning className="font-mono tabular-nums">{time}</span>
        </span>
        <span className="font-mono text-[0.72rem] uppercase tracking-wider text-fg-3">
          status · {status}
        </span>
      </div>
    </div>
  );
}

function formatTime(date: Date): string {
  const formatter = new Intl.DateTimeFormat(undefined, {
    timeZone: site.origin.timeZone,
    hour12: false,
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
  return formatter.format(date);
}
