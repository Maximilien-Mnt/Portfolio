/** Theorem-style callout: label, serif statement, "Proof →" link. */
import { cn } from "@/lib/utils";
import Link from "next/link";

export interface ClaimProps {
  id: string; // e.g. "claim-1"
  label: string; // e.g. "Claim 1"
  statement: string; // serif statement
  href?: string; // link to project/timeline/race
}

/** Claim component with label, serif statement, and Proof → link. */
export function Claim({ id, label, statement, href }: ClaimProps) {
  return (
    <div
      className={cn(
        "plate p-6 md:p-8 border-l-2 border-signal"
      )}
    >
      <span className="inline-block text-signal-ink text-xs uppercase tracking-widest mb-3 block">
        {label}
      </span>
      <p className="font-serif text-lg leading-relaxed serif">{statement}</p>
      {href && (
        <Link
          href={href}
          className="mt-4 inline-block text-signal-ink underline underline-offset-4 font-medium transition-colors duration-120 ease-snap"
          aria-label={`Proof ${id}`}
        >
          Proof →
        </Link>
      )}
    </div>
  );
}