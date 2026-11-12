// ═════════════════════════════════════════════════════════════════════════════
// skills.ts — placeholder (placeholder: true). Rewrite with real levels.
// Category: code · maths · markets · endurance · communication · culture
// ═════════════════════════════════════════════════════════════════════════════

import { z } from "zod";
import { Skill } from "./schema";

export const skills = z.array(Skill).parse([
  {
    id: "react-native",
    name: "React / React Native",
    category: "code",
    level: 4,
    projects: ["pulse", "ecomm-website"],
    placeholder: true,
  },
  {
    id: "expo",
    name: "Expo / EAS",
    category: "code",
    level: 3,
    projects: ["pulse"],
    placeholder: true,
  },
  {
    id: "supabase",
    name: "Supabase (Postgres + RLS + Auth)",
    category: "code",
    level: 4,
    projects: ["pulse", "ecomm-website"],
    placeholder: true,
  },
  {
    id: "typescript",
    name: "TypeScript (strict, no any)",
    category: "code",
    level: 5,
    projects: ["origin"],
    placeholder: true,
  },
  {
    id: "posthog",
    name: "PostHog (product analytics)",
    category: "code",
    level: 4,
    projects: ["pulse", "origin"],
    placeholder: true,
  },
  {
    id: "calculus",
    name: "Multivariable calculus · differential equations",
    category: "maths",
    level: 4,
    projects: ["business-plan"],
    placeholder: true,
  },
  {
    id: "probability",
    name: "Probability & statistics",
    category: "maths",
    level: 5,
    projects: ["business-plan"],
    placeholder: true,
  },
  {
    id: "finance",
    name: "Financial modelling · DCF · sensitivity",
    category: "markets",
    level: 4,
    projects: ["business-plan"],
    placeholder: true,
  },
  {
    id: "lower-prices",
    name: "Long-distance running (ultra trails)",
    category: "endurance",
    level: 4,
    projects: [],
    placeholder: true,
  },
  {
    id: "writing",
    name: "Technical writing · essay craft",
    category: "communication",
    level: 4,
    projects: ["pulse", "origin"],
    placeholder: true,
  },
  {
    id: "science",
    name: "Science history · philosophy of science",
    category: "culture",
    level: 3,
    projects: [],
    placeholder: true,
  },
]);

export type { Skill };
