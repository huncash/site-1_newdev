"use client";

import { SITE_CONFIG } from "@/config/site-config";
import { cn } from "@/lib/utils";

export interface FooterLink {
  label: string;
  href: string;
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
}

const DEFAULT_LINKS: FooterLink[] = [
  { label: "Főoldal", href: "/" },
  { label: "Csomagok", href: "/#csomagok" },
  { label: "Blog", href: "/blog" },
  { label: "Ajánlatkérés", href: "/ajanlat" },
  { label: "Partner belépés", href: "/partner/login" },
  { label: "ÁSZF", href: "/aszf" },
  { label: "Adatvédelem", href: "/adatvedelem" },
  { label: "AI átláthatóság", href: "/ai-atlathatosag" },
];

const SOCIAL_LINKS = {
  facebook: "https://www.facebook.com/vrgo.hu",
  pinterest: "https://www.pinterest.com/vrgohu/",
  linkedin: "https://www.linkedin.com/company/vrgo",
};

function PinterestIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.401.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.354-.629-2.758-1.379l-.749 2.848c-.269 1.045-1.004 2.352-1.498 3.146 1.123.345 2.306.535 3.55.535 6.607 0 11.985-5.365 11.985-11.987C23.97 5.39 18.592.026 12.017.026z" />
    </svg>
  );
}

export function Footer({
  className,
  description = "Bejárható 3D fotózás, virtuális túra, Google Utcakép, VR és 360° panoráma — üzleti felhasználásra.",
  brandName = SITE_CONFIG.name,
  brandTagline,
  brandSubline,
  foundedYear = 2016,
  catalogLinks = [],
  aboutLinks = DEFAULT_LINKS,
}: FooterProps) {
  const year = new Date().getFullYear();
  const links =
    catalogLinks.length > 0
      ? [...aboutLinks, ...catalogLinks]
      : aboutLinks;

  return (
    <footer className={cn("bg-section-dark text-section-dark-foreground", className)}>
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 md:grid-cols-2">
        <div>
          <div className="text-xl font-bold">{brandName}</div>
          <p className="mt-2 text-sm opacity-80">{description}</p>
          {brandTagline ? <p className="mt-2 text-sm opacity-70">{brandTagline}</p> : null}
          {brandSubline ? <p className="mt-1 text-xs opacity-60">{brandSubline}</p> : null}
        </div>
        <div>
          <div className="text-sm font-semibold uppercase tracking-wider">Oldalak</div>
          <ul className="mt-3 space-y-2 text-sm opacity-90">
            {links.map((item) => (
              <li key={`${item.href}-${item.label}`}>
                <a href={item.href} className="hover:underline">
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-4 py-4 text-xs opacity-80 sm:flex-row">
          <div className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-center sm:text-left">
            <span>© Copyright {foundedYear} - {year}</span>
            <span aria-hidden="true">|</span>
            <span>Minden jog fenntartva.</span>
            <span aria-hidden="true">|</span>
            <a href="/ai-atlathatosag" className="hover:underline">
              AI Act 50. cikk — átláthatóság
            </a>
            <span aria-hidden="true">|</span>
            <a href="/ajanlat?forras=footer" className="hover:underline">
              Kérdésed van? Ajánlatot kérek
            </a>
          </div>
          <div className="flex items-center gap-3">
            <a
              href={SOCIAL_LINKS.facebook}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook profilunk"
              className="opacity-90 transition hover:opacity-100"
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-hidden="true">
                <path d="M22 12.07C22 6.5 17.52 2 12 2S2 6.5 2 12.07c0 5.02 3.66 9.18 8.44 9.93v-7.03H7.9v-2.9h2.54V9.84c0-2.5 1.49-3.89 3.77-3.89 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56v1.87h2.78l-.44 2.9h-2.34V22c4.78-.75 8.44-4.91 8.44-9.93z" />
              </svg>
            </a>
            <a
              href={SOCIAL_LINKS.pinterest}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Pinterest profilunk"
              className="opacity-90 transition hover:opacity-100"
            >
              <PinterestIcon className="h-4 w-4" />
            </a>
            <a
              href={SOCIAL_LINKS.linkedin}
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
      </div>
    </footer>
  );
}
