// ═════════════════════════════════════════════════════════════════════════════
// content.ts — typed loaders for all content content.
//
// Every module is validated at its source file; this module re-exports the
// validated arrays and exposes typed getters. The getters throw a descriptive
// error when a slug is missing.
// ═════════════════════════════════════════════════════════════════════════════

import { serialize } from "next-mdx-remote/serialize";
import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import rehypePrettyCode from "rehype-pretty-code";

/* ── Content arrays (validated at module load in the source files) ── */

import { projects } from "@/content/projects";
import { timeline } from "@/content/timeline";
import { studies, competitions } from "@/content/studies";
import { skills } from "@/content/skills";
import { books } from "@/content/books";
import { races } from "@/content/races";
import { now } from "@/content/now";
import { notes } from "@/content/notes";

export { projects } from "@/content/projects";
export { notes as notesExport } from "@/content/notes";
export { timeline as timelineExport } from "@/content/timeline";
export { studies as studiesExport } from "@/content/studies";
export { skills as skillsExport } from "@/content/skills";
export { books as booksExport } from "@/content/books";
export { races as racesExport } from "@/content/races";
export { now as nowExport } from "@/content/now";

/* ── Helpers ── */

export interface TocHeading {
  depth: number;
  text: string;
  slug: string;
}

/** Turn "My Heading!" into "my-heading". */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

/* ── Plain getters ── */

export function getProjects(): typeof projects {
  return projects;
}

export function getProject(slug: string): typeof projects[number] {
  const project = projects.find((p) => p.slug === slug);
  if (!project) {
    throw new Error(
      `[content] getProject("${slug}"): not found. ` +
      `Available slugs: ${projects.map((p) => p.slug).join(", ")}`,
    );
  }
  return project;
}

export function getTimeline(): typeof timeline {
  return timeline;
}

export function getStudies(): typeof studies {
  return studies;
}

export function getSkills(): typeof skills {
  return skills;
}

export function getBooks(): typeof books {
  return books;
}

export function getRaces(): typeof races {
  return races;
}

export function getNow(): typeof now {
  return now;
}

export function getCompetitions(): typeof competitions {
  return competitions;
}

/* ── Favourite maths areas ── */

export const favouriteMathAreas = [
  "Calculus & Analysis",
  "Probability & Statistics",
  "Linear Algebra",
  "Number Theory",
  "Geometry",
  "Differential Equations",
];

/* ── MDX loader ── */

const PROJECTS_DIR = path.join(process.cwd(), "src", "content", "projects");

export interface MDXContent {
  source: string;
  frontmatter: Record<string, unknown>;
  headings: TocHeading[];
  mdx: Awaited<ReturnType<typeof serialize>>;
}

/** Read a `content/projects/*.mdx` file, parse frontmatter and serialise. */
export async function getMDXContent(slug: string): Promise<MDXContent> {
  const filePath = path.join(PROJECTS_DIR, `${slug}.mdx`);
  let source: string;
  try {
    source = fs.readFileSync(filePath, "utf-8");
  } catch {
    // Missing project page -> return a placeholder so the build does not crash.
    const placeholder = await serialize("Placeholder", {
      parseFrontmatter: false,
    });
    return {
      source: "",
      frontmatter: { title: "Placeholder" },
      headings: [],
      mdx: placeholder,
    };
  }

  const { content, data } = matter(source);

  const mdx = await serialize(content, {
    mdxOptions: {
      remarkPlugins: [remarkMath],
      rehypePlugins: [
        rehypeKatex,
        [rehypePrettyCode, { theme: "github-dark", keepBackground: false }],
      ],
    },
  });

  const headings = extractHeadings(content);

  return { source, frontmatter: data, headings, mdx };
}

/** Extract `#` headings from source so we can build a sticky mini-TOC. */
export function extractHeadings(source: string): TocHeading[] {
  const re = /^(#{1,3})\s+(.+)$/gm;
  const headings: TocHeading[] = [];
  let match: RegExpExecArray | null;

  while ((match = re.exec(source)) !== null) {
    const depth = match[1]!.length;
    const text = match[2]!.trim();
    const slug = text
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");
    headings.push({ depth, text, slug });
  }

  return headings;
}
