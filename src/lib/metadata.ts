import { type Metadata } from "next";
import { site } from "@/config/site";

/**
 * Generate per-page Metadata using the "%s — Name" title template.
 *
 * @param title - The page-specific title (will be formatted as "%s — Name")
 * @param description - Optional page description; falls back to site default
 * @param opts - Optional overrides
 *   - opts.canonical - Custom canonical URL; defaults to site.url + pathname
 */
export function generateMetadata(
  title: string,
  description?: string,
  opts?: { canonical?: string }
): Metadata {
  const canonical = opts?.canonical ?? `${site.url}${opts?.pathname ?? ""}`;

  return {
    title: `${title} — ${site.name}`,
    description: description ?? site.description,
    // Ensure canonical uses the same protocol as site.url to avoid mixed-content
    // problems when site.url is http://localhost:3000 vs https://example.com.
    ...(canonical && { canonical }),
  };
}