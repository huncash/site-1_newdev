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

/** Primary nav — Szegmensek almenüvel. */
export const MENU_ITEMS: readonly MenuItem[] = [
  {
    label: "Szegmensek",
    children: [
      { label: "Oktatás", href: "/megoldasok/oktatas" },
      { label: "Ipar / IoT", href: "/megoldasok/ipari-iot" },
      { label: "Facility", href: "/megoldasok/facility" },
    ],
  },
  { label: "Csomagok", href: "/csomagok" },
  { label: "Blog", href: "/blog" },
  { label: "GYIK", href: "/gyik" },
  { label: "Kapcsolat", href: "/ajanlat" },
];

/** Állami BIM-hub — egyetlen menübejegyzés a Megoldások alatt. */
export const BIM_STATE_HUB_HREF = "/megoldasok/allami-beruhazasok-es-bim-eloirasok";
export const BIM_STATE_HUB_LABEL = "Állami beruházások és BIM-előírások";

/**
 * bim.vrgo.hu menü — georeferált téradat pozicionálás.
 * Az állami téma csak a Megoldások alatt, egyszer.
 */
export const BIM_MENU: readonly MenuItem[] = [
  {
    label: "Megoldások",
    children: [
      { label: "Felújítás és tervezés előtti felmérés", href: "/megoldasok#felujitas" },
      { label: "Megvalósulási (as-built) dokumentáció", href: "/megoldasok#as-built" },
      { label: "Kivitelezés követése", href: "/megoldasok#kivitelezes" },
      { label: "Üzemeltetés és éves digitális iker", href: "/megoldasok#uzemeltetes" },
      { label: "Ipari layout és ütközésvizsgálat", href: "/megoldasok#ipar" },
      { label: BIM_STATE_HUB_LABEL, href: BIM_STATE_HUB_HREF },
    ],
  },
  {
    label: "Szolgáltatások",
    children: [
      { label: "Összes szolgáltatás", href: "/szolgaltatasok" },
      { label: "Lakás- és házfelmérés", href: "/szolgaltatasok/lakas-es-hazfelmeres" },
      { label: "Tervezőknek és kivitelezőknek", href: "/szolgaltatasok/tervezoknek-es-kivitelezoknek" },
      { label: "Ipari létesítmények és csarnokok", href: "/szolgaltatasok/ipari-letesitmenyek" },
      { label: "Drónos felmérés", href: "/szolgaltatasok/dronos-felmeres" },
      { label: "Georeferálás és EOV-bekötés", href: "/szolgaltatasok/georeferalas-eov" },
      { label: "BIM-modellezés és 2D tervek", href: "/szolgaltatasok/bim-modellezes" },
      { label: "Árak és folyamat", href: "/arak-es-folyamat" },
      { label: "Pontosság és formátumok", href: "/pontossag-es-formatumok" },
    ],
  },
  { label: "Cikkek", href: "/cikkek" },
  { label: "Referenciák", href: "/referenciak" },
  { label: "GYIK", href: "/gyik" },
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
    p === "/meglevo-allami-epuletek"
  );
}

export function isBimSzolgaltatasokPath(pathname: string): boolean {
  const p = pathname.replace(/^\/bim/, "") || "/";
  return (
    p === "/szolgaltatasok" ||
    p.startsWith("/szolgaltatasok/") ||
    p === "/arak-es-folyamat" ||
    p === "/pontossag-es-formatumok" ||
    p === "/tervezoknek" ||
    p === "/lakossagnak" ||
    p === "/ipari-letesitmenyek"
  );
}
