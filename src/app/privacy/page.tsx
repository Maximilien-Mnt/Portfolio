import { Plate } from "@/components/ui/Plate";
import { generateMetadata } from "@/lib/metadata";

export const metadata = generateMetadata("Privacy", "Plain-language note on what this site measures and why.", {
  pathname: "/privacy",
});

export default function PrivacyPage() {
  return (
    <Plate coordinate="§13 · (x 0.00, y 0.00)">
      <h1 className="font-display text-2xl">Privacy</h1>
      <p className="mt-2 text-fg-2 max-w-2xl">
        This site is a static portfolio. It sets no cookies and stores no
        personal data about you.
      </p>

      <h2 className="font-display text-lg mt-6 mb-2">Analytics</h2>
      <p className="text-fg-2 max-w-2xl">
        Optional, privacy-friendly usage analytics (PostHog) run only when the{" "}
        <span className="text-signal-ink">NEXT_PUBLIC_POSTHOG_KEY</span>{" "}
        environment variable is set. When active:
      </p>
      <ul className="list-disc list-inside text-fg-2 max-w-2xl mt-2 space-y-1">
        <li>No session recordings are captured.</li>
        <li>No text inputs are autocaptured.</li>
        <li>Persistence is in-memory only (no cookies).</li>
        <li>Person profiles are disabled.</li>
      </ul>
      <p className="text-fg-2 max-w-2xl mt-4">
        Without the key, no analytics code initialises and nothing is sent.
      </p>

      <h2 className="font-display text-lg mt-6 mb-2">Contact &amp; guestbook</h2>
      <p className="text-fg-2 max-w-2xl">
        The contact form and guestbook are optional and require Turnstile and
        Supabase to be configured. Submissions are validated server-side, and a
        honeypot field blocks careless bots. Guestbook entries are approved
        manually before appearing.
      </p>

      <p className="mt-6 text-fg-3 font-mono text-[0.72rem]">
        Built from (0, 0) — Luxembourg.
      </p>
    </Plate>
  );
}
