import { Metadata } from "next";
import { Plate } from "@/components/ui/Plate";

export const metadata: Metadata = { title: "Privacy" };

export default function PrivacyPage() {
  return (
    <Plate coordinate="§13 · (x 0.00, y 0.00)">
      <h1 className="font-display text-2xl">Privacy</h1>
      <p className="mt-2 text-fg-2">TODO: write the plain-language GDPR note.</p>
    </Plate>
  );
}
