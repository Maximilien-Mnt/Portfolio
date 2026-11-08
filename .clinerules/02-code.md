# Code rules

- TypeScript strict, no `any`. Server Components by default; add `"use client"` only for state/effects/canvas/events.
- File layout: `src/app/*` routes · `src/components/{ui,brand,sections,viz}/*` · `src/content/*` data · `src/lib/*` helpers · `src/hooks/*`.
- Components: named exports, PascalCase files, props typed with an interface, no default props magic.
- Styling: Tailwind utilities + tokens. Shared patterns become components (`Plate`, `Label`, `Button`, `Tag`, `Claim`).
- Canvas/SVG viz: pure functions for math (`src/lib/viz/*`), a thin React wrapper, resize + DPR aware, cancel rAF on unmount, pause when off-screen (IntersectionObserver).
- Data fetching: static by default. Dynamic only for guestbook + contact + keep-alive.
- Forms: server actions + zod validation + honeypot + Turnstile token check server-side.
- Accessibility: semantic landmarks, one `h1` per page, alt text, `aria-label` on icon buttons, SVG charts get `role="img"` + title/desc + a text/table alternative.
- Commit style: Conventional Commits (`feat:`, `fix:`, `chore:`), one task = one commit.
