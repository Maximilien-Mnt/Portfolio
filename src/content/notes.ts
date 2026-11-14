import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const NOTES_DIR = path.join(process.cwd(), "src", "content", "notes");

export interface Note {
  slug: string;
  source: string;
  frontmatter: Record<string, unknown>;
}

export const notes: Note[] = (() => {
  if (!fs.existsSync(NOTES_DIR)) return [];
  return fs
    .readdirSync(NOTES_DIR)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => {
      const slug = file.replace(/\.mdx$/, "");
      const source = fs.readFileSync(path.join(NOTES_DIR, file), "utf-8");
      const { data, content } = matter(source);
      return { slug, source: content, frontmatter: data };
    });
})();
