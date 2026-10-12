import { bimLink } from "@/lib/links";

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
  { label: "BIM", href: bimLink("/", "header") },
];

/** bim.vrgo.hu menüsor. Az útvonalak a BIM hoston élnek; localhoston a layout előtagozza. */
export const BIM_MENU: readonly MenuItem[] = [
  {
    label: "Megoldások",
    children: [
      { label: "Meglévő állami épületek", href: "/meglevo-allami-epuletek" },
      { label: "Kivitelezés", href: "/kivitelezes" },
      { label: "Üzemeltetés", href: "/uzemeltetes" },
      { label: "Tervezőknek", href: "/tervezoknek" },
    ],
  },
  { label: "Rendelet", href: "/ekm-rendelet" },
  { label: "Pontosság és formátumok", href: "/pontossag-es-formatumok" },
  { label: "Cikkek", href: "/cikkek" },
  { label: "Mit jelent a BIM?", href: "/mi-az-a-bim" },
  { label: "GYIK", href: "/gyik" },
];

export function isMenuGroup(
  item: MenuItem
): item is { label: string; children: readonly MenuLink[] } {
  return "children" in item;
}
