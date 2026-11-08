import { cn } from "@/lib/utils";

export interface FooterProps {
  className?: string;
}

export function Footer({ className }: FooterProps = {}) {
  return (
    <footer className={cn("border-t border-line bg-bg mt-auto", className)}>
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <p className="font-mono text-[0.72rem] uppercase tracking-wider text-fg-3 py-8">
          Built from (0, 0) — Luxembourg.
        </p>
      </div>
    </footer>
  );
}
