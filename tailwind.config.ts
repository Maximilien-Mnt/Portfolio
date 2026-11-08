import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./src/app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "var(--bg)",
        "bg-2": "var(--bg-2)",
        fg: "var(--fg)",
        "fg-2": "var(--fg-2)",
        "fg-3": "var(--fg-3)",
        line: "var(--line)",
        grid: "var(--grid)",
        signal: "var(--signal)",
        "signal-ink": "var(--signal-ink)",
        azure: "var(--azure)",
        gold: "var(--gold)",
        moss: "var(--moss)",
      },
      borderWidth: {
        DEFAULT: "1px",
      },
      borderColor: {
        DEFAULT: "var(--line)",
      },
      radius: {
        sm: "var(--radius-sm, 2px)",
        md: "var(--radius-md, 6px)",
      },
      ease: {
        snap: "var(--ease-snap, cubic-bezier(0.22, 1, 0.36, 1))",
        inout: "var(--ease-inout, cubic-bezier(0.65, 0, 0.35, 1))",
      },
    },
  },
  plugins: [],
} satisfies Config;