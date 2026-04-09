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

export async function POST(request: Request) {
  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid JSON body" },
      { status: 400 },
    );
  }

  const body = payload as Partial<{ id: string | number; created_at: string }>;
  const id = body.id;
  const createdAt = body.created_at;

  if (
    (typeof id !== "string" && typeof id !== "number") ||
    (typeof createdAt !== "string" && typeof createdAt !== "undefined")
  ) {
    return NextResponse.json(
      { ok: false, error: "Invalid payload: { id, created_at? }" },
      { status: 400 },
    );
  }

  if (typeof createdAt === "string" && Number.isNaN(Date.parse(createdAt))) {
    return NextResponse.json(
      { ok: false, error: "Invalid created_at: must be ISO date string" },
      { status: 400 },
    );
  }

  const insertRow: { id: string | number; created_at?: string } = { id };
  if (typeof createdAt === "string") {
    insertRow.created_at = createdAt;
  }

  const { data, error } = await supabaseAdmin
    .from("test")
    .insert(insertRow)
    .select("*")
    .single();

  if (error) {
    return NextResponse.json(
      { ok: false, error: error.message },
      { status: 500 },
    );
  }

  return NextResponse.json({ ok: true, data });
}

export async function DELETE(request: Request) {
  const url = new URL(request.url);
  const idRaw = url.searchParams.get("id");

  if (!idRaw) {
    return NextResponse.json(
      { ok: false, error: "Missing query param: id" },
      { status: 400 },
    );
  }

  const id: string | number =
    /^\d+$/.test(idRaw) ? Number.parseInt(idRaw, 10) : idRaw;

  const { data, error } = await supabaseAdmin
    .from("test")
    .delete()
    .eq("id", id)
    .select("*")
    .single();

  if (error) {
    return NextResponse.json(
      { ok: false, error: error.message },
      { status: 500 },
    );
  }

  return NextResponse.json({ ok: true, data });
}
