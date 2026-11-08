export type MenuLink = {
  label: string;
  href: string;
};

export type MenuItem =
  | MenuLink
  | {
      label: string;
      children: readonly MenuLink[];
    };

/** Primary nav — vrgo.hu (Matterport 3D túra). */
export const MENU_ITEMS: readonly MenuItem[] = [
  { label: "Csomagok", href: "/csomagok" },
  { label: "Blog", href: "/blog" },
  { label: "GYIK", href: "/gyik" },
  { label: "Kapcsolat", href: "/ajanlat" },
];

/** Állami BIM-hub — egyetlen menübejegyzés a Megoldások alatt. */
export const BIM_STATE_HUB_HREF = "/megoldasok/allami-beruhazasok-es-bim-eloirasok";
export const BIM_STATE_HUB_LABEL = "Állami BIM";

/** BIM-modellezők kapacitás-landing. */
export const BIM_MODELER_HREF = "/scan-to-bim-kapacitas";

/** Ipari felmérés fő landing. */
export const BIM_INDUSTRIAL_HREF = "/ipari-felmeres";

/**
 * bim.vrgo.hu menü — rövid B2B tölcsér + Blog (meglévő /cikkek).
 * Célpiaci oldalak a Megoldások alatt; Ajánlatkérés a Navbar CTA.
 */
export const BIM_MENU: readonly MenuItem[] = [
  {
    label: "Megoldások",
    children: [
      { label: "Ipari felmérés", href: BIM_INDUSTRIAL_HREF },
      { label: "Tervezőknek", href: "/tervezoknek" },
      { label: "BIM-modellezőknek", href: BIM_MODELER_HREF },
      { label: "Felújítás előtt", href: "/megoldasok#felujitas" },
      { label: "Kivitelezés követése", href: "/kivitelezes" },
      { label: "Átadási dokumentáció", href: "/megoldasok#as-built" },
      { label: "Üzemeltetési frissítés", href: "/uzemeltetes" },
      { label: BIM_STATE_HUB_LABEL, href: BIM_STATE_HUB_HREF },
      { label: "Lakossági felmérés", href: "/lakossagi-felmeres" },
    ],
  },
  { label: "Munkafolyamat", href: "/munkafolyamat" },
  { label: "Blog", href: "/cikkek" },
  { label: "GYIK", href: "/gyik" },
  { label: "Kapcsolat", href: "/kapcsolat" },
];

export function isMenuGroup(
  item: MenuItem
): item is { label: string; children: readonly MenuLink[] } {
  return "children" in item;
}

/** Az állami hub és a rendelet-oldal a Megoldások csoport alatt aktív. */
export function isBimMegoldasokPath(pathname: string): boolean {
  const p = pathname.replace(/^\/bim/, "") || "/";
  return (
    p === "/megoldasok" ||
    p.startsWith("/megoldasok/") ||
    p === "/ekm-rendelet" ||
    p === "/kivitelezes" ||
    p === "/uzemeltetes" ||
    p === "/meglevo-allami-epuletek" ||
    p === BIM_INDUSTRIAL_HREF ||
    p === "/tervezoknek" ||
    p === BIM_MODELER_HREF ||
    p === "/lakossagi-felmeres" ||
    p === "/szolgaltatasok" ||
    p.startsWith("/szolgaltatasok/") ||
    p === "/ipari-letesitmenyek" ||
    p === "/lakossagnak"
  );
}

export function isBimSzolgaltatasokPath(pathname: string): boolean {
  return isBimMegoldasokPath(pathname);
}
