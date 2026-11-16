import type { MetadataRoute } from "next";

import { bimPublicIndexingAllowed } from "@/config/bim-seo";
import { BIM_ORIGIN } from "@/lib/bim-site";

export const dynamic = "force-dynamic";

/** bim.vrgo.hu robots — rewrite: /robots.txt → /bim/robots.txt */
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
