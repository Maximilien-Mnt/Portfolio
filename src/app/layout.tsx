import type { Metadata } from "next";
import { Providers as ThemeProviders } from "@/components/providers";
import { Providers as PostHogProviders } from "@/app/providers";
import { Header } from "@/components/sections/Header";
import { Ticker } from "@/components/sections/Ticker";
import { Footer } from "@/components/sections/Footer";
import { site } from "@/config/site";

export const metadata: Metadata = {
  title: { template: "%s — " + site.name, default: site.name },
  description: site.description,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <a href="#main" className="skip-link">Skip to content</a>
        <ThemeProviders>
          <PostHogProviders>
            <Header />
            <Ticker />
            <main id="main">{children}</main>
            <Footer />
          </PostHogProviders>
        </ThemeProviders>
      </body>
    </html>
  );
}
