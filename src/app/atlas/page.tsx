import { Plate } from "@/components/ui/Plate";
import { Button } from "@/components/ui/Button";
import { Globe } from "@/components/viz/Globe";

const countryMap: Record<string, string> = {
  "United Kingdom": "UK",
  "United States": "US",
  "Canada": "CA",
  "France": "FR",
  "Singapore": "SG",
};

export const metadata = {
  title: "Atlas",
  description: "Where next? Globe of destinations from Luxembourg.",
};

export default async function AtlasPage() {
  // Read visitor country from Vercel IP country header (server component)
  // In Next.js on Vercel, x-vercel-ip-country is set by the platform
  const { headers } = await import("next/headers");
  const h = headers();
  const vercelCountry = h.get("x-vercel-ip-country");
  // Normalize to our country keys (default to undefined if not recognized)
  const visitorCountry = vercelCountry ? countryMap[vercelCountry] : undefined;

  // Region cards data
  const regionKeys = ["UK", "US", "CA", "FR", "SG"] as const;
  const regionLabels: Record<typeof regionKeys[number], string> = {
    UK: "United Kingdom",
    US: "United States",
    CA: "Canada",
    FR: "France",
    SG: "Singapore",
  };

  return (
    <Plate coordinate="§08 · (x 0.00, y 0.00)">
      <h1 className="font-display text-2xl">Atlas</h1>
      <p className="mt-2 text-fg-2">
        Great-circle arcs from Luxembourg to each destination.
      </p>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-4 mt-6">
        {regionKeys.map((key) => {
          const onClick = () => {
            const params = new URLSearchParams();
            params.set("country", key);
            const href = `/atlas?${params.toString()}`;
            window.history.pushState({}, "", href);
          };

          return (
            <Button
              key={key}
              onClick={onClick}
              className="flex flex-col items-center py-4 px-3 text-sm border border(var(--line)) hover:bg(var(--bg-2))"
            >
              <span className="font-mono text-fg-3 mb-1">{key}</span>
              <span className="text-fg-2">{regionLabels[key]}</span>
            </Button>
          );
        })}
      </div>

      <Globe visitorCountry={visitorCountry} />
    </Plate>
  );
}