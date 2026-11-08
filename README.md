# ORIGIN — personal portfolio kit

A "more-than-a-portfolio" site built on one idea: **a coordinate plane whose origin is Luxembourg (49.6116°N, 6.1319°E).**
Your timeline is a function f(t). Every claim comes with a proof. There is a Lab, a guestbook that plots points on a shared plane, a globe of destinations, a terminal, and a private HQ for your applications.

## Start (≈ 30 min)
1. In a terminal (macOS / Linux / WSL / Git Bash): `chmod +x bootstrap.sh && ./bootstrap.sh`
   → creates `../origin-site` (Next.js), copies this kit on top, installs every dependency.
2. Open `origin-site` in your IDE, install the **Cline** extension, pick a model.
3. `cp .env.example .env.local` (the site runs with zero keys; fill them as you reach each prompt).
4. `pnpm dev` → http://localhost:3000
5. In parallel, do the account steps in `docs/02-stack-setup.md` (Vercel, Supabase, PostHog, Cloudflare).
6. Paste the prompts of `docs/05-cline-prompts.md` **one at a time, in order**, each in a NEW Cline task.

## Read order
`docs/01` strategy & content → `docs/03` design system → `docs/04` structure & features → `docs/02` stack & setup → `docs/05` Cline prompts.
Open `design/style-tile.html` in a browser to see the look and feel (click the hero, toggle the theme).

## What is in the kit
```
.clinerules/          rules Cline reads automatically (project, design, code)
docs/                 01 strategy · 02 setup · 03 design system · 04 structure · 05 prompts · PROGRESS
design/style-tile.html  live style tile (palette, type, components, hero field)
supabase/migrations/  SQL for guestbook + contact messages (RLS on)
src/                  overlay: tokens (globals.css), fonts, layout, home skeleton, site config,
                      typed content (timeline, projects), logo
bootstrap.sh          scaffold + copy + install
.env.example          every environment variable, explained
```
Everything marked `placeholder` / `TODO` in `src/content` is a guess — replace it with your real facts.
