# 03 — Design system & brand: ORIGIN

## Concept
The whole site is a **coordinate plane**. The origin (0, 0) is Luxembourg (49.6116°N, 6.1319°E). Things on the site have positions, trajectories and proofs: your timeline is a function f(t), your claims are theorems with proofs, your destinations are points on a globe, your visitors can plot a point on a shared plane. Maths, code and markets (random walks, curves, candles) share one visual language: **hairlines, ticks, coordinates, paper.**
Feeling: a beautifully printed maths paper that happens to be alive. Precise, warm, quietly playful. Not "dark neon dev portfolio".

## Principles
1. **Plot, don't decorate** — every graphic encodes something (time, position, data).
2. **Paper first** — warm paper, ink, hairlines, editorial type.
3. **One loud thing per screen** — Signal red-orange appears once, like a plotted point.
4. **Claim → Proof** — a statement always links to evidence.
5. **Precision with warmth** — mono for data, soft serif for voice.

## Brand
- **Name**: your name set in Fraunces; the site concept is called *Origin*.
- **Mark**: the *Origin mark* — a thin crosshair, a ring, and a solid Signal dot at the centre (`src/components/brand/Logo.tsx`). Used as favicon, loader and cursor.
- **Tagline**: "I like problems that take a long time to solve."
- **Photography**: one portrait, black-and-white or warm-neutral, 4:5, slight paper grain, a small Signal crosshair overlay at the focal point. Screens in context (laptop/phone) over flat mockups. No stock photos.
- **Illustration**: only plotted things — curves, grids, globes, point clouds, candles.
- **Voice**: see `docs/01` (short, first person, dry wit).

## Color (tokens in `src/app/globals.css`)
| Token | Light "Paper" | Dark "Blueprint" | Use |
|---|---|---|---|
| `bg` | #F3F0E8 | #0A1020 | page |
| `bg-2` | #E9E5DA | #111A2E | raised surfaces, hover |
| `fg` | #0D1524 | #ECE8DD | text, ink lines |
| `fg-2` | #4A5468 (≈6.7:1) | #A3ACBF | secondary text |
| `fg-3` | #7A8396 (decorative) | #6F7A91 | ticks, hints — never required text |
| `line` | ink 14% | vellum 14% | 1px borders |
| `grid` | ink 6% | vellum 5% | background grid |
| `signal` | #E8402A | #FF5A3C | THE accent: points, CTA dot, current marker |
| `signal-ink` | #C22F1B (≈5:1) | #FF7A60 | accent as text/links |
| `azure` | #0A7BB5 | #3DBBF2 | Maths track, data lines |
| `gold` | #B8892A | #E3B84F | Markets track |
| `moss` | #3E7B5A | #6FCB9F | Endurance track |
Rules: ~70% bg · ~20% fg · ~8% data colors · **<2% signal**. Track colors never carry meaning alone (add label/icon). Light is default for "system light"; dark follows system or the toggle.

## Typography
| Role | Font (next/font) | Settings |
|---|---|---|
| Display / voice | **Fraunces** (variable) | `opsz` auto, `SOFT` 50, `WONK` 1 on hero only; weights 300–600; tight tracking −0.02em |
| Body / UI | **Instrument Sans** | 400/500/600 |
| Data / labels | **Martian Mono** | 0.72rem uppercase, +0.08em tracking; tabular numbers |
Scale (fluid, `clamp`): display 3.5→10rem · h1 2.5→5rem · h2 1.75→3rem · h3 1.25→1.75rem · body 1.0625rem/1.6 · label 0.72rem. Max line 68ch. Math set in KaTeX (STIX-like) inside Notes.

## Layout, grid, spacing
- 12 columns, max width 1280, gutters 24 (16 on mobile). Spacing scale (px): 4 · 8 · 12 · 16 · 24 · 32 · 48 · 64 · 96 · 128.
- Background grid 32px (`grid` color). **Rulers** with ticks in the left and top margin on desktop; sections carry a coordinate label `§03 · (x 0.34, y −1.20)`.
- Sections have a 96–128px vertical rhythm; each starts with a mono label + serif heading.
- Breakpoints: 480 · 768 · 1024 · 1280 · 1536. Mobile: single column, no rulers/custom cursor, timeline becomes vertical ledger.

## Surfaces & shape
Radius 2px (plates) / 6px (buttons, inputs). 1px `line` borders. **No shadows.** Elevation = tone shift (`bg` → `bg-2`). **Plate** = hairline box with `+` registration marks at two corners. Focus ring: 2px `signal`, 3px offset.

## Iconography
Lucide at 1.5px stroke, 18/20/24px; custom marks (origin, tick, crosshair) in `src/components/brand`. No filled icons.

## Motion
- Easings: `ease-snap` cubic-bezier(0.22, 1, 0.36, 1) · `ease-inout` cubic-bezier(0.65, 0, 0.35, 1).
- Durations: 120 (hover) · 240 (UI) · 480 (reveal) · 900 (draw-on). Stagger 40ms.
- Signature motions: **draw-on** (lines trace themselves), **plot** (a point pops with a 1-frame ring), **count** (numbers tick up in mono), **axis wipe** page transition.
- Reduced motion: no parallax, no canvas animation (render final frame), no cursor follower, instant transitions.

## Signature components
| Component | Description |
|---|---|
| `OriginField` | Hero canvas: grid + axes + a random-walk path; click = reseed; drifts toward the cursor |
| `CoordCursor` | Desktop cursor point with live (x, y) readout relative to the origin; snaps to grid when over plates |
| `Plate` | Hairline card with corner marks and a coordinate label |
| `Claim` / `Proof` | Theorem-style callout: label *Claim 1*, statement in serif, "Proof →" link |
| `Ticker` | Top mono bar: origin coordinates · live Luxembourg time · status |
| `TrackFilter` | Pill toggles with colored dots (Maths, Code, Markets, Endurance, School) |
| `TimelineCurve` | SVG function curve with plotted events, tangent on hover, scroll-scrub |
| `Globe` | d3-geo orthographic globe with great-circle arcs from Luxembourg |
| `PlaneBoard` | Guestbook: click to plot a point + message |
| `CommandPalette` | ⌘K / Ctrl-K navigation + actions |
| `Terminal` | `~` opens a mini shell (`help`, `ls work`, `open pulse`, `theme dark`, `sudo hire me`) |
Standard UI: Button (primary ink fill with Signal dot on hover · secondary hairline · ghost), Tag, Input, Textarea, Tooltip, Dialog, Tabs, Toggle (view switch).

## Page patterns
- **Hero**: ticker · giant serif line · `OriginField` behind · three proof chips · single CTA.
- **Index**: three view modes (Grid / Ledger / Map) switched with a mono toggle; state in URL.
- **Detail ("paper")**: Abstract → Context → Method → Result → What I'd do differently → Links → "Q.E.D." Sticky mini-TOC with coordinates.
- **Data page**: chart first, controls in a plate on the side, text alternative below.

## Interaction patterns
Hover = coordinate readout or tangent, never just a color change. Everything draggable shows a grab cursor and an inertia. Keyboard: `/` search, `⌘K` palette, `~` terminal, `g` then `h/w/t/a` = go home/work/timeline/atlas, `d` = measure mode (shows grid + coordinates of elements).

## Accessibility
WCAG 2.2 AA. Text ≥4.5:1 (use `fg`, `fg-2`, `signal-ink`); `fg-3`, `gold`, `signal` on light bg are graphics-only. Every chart has a text/table alternative. Focus always visible. Motion off with `prefers-reduced-motion`. No info by color alone. Touch targets ≥44px.

## Do / Don't
Do: hairlines, ticks, mono labels, big serif, generous whitespace, one Signal element.
Don't: gradients, glass, shadows, rounded pills everywhere, purple, stock icons, autoplay sound, confetti, "AI sparkle".
