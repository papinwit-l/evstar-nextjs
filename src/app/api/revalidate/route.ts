import { timingSafeEqual } from "node:crypto";
import { revalidateTag } from "next/cache";
import { NextResponse, type NextRequest } from "next/server";
import { WP_TAGS, type WpTag } from "@/lib/wp/client";

/**
 * Called by the evstar-core WordPress plugin after an edit:
 *
 *   POST /api/revalidate
 *   x-revalidate-secret: <REVALIDATE_SECRET>
 *   { "tags": ["products", "home"] }
 *
 * Expires only the tagged WordPress queries; everything else stays cached
 * until its time-based revalidate (WP_REVALIDATE_SECONDS, default 3600).
 */
export async function POST(request: NextRequest) {
  const secret = process.env.REVALIDATE_SECRET;
  const given = request.headers.get("x-revalidate-secret") ?? "";

  if (!secret || !safeEqual(given, secret)) {
    return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "invalid json" }, { status: 400 });
  }

  const requested =
    body && typeof body === "object" && Array.isArray((body as { tags?: unknown }).tags)
      ? (body as { tags: unknown[] }).tags
      : [];
  const tags = requested.filter((tag): tag is WpTag =>
    WP_TAGS.includes(tag as WpTag),
  );

  if (tags.length === 0) {
    return NextResponse.json({ ok: false, error: "no known tags" }, { status: 400 });
  }

  // expire: 0 → the next visitor gets fresh content (not one stale view first)
  for (const tag of tags) revalidateTag(tag, { expire: 0 });

  return NextResponse.json({ ok: true, revalidated: tags });
}

function safeEqual(a: string, b: string) {
  const left = Buffer.from(a);
  const right = Buffer.from(b);
  return left.length === right.length && timingSafeEqual(left, right);
}
