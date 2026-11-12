import type { SVGProps } from "react";
import { site } from "@/config/site";

export const revalidate = 3600;

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const title = searchParams.get("title") ?? "Page";
  const description = searchParams.get("description") ?? "";
  const name = searchParams.get("name") ?? site.name;
  const coords = searchParams.get("coords") ?? "§00 · (x 0.00, y 0.00)";
  const track = (searchParams.get("track") as "azure" | "gold" | "moss" | "signal") ?? "signal";

  const svg = `
    <svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
      <rect width="1200" height="630" fill="#f3f0e8"/>
      <circle cx="600" cy="315" r="8" fill="#E8402A" opacity="0.9"/>
      <text x="100" y="100"
        font-family="Fraunces, ui-serif, Georgia, serif"
        font-size="64" font-weight="600" fill="#E8402A"
        className="uppercase tracking-wider">
        {name}
      </text>
      <text x="100" y="180"
        font-family="Martian Mono, ui-monospace, SFMono-Regular, Menlo, monospace"
        font-size="28" fill="#4A5468"
        className="uppercase tracking-widest">
        {title}
      </text>
      <text x="100" y="580"
        font-family="Martian Mono, ui-monospace, SFMono-Regular, Menlo, monospace"
        font-size="14" fill="#7A8396" opacity="0.7">
        {coords}
      </text>
      <line x1="100" y1="110" x2="200" y2="110"
        stroke="#E8402A" stroke-width="1" opacity="0.3"/>
    </svg>
  `;

  return new Response(svg, {
    headers: {
      "Content-Type": "image/svg+xml",
      "Cache-Control": "s-maxage=3600, stale-while-revalidate",
    },
  });
}