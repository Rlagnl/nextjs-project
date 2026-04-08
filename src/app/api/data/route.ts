import { NextResponse } from "next/server";
import { supabaseAdmin } from "@lib/supabase/admin";

export const runtime = "nodejs";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const limitRaw = url.searchParams.get("limit");
  const limit = Math.min(
    100,
    Math.max(1, limitRaw ? Number.parseInt(limitRaw, 10) || 20 : 20),
  );

  const { data, error, count } = await supabaseAdmin
    .from("test")
    .select("*", { count: "exact" })
    .limit(limit);

  if (error) {
    return NextResponse.json(
      { ok: false, error: error.message },
      { status: 500 },
    );
  }

  return NextResponse.json({ ok: true, count, data });
}
