import type { Metadata } from "next";

/** A 31/2024. (VIII. 22.) ÉKM rendelet 2026. január 1-jén hatályos szövege. */
export const NJT_URL = "https://njt.jog.gov.hu/jogszabaly/2024-31-20-8X";
export const DECREE_CHECKED = "2026. október 12.";
export const BIM_ORIGIN = "https://bim.vrgo.hu";
export const MAIN_ORIGIN = "https://vrgo.hu";

export const BIM_NAV = [
  { href: "/ekm-rendelet", label: "Rendelet" },
  { href: "/meglevo-allami-epuletek", label: "Állami épületek" },
  { href: "/kivitelezes", label: "Kivitelezés" },
  { href: "/uzemeltetes", label: "Üzemeltetés" },
  { href: "/tervezoknek", label: "Tervezőknek" },
  { href: "/pontossag-es-formatumok", label: "Pontosság" },
  { href: "/referenciak", label: "Referencia" },
  { href: "/cikkek", label: "Cikkek" },
  { href: "/gyik", label: "GYIK" },
  { href: "/ajanlatkeres", label: "Ajánlat" },
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

export function bimMetadata(path: string, title: string, description: string): Metadata {
  const canonical = path === "/" ? `${BIM_ORIGIN}/` : `${BIM_ORIGIN}${path}`;
  return {
    title: { absolute: title },
    description,
    alternates: { canonical },
  };
}
