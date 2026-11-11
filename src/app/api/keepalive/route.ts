import { createAdminClient, serviceRoleConfigured } from "@/lib/supabase/admin";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const expected = process.env.CRON_SECRET;
  if (!expected) {
    return Response.json(
      { ok: false, error: "keepalive not configured" },
      { status: 500 },
    );
  }

  const auth = request.headers.get("authorization");
  if (!auth || auth !== `Bearer ${expected}`) {
    return Response.json({ ok: false, error: "unauthorized" }, { status: 401 });
  }

  if (!serviceRoleConfigured()) {
    return Response.json(
      { ok: false, error: "supabase not configured" },
      { status: 500 },
    );
  }

  try {
    const supabase = createAdminClient();
    const { error } = await supabase.from("pf_guestbook").select("id").limit(1);
    if (error) throw error;
    return Response.json({
      ok: true,
      checkedAt: new Date().toISOString(),
    });
  } catch {
    return Response.json(
      { ok: false, error: "database unreachable" },
      { status: 502 },
    );
  }
}
