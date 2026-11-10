# PROGRESS (Cline: update this file after every task)

- [x] Kit copied, project scaffolded
- [x] P0  Audit + repo check
- [x] P1  Design tokens + primitives
- [x] P2  App shell (header, footer, rulers, cursor point, theme)
- [x] P3  Hero field (canvas random walk, ticker, live Luxembourg time)
- [x] P4  Content layer + /work + case-study template
- [x] P5  Timeline f(t) (curve + ledger)
- [x] P6  Studies + skills graph
- [x] P7  About: Claims & Proofs + Endurance + /now
- [ ] P8  Atlas globe
- [ ] P9  Supabase: guestbook (Plane) + contact
- [ ] P10 PostHog
- [ ] P11 Command palette + terminal + easter eggs
- [ ] P12 SEO, OG images, sitemap, JSON-LD
- [ ] P13 Lab demos
- [ ] P14 Notes (MDX + KaTeX)
- [ ] P15 Accessibility + performance + mobile pass
- [ ] P16 Deploy (Vercel + Cloudflare) + launch checklist
- [ ] P17 (optional) Private HQ applications tracker
- [ ] P18 (optional) i18n EN/FR/DE

## Decisions log

- Added `src/lib/utils.ts` with `cn()` (clsx + tailwind-merge) for class composition
- Fixed `tsconfig.json` paths: `@/*` → `src/*`, removed invalid `next/themes` types entry, fixed `noUncheckedIndexedAccess`
- Added `.eslintrc.cjs` (Next.js was missing an ESLint config)
- Fixed `package.json`: `posthog-js` version `^4.25.0` → `^1.150.0` (v4 doesn't exist on npm)
- Added `next.config.mjs` with webpack `@/` alias for module resolution

## Known issues

- Project bootstrapped manually; `pnpm install` and `pnpm build` need Node LTS + corepack enabled
- `src/content/*` contains `placeholder: true` data — replace with verified facts per `docs/01` evidence checklist
- Google Fonts (Fraunces/Instrument Sans/Martian Mono) may require CDN access; offline fallback needed
- Signature viz components (`CoordCursor`, `TimelineCurve`, `Globe`, `PlaneBoard`) still need `src/lib/viz/` pure math functions
- Hero is a server component; `OriginField` is a client canvas boundary so the headline stays server-rendered (LCP). The `(x, y)` readout lives inside `OriginField` (imperative DOM update) to avoid lifting mouse state into `Hero`. Canvas colors read from CSS vars; pauses via IntersectionObserver; cancels rAF on unmount; reduced motion renders the final frame once.
- No `next.config.mjs` with CSP/security headers per `docs/02` stack setup
- ESLint + Prettier configs need alignment with code rules (TypeScript strict, conventional commits)
- Tailwind v4 config tokens must match `src/app/globals.css` CSS variables exactly
- Reduced-motion fallback tested: all canvas/canvas transitions must have static final state
- Cloudflare Turnstile + Supabase RLS need actual account setup (free tier limits: 2 active projects)
- `SUPABASE_SERVICE_ROLE_KEY` and `TURNSTILE_SECRET_KEY` are server-only — never prefix with `NEXT_PUBLIC_`
- P2 shell: Header/Ticker/CoordCursor are client components (state/effects/events); Footer/Rulers stay server. Theme icon guarded by local mount state (next-themes 0.4.4 has no `mounted` export) to avoid hydration mismatch. `status` segment rendered literally ("online", TODO) deferred to P11/P14. Rulers gated via CSS media queries (pointer: coarse / reduced-motion / narrow).
