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
