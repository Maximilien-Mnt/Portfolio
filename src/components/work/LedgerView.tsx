import type { Project } from "@/content/schema";

interface LedgerViewProps {
  projects: Project[];
}

/**
 * Ledger view — placeholder.
 * A single flat column: title → tagline → stack → tracks.
 * No cards, no grid: one line of record per project.
 */
export function LedgerView({ projects }: LedgerViewProps) {
  return (
    <ol className="relative border-l border-line pl-6">
      {projects.map((project) => (
        <li key={project.slug} className="mb-6 last:mb-0">
          <div className="absolute -left-1.5 top-0 h-3 w-3 rounded-full border-2 border-bg-2" />
          <h2 className="font-display text-lg">{project.title}</h2>
          <p className="mt-1 text-fg-2 text-sm">{project.tagline}</p>
          <div className="mt-2 flex flex-wrap gap-2 text-[0.7rem] font-mono uppercase tracking-wider text-fg-3">
            <span className="label">{project.type}</span>
            <span className="label">{project.status}</span>
            <span className="label">{project.year}</span>
          </div>
          {project.stack.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-1.5 text-[0.65rem] font-mono">
              {project.stack.map((s) => (
                <span key={s} className="rounded bg-bg-2 px-2 py-0.5">{s}</span>
              ))}
            </div>
          )}
        </li>
      ))}
    </ol>
  );
}
