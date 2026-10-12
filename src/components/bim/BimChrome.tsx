"use client";

import { createContext, useContext, type ReactNode } from "react";
import Link from "next/link";

import { BIM_NAV, MAIN_ORIGIN } from "@/lib/bim-site";

const PrefixContext = createContext(false);

export function useBimPrefix(): boolean {
  return useContext(PrefixContext);
}

export function bimHref(path: string, prefix: boolean): string {
  if (!prefix) return path;
  return path === "/" ? "/bim" : `/bim${path}`;
}

export function BimLink({
  href,
  className,
  children,
}: {
  href: string;
  className?: string;
  children: ReactNode;
}) {
  const prefix = useBimPrefix();
  return (
    <Link href={bimHref(href, prefix)} className={className}>
      {children}
    </Link>
  );
}

export function BimChrome({
  prefix,
  children,
}: {
  prefix: boolean;
  children: ReactNode;
}) {
  return (
    <PrefixContext.Provider value={prefix}>
      <header className="border-b border-white/10 bg-section-dark text-section-dark-foreground">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-4 sm:flex-row sm:items-start sm:justify-between">
          <BimLink href="/" className="text-lg font-bold tracking-tight">
            VRGO BIM
          </BimLink>
          <nav className="flex flex-wrap gap-x-3 gap-y-2 text-[11px] font-semibold uppercase tracking-wide">
            {BIM_NAV.map((item) => (
              <BimLink key={item.href} href={item.href} className="hover:underline">
                {item.label}
              </BimLink>
            ))}
          </nav>
        </div>
      </header>
      <div className="flex-1">{children}</div>
      <footer className="border-t border-white/10 bg-section-dark text-section-dark-foreground">
        <div className="mx-auto flex max-w-6xl flex-wrap gap-x-4 gap-y-2 px-4 py-6 text-sm">
          <a href={MAIN_ORIGIN} className="hover:underline">
            vrgo.hu
          </a>
          <a href={`${MAIN_ORIGIN}/aszf`} className="hover:underline">
            ÁSZF
          </a>
          <a href={`${MAIN_ORIGIN}/adatvedelem`} className="hover:underline">
            Adatvédelem
          </a>
          <a href={`${MAIN_ORIGIN}/ai-atlathatosag`} className="hover:underline">
            AI-átláthatóság
          </a>
        </div>
      </footer>
    </PrefixContext.Provider>
  );
}
