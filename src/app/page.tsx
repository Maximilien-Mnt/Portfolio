import { Hero } from "@/components/sections/Hero";
import { TimelineTeaser } from "@/components/timeline/TimelineTeaser";
import Head from "next/head";
import { generateMetadata } from "@/lib/metadata";
import { JsonLdPerson } from "@/components/sections/JsonLdPerson";

export default function Home() {
  return (
    <>
      <Head>
        {JsonLdPerson()}
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
      </Head>
      <Hero />
      <TimelineTeaser className="mt-8" />
    </>
  );
}

export const metadata = generateMetadata("Home", "I like problems that take a long time to solve.", { pathname: "/" });