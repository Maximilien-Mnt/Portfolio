import { Metadata } from "next";
import { Plate } from "@/components/ui/Plate";

export const metadata: Metadata = { title: "Plane" };

export default function PlanePage() {
  return (
    <Plate coordinate="§09 · (x 0.00, y 0.00)">
      <h1 className="font-display text-2xl">Plane</h1>
      <p className="mt-2 text-fg-2">TODO: build the guestbook (click to plot a point + moderated message, Supabase).</p>
    </Plate>
  );
}
