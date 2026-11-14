import { Plate } from "@/components/ui/Plate";
import { generateMetadata } from "@/lib/metadata";
import { notesExport } from "@/lib/content";

export const metadata = generateMetadata("Notes");

function readingTime(wordCount: number): string {
  const wpm = 200;
  const minutes = Math.max(1, Math.ceil(wordCount / wpm));
  return `${minutes} min read`;
}

export default function NotesPage() {
  const activeNotes = notesExport.filter((n) => !n.frontmatter.draft);
  const noteCountText = `${activeNotes.length} note${activeNotes.length !== 1 && "s"} ·`;

  return (
    <Plate coordinate="§07 · (x 0.00, y 0.00)">
      <h1 className="font-display text-2xl">Notes</h1>

      <p className="mt-2 text-fg-2">{noteCountText}</p>

      <ul className="divide-y divide-fg-3 mt-6">
        {activeNotes.map((note) => {
          const content = note.source || "";
          const headingMatch = content.match(/^#\s+(.+)$/m);
          const title = headingMatch ? headingMatch[1] : note.frontmatter.title;
          const wordCount = (content.split(/\s+/).filter(Boolean).length || 0);
          const rt = readingTime(wordCount);

          return (
            <li key={note.slug} className="py-3 hover:bg-fg-2/10 transition-colors">
              <div className="flex items-start gap-3">
                <span className="flex-shrink-0 text-signal-ink text-lg" aria-hidden="true">
                  •
                </span>
                <div className="flex-1 min-w-0">
                  <a
                    href={`/notes/${note.slug}`}
                    className="font-medium text-fg hover:text-signal transition-colors"
                  >
                    {String(title ?? "")}
                  </a>
                  <p className="mt-1 text-fg-3 text-xs capitalize">
                    {(note.frontmatter.tags as string[]).map((t) => `#${t}`).join(" ")}
                  </p>
                </div>
                <span className="text-fg-3 text-xs">{rt}</span>
              </div>
            </li>
          );
        })}
      </ul>
    </Plate>
  );
}