import { Metadata } from "next";
import { Plate } from "@/components/ui/Plate";

export const metadata: Metadata = { title: "Timeline" };

export default function TimelinePage() {
  return (
    <Plate coordinate="§03 · (x 0.00, y 0.00)">
      <h1 className="font-display text-2xl">Timeline</h1>
      <p className="mt-2 text-fg-2">TODO: build the f(t) curve view + Ledger view from content/timeline.ts.</p>
    </Plate>
  );
}
