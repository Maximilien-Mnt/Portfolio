import { cn } from "@/lib/utils";

const trackColors: Record<"azure" | "gold" | "moss" | "signal", string> = {
  azure: "bg-azure",
  gold: "bg-gold",
  moss: "bg-moss",
  signal: "bg-signal",
} as const;

export interface TagProps {
  track?: "azure" | "gold" | "moss" | "signal";
  className?: string;
  children?: React.ReactNode;
}

export function Tag({ track, className, children }: TagProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-sm border border-line px-2.5 py-0.5 text-fg-2 font-mono text-[0.72rem] uppercase tracking-wider leading-none",
        className,
      )}
    >
      {track && (
        <span
          className={cn("mr-1.5 w-1.5 h-1.5 rounded-full", trackColors[track])}
          aria-hidden="true"
        />
      )}
      {children}
    </span>
  );
}