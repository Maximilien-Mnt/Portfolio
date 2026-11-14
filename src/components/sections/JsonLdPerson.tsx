import { type ReactNode } from "react";
import Head from "next/head";
import { site } from "@/config/site";

/** JSON-LD Person schema injected into <head>. */
export function JsonLdPerson(): ReactNode {
  return (
    <Head>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            {
              "@context": "https://schema.org",
              "@type": "Person",
              name: site.name,
              description: site.tagline,
              url: site.url,
              address: {
                "@type": "PostalAddress",
                addressCountry: "Luxembourg",
              },
              // Coordinates tied to the Origin concept
              // Lat/Lon for Luxembourg (0,0 reference point)
              geo: {
                "@type": "GeoCoordinates",
                latitude: site.origin.lat,
                longitude: site.origin.lon,
              },
            },
            null,
            2
          ),
        }}
      />
    </Head>
  );
}