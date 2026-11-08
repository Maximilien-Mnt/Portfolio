import { Fraunces, Instrument_Sans, Martian_Mono } from "next/font/google";

// Display / voice — soft, editorial serif. Axes let us use SOFT + WONK on the hero only.
export const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  axes: ["opsz", "SOFT", "WONK"],
  display: "swap",
});

// Body / UI
export const instrument = Instrument_Sans({
  subsets: ["latin"],
  variable: "--font-instrument",
  display: "swap",
});

// Data, labels, coordinates
export const martian = Martian_Mono({
  subsets: ["latin"],
  variable: "--font-martian",
  display: "swap",
});
