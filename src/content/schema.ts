import { z } from "zod";

export const TRACKS = ["maths", "code", "markets", "endurance", "school"] as const;
export const TrackId = z.enum(TRACKS);
export type TrackId = z.infer<typeof TrackId>;

/** Track → CSS color token (dots and lines only, always paired with a text label). */
export const TRACK_COLOR: Record<TrackId, string> = {
  maths: "var(--azure)",
  code: "var(--signal)",
  markets: "var(--gold)",
  endurance: "var(--moss)",
  school: "var(--fg-2)",
};

export const TimelineEvent = z.object({
  id: z.string(),
  date: z.string().regex(/^\d{4}(-\d{2}){0,2}$/, "use YYYY, YYYY-MM or YYYY-MM-DD"),
  title: z.string().min(1),
  summary: z.string().max(280),
  track: TrackId,
  weight: z.number().min(1).max(5).default(2), // drives the curve height
  href: z.string().optional(), // link to the proof
  placeholder: z.boolean().default(false), // true = guess, replace with a verified fact
});
export type TimelineEvent = z.infer<typeof TimelineEvent>;

export const Project = z.object({
  slug: z.string().regex(/^[a-z0-9-]+$/),
  title: z.string(),
  tagline: z.string().max(120),
  type: z.enum(["app", "website", "paper", "experience", "concept"]),
  status: z.enum(["live", "in-progress", "concept", "archived"]),
  year: z.number().int(),
  stack: z.array(z.string()).default([]),
  tracks: z.array(TrackId).default([]),
  featured: z.boolean().default(false),
  links: z.array(z.object({ label: z.string(), href: z.string() })).default([]),
  placeholder: z.boolean().default(false),
});
export type Project = z.infer<typeof Project>;

/** ─── Study / academic content ──────────────────────────────────────────── */

export const Subject = z.object({
  id: z.string(),
  name: z.string(),
  language: z.enum(["EN", "DE", "FR"]),
  level: z.string().max(120),
  grade: z.number().min(1).max(6).nullable().optional(),
  showGrade: z.boolean().default(false),
  placeholder: z.boolean().default(false),
});
export type Subject = z.infer<typeof Subject>;

export const Competition = z.object({
  id: z.string(),
  name: z.string(),
  level: z.string().max(120), // e.g. "Kangourou des Mathématiques (90%+)"
  period: z.string().max(120), // e.g. "March 2025"
  result: z.string().max(120).optional(),
  placeholder: z.boolean().default(false),
});
export type Competition = z.infer<typeof Competition>;

/** ─── Skills constellation ────────────────────────────────────────────────── */

export const Skill = z.object({
  id: z.string(),
  name: z.string(),
  category: z.enum(["code", "maths", "markets", "endurance", "communication", "culture"]),
  level: z.number().min(1).max(5),
  projects: z.array(z.string()).default([]),
  placeholder: z.boolean().default(false),
});
export type Skill = z.infer<typeof Skill>;

/** ─── Reading list ───────────────────────────────────────────────────────── */

export const Book = z.object({
  id: z.string(),
  title: z.string(),
  author: z.string(),
  year: z.number().int().optional(),
  note: z.string().max(120).optional(),
  placeholder: z.boolean().default(false),
});
export type Book = z.infer<typeof Book>;

/** ─── Endurance / races ──────────────────────────────────────────────────── */

export const Race = z.object({
  id: z.string(),
  name: z.string().optional(),
  distanceKm: z.number(), // km
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  time: z.string().max(120).optional(), // e.g. "4:12:33"
  kind: z.enum(["50m", "100m", "200m", "400m", "800m", "1500m", "5k", "10k", "half", "ultra"]).optional(),
  averageSpeedKmh: z.number().optional(),
  place: z.string().max(120).optional(),
  placeholder: z.boolean().default(false),
});
export type Race = z.infer<typeof Race>;

/** ─── Now / current focus ────────────────────────────────────────────────── */

export const NowItem = z.object({
  id: z.string(),
  label: z.string().max(120),
  detail: z.string().max(280),
  updated: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  placeholder: z.boolean().default(false),
});
export type NowItem = z.infer<typeof NowItem>;
