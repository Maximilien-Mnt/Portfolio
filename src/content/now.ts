// ═════════════════════════════════════════════════════════════════════════════
// now.ts — placeholder (placeholder: true). Update monthly.
// ═════════════════════════════════════════════════════════════════════════════

import { z } from "zod";
import { NowItem } from "./schema";

export const now = z.array(NowItem).parse([
  {
    id: "now-1",
    label: "Pulse",
    detail: "Shipping the MVP: authentication, feed, chat, moderation.",
    updated: "2026-11-09",
    placeholder: true,
  },
  {
    id: "now-2",
    label: "Work permits",
    detail: "US / UK student visa options — counsellor on call, dot the i's.",
    updated: "2026-11-09",
    placeholder: true,
  },
  {
    id: "now-3",
    label: "Ecology Committee website",
    detail: "15 members, EN/DE/FR, hand-coded. Shipping by end of term.",
    updated: "2026-11-09",
    placeholder: true,
  },
  {
    id: "now-4",
    label: "Applications",
    detail: "UK, USA, Canada, France, Singapore — essays typed, no marks yet.",
    updated: "2026-11-09",
    placeholder: true,
  },
  {
    id: "now-5",
    label: "Reading",
    detail: "Three books, a treat on the shelf and not a single page opened.",
    updated: "2026-11-09",
    placeholder: true,
  },
]);

export type { NowItem };
