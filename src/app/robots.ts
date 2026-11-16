import type { MetadataRoute } from "next";

/** vrgo.hu robots — nem érinti a bim hostot (ott /bim/robots.ts). */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin", "/api/admin", "/partner/"],
      },
    ],
    sitemap: "https://vrgo.hu/api/sitemap",
    host: "https://vrgo.hu",
  };
}
