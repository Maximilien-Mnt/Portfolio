# 04 — Site structure & features

## Sitemap
| Route | Purpose | Key content / interaction | Data |
|---|---|---|---|
| `/` | First 60 seconds | Ticker, hero + OriginField, 3 proof chips, Claims & Proofs teaser, featured work (3), timeline teaser, Atlas teaser, Now, contact CTA | content |
| `/work` | Projects index | Views: Grid · Ledger · Map-of-skills; filter by type/stack | `projects.ts` |
| `/work/[slug]` | Case study "paper" | Abstract → … → Q.E.D.; screenshots; links | MDX + `projects.ts` |
| `/timeline` | The fixed requirement | **f(t)** curve view + Ledger view; track filters; tangent on hover; scroll-scrub; optional Candles view | `timeline.ts` |
| `/studies` | Academics | EB subjects, languages, competitions, favourite maths areas, books; "transcript" plate | `studies.ts` |
| `/about` | Who | Bio (3 lengths), Claims & Proofs, Endurance strip, photo | content |
| `/lab` | Play | Random-walk/GBM simulator, compound-interest/DCA, Collatz/prime spiral, graph shortest-path | client components |
| `/notes`, `/notes/[slug]` | Writing | Short maths/finance/CS notes with KaTeX; reading list | MDX |
| `/atlas` | Where next | Globe, great-circle arcs, region cards (UK/US/CA/FR/SG), visitor-country arc | `atlas.ts` |
| `/plane` | Guestbook | Click to plot a point + 140-char message (moderated) | Supabase |
| `/now` | Current focus | 5 bullets, updated monthly, "last updated" | content |
| `/contact` | Reach you | Form (Turnstile) + email + links | Supabase/Resend |
| `/colophon` | Meta | Stack, design decisions, live stats | PostHog |
| `/privacy` | GDPR | Plain-language note | static |
| `/hq` | Private | Applications tracker (auth) | Supabase |

## Home — section order
1. **Ticker** (origin · local time · status) 2. **Hero** 3. **Proof chips** 4. **Claims & Proofs** 5. **Featured work** 6. **Timeline teaser** (mini curve) 7. **Atlas teaser** (small globe) 8. **Now** 9. **Contact CTA** 10. **Footer** (`Built from (0, 0)`).

## Data model (typed, zod-validated — `src/content/schema.ts`)
`Project` · `TimelineEvent` (done in the kit) · `Subject` · `Competition` · `Skill` · `Book` · `Race` (date, distance, time, kind) · `Note` · `Region` / `University` (public flag, status) · `NowItem`.

## Feature ideas, ranked (pick as you go)
**Signature (do first)**
1. Cursor point with live coordinates; grid snapping on plates.
2. Hero random walk (geometric-Brownian-motion style), click = reseed, drifts toward cursor.
3. Timeline as a curve; hover shows tangent ("growth rate") ; Candles toggle (finance wink).
4. Claims & Proofs on About/Home.
5. Atlas globe with arcs from Luxembourg; arc from the **visitor's country** (country-level only, via Vercel geo header, never stored).
**Playful**
6. Endurance elevation-profile chart: each race is a peak (distance/time), aggregated only.
7. Skills constellation: force graph linking skills ↔ projects.
8. Terminal (`~`) and ⌘K palette; `sudo hire me` easter egg.
9. Measure mode (`d`) overlays grid + coordinates (nerd mode).
10. The Plane guestbook — visitors plot points; yours is the Signal one.
11. Live status: "Local time 14:32 · likely asleep / replying tomorrow".
12. Per-page generated OG images with the coordinate motif.
**Substance**
13. Lab: GBM simulator (drift/vol sliders), DCA vs lump-sum, Collatz explorer, graph shortest path.
14. Notes with KaTeX: "Why 0.999… = 1", "Birthday paradox", "Kelly criterion", "Pulse: what I'd redo".
15. Reading list with one-line takeaways.
16. Colophon with live PostHog stats ("visitors this month", countries).
17. Private HQ: applications tracker (deadlines countdown, requirements checklist, essay status) — useful for you, invisible to others.

## Roadmap
- **v0.1 launch-ready**: shell, Home, Work (+3 case studies), Timeline, Studies, About, Contact, SEO, privacy.
- **v0.2**: Atlas, Lab (2 demos), Notes, Plane, PostHog events.
- **v0.3**: Terminal/palette/easter eggs, OG images, Colophon stats, more Lab, i18n, HQ.
