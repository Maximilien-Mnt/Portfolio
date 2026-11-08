// Skeleton home. Prompts P2 (shell) and P3 (hero + OriginField) replace this.
import Link from "next/link";
import { site } from "@/config/site";
import { projects } from "@/content/projects";
import { OriginMark } from "@/components/brand/Logo";

export default function Home() {
  const featured = projects.filter((p) => p.featured);
  return (
    <div className="mx-auto max-w-7xl px-4 pb-24 md:px-6">
      <div className="label flex items-center justify-between border-b border-line py-3">
        <span className="flex items-center gap-2"><OriginMark size={16} /> Origin · {site.origin.lat}°N {site.origin.lon}°E</span>
        <span>{site.origin.label}</span>
      </div>

      <section className="pt-24 pb-20 md:pt-36">
        <p className="label mb-6">§01 · (x 0.00, y 0.00)</p>
        <h1
          className="text-[clamp(3rem,9vw,8.5rem)] leading-[0.95] font-light"
          style={{ fontVariationSettings: '"SOFT" 50, "WONK" 1' }}
        >
          {site.tagline.replace(/\.$/, "")}
          <span className="text-signal">.</span>
        </h1>
        <p className="mt-8 max-w-xl text-lg text-fg-2">{site.description}</p>
        <div className="mt-10 flex flex-wrap gap-3">
          <Link href="/timeline" className="rounded-md bg-fg px-5 py-3 text-bg">Open the timeline</Link>
          <Link href="/work" className="rounded-md border border-line px-5 py-3">See the work</Link>
        </div>
      </section>

      <section className="grid gap-6 md:grid-cols-3">
        {featured.map((p, i) => (
          <Link key={p.slug} href={`/work/${p.slug}`} className="plate block p-6">
            <p className="label">§02.{i + 1} · {p.type}</p>
            <h2 className="mt-3 text-2xl">{p.title}</h2>
            <p className="mt-2 text-fg-2">{p.tagline}</p>
          </Link>
        ))}
      </section>
    </div>
  );
}
