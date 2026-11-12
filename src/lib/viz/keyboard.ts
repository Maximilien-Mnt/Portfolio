/** Keyboard navigation: g then h/w/t/a */
"use client";

import {useEffect, useRef, useState} from "react";

/** State to track 'g' key press */
const gKeyPresses = {
  lastPress: 0,
};

/** Hook for keyboard navigation */
export function useKeyboardNavigation() {
  const [awaitingG, setAwaitingG] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't fire if typing in an input or textarea
      if (
        document.activeElement?.tagName === "INPUT" ||
        document.activeElement?.tagName === "TEXTAREA" ||
        document.activeElement?.isContentEditable
      ) {
        // Reset the g press if user starts typing
        gKeyPresses.lastPress = 0;
        setAwaitingG(false);
        return;
      }

      if (e.key === "g") {
        const now = Date.now();
        if (now - gKeyPresses.lastPress < 300) {
          // Double g pressed within 300ms
          setAwaitingG(true);
        } else {
          gKeyPresses.lastPress = now;
          setAwaitingG(false);
        }
      } else {
        // Reset if pressed something other than g
        gKeyPresses.lastPress = 0;
        setAwaitingG(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  return {awaitingG};
}

/** Handler for g-key combinations */
export function useGNavigation(
  onHome: () => void,
  onWork: () => void,
  onTimeline: () => void,
  onAtlas: () => void
) {
  const {awaitingG} = useKeyboardNavigation();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "h") {
        onHome();
        gKeyPresses.lastPress = 0;
        // reset awaiting G state
        const event = new Event("g-press-reset");
        document.dispatchEvent(event);
      } else if (e.key === "w") {
        onWork();
        gKeyPresses.lastPress = 0;
      } else if (e.key === "t") {
        onTimeline();
        gKeyPresses.lastPress = 0;
      } else if (e.key === "a") {
        onAtlas();
        gKeyPresses.lastPress = 0;
      } else if (e.key !== "g") {
        gKeyPresses.lastPress = 0;
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onHome, onWork, onTimeline, onAtlas]);

  return {awaitingG};
}