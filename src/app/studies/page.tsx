import { Metadata } from "next";
import { Plate } from "@/components/ui/Plate";

export const metadata: Metadata = { title: "Studies" };

export default function StudiesPage() {
  return (
    <Plate coordinate="§04 · (x 0.00, y 0.00)">
      <h1 className="font-display text-2xl">Studies</h1>
      <p className="mt-2 text-fg-2">TODO: build the Academics page from content/studies.ts (EB subjects, languages, competitions).</p>
    </Plate>
  );
}
