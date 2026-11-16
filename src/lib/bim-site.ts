import type { Metadata } from "next";

import {
  BIM_ORIGIN,
  BIM_SEO,
  MAIN_ORIGIN,
  bimOgImageAbsoluteUrl,
  bimPublicIndexingAllowed,
  bimRobotsMetadata,
} from "@/config/bim-seo";

export { BIM_ORIGIN, MAIN_ORIGIN };

/** A 31/2024. (VIII. 22.) ÉKM rendelet 2026. január 1-jén hatályos szövege. */
export const NJT_URL = "https://njt.jog.gov.hu/jogszabaly/2024-31-20-8X";
export const DECREE_CHECKED = "2026. október 12.";

/** Footer / belső listák — a főmenü a BIM_MENU. */
export const BIM_NAV = [
  { href: "/megoldasok", label: "Megoldások" },
  { href: "/ipari-felmeres", label: "Ipari felmérés" },
  { href: "/scan-to-bim-kapacitas", label: "BIM-modellezőknek" },
  { href: "/tervezoknek", label: "Tervezőknek" },
  { href: "/lakossagi-felmeres", label: "Lakás- és házfelmérés" },
  { href: "/munkafolyamat", label: "Munkafolyamat" },
  { href: "/rolunk", label: "Rólunk" },
  { href: "/kivitelezes", label: "Kivitelezés" },
  { href: "/uzemeltetes", label: "Üzemeltetés" },
  { href: "/meglevo-allami-epuletek", label: "Állami épületek" },
  {
    href: "/megoldasok/allami-beruhazasok-es-bim-eloirasok",
    label: "Állami BIM",
  },
  { href: "/ekm-rendelet", label: "Állami BIM-előírások egy oldalon" },
  { href: "/pontossag-es-formatumok", label: "Pontosság" },
  { href: "/technologia-es-minoseg", label: "Technológia és minőség" },
  { href: "/referenciak", label: "Referenciák" },
  { href: "/cikkek", label: "Blog" },
  { href: "/gyik", label: "GYIK" },
  { href: "/kapcsolat", label: "Kapcsolat" },
] as const;

/** 2. melléklet, 2026.01.01. hatályos szöveg. */
export const USE_CASES: readonly (readonly [string, string])[] = [
  ["010", "Meglévő állapot és környezet rögzítése"],
  ["020", "Tervváltozatok vizsgálata"],
  ["030", "Vizualizáció"],
  ["040", "Méretezés és ellenőrzés"],
  ["050", "Szakágak koordinációja"],
  ["060", "Tervezés előrehaladásának felügyelete"],
  ["070", "Koncepció- és tanulmányterv, valamint engedélyezési és kiviteli dokumentáció előállítása"],
  ["080", "Munka- és egészségvédelmi tervezés és ellenőrzés"],
  ["090", "Tervjóváhagyások"],
  ["100", "Költségbecslés és költségszámítás"],
  ["110", "Tenderkiírás"],
  ["120", "Kivitelezés ütemtervezése"],
  ["130", "Organizációs terv előállítása"],
  ["140", "Kivitelezéshez kapcsolódó részletterv előállítása"],
  ["150", "Kivitelezés előrehaladásának követése"],
  ["160", "Változáskövetés tervváltozatok esetén"],
  ["170", "Építőipari kivitelezési tevékenység teljesítésének elszámolása"],
  ["180", "Hibakövetés"],
  ["190", "Megvalósulási dokumentáció előállítása"],
  ["200", "Üzemeltetés és karbantartás"],
  ["210", "Gépvezérlés"],
  ["220", "Jogérvényesítésre vonatkozó modell alapú megfelelés"],
  ["230", "Energetikai vizsgálatok, különböző szimulációk és karbonlábnyom-vizsgálat"],
  ["240", "ESG szempontok szerinti vizsgálatok"],
  ["250", "Fenntarthatósági szempontok vizsgálata és elemzése"],
];

export const QUOTE_USE_CASE_CODES = ["010", "150", "170", "180", "190", "200"] as const;

export function bimCanonical(path: string): string {
  if (!path.startsWith("/")) {
    throw new Error(`bimCanonical: path must start with /, got ${path}`);
  }
  return path === "/" ? `${BIM_ORIGIN}/` : `${BIM_ORIGIN}${path}`;
}

export function bimMetadata(
  path: string,
  title: string,
  description: string,
  options?: {
    ogImagePath?: string;
    ogImageAlt?: string;
    type?: "website" | "article";
  }
): Metadata {
  const canonical = bimCanonical(path);
  const imagePath = options?.ogImagePath ?? BIM_SEO.ogImagePath;
  const imageUrl = imagePath.startsWith("http") ? imagePath : `${BIM_ORIGIN}${imagePath}`;
  const imageAlt = options?.ogImageAlt ?? BIM_SEO.ogImageAlt;
  const robots = bimRobotsMetadata();

  return {
    metadataBase: new URL(BIM_ORIGIN),
    title: { absolute: title },
    description,
    alternates: { canonical },
    robots,
    openGraph: {
      type: options?.type ?? "website",
      url: canonical,
      title,
      description,
      locale: BIM_SEO.locale,
      siteName: BIM_SEO.siteName,
      images: [
        {
          url: imageUrl,
          width: BIM_SEO.ogImageWidth,
          height: BIM_SEO.ogImageHeight,
          alt: imageAlt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imageUrl],
    },
  };
}

export function bimLayoutMetadata(): Metadata {
  const robots = bimRobotsMetadata();
  return {
    metadataBase: new URL(BIM_ORIGIN),
    title: {
      default: BIM_SEO.defaultTitle,
      template: `%s | ${BIM_SEO.siteName}`,
    },
    description: BIM_SEO.defaultDescription,
    applicationName: BIM_SEO.siteName,
    icons: {
      icon: [
        { url: "/bim/favicon.ico", sizes: "any" },
        { url: "/bim/favicon-32.png", sizes: "32x32", type: "image/png" },
        { url: "/bim/favicon-16.png", sizes: "16x16", type: "image/png" },
        { url: "/bim/icon.svg", type: "image/svg+xml" },
      ],
      apple: [{ url: "/bim/apple-touch-icon.png", sizes: "180x180" }],
    },
    robots,
    openGraph: {
      type: "website",
      siteName: BIM_SEO.siteName,
      locale: BIM_SEO.locale,
      url: `${BIM_ORIGIN}/`,
      title: BIM_SEO.defaultTitle,
      description: BIM_SEO.defaultDescription,
      images: [
        {
          url: bimOgImageAbsoluteUrl(),
          width: BIM_SEO.ogImageWidth,
          height: BIM_SEO.ogImageHeight,
          alt: BIM_SEO.ogImageAlt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: BIM_SEO.defaultTitle,
      description: BIM_SEO.defaultDescription,
      images: [bimOgImageAbsoluteUrl()],
    },
    other: bimPublicIndexingAllowed()
      ? undefined
      : {
          // Extra signal for crawlers when env gate is off (staging/local).
          googlebot: "noindex, nofollow",
        },
  };
}
