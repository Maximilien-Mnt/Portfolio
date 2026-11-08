import { Metadata } from "next";
import { Plate } from "@/components/ui/Plate";

export const metadata: Metadata = { title: "Colophon" };

export default function ColophonPage() {
  return (
    <Plate coordinate="§12 · (x 0.00, y 0.00)">
      <h1 className="font-display text-2xl">Colophon</h1>
      <p className="mt-2 text-fg-2">TODO: build the Colophon page (stack, design decisions, PostHog stats).</p>
    </Plate>
  );
}
