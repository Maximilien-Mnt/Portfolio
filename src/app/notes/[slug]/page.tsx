import { Metadata, notFound } from "next";
import { Plate } from "@/components/ui/Plate";
import { MDXRemote } from "next-mdx-remote";
import { getMDXContent, type MDXContent } from "@/lib/content";
import { extractHeadings, type TocHeading } from "@/lib/content";

export const generateStaticParams = () => [];

export const metadata = (slug: string) => {
  return {
    title: "Notes",
  };
};

function TOC({ headings }: { headings: TocHeading[] }) {
  if (!headings.length) return null;

  const activeHeadings = headings.filter((h) => h.depth <= 3);

  if (!activeHeadings.length) return null;

  return (
    <aside className="sticky top-8 left-0 pt-2 max-w-xs">
      <div className="bg-plate border border-fg-3 rounded-md p-2 shadow-sm">
        <h2 className="font-sans text-xs text-fg-3 uppercase tracking-wider mb-2">On this page</h2>
        <nav className="space-y-1">
          {activeHeadings.map((h) => (
            <a
              key={h.slug}
              href={`#${h.slug}`}
              className="font-sans text-sm text-fg-3 hover:text-signal transition-colors rounded-md px-1.5 py-0.5"
            >
              {h.text}
            </a>
          ))}
        </nav>
      </div>
    </aside>
  );
}

export default async function NotePage({
  params,
}: {
  params: { slug: string };
}) {
  const { frontmatter, mdx } = await getMDXContent(params.slug);

  // Hide drafts in production
  if (frontmatter.draft) {
    notFound(); // or redirect to /notes
  }

  // Extract headings from source for TOC
  const headings: TocHeading[] = extractHeadings(mdx.source || "");

  return (
    <Plate coordinate="§07 · (x 0.00, y 0.00)">
      <h1 className="font-display text-2xl">{frontmatter.title}</h1>

      <MDXRemote
        {...mdx as unknown as Record<string, unknown>}
        components={{
          h1: (props: any) => <h1 className="font-display text-2xl" {...props} />,
          h2: (props: any) => <h2 className="font-display text-xl" {...props} />,
          h3: (props: any) => <h3 className="font-display text-lg" {...props} />,
          pre: (props: any) => (
            <pre
              {...props}
              className="bg-fg-2/10 rounded-md p-4 overflow-x-auto font-mono text-sm"
            />
          ),
          code: (props: any) => (
            <code
              {...props}
              className="rounded-md px-1.5 py-0.5 bg-fg-2/10 font-mono text-sm"
            />
          ),
        }}
      />

      <TOC headings={headings} />
    </Plate>
  );
}
