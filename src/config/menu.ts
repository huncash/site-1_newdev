import {
  BIM_INDUSTRIAL_HREF,
  BIM_MODELER_HREF,
  BIM_SOLUTIONS,
  BIM_SOLUTIONS_HUB_HREF,
  BIM_STATE_HUB_HREF,
  BIM_STATE_HUB_LABEL,
} from "@/lib/bim-solutions";

export type MenuLink = {
  label: string;
  href: string;
};

export type MenuGroup = {
  label: string;
  /** Gyűjtőoldal — a felirat erre navigál; a nyíl nyitja az almenüt. */
  href: string;
  children: readonly MenuLink[];
};

export type MenuItem = MenuLink | MenuGroup;

/** Primary nav — vrgo.hu (Matterport 3D túra). */
export const MENU_ITEMS: readonly MenuItem[] = [
  { label: "Csomagok", href: "/csomagok" },
  { label: "Blog", href: "/blog" },
  { label: "GYIK", href: "/gyik" },
  { label: "Kapcsolat", href: "/ajanlat" },
];

export {
  BIM_INDUSTRIAL_HREF,
  BIM_MODELER_HREF,
  BIM_SOLUTIONS_HUB_HREF,
  BIM_STATE_HUB_HREF,
  BIM_STATE_HUB_LABEL,
};

/**
 * bim.vrgo.hu menü — rövid B2B szerkezet + Blog (meglévő /cikkek).
 * Célpiaci oldalak a Megoldások alatt; Ajánlatkérés a Navbar CTA.
 */
export const BIM_MENU: readonly MenuItem[] = [
  {
    label: "Megoldások",
    href: BIM_SOLUTIONS_HUB_HREF,
    children: BIM_SOLUTIONS.map((item) => ({
      label: item.menuLabel ?? item.title,
      href: item.href,
    })),
  },
  { label: "Munkafolyamat", href: "/munkafolyamat" },
  { label: "Rólunk", href: "/rolunk" },
  { label: "Blog", href: "/cikkek" },
  { label: "GYIK", href: "/gyik" },
  { label: "Kapcsolat", href: "/kapcsolat" },
];

export function isMenuGroup(item: MenuItem): item is MenuGroup {
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
