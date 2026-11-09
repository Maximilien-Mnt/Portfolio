"use client";

import { useEffect, useRef, useState } from "react";
import type { TocHeading } from "@/lib/content";

interface CaseStudyTocProps {
  headings: TocHeading[];
}

export function CaseStudyToc({ headings }: CaseStudyTocProps) {
  const [active, setActive] = useState<string>(headings[0]?.slug ?? "");
  const sectionRef = useRef<Map<string, HTMLElement>>(new Map());

  useEffect(() => {
    if (headings.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
            break;
          }
        }
      },
      { rootMargin: "-45% 0px -55% 0px", threshold: 0 },
    );

    for (const heading of headings) {
      const el = document.getElementById(heading.slug);
      if (el) {
        sectionRef.current.set(heading.slug, el);
        observer.observe(el);
      }
    }

    return () => observer.disconnect();
  }, [headings]);

  return (
    <nav aria-label="Section navigation" className="space-y-1">
      <p className="label mb-2">Contents</p>
      {headings.map((h) => (
        <a
          key={h.slug}
          href={`#${h.slug}`}
          className={`block text-[0.75rem] font-mono uppercase tracking-wider transition-colors duration-120 ease-snap ${
            active === h.slug
              ? "text-signal"
              : "text-fg-2 hover:text-fg"
          }`}
        >
          {h.text}
        </a>
      ))}
    </nav>
  );
}
