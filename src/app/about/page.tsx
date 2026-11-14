import { Metadata } from "next";
import { Plate } from "@/components/ui/Plate";
import { Claim } from "@/components/sections/Claim";
import { races } from "@/content/races";

export const metadata: Metadata = { title: "About" };

function EnduranceStrip() {
  const totalRaces = races.length;

  return (
    <svg
      className="mt-8 w-full h-64 sm:h-80 md:h-96"
      viewBox="0 0 100 53"
      aria-label="Endurance elevation profile"
    >
      <path
        stroke="var(--moss)"
        strokeWidth={1}
        d="M0 0L20 5L40 12L60 7L80 15L100 0"
      />
      <g className="peak-labels">
        {races.map((race, i) => (
          <text
            key={race.id}
            x={(i / (totalRaces - 1)) * 100}
            y={race.distanceKm + 5}
            className="text-[0.6rem] text-fg-2 font-mono uppercase tracking-widest"
          >
            {race.id.split("-")[0]}
          </text>
        ))}
      </g>
    </svg>
  );
}

function PortraitPlaceholder() {
  return (
    <div
      className="relative w-48 h-60 sm:w-64 sm:h-auto"
      style={{ aspectRatio: "4 / 5" }}
    >
      <svg
        className="absolute inset-0 pointer-events-none"
        viewBox="0 0 32 32"
        aria-hidden="true"
      >
        <circle cx="16" cy="16" r="14" fill="none" stroke="var(--signal)" strokeWidth={1} opacity={0.45} />
        <path d="M16 1v30M1 16h30" stroke="currentColor" strokeWidth={1} opacity={0.45} />
        <circle cx="16" cy="16" r="4.5" fill="var(--signal)" />
      </svg>
      <div
        className="absolute inset-0 bg-[var(--bg)] opacity-80 rounded-full flex items-center justify-center"
      >
        PLACEHOLDER
      </div>
    </div>
  );
}

export default function AboutPage() {
  return (
    <Plate coordinate="§05 · (x 0.00, y 0.00)">
      <h1 className="font-display text-2xl">About</h1>

      {/* 150-word bio placeholder */}
      <p className="mt-4 text-fg-2 max-w-2xl">
        PLACEHOLDER: 150-word biography goes here. This space intentionally left blank until verified facts are available. The bio should capture the journey from maths turnaround through endurance achievements to full-stack development, written in first person, precise but warm style.
      </p>

      {/* Three Claims with #proofs anchors */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <Claim
          id="claim-1"
          label="Claim 1"
          statement="I stick with hard things."
          href="#proofs"
        />
        <Claim
          id="claim-2"
          label="Claim 2"
          statement="I build complete things, not demos."
          href="#proofs"
        />
        <Claim
          id="claim-3"
          label="Claim 3"
          statement="I think in systems and numbers."
          href="#proofs"
        />
      </div>

      {/* Portrait placeholder with crosshair overlay */}
      <div className="mt-8 md:mt-12 flex justify-center">
        <PortraitPlaceholder />
      </div>

      {/* EnduranceStrip */}
      <div className="mt-8">
        <EnduranceStrip />
        <p className="mt-2 text-xs text-fg-2 font-mono">
          {races.length} races · {races.reduce((sum, r) => sum + r.distanceKm, 0).toFixed(1)} km total · Best speed: {Math.max(...races.map((r) => r.averageSpeedKmh ?? 0), 0).toFixed(1)} km/h
        </p>
      </div>
    </Plate>
  );
}
