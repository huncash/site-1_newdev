"use client";

import { BimTrustBadges } from "@/components/bim/BimTrustBadges";
import { bimLink } from "@/lib/links";
import { SITE_CONFIG } from "@/config/site-config";
import { trackConversion } from "@/lib/conversion";
import { cn } from "@/lib/utils";

export interface FooterLink {
  label: string;
  href: string;
  newTab?: boolean;
}

export interface FooterProps {
  className?: string;
  description?: string;
  brandName?: string;
  brandTagline?: string;
  brandSubline?: string;
  foundedYear?: number;
  catalogLinks?: FooterLink[];
  aboutLinks?: FooterLink[];
  variant?: "main" | "bim";
  linkPrefix?: string;
  ctaHref?: string;
}

const DEFAULT_LINKS: FooterLink[] = [
  { label: "Csomagok", href: "/csomagok" },
  { label: "GYIK", href: "/gyik" },
  { label: "Blog", href: "/blog" },
  { label: "Kapcsolat", href: "/ajanlat" },
  { label: "Partner belépés", href: "/partner/login" },
  {
    label: "Mérnöki lézerszkennelés és BIM (bim.vrgo.hu)",
    href: bimLink("/", "footer"),
  },
];

const LEGAL_LINKS: FooterLink[] = [
  { label: "ÁSZF", href: "/aszf" },
  { label: "Adatvédelem", href: "/adatvedelem" },
  { label: "AI átláthatóság", href: "/ai-atlathatosag" },
];

const BIM_LEGAL_LINKS: FooterLink[] = [
  { label: "ÁSZF", href: "https://vrgo.hu/aszf" },
  { label: "Adatvédelem", href: "https://vrgo.hu/adatvedelem" },
  { label: "AI átláthatóság", href: "https://vrgo.hu/ai-atlathatosag" },
];

function prefixed(path: string, linkPrefix: string) {
  if (!linkPrefix || /^(https?:|mailto:|tel:|#)/.test(path)) return path;
  const q = path.indexOf("?");
  const pathname = q === -1 ? path : path.slice(0, q);
  const search = q === -1 ? "" : path.slice(q);
  const base = pathname === "/" ? linkPrefix : `${linkPrefix}${pathname}`;
  return `${base}${search}`;
}

function BIM_PAGE_LINKS(linkPrefix: string, quoteHref: string): FooterLink[] {
  return [
    { label: "Ipari felmérés", href: prefixed("/ipari-felmeres", linkPrefix) },
    { label: "BIM-modellezőknek", href: prefixed("/scan-to-bim-kapacitas", linkPrefix) },
    { label: "Munkafolyamat", href: prefixed("/munkafolyamat", linkPrefix) },
    { label: "Rólunk", href: prefixed("/rolunk", linkPrefix) },
    { label: "Blog", href: prefixed("/cikkek", linkPrefix) },
    { label: "GYIK", href: prefixed("/gyik", linkPrefix) },
    { label: "Kapcsolat", href: quoteHref },
    { label: "Partner belépés", href: "https://vrgo.hu/partner/login" },
  ];
}

const LINKEDIN_URL = "https://www.linkedin.com/company/vrgo";

function FooterLinkList({ items }: { items: readonly FooterLink[] }) {
  return (
    <ul className="mt-3 space-y-2 text-sm opacity-90">
      {items.map((item) => (
        <li key={`${item.href}-${item.label}`}>
          <a
            href={item.href}
            className="hover:underline"
            target={item.newTab ? "_blank" : undefined}
            rel={item.newTab ? "noopener noreferrer" : undefined}
            onClick={() => {
              if (item.href.includes("bim.vrgo.hu")) {
                trackConversion("bim_cta_click", { forras: "footer" });
              }
            }}
          >
            {item.label}
          </a>
        </li>
      ))}
    </ul>
  );
}

export function Footer({
  className,
  description =
    "Bejárható 3D túra, méretezett alaprajz és megjelenés a Google Térképen és Utcaképen — üzleteknek, szállásoknak, irodáknak, ingatlanoknak.",
  brandName = SITE_CONFIG.name,
  brandTagline,
  brandSubline,
  foundedYear = 2016,
  catalogLinks = [],
  aboutLinks = DEFAULT_LINKS,
  variant = "main",
  linkPrefix = "",
  ctaHref,
}: FooterProps) {
  const year = new Date().getFullYear();
  const bim = variant === "bim";
  const quoteHref =
    ctaHref ??
    (bim ? prefixed("/kapcsolat?forras=footer", linkPrefix) : "/ajanlat?forras=footer");
  const aiHref = bim ? "https://vrgo.hu/ai-atlathatosag" : "/ai-atlathatosag";
  const links = bim
    ? BIM_PAGE_LINKS(linkPrefix, quoteHref)
    : catalogLinks.length > 0
      ? [...aboutLinks, ...catalogLinks]
      : aboutLinks;
  const legal = bim ? BIM_LEGAL_LINKS : LEGAL_LINKS;

  return (
    <footer className={cn("bg-section-dark text-section-dark-foreground", className)}>
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 md:grid-cols-2">
        <div>
          <div className="text-xl font-bold">{brandName}</div>
          <p className="mt-2 text-sm opacity-80">{description}</p>
          {brandTagline ? <p className="mt-2 text-sm opacity-70">{brandTagline}</p> : null}
          {brandSubline ? <p className="mt-1 text-xs opacity-60">{brandSubline}</p> : null}
        </div>

        {/* Oldalak + Jogi: mindig legalább 2 oszlop — kisebb magasság */}
        <div className="grid grid-cols-2 gap-6">
          <div>
            <div className="text-sm font-semibold uppercase tracking-wider">Oldalak</div>
            <FooterLinkList items={links} />
          </div>
          <div>
            <div className="text-sm font-semibold uppercase tracking-wider">Jogi szekció</div>
            <FooterLinkList items={legal} />
            {bim ? <BimTrustBadges size="footer" /> : null}
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-4 py-4 text-xs opacity-80 sm:flex-row">
          <div className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-center sm:text-left">
            <span>
              © Copyright {foundedYear} - {year}
            </span>
            <span aria-hidden="true">|</span>
            <span>Minden jog fenntartva.</span>
            <span aria-hidden="true">|</span>
            <a href={aiHref} className="hover:underline">
              AI Act 50. cikk — átláthatóság
            </a>
            <span aria-hidden="true">|</span>
            <a href={quoteHref} className="hover:underline">
              {bim
                ? "Küldje el a feladat leírását vagy az EIR-t, módszertant és árajánlatot adunk."
                : "Kérdése van? Ajánlatot kérek"}
            </a>
          </div>
          <a
            href={LINKEDIN_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn profilunk"
            className="opacity-90 transition hover:opacity-100"
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-hidden="true">
              <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.47-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45zM22 0H2C.9 0 0 .9 0 2v20c0 1.1.9 2 2 2h20c1.1 0 2-.9 2-2V2c0-1.1-.9-2-2-2z" />
            </svg>
          </a>
        </div>
      </div>
    </footer>
  );
}
