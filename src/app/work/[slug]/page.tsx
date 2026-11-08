import { Metadata } from "next";
import { notFound } from "next/navigation";
import { Plate } from "@/components/ui/Plate";
import { projects } from "@/content/projects";

export const generateStaticParams = () => [];

export const metadata: Metadata = { title: "Case study" };

export default function CaseStudyPage({ params }: { params: { slug: string } }) {
  const project = projects.find((p) => p.slug === params.slug);
  if (!project) notFound();

  return (
    <Plate coordinate="§02 · (x 0.00, y 0.00)">
      <h1 className="font-display text-2xl">{project.title}</h1>
      <p className="mt-2 text-fg-2">TODO: build the case-study paper (Abstract → … → Q.E.D.) for {project.title}.</p>
    </Plate>
  );
}
