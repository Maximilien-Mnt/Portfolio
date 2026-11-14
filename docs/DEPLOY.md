# 04 — Deploy checklist

## Vercel env vars

Set these in the Vercel dashboard (Project → Settings → Environment Variables):

| Variable | Value | Notes |
|---|---|---|
| `NEXT_PUBLIC_POSTHOG_KEY` | Your PostHog project key | Client-side only |
| `NEXT_PUBLIC_POSTHOG_HOST` | Your PostHog instance URL | e.g. `https://app.posthog.com` |
| `NEXT_PUBLIC_TURNSTILE_SITEKEY` | Cloudflare Turnstile site key | For contact forms |
| `SUPABASE_URL` | Your Supabase project URL | Server-side |
| `SUPABASE_SERVICE_ROLE_KEY` | Your Supabase service role key | Server-side only |
| `VERCEL_ANALYTICS_ID` | Vercel analytics ID (optional) | Auto-injected if using `@vercel/analytics` |

## Cloudflare DNS

### DNS-only records (in Cloudflare)

Add the following DNS records for your custom domain:

| Type | Name | Value | Proxy Status |
|---|---|---|---|
| `A` | `@` | Vercel IP addresses (multiple) | DNS-only ✅ |
| `A` | `www` | Vercel IP addresses (multiple) | DNS-only ✅ |
| `CNAME` | `app` | Your primary domain | DNS-only ✅ |

**Important:** All records must have **Proxy Status** set to **DNS-only** (gray cloud). Orange cloud will cause routing issues with Supabase and Turnstile.

### Verify

```bash
dig yourdomain.com ANY
# Should return A records pointing to Vercel IPs, not Cloudflare IPs
```

## Email Routing

If using Supabase email functionality or resend:

1. In Supabase dashboard → **Authentication → Email settings**:
   - Set the "From email" address
   - Configure the SMTP settings if using custom SMTP
2. In Cloudflare, ensure the MX records are correct if using custom email:
   - `MX @` → `smtp.mailgun.org` (or your provider)
   - Or keep default Supabase handling

For resend deployment (if used):

```bash
# Add resend API key as env var in Vercel
NEXT_PUBLIC_RESEND_KEY=re_XXXXXXXXXXXXXXXXXXXXXXXXXX
```

## Turnstile hostnames

Add your domain to Cloudflare Turnstile admin:

1. Go to Cloudflare Turnstile → Settings → Domains
2. Add your domain (e.g., `yourdomain.com`, `www.yourdomain.com`)
3. Also add `localhost` for development

The Turnstile widget will only load on authorized hostnames.

### Verify

- Submit a form with Turnstile widget
- Should pass verification on authorized domains
- Returns `invalid-domain` error if hostname not authorized

## Keep-alive cron verification

Add a cron job to keep the Vercel deployment warm and prevent cold starts:

```bash
# Add to your system cron (runs every 5 minutes)
*/5 * * * * curl -s https://yourdomain.com/api/keep-alive > /dev/null

# Or use Vercel's built-in cron (if configured):
# In vercel.json:
# {"cron": {"paths": ["/api/keep-alive"], "schedule": "*/5 * * * *"}}
```

### API endpoint: `/api/keep-alive`

Create `src/app/api/keep-alive/route.tsx`:

```ts
import { NextResponse } from "next/server";

export const GET = async () => {
  return NextResponse.json({ status: "ok", timestamp: new Date().toISOString() });
};
```

### Verify

```bash
curl https://yourdomain.com/api/keep-alive
# {"status":"ok","timestamp":"2026-..."}
```

This will ping your site every 5 minutes, keeping the serverless functions warm.

## Manual deployment steps summary

1. [ ] Set all Vercel env vars
2. [ ] Configure Cloudflare DNS (DNS-only A records)
3. [ ] Add domain to Turnstile authorized hostnames
4. [ ] Set up keep-alive cron (cron job or vercel.json)
5. [ ] Run `pnpm check:placeholders` — must pass with no placeholder:true remaining
6. [ ] Run `pnpm build` — verify successful build
7. [ ] Deploy to Vercel
8. [ ] Test: visit site, submit forms, verify 404 page, check CSP headers