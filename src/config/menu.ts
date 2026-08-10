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
  { label: "Egyesített túra", href: "/egyesitett-tura" },
  { label: "Csomagok", href: "/csomagok" },
  { label: "Blog", href: "/blog" },
  { label: "GYIK", href: "/gyik" },
  { label: "Kapcsolat", href: "/ajanlat" },
];

export function isMenuGroup(
  item: MenuItem
): item is { label: string; children: readonly MenuLink[] } {
  return "children" in item;
}
