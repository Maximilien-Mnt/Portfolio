import { cn } from "@/lib/utils";

export interface PlateProps {
  children?: React.ReactNode;
  coordinate?: string;
  className?: string;
}

export function Plate({ children, coordinate, className }: PlateProps) {
  return (
    <section className={cn("plate p-4", className)}>
      {coordinate && <span className="label mb-2 block">{coordinate}</span>}
      {children}
    </section>
  );
}