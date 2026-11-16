import { NextResponse } from "next/server";

import { bimPublicIndexingAllowed, BIM_ORIGIN } from "@/config/bim-seo";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/** Explicit text/plain robots — MetadataRoute nested path + CF content-signals pótlásához. */
export function GET() {
  const allow = bimPublicIndexingAllowed();
  const body = allow
    ? [
        "User-Agent: *",
        "Allow: /",
        "Disallow: /admin",
        "Disallow: /api/",
        "Disallow: /partner/",
        "",
        `Host: ${BIM_ORIGIN}`,
        `Sitemap: ${BIM_ORIGIN}/sitemap.xml`,
        "",
      ].join("\n")
    : ["User-Agent: *", "Disallow: /", "", `Host: ${BIM_ORIGIN}`, ""].join("\n");

  return new NextResponse(body, {
    status: 200,
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "private, no-cache, no-store, max-age=0, must-revalidate",
    },
  });
}
