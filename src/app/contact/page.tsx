import { Metadata } from "next";
import { Plate } from "@/components/ui/Plate";
import Link from "next/link";
import { ContactForm } from "@/components/sections/ContactForm";
import { site } from "@/config/site";

export const metadata: Metadata = { title: "Contact" };

export default function ContactPage() {
  return (
    <Plate coordinate="§11 · (x 0.00, y 0.00)">
      <h1 className="font-display text-2xl">Contact</h1>
      <p className="mt-2 text-fg-2">
        Get in touch — messages are sent by email and read personally.
      </p>
      <ContactForm className="mt-6" />
      <div className="mt-8 flex flex-col gap-2 text-fg-2 font-mono text-[0.72rem]">
        <p>
          Email:{" "}
          <a
            href={`mailto:${site.email}`}
            className="underline underline-offset-4 hover:text-fg transition-colors duration-120 ease-snap"
          >
            {site.email}
          </a>
        </p>
        <p>
          GitHub:{" "}
          <Link
            href={site.links.github}
            className="underline underline-offset-4 hover:text-fg transition-colors duration-120 ease-snap"
          >
            {site.links.github}
          </Link>
        </p>
        <p>
          LinkedIn:{" "}
          <Link
            href={site.links.linkedin}
            className="underline underline-offset-4 hover:text-fg transition-colors duration-120 ease-snap"
          >
            {site.links.linkedin}
          </Link>
        </p>
      </div>
    </Plate>
  );
}
