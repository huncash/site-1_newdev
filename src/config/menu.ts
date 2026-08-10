/** Primary nav — every item must resolve to a real page/section. */
export const MENU_ITEMS = [
  { label: "Főoldal", href: "/" },
  { label: "Oktatás", href: "/szegmens/oktatas" },
  { label: "Ipar / IoT", href: "/szegmens/ipar-iot" },
  { label: "Facility", href: "/szegmens/facility" },
  { label: "Egyesített túra", href: "/szegmens/egyesitett-tura" },
  { label: "Csomagok", href: "/#csomagok" },
  { label: "Blog", href: "/blog" },
  { label: "Ajánlatkérés", href: "/ajanlat" },
] as const;
