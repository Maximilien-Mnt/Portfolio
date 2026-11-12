import { type MetadataRoute } from "next";
import { getProjects } from "@/lib/content";
import { site } from "@/config/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "",
    "/about",
    "/timeline",
    "/work",
    "/lab",
    "/notes",
    "/atlas",
    "/studies",
    "/now",
  ] as const;

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

  return [
    ...routes.map((route) => ({
      url: `${baseUrl}${route}`,
      lastmod: new Date().toISOString().split("T")[0],
      changefreq: route.startsWith("/work") ? "weekly" : "monthly",
      priority: route.startsWith("/work") ? 0.7 : 0.5,
    })),
    ...getProjects()
      .filter((p) => !p.placeholder)
      .map((p) => ({
        url: `${baseUrl}/work/${p.slug}`,
        lastmod: p.updated ?? new Date().toISOString().split("T")[0],
        changefreq: "monthly",
        priority: 0.7,
      })),
  ];
}