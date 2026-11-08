# PROGRESS (Cline: update this file after every task)

- [x] Kit copied, project scaffolded
- [x] P0  Audit + repo check
- [ ] P1  Design tokens + primitives
- [ ] P2  App shell (header, footer, rulers, cursor point, theme)
- [ ] P3  Hero field (canvas random walk, ticker, live Luxembourg time)
- [ ] P4  Content layer + /work + case-study template
- [ ] P5  Timeline f(t) (curve + ledger)
- [ ] P6  Studies + skills graph
- [ ] P7  About: Claims & Proofs + Endurance + /now
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
(Cline: one line per non-obvious decision)

## Known issues
- Project bootstrapped manually; `pnpm install` and `pnpm build` need Node LTS + corepack enabled
- `src/content/*` contains `placeholder: true` data — replace with verified facts per `docs/01` evidence checklist
- Google Fonts (Fraunces/Instrument Sans/Martian Mono) may require CDN access; offline fallback needed
- Signature viz components (`OriginField`, `CoordCursor`, `TimelineCurve`, `Globe`, `PlaneBoard`) in docs but thin wrappers need `src/lib/viz/` pure math functions
- No `next.config.mjs` with CSP/security headers per `docs/02` stack setup
- ESLint + Prettier configs need alignment with code rules (TypeScript strict, conventional commits)
- Tailwind v4 config tokens must match `src/app/globals.css` CSS variables exactly
- Reduced-motion fallback tested: all canvas/canvas transitions must have static final state
- Cloudflare Turnstile + Supabase RLS need actual account setup (free tier limits: 2 active projects)
- `SUPABASE_SERVICE_ROLE_KEY` and `TURNSTILE_SECRET_KEY` are server-only — never prefix with `NEXT_PUBLIC_`
