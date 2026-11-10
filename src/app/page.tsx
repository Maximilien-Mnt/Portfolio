import { Hero } from "@/components/sections/Hero";
import { TimelineTeaser } from "@/components/timeline/TimelineTeaser";

export default function Home() {
  return (
    <>
      <Hero />
      <TimelineTeaser className="mt-8" />
    </>
  );
}
