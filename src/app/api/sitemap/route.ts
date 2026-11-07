import { NextResponse } from "next/server";

/** vrgo.hu crawlolható URL-ek — robots.txt: /api/sitemap */
const PATHS = [
  "/",
  "/csomagok",
  "/csomagok/megrendeles",
  "/ajanlat",
  "/gyik",
  "/blog",
  "/megoldasok/oktatas",
  "/megoldasok/facility",
  "/megoldasok/kampusz",
  "/megoldasok/ipari-iot",
  "/partner/login",
  "/aszf",
  "/adatvedelem",
  "/ai-atlathatosag",
] as const;

export function GET() {
  const lastmod = new Date().toISOString().slice(0, 10);
  const urls = PATHS.map(
    (path) => `  <url>
    <loc>https://vrgo.hu${path === "/" ? "/" : path}</loc>
    <lastmod>${lastmod}</lastmod>
  </url>`
  ).join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;

  return new NextResponse(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
