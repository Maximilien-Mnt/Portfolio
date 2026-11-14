import { Fraunces, Instrument_Sans, Martian_Mono } from "next/font/google";

// Font definitions - must be at module level for next/font
const frauncesFont = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  axes: ["opsz", "SOFT", "WONK"],
  display: "swap",
});

const instrumentFont = Instrument_Sans({
  subsets: ["latin"],
  variable: "--font-instrument",
  display: "swap",
});

const martianFont = Martian_Mono({
  subsets: ["latin"],
  variable: "--font-martian",
  display: "swap",
});

export default function OpengraphImage({
  title,
  name,
  coords,
}: {
  title: string;
  name: string;
  coords: string;
}) {
  return (
    <svg
      width={1200}
      height={630}
      viewBox="0 0 1200 630"
      xmlns="http://www.w3.org/2000/svg"
      className="bg-[var(--bg)] font-sans"
    >
      {/* Grid background (32px, var(--grid) token) */}
      <rect width="1200" height="630" fill="var(--grid)" />

      {/* Signal dot at origin (60px from left/top as the "center" visual metaphor) */}
      <circle
        cx={600}
        cy={315}
        r={8}
        fill="var(--signal)"
        opacity={0.8}
      />

      {/* Name in Fraunces display font, Signal color */}
      <text
        x={100}
        y={100}
        fontFamily={frauncesFont.style.fontFamily}
        fontSize={64}
        fontWeight="600"
        fill="var(--signal)"
        className="uppercase tracking-wider"
      >
        {name}
      </text>

      {/* Page title in Martian Mono */}
      <text
        x={100}
        y={180}
        fontFamily={martianFont.style.fontFamily}
        fontSize={28}
        fill="var(--fg-2)"
        className="uppercase tracking-widest"
      >
        {title}
      </text>

      {/* Coordinate label §NN in bottom-left */}
      <text
        x={100}
        y={580}
        fontFamily={instrumentFont.style.fontFamily}
        fontSize={14}
        fill="var(--fg-3)"
        opacity={0.7}
      >
        {coords}
      </text>

      {/* Decorative line under name */}
      <line
        x1={100}
        y1={110}
        x2={200}
        y2={110}
        stroke="var(--signal)"
        strokeWidth={1}
        opacity={0.3}
      />
    </svg>
  );
}