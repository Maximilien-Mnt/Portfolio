# ORIGIN — project rules (read every task)

**What**: personal portfolio of a student applying to Maths / CS / Management / Finance bachelors (USA, Canada, France, Singapore, UK). Concept: a coordinate plane whose origin is Luxembourg. See `docs/`.
**Stack**: Next.js (App Router) + TypeScript (strict) + Tailwind CSS v4 + Motion (`motion/react`) + Supabase + PostHog + Vercel. Package manager: **pnpm**.

## Workflow (important — small context models)
1. Do ONE task per request. Read only the files the task names.
2. Before coding: read `docs/PROGRESS.md`, `.clinerules/*`, and the doc sections the prompt cites.
3. After coding: run `pnpm lint` and `pnpm build`; fix errors; tick `docs/PROGRESS.md`; add one line to its decisions log if you made a non-obvious choice.
4. Plan mode = propose files + steps, no edits. Act mode = implement exactly the approved plan, nothing extra.
5. Check current docs of a library before using an API you are unsure of (Next.js, Tailwind v4, Motion, Supabase SSR, PostHog). Do not guess APIs.

## Hard rules
- NEVER invent facts about the owner (grades, dates, awards, quotes). Use `placeholder: true` data and visible TODO markers.
- Content lives in `src/content/*` (typed, validated with zod). No hard-coded copy in components when it belongs in content.
- Secrets: only `NEXT_PUBLIC_*` may reach the client. `SUPABASE_SERVICE_ROLE_KEY` and `TURNSTILE_SECRET_KEY` are server-only.
- The site must fully work with NO env keys (Supabase/PostHog features fail soft and hide themselves).
- No new dependency without a one-line justification in the decisions log.
- Public pages never show: address, phone, birth date, ID numbers, GPS routes, photos of other minors.
