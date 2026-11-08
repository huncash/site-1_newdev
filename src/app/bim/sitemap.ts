import type { MetadataRoute } from "next";

import { listPublishedBimArticles } from "@/lib/bim-articles";
import { BIM_ORIGIN } from "@/lib/bim-site";

const STATIC_PATHS = [
  "/",
  "/ipari-felmeres",
  "/tervezoknek",
  "/scan-to-bim-kapacitas",
  "/lakossagi-felmeres",
  "/munkafolyamat",
  "/kapcsolat",
  "/gyik",
  "/megoldasok",
  "/megoldasok/allami-beruhazasok-es-bim-eloirasok",
  "/szolgaltatasok",
  "/szolgaltatasok/dronos-felmeres",
  "/szolgaltatasok/georeferalas-eov",
  "/szolgaltatasok/bim-modellezes",
  "/pontossag-es-formatumok",
  "/kivitelezes",
  "/uzemeltetes",
  "/meglevo-allami-epuletek",
  "/ekm-rendelet",
  "/mi-az-a-bim",
  "/referenciak",
  "/cikkek",
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const staticEntries: MetadataRoute.Sitemap = STATIC_PATHS.map((path) => ({
    url: path === "/" ? `${BIM_ORIGIN}/` : `${BIM_ORIGIN}${path}`,
    lastModified: now,
    changeFrequency: path === "/" ? "weekly" : "monthly",
    priority:
      path === "/"
        ? 1
        : path === "/ipari-felmeres" || path === "/scan-to-bim-kapacitas" || path === "/kapcsolat"
          ? 0.9
          : 0.7,
  }));

  const articles = listPublishedBimArticles().map((article) => ({
    url: `${BIM_ORIGIN}/cikkek/${article.slug}`,
    lastModified: new Date(`${article.date}T12:00:00`),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...staticEntries, ...articles];
}
