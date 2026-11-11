import { useEffect, useState } from "react";

/**
 * Hook that respects the user's `prefers-reduced-motion` preference.
 * Returns `true` if the user has reduced motion enabled, `false` otherwise.
 * 
 * Important: This must be called at the top level of a Client Component.
 * 
 * Usage:
 *   const reduced = useReducedMotion();
 */
export function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState<boolean | undefined>(undefined);

  useEffect(() => {
    // Check if the media query matches
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);

    // Add listener for changes
    const handler = (event: MediaQueryListEvent) => {
      setReduced(event.matches);
    };

    mq.addEventListener("change", handler);

    // Cleanup
    return () => {
      mq.removeEventListener("change", handler);
    };
  }, []); // Run once on mount

  // If the browser doesn't support matchMedia, default to false
  if (reduced === undefined) return false;

  return reduced;
}