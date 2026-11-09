// ═════════════════════════════════════════════════════════════════════════════
// studies.ts — placeholder (placeholder: true). Rewrite in your own words.
// See docs/01 evidence checklist before publishing.
// ═════════════════════════════════════════════════════════════════════════════

import { Subject } from "./schema";

export const studies = Subject.parse([
  {
    id: "french",
    name: "French",
    language: "FR",
    level: "Avancé — oral, compréhension, production écrite. Baccalauréat optionnelle.",
    grade: 4,
    placeholder: true,
  },
  {
    id: "english",
    name: "English",
    language: "EN",
    level: "C1 — Cambridge-style essays, academic presentations.",
    grade: 5,
    placeholder: true,
  },
  {
    id: "maths",
    name: "Mathematics",
    language: "EN",
    level: "Analysis & Structures · Probability & Statistics",
    grade: 3,
    placeholder: true,
  },
  {
    id: "physics",
    name: "Physics",
    language: "EN",
    level: "Mechanics, thermodynamics, waves — problem solving.",
    placeholder: true,
  },
  {
    id: "economics",
    name: "Economics",
    language: "EN",
    level: "Micro · Macro · International trade — introductory.",
    placeholder: true,
  },
]);

export type { Subject };
