# 01 — Strategy & content

## Positioning (chosen for you — change freely)

**"I like problems that take a long time to solve."**
The thread through everything you do: a maths turnaround built over two years, nearly 20 marathons and several ultras, a ~12,000-word business plan that became a full-stack app (Pulse), years of self-taught code. *Long-distance thinking.* It is specific, true, memorable, and it fits Maths, CS, Management and Finance equally.
Alternates: "Maths, software and markets — measured from Luxembourg." · "Building slowly, on purpose."

## Audience (in order)

1. Admissions readers, professors, interviewers, alumni (UK / US / CA / FR / SG) — need credibility in 60 seconds and evidence behind every claim.
2. Programme, competition and internship organisers.
3. Peers, collaborators, and future-you.

Reality check: many admissions offices will not browse a personal site. Use it where it is welcome (optional portfolio / additional-info fields, interviews, CV and email signature) and never let it replace the application. Put nothing on it you would not say out loud in an interview.

## Assumptions (change any of them)

| # | Assumption |
|---|---|
| 1 | Your name is unknown to me → `Your Name` placeholder in `src/config/site.ts`. |
| 2 | Final year at the European School Luxembourg II, European Baccalaureate in 2027, entry September 2027. |
| 3 | Budget €0 (free tiers) except an optional domain (~€10/yr). Start on `*.vercel.app`. |
| 4 | You build with Cline, probably a free model → tasks are small and self-contained. |
| 5 | Language: English first. FR/DE added later (prompt P18). |
| 6 | Public by default; a private `/hq` area for your applications comes last. |
| 7 | UK (UCAS) is kept as a fifth region next to USA / Canada / France / Singapore — delete it from `atlas` data if irrelevant. |
| 8 | Default theme follows the visitor's system: light "Paper" or dark "Blueprint". |

## What goes on the site

### Core (launch)

- **Hero**: name, the positioning line, three proof chips (e.g. "~20 marathons", "Pulse — full-stack app", "Kangourou ×2"), live Luxembourg time.
- **Claims & Proofs** (About): three claims, each with evidence you can click.
  1. *"I stick with hard things."* → maths went from weakest to favourite subject; marathons and ultras.
  2. *"I build complete things, not demos."* → Pulse (auth, feed, chat, moderation, analytics) and the E-Comm website for the Ecology Committee (15 members, EN/DE/FR).
  3. *"I think in systems and numbers."* → the business plan (financial projections, GDPR, funding strategy), Lab simulations, Kangourou des Mathématiques ×2.
- **Work**: Pulse (flagship case study) · E-Comm website · Business plan (public excerpt PDF) · This site (Origin, meta case study) · News-in-brief (only once it exists; show as *concept* before) · Ilres SA IT internship (2 weeks: infrastructure, GDPR, client/government data) as an experience entry.
- **Timeline** (your one fixed requirement): tracks Maths · Code · Markets · Endurance · School.
- **Studies**: European School + European Baccalaureate subjects and languages, competitions, favourite maths areas (set theory, number theory, logic, discrete maths, graphs, probability & statistics), books that shaped you (How to Prove It, The Lean Startup, The Intelligent Investor, Life 3.0).
- **Contact**: a real address (`hello@yourdomain` via Cloudflare Email Routing) + form with Turnstile.

### "More than a portfolio" (v0.2+)

Lab (interactive maths/finance demos) · Notes (short maths/finance/CS writing with equations) · Atlas (globe of destinations) · Plane (guestbook that plots points) · Now page · Colophon (how it is built, live stats) · Terminal mode · Private HQ (applications tracker).

### Maybe — decide deliberately

Grades / predicted grades (only if strong, on Studies not Hero) · a teacher quote (with permission) · one portrait + three in-context photos · aggregated running stats (distance, count, PBs).

### Never

Home address · phone · exact birth date · ID numbers · GPS routes that start or end at home (use aggregates) · classmates' faces without consent · the UCAS statement text before it is submitted · anything under NDA.

## Emphasis per region (tendencies — always check each programme's current requirements)

| Region | Tends to value | Feature more |
|---|---|---|
| UK (UCAS) | Subject depth, academic curiosity | Notes, favourite maths areas, books, Kangourou, Lab |
| USA | Whole-person story, initiative, leadership, impact | Pulse, E-Comm (leadership), Endurance, Claims & Proofs; a one-page PDF activity sheet |
| Canada | Grades first, sometimes a profile/supplement | Studies with clear numbers, projects |
| France | Academic record, maths level, structured path | Studies (EB subjects), FR version of key pages |
| Singapore | Rigorous academics, competitions, tech | Kangourou, Lab, projects, internship |

## Evidence checklist (your homework)

- [ ] Final name, one good portrait, links (GitHub, LinkedIn)
- [ ] Dates: first code, maths turnaround, each marathon/ultra (date, distance, time), Kangourou years/results, internship dates, Pulse milestones, E-Comm role + dates
- [ ] Permissions: teacher quote, E-Comm committee, Ilres mention
- [ ] Assets: Pulse screenshots + 30 s screen recording, E-Comm screenshots, business-plan PDF excerpt
- [ ] Writing: bio in 3 lengths (50 / 150 / 300 words), 3 case-study drafts (problem → approach → result → what I would do differently), 5 short notes

## Voice

Short sentences. First person. Precise but warm, a little dry. Show, then claim. Maths wit in small doses.

- Hero: "I like problems that take a long time to solve."
- Buttons: *See the proof* · *Plot a message* · *Open the timeline*
- 404: "No point at these coordinates."
- Loading: "Plotting…"
- Footer: "Built from (0, 0) — Luxembourg."
- Case-study ending: "Q.E.D." only where it earns a smile.
