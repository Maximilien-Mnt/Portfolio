import { Metadata } from "next";
import { Plate } from "@/components/ui/Plate";

export const metadata: Metadata = { title: "Contact" };

export default function ContactPage() {
  return (
    <Plate coordinate="§11 · (x 0.00, y 0.00)">
      <h1 className="font-display text-2xl">Contact</h1>
      <p className="mt-2 text-fg-2">TODO: build the contact form (Turnstile + server action + email).</p>
    </Plate>
  );
}
