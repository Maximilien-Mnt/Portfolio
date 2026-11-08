import { Metadata } from "next";
import { Plate } from "@/components/ui/Plate";

export const metadata: Metadata = { title: "About" };

export default function AboutPage() {
  return (
    <Plate coordinate="§05 · (x 0.00, y 0.00)">
      <h1 className="font-display text-2xl">About</h1>
      <p className="mt-2 text-fg-2">TODO: build the Who page (bio, Claims & Proofs, Endurance strip, photo).</p>
    </Plate>
  );
}
