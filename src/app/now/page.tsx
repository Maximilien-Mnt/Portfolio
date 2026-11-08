import { Metadata } from "next";
import { Plate } from "@/components/ui/Plate";

export const metadata: Metadata = { title: "Now" };

export default function NowPage() {
  return (
    <Plate coordinate="§10 · (x 0.00, y 0.00)">
      <h1 className="font-display text-2xl">Now</h1>
      <p className="mt-2 text-fg-2">TODO: build the Current focus page (5 bullets, last updated monthly).</p>
    </Plate>
  );
}
