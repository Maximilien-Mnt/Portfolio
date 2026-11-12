"use client";

import { useEffect, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import posthog from "posthog-js";
import { PostHogProvider as PHProvider } from "@posthog/react";

interface ProvidersProps {
  children: React.ReactNode;
}

/**
 * PostHogProvider – client-side only.
 *
 * - Initialises posthog-js only when NEXT_PUBLIC_POSTHOG_KEY is set
 * - Uses privacy-friendly defaults (memory persistence, no session replay,
 *   no autocapture of text inputs, cookie-less)
 * - Registers super-property site="portfolio"
 * - Captures $pageview on App Router route changes
 * - Exposes a `track(event, props)` helper via context
 */
export function Providers({ children }: ProvidersProps) {
  const [initialized, setInitialized] = useState(false);
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    // Only init if the env key exists – the site must work with NO keys
    const key = process.env.NEXT_PUBLIC_POSTHOG_KEY;
    if (!key) {
      setInitialized(true);
      return;
    }

    const config: Record<string, unknown> = {
      // Privacy-first: memory persistence = in-page only, no cookies, no session replay
      api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST || "https://eu.i.posthog.com",
      persistence: "memory",
      disable_session_recording: true,
      autocapture: false,
      // Do NOT autocapture text inputs/textarea/SELECT elements
      css_selector_ignorelist: [
        "input",
        "textarea",
        "select",
        "password",
        "ph-no-capture",
        ".ph-no-autocapture",
      ],
      // Capture pageview on every route change (App Router SPA pattern)
      capture_pageview: "history_change",
      // Never process person profiles for privacy
      person_profiles: "never",
      // Advanced: disable /flags endpoint to avoid unnecessary requests when not needed
      advanced_disable_flags: true,
    };

    try {
      posthog.init(key, config);
      // Register the "site" super-property once on init
      posthog.register({ site: "portfolio" });
    } catch (e) {
      // Silently fail – the site must work without PostHog
      // (per security & privacy rules: features degrade gracefully)
    }

    setInitialized(true);
  }, [pathname]);

  // Track helper exposed as a global utility (used by components via import)
  // We attach it to window for dev console access; components import their own helper
  const track = (
    event: string,
    props?: Record<string, unknown>
  ): void => {
    const ph = (posthog as any);
    if (ph && typeof ph?.capture === "function") {
      ph.capture(event, props || {});
    }
  };

  // Capture $pageview on route changes
  useEffect(() => {
    if (!initialized) return;
    const handleChange = () => {
      track("$pageview", { path: pathname });
    };
    // App Router fires popstate/history events; we subscribe via usePathname re-render
    // and also listen to the navigation change
    const removeListener = searchParams?.subscribe?.(searchParams, handleChange);
    // Run initial capture
    handleChange();
    return () => {
      removeListener?.();
    };
  }, [pathname, initialized]);

  return (
    <PHProvider
      // We pass the already-initialized posthog instance so @posthog/react can use it
      client={posthog}
    >
      {children}
    </PHProvider>
  );
}