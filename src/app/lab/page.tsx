"use client";

import Link from "next/link";

export default function LabPage() {
  return (
    <section
      className="relative pt-[72px] pb-[64px]"
      aria-label="Lab — maths & probability demos"
    >
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Link href="/lab/gbm" className="group border border-line rounded-md overflow-hidden hover:bg-fg-2 transition-colors duration-240 ease-snap">
            <div className="p-6 whitespace-nowrap">
              <div className="flex items-baseline gap-2 text-signal mb-2">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="flex-shrink-0">
                  <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2-1.73l7-4A2 2 0 0 0 21 16z" />
                  <polyline points="9 7 9 4 15 4" />
                  <line x1="12" y1="19" x2="12" y2="23" />
                  <line x1="12" y1="15" x2="24" y2="15" />
                </svg>
                Geometric Brownian Motion
              </div>
              <h3 className="text-lg font-medium tracking-tight">GBM Simulator</h3>
              <p className="mt-2 text-sm text-fg-3">Drift and volatility sliders, percentile bands, reseed.</p>
            </div>
          </Link>

          <Link href="/lab/collatz" className="group border border-line rounded-md overflow-hidden hover:bg-fg-2 transition-colors duration-240 ease-snap">
            <div className="p-6 whitespace-nowrap">
              <div className="flex items-baseline gap-2 text-azure mb-2">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="flex-shrink-0">
                  <path d="M12 5v14M5 12h14" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
                Collatz Explorer
              </div>
              <h3 className="text-lg font-medium tracking-tight">Collatz Explorer</h3>
              <p className="mt-2 text-sm text-fg-3">Enter n, see the trajectory, steps and peak.</p>
            </div>
          </Link>

          <Link href="/lab/dca" className="group border border-line rounded-md overflow-hidden hover:bg-fg-2 transition-colors duration-240 ease-snap">
            <div className="p-6 whitespace-nowrap">
              <div className="flex items-baseline gap-2 text-gold mb-2">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="flex-shrink-0">
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                  <line x1="8" y1="12" x2="12" y2="16" />
                  <line x1="16" y1="12" x2="12" y2="16" />
                </svg>
                DCA vs Lump-Sum
              </div>
              <h3 className="text-lg font-medium tracking-tight">DCA vs Lump-Sum</h3>
              <p className="mt-2 text-sm text-fg-3">Compare dollar-cost averaging vs one-time investment.</p>
            </div>
          </Link>

          <Link href="/lab/graph" className="group border border-line rounded-md overflow-hidden hover:bg-fg-2 transition-colors duration-240 ease-snap">
            <div className="p-6 whitespace-nowrap">
              <div className="flex items-baseline gap-2 text-moss mb-2">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="flex-shrink-0">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M2 12l10-10l4 4l4-4" />
                </svg>
                Graph Shortest Path
              </div>
              <h3 className="text-lg font-medium tracking-tight">Graph Shortest Path</h3>
              <p className="mt-2 text-sm text-fg-3">Click to add nodes, run Dijkstra step by step.</p>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}