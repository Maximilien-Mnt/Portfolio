import { Metadata } from "next";
import { getProjects, getProject, getMDXContent } from "@/lib/content";
import { Plate } from "@/components/ui/Plate";
import { CaseStudyToc } from "@/components/work/CaseStudyToc";
import { MdxRenderer } from "@/components/work/MdxRenderer";

export const generateStaticParams = async () => {
  const projects = getProjects();
  return projects.map((p) => ({ slug: p.slug }));
};

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const project = getProject(params.slug);
  return { title: `${project.title} — Origin` };
}

export default async function CaseStudyPage({
  params,
}: {
  params: { slug: string };
}) {
  const project = getProject(params.slug);
  const { mdx, headings, frontmatter } = await getMDXContent(params.slug);

  return (
    <article className="mx-auto max-w-4xl">
      <Plate coordinate={`§04 · paper · ${frontmatter.title}`}>
        <header className="border-b border-line pb-4">
          <h1 className="font-display text-3xl">{project.title}</h1>
          <p className="mt-1 text-fg-2">{project.tagline}</p>
          <div className="mt-3 flex flex-wrap gap-2 text-[0.65rem] font-mono uppercase tracking-wider text-fg-3">
            <span className="label">{project.type}</span>
            <span className="label">{project.status}</span>
            <span className="label">{project.year}</span>
          </div>
        </header>

        <div className="mt-5 flex gap-6">
          <aside className="w-56 shrink-0 sticky top-24 self-start pt-4">
            <CaseStudyToc headings={headings} />
          </aside>
          <div className="min-w-0">
            <MdxRenderer mdx={mdx} />
          </div>
        </div>
      </Plate>
    </article>
  );
}
