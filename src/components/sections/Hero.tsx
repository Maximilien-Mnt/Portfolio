import Link from "next/link";

import { site } from "@/config/site";
import { proofChips } from "@/content/hero";
import { TRACK_COLOR } from "@/content/schema";
import { OriginField } from "@/components/viz/OriginField";
import { cn } from "@/lib/utils";

/**
 * Hero (server component): headline + subline are server-rendered for LCP.
 * OriginField renders behind the text (client canvas) and never blocks the
 * links/buttons on top — pointer-events flow through to the canvas except on
 * interactive elements, which stay clickable.
 */
export function Hero() {
  return (
    <section className="relative pt-[72px] pb-[56px] min-h-[520px]">
      <OriginField className="w-full h-full" />
      <div className="relative z-10 pointer-events-none">
        <div className="pointer-events-auto mx-auto max-w-3xl px-4 md:px-6">
          <p className="label">§01 · click the field to reseed</p>
          <h1
            className={cn(
              "font-display mt-0 mb-2",
              "text-[clamp(3.5rem,8vw,10rem)] leading-[0.96] font-light",
            )}
            style={{ fontVariationSettings: '"SOFT" 50, "WONK" 1' }}
          >
            {site.tagline.replace(/\.$/, "")}<span className="text-signal">.</span>
          </h1>
          <p className="mt-8 max-w-2xl text-lg text-fg-2">
            {site.description}
          </p>
          <div className="mt-10 flex flex-wrap gap-2">
            {proofChips.map((chip) => (
              <span
                key={chip.label}
                className={cn(
                  "inline-flex items-center gap-2 border border-line rounded-[2px] px-3 py-1.5 font-mono text-[0.72rem] uppercase tracking-wider text-fg-2",
                )}
              >
                <span
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: TRACK_COLOR[chip.track] }}
                  aria-hidden="true"
                />
                {chip.label}
              </span>
            ))}
          </div>
          <div className="mt-10">
            <Link
              href="/about#proofs"
              className="rounded-md bg-fg text-bg px-5 py-3 text-sm font-medium transition-colors duration-120 ease-snap"
            >
              See the proof
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
