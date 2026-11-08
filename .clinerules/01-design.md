# Design rules (full spec: docs/03-design-system.md)

- Concept "ORIGIN": paper + ink + hairlines + coordinates. Editorial serif for voice, mono for data, clean sans for body.
- Colors ONLY from CSS tokens in `src/app/globals.css` (`bg, bg-2, fg, fg-2, fg-3, line, grid, signal, signal-ink, azure, gold, moss`). Never hard-code hex in components.
- **Signal (red-orange) covers < 2% of any viewport**: one loud thing per screen (a point, a CTA, a current marker).
- Track colors (azure/gold/moss/signal) are for dots and lines only; always pair with a text label.
- Corners: 2px or 6px max. Borders: 1px `line`. No drop shadows, no gradients except the grid background, no glassmorphism, no emoji in UI.
- Fonts: `font-display` (Fraunces) headings/hero, `font-sans` (Instrument Sans) body, `font-mono` (Martian Mono) labels/coordinates/numbers.
- Motion: only `ease-snap` / `ease-inout` tokens, durations 120/240/480/900ms. Everything that moves must have a `prefers-reduced-motion` fallback (static final state).
- Every interactive element: visible focus ring (signal), min target 44px on touch, keyboard reachable.
- Desktop-only flourishes (custom cursor point, rulers) are disabled on touch and reduced-motion.
