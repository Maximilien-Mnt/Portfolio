import { cn } from "@/lib/utils";

export interface LabelProps {
  htmlFor?: string;
  className?: string;
  children?: React.ReactNode;
}

export function Label({ htmlFor, className, children }: LabelProps) {
  if (htmlFor) {
    return (
      <label htmlFor={htmlFor} className={cn("label block mb-1", className)}>
        {children}
      </label>
    );
  }
  return <span className={cn("label block mb-1", className)}>{children}</span>;
}