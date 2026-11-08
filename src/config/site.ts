// Single source of truth for identity + navigation. Edit the TODOs.
export const site = {
  name: "Your Name", // TODO
  handle: "yourname", // TODO
  tagline: "I like problems that take a long time to solve.",
  description: "Maths, software and markets — built from Luxembourg.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  origin: { label: "Luxembourg", lat: 49.6116, lon: 6.1319, timeZone: "Europe/Luxembourg" },
  email: "hello@yourdomain.com", // TODO: Cloudflare Email Routing address
  links: {
    github: "", // TODO
    linkedin: "", // TODO
  },
  nav: [
    { href: "/work", label: "Work" },
    { href: "/timeline", label: "Timeline" },
    { href: "/studies", label: "Studies" },
    { href: "/lab", label: "Lab" },
    { href: "/atlas", label: "Atlas" },
    { href: "/notes", label: "Notes" },
    { href: "/contact", label: "Contact" },
  ],
} as const;
