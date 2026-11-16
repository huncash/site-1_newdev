import type { MetadataRoute } from "next";

import { bimPublicIndexingAllowed, BIM_ORIGIN } from "@/config/bim-seo";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

/**
 * Fallback MetadataRoute at /bim/robots.txt.
 * Éles bim host: middleware → /bim/seo-robots (explicit text/plain).
 */
export default function robots(): MetadataRoute.Robots {
  const allowIndex = bimPublicIndexingAllowed();

  if (!allowIndex) {
    return {
      rules: [{ userAgent: "*", disallow: "/" }],
      host: BIM_ORIGIN,
    };
  }

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin", "/api/", "/partner/"],
      },
    ],
    sitemap: `${BIM_ORIGIN}/sitemap.xml`,
    host: BIM_ORIGIN,
  };
}
