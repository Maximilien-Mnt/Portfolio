import { Plate } from "@/components/ui/Plate";
import { generateMetadata } from "@/lib/metadata";

export const metadata = generateMetadata("Lab");

export default function LabPage() {
  return (
    <Plate coordinate="§06 · (x 0.00, y 0.00)">
      <h1 className="font-display text-2xl">Lab</h1>
      <p className="mt-2 text-fg-2">TODO: build the Play page (client demos: random walk, DCA, Collatz, shortest path).</p>
    </Plate>
  );
}