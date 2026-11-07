import type { MetadataRoute } from "next";

import { listPublishedBimArticles } from "@/lib/bim-articles";
import { BIM_ORIGIN } from "@/lib/bim-site";

const STATIC_PATHS = [
  "/",
  "/szolgaltatasok",
  "/szolgaltatasok/lakas-es-hazfelmeres",
  "/szolgaltatasok/tervezoknek-es-kivitelezoknek",
  "/szolgaltatasok/ipari-letesitmenyek",
  "/szolgaltatasok/dronos-felmeres",
  "/szolgaltatasok/georeferalas-eov",
  "/szolgaltatasok/bim-modellezes",
  "/megoldasok",
  "/megoldasok/allami-beruhazasok-es-bim-eloirasok",
  "/arak-es-folyamat",
  "/pontossag-es-formatumok",
  "/lakossagnak",
  "/tervezoknek",
  "/ipari-letesitmenyek",
  "/kivitelezes",
  "/uzemeltetes",
  "/meglevo-allami-epuletek",
  "/ekm-rendelet",
  "/mi-az-a-bim",
  "/referenciak",
  "/cikkek",
  "/gyik",
  "/ajanlatkeres",
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const staticEntries: MetadataRoute.Sitemap = STATIC_PATHS.map((path) => ({
    url: path === "/" ? `${BIM_ORIGIN}/` : `${BIM_ORIGIN}${path}`,
    lastModified: now,
    changeFrequency: path === "/" ? "weekly" : "monthly",
    priority: path === "/" ? 1 : 0.7,
  }));

  const articles = listPublishedBimArticles().map((article) => ({
    url: `${BIM_ORIGIN}/cikkek/${article.slug}`,
    lastModified: new Date(`${article.date}T12:00:00`),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...staticEntries, ...articles];
}
