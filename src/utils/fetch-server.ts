import "server-only";

import { headers } from "next/headers";

export const fetchData = async <T>(
  url: string,
): Promise<
  { ok: true; count: number | null; data: T[] } | { ok: false; error: string }
> => {
  const h = await headers();
  const host = h.get("host");
  const proto = h.get("x-forwarded-proto") ?? "http";
  const res = await fetch(`${proto}://${host}${url}`, {
    cache: "no-store",
  });
  return res.json();
};
