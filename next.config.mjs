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
};

export default nextConfig;