import { Metadata } from "next";
import { Plate } from "@/components/ui/Plate";

export const metadata: Metadata = { title: "Notes" };

export default function NotesPage() {
  return (
    <Plate coordinate="§07 · (x 0.00, y 0.00)">
      <h1 className="font-display text-2xl">Notes</h1>
      <p className="mt-2 text-fg-2">TODO: build the Notes index (MDX + KaTeX) and reading list.</p>
    </Plate>
  );
}
