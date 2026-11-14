import { Plate } from "@/components/ui/Plate";
import Link from "next/link";

export const metadata = {
  title: "Atlas",
  description: "Where next? Globe of destinations from Luxembourg.",
};

export default async function AtlasPage() {
  return (
    <Plate coordinate="§08 · (x 0.00, y 0.00)">
      <h1 className="font-display text-2xl">Atlas</h1>
      <p className="mt-2 text-fg-2">
        Great-circle arcs from Luxembourg to each destination.
      </p>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-4 mt-6">
        {["UK", "US", "CA", "FR", "SG"].map((key) => {
          return (
            <Link
              key={key}
              href={`/atlas?country=${key}`}
              className="flex flex-col items-center py-4 px-3 text-sm border border-line hover:bg-bg-2 transition-colors duration-120 ease-snap"
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
            </Link>
          );
        })}
      </div>
    </Plate>
  );
}