import { Plate } from "@/components/ui/Plate";
import { Button } from "@/components/ui/Button";
import { Globe } from "@/components/viz/Globe";

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

  return (
    <Plate coordinate="§08 · (x 0.00, y 0.00)">
      <h1 className="font-display text-2xl">Atlas</h1>
      <p className="mt-2 text-fg-2">
        Great-circle arcs from Luxembourg to each destination.
      </p>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-4 mt-6">
        {["UK", "US", "CA", "FR", "SG"].map((key) => {
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
              <span className="text-fg-2">
                {key === "UK"
                  ? "United Kingdom"
                  : key === "US"
                  ? "United States"
                  : key === "CA"
                  ? "Canada"
                  : key === "FR"
                  ? "France"
                  : "Singapore"}
              </span>
            </Button>
          );
        })}
      </div>
    </Plate>
  );
}