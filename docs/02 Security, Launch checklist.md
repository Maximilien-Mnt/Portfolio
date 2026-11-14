# 02 — Security, Launch checklist

## Security headers (next-config.mjs)

The following headers are set via Next.js middleware/next-config security middleware:

```js
const nextConfig = {
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          // Content Security Policy: only self + PostHog + Turnstile + Supabase + Vercel
          {
            key: "Content-Security-Policy",
            value: "default-src 'self'; script-src 'self' https://cdn.posthog.com 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; connect-src 'self' https://*.posthog.com https://api.vercel.com; frame-src 'self'; frame-ancestors 'none';"
          },
          // X-Content-Type-Options
          {
            key: "X-Content-Type-Options",
            value: "nosniff"
          },
          // Referrer-Policy
          {
            key: "Referrer-Policy",
            value: "origin-when-cross-origin"
          },
          // Permissions-Policy
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=(), payment=(), usb=(), fullscreen=()"
          },
          // X-Frame-Options
          {
            key: "X-Frame-Options",
            value: "DENY"
          }
        ]
      }
    ]
  }
}
```

## Custom 404

Page rendered at `/404.tsx` with message: **"No point at these coordinates."**

## Error boundary

Component at `src/components/viz/ErrorBoundary.tsx` catches rendering errors and displays a fallback UI.

## Placeholder check

Added `pnpm check:placeholders` script that fails the build if any content still has `placeholder: true` in production build.

## Vercel env vars (manual steps)

See `docs/DEPLOY.md` for full checklist.

## Cloudflare DNS / Email Routing / Turnstile / Keep-alive

See `docs/DEPLOY.md` for full checklist.