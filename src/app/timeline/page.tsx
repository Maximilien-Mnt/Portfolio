import { Plate } from "@/components/ui/Plate";
import { TimelineControls } from "@/components/timeline/TimelineControls";
import { timeline } from "@/content/timeline";
import { generateMetadata } from "@/lib/metadata";

export const metadata = generateMetadata("Timeline");

export default function TimelinePage() {
  return (
    <Plate coordinate="§03 · (x 0.00, y 0.00)">
      <h1 className="font-display text-2xl">Timeline</h1>
      <TimelineControls events={timeline} initialView="curve" initialTracks={["maths", "code", "markets", "endurance", "school"]} />
    </Plate>
  );
}