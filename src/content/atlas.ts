import { z } from "zod";

export const University = z.object({
  name: z.string(),
  public: z.boolean(),
  status: z.enum(["exploring", "applying", "submitted", "decided"]),
});



export const Region = z.object({
  label: z.string(),
  capital: z.object({ lat: z.number(), lon: z.number() }),
  whatMatters: z.string().default(""),
  universities: z.array(University).default([]),
});



export const regions = {
  UK: {
    label: "United Kingdom",
    capital: { lat: 51.5074, lon: -0.1278 },
    whatMatters: "World-leading universities and research in mathematics, finance, and the humanities.",
    universities: [
      { name: "University of Oxford", public: true, status: "decided" },
      { name: "University of Cambridge", public: true, status: "decided" },
    ],
  } as z.infer<typeof Region>,
  US: {
    label: "United States",
    capital: { lat: 38.9072, lon: -77.0369 },
    whatMatters: "Top-tier research institutions and innovation hubs across the country.",
    universities: [
      { name: "Harvard University", public: true, status: "decided" },
      { name: "Massachusetts Institute of Technology", public: true, status: "decided" },
    ],
  } as z.infer<typeof Region>,
  CA: {
    label: "Canada",
    capital: { lat: 45.4215, lon: -75.6972 },
    whatMatters: "Strong public university system and research excellence in STEM.",
    universities: [
      { name: "University of Toronto", public: true, status: "decided" },
      { name: "McGill University", public: true, status: "decided" },
    ],
  } as z.infer<typeof Region>,
  FR: {
    label: "France",
    capital: { lat: 48.8566, lon: 2.3522 },
    whatMatters: "Centers of excellence in mathematics, physics, and interdisciplinary research.",
    universities: [
      { name: "Université PSL", public: true, status: "decided" },
      { name: "École Normale Supérieure", public: true, status: "decided" },
    ],
  } as z.infer<typeof Region>,
  SG: {
    label: "Singapore",
    capital: { lat: 1.3521, lon: 103.8198 },
    whatMatters: "Rapidly rising research universities and strategic Asian connections.",
    universities: [
      { name: "National University of Singapore", public: true, status: "decided" },
      { name: "Nanyang Technological University", public: true, status: "decided" },
    ],
  } as z.infer<typeof Region>,
} as Record<string, z.infer<typeof Region>>;

// Type-safe lookup - key must be a valid region key
export function getRegion(key: keyof typeof regions): z.infer<typeof Region> {
  return regions[key]!; // Key is guaranteed by the type parameter
}