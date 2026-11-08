import { Metadata } from "next";
import { Plate } from "@/components/ui/Plate";

export const generateStaticParams = () => [];

export const metadata: Metadata = { title: "Note" };

export default function NotePage({ params }: { params: { slug: string } }) {
  return (
    <Plate coordinate="§07 · (x 0.00, y 0.00)">
      <h1 className="font-display text-2xl">{params.slug}</h1>
      <p className="mt-2 text-fg-2">TODO: render the MDX note for {params.slug} with KaTeX.</p>
    </Plate>
  );
}
