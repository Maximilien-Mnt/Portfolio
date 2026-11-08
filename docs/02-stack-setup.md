# 02 — Stack & setup

## Stack (chosen for you)
| Layer | Choice | Why |
|---|---|---|
| Framework | **Next.js (App Router) + TypeScript** | You already use it; static-first; first-class on Vercel |
| Styling | **Tailwind CSS v4** + CSS-variable tokens | Fast, themeable (light/dark), tokens live in one file |
| Motion | **Motion** (`motion/react`), Canvas 2D, SVG; **Lenis** smooth scroll (optional) | Signature animations without heavy 3D |
| Dataviz | **d3-geo** (globe), hand-written SVG; d3-force later (skills graph) | Math-flavoured, tiny |
| Content | Typed TS files + **MDX** (`next-mdx-remote`) + **KaTeX** + **zod** | Git is your CMS; equations in notes |
| Backend | **Supabase** | Guestbook, contact messages, private HQ auth |
| Analytics | **PostHog** | Page views, events, optional replays; reuse your account |
| Hosting | **Vercel** (Hobby) | Zero-config Next.js |
| Edge services | **Cloudflare** | DNS, Email Routing (hello@…), Turnstile (anti-bot) |
| Email out | Resend (optional) | Notification when someone writes |
| Tooling | pnpm, ESLint, Prettier, Cline | |

## Architecture
```
Visitor ──► Cloudflare DNS (DNS-only) ──► Vercel (Next.js)
                                           ├─ static pages (content in git: src/content, MDX)
                                           ├─ server actions ──► Turnstile verify ──► Supabase (service role)
                                           ├─ /api/keepalive (daily cron) ──► Supabase ping
                                           └─ PostHog (client, cookieless/consent)
Inbound mail: hello@domain ──► Cloudflare Email Routing ──► your inbox
```
Principle: **the site works with zero services.** Supabase/PostHog features degrade gracefully.

## Your existing accounts — how each is used
| Account | You have | Plan |
|---|---|---|
| **Vercel** | 1 project | Create a NEW project for this repo (keep the old one untouched). |
| **Supabase** | 2 projects | Free plan allows only 2 active projects (verify in your dashboard). Option A (default): run `0001_portfolio_init.sql` in the less critical project — tables are prefixed `pf_`, RLS on. Option B: pause/delete an unused project and create a dedicated `portfolio` one. Free projects pause after inactivity → the keep-alive cron prevents it. |
| **PostHog** | 1 project | Reuse it (free plans may limit projects — verify). Tag all events with a `site: "portfolio"` super-property and filter dashboards on it. |
| **Cloudflare** | 1 project | The site is NOT hosted on Cloudflare. Use the account for DNS, Email Routing, Turnstile. R2 storage may need a card on file — skip it. |

## Setup steps
**0. Prerequisites** — Node LTS, `corepack enable` (pnpm), Git, VS Code (or other IDE) + Cline, a GitHub account.
**1. Bootstrap** — `./bootstrap.sh` (see README). Check `pnpm dev` shows the skeleton home.
**2. GitHub** — create repo `origin-site` (private is fine), `git remote add origin …`, `git push -u origin main`.
**3. Vercel** — Add New → Project → import the repo → Framework "Next.js" → Deploy (no env vars needed yet). You get `https://<name>.vercel.app`. Hobby is for personal, non-commercial use: fine for a portfolio.
**4. Supabase** — SQL Editor → paste `supabase/migrations/0001_portfolio_init.sql` → Run. Settings → API: copy URL, anon/publishable key, service-role/secret key. Keep the service key out of the client and out of git.
**5. PostHog** — copy the project API key; note your region (EU/US) → set `NEXT_PUBLIC_POSTHOG_HOST` accordingly.
**6. Cloudflare**
- Turnstile → Add widget (Managed) → hostnames: your domain, `*.vercel.app` host, `localhost` → copy site key + secret.
- (Optional) Domain: Registrar → buy at cost. DNS → add the exact records Vercel shows (apex A / `www` CNAME) with the proxy **off** (grey cloud, "DNS only").
- Email Routing → enable → `hello@yourdomain` → forward to your inbox (verify it).
**7. Env vars** — `.env.local` locally; the same keys in Vercel → Project → Settings → Environment Variables (Production + Preview). Add `CRON_SECRET` (any long random string).
**8. Cline** — open the project, confirm `.clinerules/` is detected, choose a model (use the strongest you have for design-heavy prompts P3, P5, P8). Run the prompts in `docs/05-cline-prompts.md`.
**9. Launch** — see checklist below, then add the URL to your CV, GitHub profile, LinkedIn, email signature and applications where allowed.

## Environment variables
See `.env.example`. Only `NEXT_PUBLIC_*` reach the browser.

## Security & privacy
- RLS enabled on every table; `pf_messages` has no public policy; all writes via server actions + service role.
- Turnstile token verified server-side; honeypot field; length limits mirrored in SQL; guestbook entries need your approval.
- Security headers (CSP, `X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy`) in `next.config` (prompt P16).
- GDPR: PostHog EU region if possible; cookieless/memory persistence by default, replays OFF; a short `/privacy` page; no third-party trackers; country-level geo only and never stored.
- Never commit `.env.local`. Rotate a key immediately if it leaks.

## Budgets
- Performance (mobile): LCP < 2.0 s, CLS < 0.05, INP < 200 ms, home JS < 150 KB gzip (excluding fonts). Canvas pauses off-screen.
- Accessibility: WCAG 2.2 AA; keyboard-complete; reduced-motion honoured.
- Lighthouse ≥ 95 on Perf/A11y/Best-Practices/SEO before launch.

## Launch checklist
- [ ] Real name, photo, bio, links; placeholders removed (`grep -rn "placeholder" src/content` → 0 results)
- [ ] Every timeline/project fact verified; permissions obtained
- [ ] OG image looks right on LinkedIn/WhatsApp previews; favicon
- [ ] 404 page, `/privacy`, `sitemap.xml`, `robots.txt`
- [ ] Tested on iPhone Safari, Android Chrome, Firefox, desktop Chrome
- [ ] Contact form delivers; Turnstile works in production; Email Routing verified
- [ ] PostHog receives events with `site: portfolio`
- [ ] Keep-alive cron visible in Vercel; Lighthouse ≥ 95

## Maintenance
Monthly: update `/now`, timeline and project status. Per application season: refresh Studies and the Atlas statuses. Quarterly: `pnpm up` + rebuild.
