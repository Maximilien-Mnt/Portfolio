# 05 — Cline prompts

## How to use

- **One prompt = one NEW Cline task** (small context = better results with free models). In Cline, start a new task, paste the block.
- **Mode legend**: **PLAN → ACT** means: paste in *Plan* mode, read Cline's plan, correct it in chat, then click *Toggle to Act* and say "Go". **ACT** means paste directly in *Act* mode (the task is small and well-specified). **PLAN only** means no edits — you want an audit/answer.
- Every prompt ends with the same closing rule (already included): lint, build, tick `docs/PROGRESS.md`.
- If a model struggles, split the prompt into its numbered tasks and send them one by one. Use your strongest model for P3, P5, P8.
- Order matters. Don't skip P0–P2.

---

## P0 — Audit & plan · **MODE: PLAN → ACT**

```
Read .clinerules/*, README.md, docs/01..04 and docs/PROGRESS.md, then inspect the repo (package.json, src/**).
PLAN: (1) tell me in 10 lines what this project is and what you understood of the design concept (ORIGIN); (2) list anything missing or broken (deps, tsconfig, fonts, tokens); (3) propose fixes.
ACT (after I approve): apply only those fixes, make `pnpm dev` and `pnpm build` pass, and put a short "Known issues" section in docs/PROGRESS.md.
Closing rule: run `pnpm lint && pnpm build`, tick docs/PROGRESS.md.
```

## P1 — Tokens, fonts, primitives · **MODE: PLAN → ACT**

```
Read docs/03-design-system.md (Color, Typography, Surfaces, Accessibility) and src/app/globals.css, src/lib/fonts.ts.
Build src/components/ui/: Button (primary/secondary/ghost, with Signal dot on hover for primary), Tag (with optional track dot), Plate (hairline box with "+" registration marks, optional coordinate label prop), Label (mono uppercase), Input, Textarea, Toggle (segmented view switch), Tooltip. Add src/lib/utils.ts with cn() using clsx + tailwind-merge.
Create a temporary page src/app/_kit/page.tsx showing every component in light and dark.
Done when: all components use only tokens, focus ring visible, targets >=44px on touch, dark/light both correct, no hard-coded hex.
Closing rule: lint, build, tick PROGRESS.
```

## P2 — App shell · **MODE: PLAN → ACT**

```
Read docs/03 (Layout, Interaction patterns) and docs/04 (Sitemap). Use src/config/site.ts for nav.
Build: <Header> (OriginMark + name wordmark, nav, theme toggle with next-themes, a "⌘K" hint button), <Ticker> (mono bar: "ORIGIN 49.6116°N 6.1319°E · LUX hh:mm:ss · status" — time via Intl.DateTimeFormat with timeZone from site config, updates each second, client component), <Footer> ("Built from (0, 0) — Luxembourg."), <Rulers> (left+top tick rulers, desktop only, aria-hidden), <CoordCursor> (desktop + fine pointer only: small Signal dot following the cursor with live x/y relative to the viewport centre; disabled on touch and prefers-reduced-motion).
Mobile: header collapses into a full-screen menu; no rulers, no custom cursor.
Wire everything into src/app/layout.tsx. Create empty placeholder pages for every route in docs/04 sitemap (except /hq) with an h1 and a TODO.
Done when: every route loads, keyboard navigation works, theme toggle persists, no hydration warnings.
Closing rule: lint, build, tick PROGRESS.
```

## P3 — Hero & OriginField · **MODE: PLAN → ACT** (strongest model)

```
Read docs/03 (Concept, Signature components, Motion) and open design/style-tile.html: it contains a working prototype of the hero field — port it, don't reinvent it.
Build src/components/viz/OriginField.tsx ("use client"): canvas 2D, DPR-aware, resize-aware; grid (32px) + axes with the origin at the centre + tick labels; a seeded random-walk path (pure function in src/lib/viz/walk.ts, seed → points) drawn on progressively; the line end drifts toward the cursor; click reseeds; shows a (x, y) crosshair readout; reads colors from CSS variables so it follows the theme; pauses via IntersectionObserver when off-screen; cancels rAF on unmount; with prefers-reduced-motion render the final frame once.
Build src/components/sections/Hero.tsx: Fraunces display headline from site.tagline, subline from site.description, three proof chips (from content), one primary CTA "See the proof" -> /about#proofs. Put OriginField behind the text (aria-hidden, pointer-events handled so links stay clickable).
Replace the skeleton in src/app/page.tsx with <Hero/>.
Done when: 60fps on a mid laptop, text contrast OK over the field, LCP not blocked by the canvas (headline is server-rendered).
Closing rule: lint, build, tick PROGRESS.
```

## P4 — Content layer, /work, case-study template · **MODE: PLAN → ACT**

```
Read src/content/schema.ts, projects.ts, timeline.ts and docs/04 (/work, /work/[slug], Data model).
1) Extend schema.ts with Subject, Competition, Skill, Book, Race, NowItem (zod). Create studies.ts, skills.ts, books.ts, races.ts, now.ts with CLEARLY MARKED placeholder data (placeholder: true). Do NOT invent real facts.
2) src/lib/content.ts: loaders that parse with zod and throw readable errors at build time; getProjects(), getProject(slug), getTimeline(), etc.
3) MDX: content/projects/*.mdx loaded with next-mdx-remote/rsc + gray-matter, plugins remark-math + rehype-katex + rehype-pretty-code; create 1 example MDX (pulse.mdx) with sections Abstract, Context, Method, Result, What I'd do differently, Links, "Q.E.D.".
4) /work: three views (Grid, Ledger, Skills-map placeholder) switched by a Toggle, view + filters stored in the URL (?view=&type=). /work/[slug]: case-study "paper" layout with sticky mini-TOC; generateStaticParams; notFound() for bad slugs.
Done when: build prints no zod errors, both routes render, dark/light fine, TOC highlights the current section.
Closing rule: lint, build, tick PROGRESS.
```

## P5 — Timeline f(t) · **MODE: PLAN → ACT** (strongest model)

```
Read docs/03 (TimelineCurve, Motion), docs/04 (/timeline), src/content/timeline.ts.
Build /timeline with two views switched by a Toggle (URL ?view=curve|ledger):
CURVE: an SVG function curve y=f(t) whose x is time (earliest -> latest event) and y is a cumulative "momentum" value derived from event weight (pure function in src/lib/viz/timeline.ts). Each event is a plotted point colored by track. Axis ticks per year in mono. The curve draws on (stroke-dashoffset, 900ms) when scrolled into view. Hovering/focusing a point shows a tangent line and a Plate tooltip (title, date, summary, link to proof). Horizontal scroll with drag + inertia on desktop; on mobile it falls back to the Ledger.
LEDGER: vertical list grouped by year, each row = date (mono) · title · track Tag · summary · optional link.
TrackFilter above both: toggles tracks (maths, code, markets, endurance, school); filtered state in URL.
Accessibility: curve is role="img" with title/desc, and the Ledger is the text alternative; points are keyboard-focusable.
Also export a small <TimelineTeaser/> for the home page (mini curve, no interaction).
Done when: both views reflect filters, reduced-motion shows the final state, no layout shift.
Closing rule: lint, build, tick PROGRESS.
```

## P6 — Studies + skills graph · **MODE: PLAN → ACT**

```
Read docs/04 (/studies) and src/content/studies.ts, skills.ts, books.ts.
Build /studies: (a) "Transcript" Plate listing European Baccalaureate subjects/languages with level and optional grade (grades hidden unless showGrade is true in data), (b) competitions list, (c) "What I love in maths" tag cloud from favourite areas, (d) books as a shelf with one-line takeaways.
Build src/components/viz/SkillGraph.tsx: install d3-force (justify in decisions log), force graph linking skills <-> projects from content, drag nodes, hover highlights neighbours, keyboard-focusable nodes, a plain list alternative below. Use it in the /work "Skills-map" view.
Done when: graph is smooth, accessible alternative exists, works with 0 grades shown.
Closing rule: lint, build, tick PROGRESS.
```

## P7 — About: Claims & Proofs, Endurance, Now · **MODE: ACT**

```
Read docs/01 (Core -> Claims & Proofs), docs/03 (Claim/Proof component), docs/04.
Build <Claim> component (label "Claim n", serif statement, "Proof ->" links to a project/timeline/race) and /about with: 150-word bio placeholder, three Claims with anchors #proofs, portrait placeholder (4:5, crosshair overlay), and <EnduranceStrip>: an elevation-profile-style SVG built from src/content/races.ts (each race = a peak, height = distance, color = moss; aggregated stats only, NO GPS). Build /now from now.ts with "last updated" date.
Placeholders must be visibly flagged in dev (a small "PLACEHOLDER" Tag) and absent in production if placeholder is false.
Closing rule: lint, build, tick PROGRESS.
```

## P8 — Atlas globe · **MODE: PLAN → ACT** (strongest model)

```
Read docs/04 (/atlas, ideas 5) and docs/03 (Globe). Use d3-geo + topojson-client + world-atlas (already installed).
Create src/content/atlas.ts: regions UK, US, CA, FR, SG, each with label, capital/anchor lat-lon, "what matters" blurb (placeholder), and optional universities[] with public:boolean and status ('exploring'|'applying'|'submitted'|'decided'). Only items with public:true render publicly.
Build <Globe> (client, SVG): orthographic projection centered near Luxembourg, drag-to-rotate with inertia, auto-rotate slowly when idle (off for reduced-motion), graticule, land from world-atlas 110m, highlighted countries, great-circle arcs from Luxembourg (draw-on animation) to each region, labels in mono.
/atlas page: Globe + region cards (click card -> globe rotates there).
Visitor arc: read the country from the `x-vercel-ip-country` request header in a server component, pass it as a prop, and draw an extra Azure arc from that country to Luxembourg ("You are N km from origin" using haversine in src/lib/geo.ts). Never store it. If missing (local dev), skip.
Done when: smooth drag, no memory leaks, text alternative list of regions below the globe.
Closing rule: lint, build, tick PROGRESS.
```

## P9 — Supabase: Plane guestbook + contact · **MODE: PLAN → ACT**

```
Prerequisite: I ran supabase/migrations/0001_portfolio_init.sql and filled the Supabase + Turnstile env vars (if keys are empty, features must hide themselves).
Read .clinerules/00-project.md, docs/02 (Security & privacy), the SQL file.
Build: src/lib/supabase/{server.ts,admin.ts} (admin uses the service role, server-only, import "server-only"). Server actions: submitGuestbook(formData) and submitContact(formData): zod validation, honeypot, Turnstile token verification (POST to the Cloudflare siteverify endpoint with TURNSTILE_SECRET_KEY), insert with the admin client, return typed results. Contact also emails CONTACT_TO_EMAIL via Resend if configured.
/plane: <PlaneBoard> shows approved points from pf_guestbook as dots on a 2D plane (hover = message), click on empty space opens a small form (name optional, message <=140) that saves normalized x,y (0..1). Show "awaiting approval" after submit. The owner's own point is Signal colored.
/contact: form + email + links. Error + success states, accessible.
Also add src/app/api/keepalive/route.ts (GET, requires Authorization: Bearer CRON_SECRET, does a cheap select on pf_guestbook) and vercel.json with a daily cron calling it.
Done when: works end-to-end locally, fails soft with no keys, no secret ever reaches the client bundle (grep the build output for SERVICE_ROLE).
Closing rule: lint, build, tick PROGRESS.
```

## P10 — PostHog · **MODE: ACT**

```
Read docs/02 (Security & privacy). Check the current posthog-js docs for Next.js App Router before coding.
Create a client provider that initialises posthog-js only if NEXT_PUBLIC_POSTHOG_KEY exists: api_host from env, privacy-friendly defaults (no session replay, memory/cookieless persistence per current docs, no autocapture of text inputs), register super-property site="portfolio", capture $pageview on route changes (App Router), and a helper track(event, props).
Add events: theme_toggled, view_switched, timeline_filter, project_opened, command_palette_opened, terminal_opened, guestbook_submitted, contact_submitted, globe_region_selected, lab_demo_used. Add a tiny consent-free /privacy page explaining what is measured.
Done when: events appear in PostHog with site=portfolio; nothing breaks without a key.
Closing rule: lint, build, tick PROGRESS.
```

## P11 — Command palette, terminal, easter eggs · **MODE: PLAN → ACT**

```
Read docs/03 (Interaction patterns) and docs/04 (ideas 8, 9).
Build <CommandPalette> with cmdk (⌘K / Ctrl-K; "/" also opens): navigate to any route/project/note, switch theme, toggle measure mode, open terminal, copy email.
Build <Terminal> (overlay, opened with "~"): commands help, about, ls work, open <slug>, timeline, atlas, theme light|dark, contact, clear, sudo hire me (friendly easter egg). Monospace, Plate styling, history with arrow keys, focus-trapped, Esc closes, fully keyboard accessible, aria-live output.
Build "measure mode" (key "d"): overlays the 32px grid, shows coordinates of hovered elements.
Keyboard map "g then h/w/t/a" for navigation. Make sure none of these fire while typing in inputs.
Closing rule: lint, build, tick PROGRESS.
```

## P12 — SEO, OG images, sitemap · **MODE: ACT**

```
Read docs/02 and src/config/site.ts.
Add: per-route generateMetadata (title template "%s — Name", description, canonical), src/app/sitemap.ts, src/app/robots.ts, JSON-LD Person on home, a dynamic OG image via next/og (src/app/opengraph-image.tsx and per-project) with the coordinate motif (grid, Signal dot, name, page title) using local font data, favicon from the Origin mark (src/app/icon.tsx), an RSS feed for Notes if it exists.
Done when: social-preview validators render correctly and Lighthouse SEO is 100.
Closing rule: lint, build, tick PROGRESS.
```

## P13 — Lab demos · **MODE: PLAN → ACT**

```
Read docs/04 (/lab, idea 13). Build /lab with a card grid and one route per demo (/lab/gbm, /lab/dca, /lab/collatz, /lab/graph). Pure math functions in src/lib/viz/*, unit-testable.
1) GBM simulator: sliders for drift and volatility, N paths, percentile band, "reseed". 2) DCA vs lump-sum: inputs for amount/horizon/return, SVG chart + text result. 3) Collatz explorer: enter n, plot the trajectory, show steps and peak. 4) Graph shortest path: click to add nodes/edges, run Dijkstra step by step.
Each demo: explains the idea in 3 sentences (with KaTeX where useful), has a text alternative for results, honours reduced-motion, fires lab_demo_used.
Start with 1 and 3, then ask me before continuing.
Closing rule: lint, build, tick PROGRESS.
```

## P14 — Notes (MDX + KaTeX) · **MODE: ACT**

```
Build /notes (list with reading time, tags) and /notes/[slug] using MDX in content/notes/*.mdx (frontmatter: title, date, tags, summary, draft). remark-math + rehype-katex (import katex css), code highlighting with rehype-pretty-code, heading anchors, sticky TOC. Hide drafts in production. Create 2 clearly-marked DRAFT starter notes with titles only (e.g. "Why 0.999… = 1", "What I'd redo in Pulse") — do not write fake personal claims.
Closing rule: lint, build, tick PROGRESS.
```

## P15 — Accessibility, performance, mobile · **MODE: PLAN only → then ACT**

```
PLAN only first: audit every route for (1) keyboard flow and focus order, (2) contrast against the tokens, (3) reduced-motion behaviour, (4) mobile layout at 360/390/768 px, (5) bundle size and LCP (run `pnpm build`, read the route table), (6) missing alt/aria/landmarks. Output a prioritised list (P0/P1/P2) with exact files.
Then wait for my approval and ACT on P0 and P1 items only. Re-run the build and report the before/after route sizes.
Closing rule: lint, build, tick PROGRESS.
```

## P16 — Deploy & hardening · **MODE: PLAN → ACT**

```
Read docs/02 (Security, Launch checklist).
Add security headers in next.config (CSP allowing only self + PostHog + Turnstile + Supabase + Vercel; X-Content-Type-Options, Referrer-Policy, Permissions-Policy, frame-ancestors none), a custom 404 ("No point at these coordinates."), error boundary, and a script `pnpm check:placeholders` that fails if any content with placeholder:true is in production build.
Then give me, as a checklist in docs/DEPLOY.md, the manual steps for Vercel env vars, Cloudflare DNS (DNS-only records), Email Routing, Turnstile hostnames, and the keep-alive cron verification.
Closing rule: lint, build, tick PROGRESS.
```

## P17 — (optional) Private HQ · **MODE: PLAN → ACT**

```
Build /hq: Supabase Auth (magic link or GitHub OAuth) restricted to my email (allow-list env HQ_ALLOWED_EMAIL; middleware/proxy per the current Next.js docs), noindex. Write supabase/migrations/0002_hq.sql: pf_applications (university, programme, region UK|US|CA|FR|SG, deadline, status, requirements jsonb, notes), pf_essays (application_id, title, status, word_count, updated_at) with RLS: owner-only via auth.uid() and my user id. UI: table + Kanban by status, deadline countdowns in mono, requirement checklists, filters by region. Show me the SQL first (PLAN), apply only after approval.
Closing rule: lint, build, tick PROGRESS.
```

## P18 — (optional) i18n EN/FR/DE · **MODE: PLAN only → then ACT**

```
PLAN only: propose how to add EN/FR/DE with next-intl (or the current recommended App Router approach), URL structure, where translations live, how content files (timeline, projects, notes) get localized, and the SEO hreflang plan. Estimate the work per page. Wait for my approval before any edit; then ACT in small steps starting with the shell + Home.
Closing rule: lint, build, tick PROGRESS.
```

---

## Recovery prompts

**Cline went off-plan** · *MODE: PLAN* — "Stop. List every file you changed in this task and why. Compare with the prompt's 'Done when'. Propose the smallest set of reverts/fixes."
**Build error you can't read** · *MODE: ACT* — "Run `pnpm build`, show me the first error only, fix its root cause, re-run. Repeat until green. Don't refactor anything else."
**Design drift** · *MODE: PLAN* — "Audit the last task's files against .clinerules/01-design.md and docs/03. List each violation with file:line, then fix only those."
