import { cn } from "@/lib/utils";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
}

const variantStyles = {
  primary: "bg-fg text-bg",
  secondary: "bg-transparent text-fg",
  ghost: "bg-transparent text-fg-2",
} as const;

const sizeStyles = {
  sm: "px-3 py-1.5 text-xs",
  md: "px-4 py-2 text-sm",
  lg: "px-6 py-2.5 text-base",
} as const;

export function Button({
  className,
  variant = "primary",
  size = "md",
  disabled,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      type="button"
      disabled={disabled}
      className={cn(
        "relative group inline-flex items-center justify-center rounded-md border border-line transition-colors duration-120 ease-snap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-signal focus-visible:ring-offset-3 min-h-[44px] min-w-[44px] disabled:opacity-50 disabled:pointer-events-none",
        variantStyles[variant],
        sizeStyles[size],
        className,
      )}
      {...props}
    >
      {variant === "primary" && (
        <span
          className="absolute left-2 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-signal opacity-0 group-hover:opacity-100 transition-opacity duration-120 ease-snap pointer-events-none"
          aria-hidden="true"
        />
      )}
      <span className="relative z-10">{children}</span>
    </button>
  );
}