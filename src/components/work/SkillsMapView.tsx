import type { Skill } from "@/content/schema";

interface SkillsMapViewProps {
  skills: Skill[];
}

/**
 * Skills-map placeholder — a constellation of skill nodes with dot colour
 * = category. Current: a plain ordered list.
 */
export function SkillsMapView({ skills }: SkillsMapViewProps) {
  const levels = [
    "beginner",
    "fundamental",
    "competent",
    "proficient",
    "expert",
  ];

  return (
    <div className="space-y-3">
      {skills.map((skill) => (
        <div
          key={skill.id}
          className="flex items-center gap-3 py-2 border-b border-line last:border-0"
        >
          <span
            className="h-2.5 w-2.5 rounded-full"
            style={{ backgroundColor: "var(--" + skill.category + ")" }}
          />
          <span className="font-mono text-[0.7rem] uppercase tracking-wider text-fg-2 flex-1">
            {skill.name}
          </span>
          <span className="label">{levels[skill.level - 1]}</span>
        </div>
      ))}
    </div>
  );
}
