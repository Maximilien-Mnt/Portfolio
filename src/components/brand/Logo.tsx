/** The Origin mark: crosshair + ring + Signal dot at (0, 0). */
export function OriginMark({ size = 28, className }: { size?: number; className?: string }) {
  return (
    <svg viewBox="0 0 32 32" width={size} height={size} aria-hidden="true" className={className}>
      <path d="M16 1v30M1 16h30" stroke="currentColor" strokeWidth="1" opacity="0.45" />
      <circle cx="16" cy="16" r="10" fill="none" stroke="currentColor" strokeWidth="1" />
      <circle cx="16" cy="16" r="4.5" fill="var(--signal)" />
    </svg>
  );
}

export function Wordmark({ name }: { name: string }) {
  return (
    <span className="inline-flex items-center gap-2">
      <OriginMark size={22} />
      <span className="font-display text-lg tracking-tight">{name}</span>
    </span>
  );
}
