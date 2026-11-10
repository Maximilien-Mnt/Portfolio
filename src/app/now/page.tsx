import { Metadata } from "next";
import { Plate } from "@/components/ui/Plate";
import { now } from "@/content/now";

export const metadata: Metadata = { title: "Now" };

export default function NowPage() {
  return (
    <Plate coordinate="§10 · (x 0.00, y 0.00)">
      <h1 className="font-display text-2xl">Now</h1>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-5">
        {now.map((item) => {
          const hasPlaceholder = item.placeholder === true;
          return (
            <div
              key={item.id}
              className={hasPlaceholder && "bg-bg-2/50"}
            >
              {hasPlaceholder && (
                <span className="text-xs text-signal-ink uppercase tracking-wider absolute top-2 left-2">
                  PLACEHOLDER
                </span>
              )}
              <p className="font-mono text-sm">{item.label}</p>
              <p className="mt-1 text-fg-3">{item.detail}</p>
            </div>
          );
        })}
      </div>

      <p className="mt-6 text-fg-3 text-center">
        Last updated: {now[0].updated}
      </p>
    </Plate>
  );
}
