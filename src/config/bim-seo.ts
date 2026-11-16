import { COMPANY_INFO } from "@/config/company-data";

/** Mindig konstans — soha ne Host headerből. */
export const BIM_ORIGIN = "https://bim.vrgo.hu";
export const MAIN_ORIGIN = "https://vrgo.hu";

/**
 * bim.vrgo.hu SEO / szervezeti azonosítás — host-kötött, soha ne Host headerből.
 * A jogi szolgáltató (ADP-TOP) és a WebSite márka (VRGO BIM) szándékosan külön.
 */

export const BIM_SEO = {
  siteName: "VRGO BIM",
  siteUrl: BIM_ORIGIN,
  defaultTitle: "Ipari és épületfelmérés, pontfelhő | VRGO BIM",
  defaultDescription:
    "Meglévő épületek és ipari terek 3D felmérése tervezéshez és BIM-hez. Pontfelhő, egyeztetett dokumentáció, szakmai módszertan és referenciák.",
  ogImagePath: "/bim/og-default.jpg",
  ogImageWidth: 1200,
  ogImageHeight: 630,
  ogImageAlt: "VRGO BIM — 3D téradatok tervezéshez és BIM-hez",
  locale: "hu_HU",
  /** Közös jogi szolgáltató @id — a vrgo.hu ellenőrzött szervezeti azonosítója. */
  legalOrganizationId: `${MAIN_ORIGIN}/#organization`,
  legalOrganizationName: COMPANY_INFO.name,
  websiteId: `${BIM_ORIGIN}/#website`,
  brandOrganizationId: `${BIM_ORIGIN}/#brand`,
  serviceId: `${BIM_ORIGIN}/#service-survey`,
  /**
   * sameAs: csak ellenőrzött, ugyanahhoz a jogi szervezethez tartozó profilok.
   * Üres = ne renderelj sameAs-t. Tulajdonosi jóváhagyás után tölthető.
   */
  sameAs: [] as readonly string[],
  /**
   * Google Cégprofil / Maps URL — csak ellenőrzött profil, UTM nélkül a strukturált adatban.
   * Üres = ne jelenjen meg.
   */
  googleBusinessProfileUrl: "",
  /** Sitemap lastmod — csak tartalomváltáskor emeld (ne buildenként). */
  sitemapLastmod: "2026-11-16",
} as const;

/**
 * Éles BIM-indexelés csak kifejezett env-nel (staging/localhost noindex).
 * Csak bim robots/sitemap/metadata olvassa — vrgo.hu nem.
 */
export function bimPublicIndexingAllowed(): boolean {
  return process.env.ALLOW_PUBLIC_INDEXING === "1";
}

export function bimOgImageAbsoluteUrl(): string {
  return `${BIM_ORIGIN}${BIM_SEO.ogImagePath}`;
}

export function bimRobotsMetadata(): { index: boolean; follow: boolean } {
  const allow = bimPublicIndexingAllowed();
  return { index: allow, follow: allow };
}
