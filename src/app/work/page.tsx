import { getProjects } from "@/lib/content";
import { skills } from "@/content/skills";
import type { Skill } from "@/content/schema";
import { Plate } from "@/components/ui/Plate";
import { ViewToggle } from "@/components/work/ViewToggle";
import { TypeFilter } from "@/components/work/TypeFilter";
import { GridView } from "@/components/work/GridView";
import { LedgerView } from "@/components/work/LedgerView";
import { SkillsMapView } from "@/components/work/SkillsMapView";

interface WorkPageProps {
  searchParams: Promise<{ view?: string; type?: string }>;
}

export default async function WorkPage({ searchParams }: WorkPageProps) {
  const params = await searchParams;
  const view = (params.view as "grid" | "ledger" | "map") || "grid";
  const typeFilter = params.type || "";

  const allProjects = getProjects();
  const projects = typeFilter
    ? allProjects.filter((p) => p.type === typeFilter)
    : allProjects;

  return (
    <Plate coordinate="§04 · (x 0.00, y 0.00)">
      <h1 className="font-display text-2xl">Work</h1>
      <p className="mt-2 text-fg-2">
        {projects.length} project{projects.length !== 1 ? "s" : ""} · {typeFilter
          ? `type: ${typeFilter}`
          : "all"}
      </p>

      <ViewToggle
        options={[
          { value: "grid", label: "Grid" },
          { value: "ledger", label: "Ledger" },
          { value: "map", label: "Skills map" },
        ]}
      />

      <TypeFilter />

      {view === "grid" && <GridView projects={projects} />}
      {view === "ledger" && <LedgerView projects={projects} />}
      {view === "map" && <SkillsMapView skills={skills as unknown as Skill[]} />}
    </Plate>
  );
}
