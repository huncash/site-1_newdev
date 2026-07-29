"use client";

import { COMPANY_INFO } from "@/config/company-data";
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

export function Footer({
  className,
  description,
  brandName = COMPANY_INFO.name,
  brandTagline,
  brandSubline,
  foundedYear = 2006,
  catalogLinks = [],
  aboutLinks = [],
}: FooterProps) {
  const year = new Date().getFullYear();
  const partnerLink: FooterLink = {
    label: "Partner oldal / Belépés",
    href: "/partner/login",
  };
  const resolvedAboutLinks = [
    ...aboutLinks.filter((l) => l.href !== partnerLink.href),
    partnerLink,
  ];

  return (
    <footer className={cn("border-t bg-muted/40 text-sm", className)}>
      <div className="mx-auto max-w-7xl px-4 py-10">
        {description ? (
          <p className="mb-8 text-muted-foreground">{description}</p>
        ) : null}

        <div className="grid gap-10 md:grid-cols-3">
          <div className="flex flex-col gap-3">
            <div className="flex flex-col gap-1">
              <p className="text-xs text-muted-foreground">EST. {foundedYear}</p>
              <p className="text-base font-bold text-foreground">{brandName}</p>
            </div>
            {brandTagline ? (
              <p className="text-muted-foreground">{brandTagline}</p>
            ) : null}
            {brandSubline ? (
              <p className="text-xs text-muted-foreground">{brandSubline}</p>
            ) : null}
          </div>

          {catalogLinks.length > 0 ? (
            <div className="flex flex-col gap-3">
              <p className="font-semibold text-foreground">Teljes katalógus</p>
              <ul className="flex flex-col gap-2">
                {catalogLinks.map((item) => (
                  <li key={item.href}>
                    <a href={item.href} className="text-muted-foreground hover:text-foreground">
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}

          <div className="flex flex-col gap-3">
            <p className="font-semibold text-foreground">Rólunk</p>
            <ul className="flex flex-col gap-2">
              {resolvedAboutLinks.map((item) => (
                <li key={item.href}>
                  <a href={item.href} className="text-muted-foreground hover:text-foreground">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-2 px-4 py-4 text-xs text-muted-foreground">
          <span>© Copyright {foundedYear} – {year} | Minden jog fenntartva.</span>
          <a href={`mailto:${SITE_CONFIG.publicEmail}`} className="hover:text-foreground">
            Kérdése van? Írj nekünk!
          </a>
        </div>
      </div>
    </footer>
  );
}
