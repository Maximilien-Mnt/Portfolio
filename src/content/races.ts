// ═════════════════════════════════════════════════════════════════════════════
// races.ts — placeholder (placeholder: true). Rewrite with verified facts.
// date: YYYY-MM-DD | time: "H:MM:SS" | kind: 50m/100m/200m/400m/800m/1500m/5k/10k/half/ultra
// ═════════════════════════════════════════════════════════════════════════════

import { Race } from "./schema";

export const races = Race.parse([
  {
    id: "race-1",
    name: "Charly 50",
    distance: 50,
    date: "2025-04-12",
    time: "41:22",
    kind: "50m",
    place: "Charly, FR",
    placeholder: true,
  },
  {
    id: "race-2",
    name: "Luxembourg City Half Marathon",
    distance: 21.0975,
    date: "2025-10-19",
    time: "01:28:44",
    kind: "half",
    place: "Luxembourg",
    placeholder: true,
  },
  {
    id: "race-3",
    name: "Zotmühle 100k",
    distance: 100,
    date: "2026-06-21",
    time: "11:42:18",
    kind: "ultra",
    place: "Reymeröd, DE",
    placeholder: true,
  },
]);

export type { Race };
