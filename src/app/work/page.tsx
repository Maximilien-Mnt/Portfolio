import { Metadata } from "next";
import { Plate } from "@/components/ui/Plate";

export const metadata: Metadata = { title: "Work" };

export default function WorkPage() {
  return (
    <Plate coordinate="§02 · (x 0.00, y 0.00)">
      <h1 className="font-display text-2xl">Work</h1>
      <p className="mt-2 text-fg-2">TODO: build the Work index (Grid / Ledger / Map views) from content/projects.ts.</p>
    </Plate>
  );
}
