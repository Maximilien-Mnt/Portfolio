#!/usr/bin/env bash
# Run from inside the kit folder. Needs Node LTS + pnpm (corepack enable).
set -euo pipefail
KIT="$(cd "$(dirname "$0")" && pwd)"
TARGET="${1:-$KIT/../origin-site}"

pnpm create next-app@latest "$TARGET" --ts --tailwind --eslint --app --src-dir --import-alias "@/*" --use-pnpm --yes
cp -R "$KIT"/. "$TARGET"/
rm -f "$TARGET/bootstrap.sh"
cd "$TARGET"

pnpm add motion lenis zod clsx tailwind-merge class-variance-authority lucide-react next-themes cmdk \
  d3-geo topojson-client world-atlas \
  @supabase/supabase-js @supabase/ssr posthog-js \
  next-mdx-remote gray-matter remark-math rehype-katex katex rehype-pretty-code shiki \
  @marsidev/react-turnstile resend
pnpm add -D @types/d3-geo @types/topojson-client @types/geojson prettier

[ -f .env.local ] || cp .env.example .env.local
echo "Done. cd $TARGET && pnpm dev"
