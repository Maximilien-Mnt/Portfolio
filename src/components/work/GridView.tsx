import type { Project } from "@/content/schema";

interface GridViewProps {
  projects: Project[];
}

/**
 * Grid view — placeholder.
 * Cards relay the plate → + registration marks; a single "pulse" token
 * sits in the top-right (one loud thing per screen).
 */
export function GridView({ projects }: GridViewProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {projects.map((project) => (
        <ProjectCard key={project.slug} project={project} />
      ))}
    </div>
  );
}

function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="plate p-4">
      <span className="label mb-2 block">
        {project.type} · {project.status}
      </span>
      <h2 className="font-display text-lg leading-tight">{project.title}</h2>
      <p className="mt-1 text-fg-2 text-sm">{project.tagline}</p>
      <div className="mt-3 flex flex-wrap gap-1.5">
        {project.tracks.map((track) => (
          <span
            key={track}
            className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[0.65rem] font-mono uppercase tracking-wider"
            style={{ backgroundColor: "color-mix(in srgb, var(--" + track + ") 18%, transparent)" }}
          >
            <span
              className="h-1.5 w-1.5 rounded-full"
              style={{ backgroundColor: "var(--" + track + ")" }}
            />
            {track}
          </span>
        ))}
      </div>
      <span className="label mt-3 block text-[0.6rem]">{project.year}</span>
    </article>
  );
}
