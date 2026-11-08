"use client";

import posthog from "posthog-js";

type NavigationLogAttributes = Record<string, string | number | boolean>;

export const portfolioNavigationLogger = {
  info(message: string, attributes: NavigationLogAttributes) {
    posthog.logger.info(message, attributes);
  },
};
