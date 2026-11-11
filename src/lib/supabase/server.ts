import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export const NEXT_PUBLIC_SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
export const NEXT_PUBLIC_SUPABASE_ANON_KEY =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export function supabaseConfigured(): boolean {
  return Boolean(NEXT_PUBLIC_SUPABASE_URL && NEXT_PUBLIC_SUPABASE_ANON_KEY);
}

/**
 * Public (anon) Supabase client for server-side reads.
 *
 * Enforces RLS: `pf_guestbook` only exposes `approved = true` rows to anon.
 * This client only performs public reads, so only `getAll` is wired; `setAll`
 * is intentionally omitted (it is optional per `@supabase/ssr`).
 */
export function createSupabaseServer() {
  const cookieStore = cookies();
  return createServerClient(
    NEXT_PUBLIC_SUPABASE_URL ?? "",
    NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "",
    {
      cookies: {
        getAll: () => cookieStore.getAll(),
      },
    },
  );
}
