import { cn } from "@/lib/utils";

export interface RulersProps {
  className?: string;
}

// Desktop-only tick rulers (left + top). Hidden via CSS on touch, reduced motion,
// and narrow viewports — see src/app/globals.css. Always aria-hidden.
const MAX = 3200;
const STEP = 32;
const LABEL_STEP = 160;

export function Rulers({ className }: RulersProps = {}) {
  const topTicks: React.ReactNode[] = [];
  const leftTicks: React.ReactNode[] = [];

  for (let x = 0; x <= MAX; x += STEP) {
    topTicks.push(
      <line
        key={`tx-${x}`}
        x1={x}
        y1={0}
        x2={x}
        y2={x % LABEL_STEP === 0 ? 14 : 7}
        stroke="var(--fg-3)"
        strokeWidth={1}
      />,
    );
    if (x % LABEL_STEP === 0 && x > 0) {
      topTicks.push(
        <text
          key={`tl-${x}`}
          x={x}
          y={22}
          fontSize={10}
          fontFamily="var(--font-martian), ui-monospace, monospace"
          fill="var(--fg-3)"
          textAnchor="middle"
          letterSpacing="0.08em"
        >
          {x}
        </text>,
      );
    }
  }

  for (let y = 0; y <= MAX; y += STEP) {
    leftTicks.push(
      <line
        key={`ly-${y}`}
        x1={0}
        y1={y}
        x2={y % LABEL_STEP === 0 ? 14 : 7}
        y2={y}
        stroke="var(--fg-3)"
        strokeWidth={1}
      />,
    );
    if (y % LABEL_STEP === 0 && y > 0) {
      leftTicks.push(
        <text
          key={`lx-${y}`}
          x={22}
          y={y + 4}
          fontSize={10}
          fontFamily="var(--font-martian), ui-monospace, monospace"
          fill="var(--fg-3)"
          letterSpacing="0.08em"
        >
          {y}
        </text>,
      );
    }
  }

  return (
    <svg
      className={cn("rulers fixed inset-0 z-[-1] pointer-events-none w-full h-full", className)}
      aria-hidden="true"
      viewBox={`0 0 ${MAX} ${MAX}`}
      preserveAspectRatio="none"
    >
      {topTicks}
      {leftTicks}
    </svg>
  );
}
