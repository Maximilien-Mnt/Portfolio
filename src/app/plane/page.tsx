import { Metadata } from "next";
import { Plate } from "@/components/ui/Plate";
import { PlaneBoard } from "@/components/viz/PlaneBoard";
import { createSupabaseServer, supabaseConfigured } from "@/lib/supabase/server";

export const metadata: Metadata = { title: "Plane" };
export const dynamic = "force-dynamic";

export default async function PlanePage() {
  const configured = supabaseConfigured();
  let points: Array<{
    id: string;
    x: number;
    y: number;
    name?: string | null;
    message: string;
    created_at: string;
  }> = [];

  if (configured) {
    const supabase = createSupabaseServer();
    const { data } = await supabase
      .from("pf_guestbook")
      .select("id, name, message, x, y, created_at")
      .eq("approved", true)
      .order("created_at", { ascending: false });
    points = data ?? [];
  }

  return (
    <Plate coordinate="§09 · (x 0.00, y 0.00)">
      <h1 className="font-display text-2xl">Plane</h1>
      <p className="mt-2 text-fg-2">
        Approved guestbook messages appear as points on the coordinate plane.
        Click empty space to leave your own mark.
      </p>
      {!configured && (
        <p className="mt-4 font-mono text-[0.72rem] text-fg-3">
          Guestbook not configured — set the Supabase and Turnstile env vars
          to plot points.
        </p>
      )}
      <PlaneBoard
        points={points}
        ownerPointId={process.env.NEXT_PUBLIC_OWNER_POINT_ID || undefined}
        canCreate={
          configured && Boolean(process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY)
        }
      />
    </Plate>
  );
}
