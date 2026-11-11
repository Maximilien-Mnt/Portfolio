import "server-only";

import { createClient, type SupabaseClient } from "@supabase/supabase-js";

export const SUPABASE_URL =
  process.env.SUPABASE_URL ?? process.env.NEXT_PUBLIC_SUPABASE_URL;
export const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

export function serviceRoleConfigured(): boolean {
  return Boolean(SUPABASE_URL && SUPABASE_SERVICE_ROLE_KEY);
}

/**
 * Supabase client using the service-role key. Bypasses RLS.
 *
 * Server-only: `import "server-only"` makes Next.js fail the build if this
 * module is ever imported from client code, guaranteeing the service-role key
 * never reaches the browser bundle.
 */
export function createAdminClient(): SupabaseClient {
  if (!serviceRoleConfigured()) {
    throw new Error("Supabase service role is not configured");
  }
  return createClient(SUPABASE_URL ?? "", SUPABASE_SERVICE_ROLE_KEY ?? "");
}
