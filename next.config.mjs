import path from "path";

/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    config.resolve.alias["@"] = path.resolve(process.cwd(), "src");
    return config;
  },
  // Dynamic OG image generation support
  // Images are served from /api/opengraph-image?title=...&...
  // The ogImage config option is not directly supported in NextConfig,
  // instead we use the route handler approach (src/app/api/opengraph-image/route.tsx)
  // trailingSlash: false,
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          // Content Security Policy: only self + PostHog + Turnstile + Supabase + Vercel
          {
            key: "Content-Security-Policy",
            value:
              "default-src 'self'; script-src 'self' https://cdn.posthog.com 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; connect-src 'self' https://*.posthog.com https://api.vercel.com; frame-src 'self'; frame-ancestors 'none';",
          },
          // X-Content-Type-Options
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          // Referrer-Policy
          {
            key: "Referrer-Policy",
            value: "origin-when-cross-origin",
          },
          // Permissions-Policy
          {
            key: "Permissions-Policy",
            value:
              "camera=(), microphone=(), geolocation=(), payment=(), usb=(), fullscreen=()",
          },
          // X-Frame-Options
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
        ],
      },
    ];
  },
};

export default nextConfig;