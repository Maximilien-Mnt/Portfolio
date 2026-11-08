import { z } from "zod";
import { TimelineEvent } from "./schema";

// ALL dates below are PLACEHOLDERS — replace with verified facts (see docs/01 evidence checklist).
export const timeline = z.array(TimelineEvent).parse([
  { id: "first-code", date: "2022", title: "First line of code", summary: "TODO: what you built first and why.", track: "code", weight: 2, placeholder: true },
  { id: "first-marathon", date: "2021", title: "First marathon", summary: "TODO: date, distance, time.", track: "endurance", weight: 3, placeholder: true },
  { id: "first-ultra", date: "2024", title: "First ultramarathon", summary: "TODO: race, distance, time.", track: "endurance", weight: 3, placeholder: true },
  { id: "maths-turnaround", date: "2024-09", title: "Maths flips from weakest to favourite", summary: "TODO: the moment, the teacher, the method.", track: "maths", weight: 4, placeholder: true },
  { id: "kangourou-1", date: "2025-03", title: "Kangourou des Mathématiques", summary: "TODO: first participation + result.", track: "maths", weight: 2, placeholder: true },
  { id: "ilres", date: "2025-06", title: "Two-week IT internship at Ilres SA", summary: "Infrastructure, GDPR compliance, client and government data work. TODO: dates.", track: "code", weight: 3, placeholder: true },
  { id: "business-plan", date: "2025-11", title: "A ~12,000-word business plan", summary: "Financial projections, GDPR, funding strategy — the seed of Pulse. TODO: date.", track: "markets", weight: 3, placeholder: true },
  { id: "pulse", date: "2026-01", title: "Pulse begins", summary: "Sports-focused social app: feed, chat, auth, moderation. TODO: milestone dates.", track: "code", weight: 4, href: "/work/pulse", placeholder: true },
  { id: "kangourou-2", date: "2026-03", title: "Kangourou des Mathématiques, again", summary: "TODO: second participation + result.", track: "maths", weight: 2, placeholder: true },
  { id: "ecomm", date: "2026-10", title: "Rebuilding the Ecology Committee website", summary: "15 members, EN/DE/FR, hand-coded. TODO: your role.", track: "code", weight: 2, href: "/work/ecomm-website", placeholder: true },
  { id: "applications", date: "2026-10", title: "University applications, 2026/27 cycle", summary: "UK, USA, Canada, France, Singapore.", track: "school", weight: 4, placeholder: true },
  { id: "eb", date: "2027-06", title: "European Baccalaureate (planned)", summary: "TODO: confirm year and subjects.", track: "school", weight: 3, placeholder: true },
]);
