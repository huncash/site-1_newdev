"use client";

import { createContext, useContext, type ReactNode } from "react";
import Link from "next/link";

import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { BIM_CONFIG, bimPhoneVisible } from "@/config/bim";
import { BIM_MENU } from "@/config/menu";
import { trackConversion } from "@/lib/conversion";

/** Telefonszám csak Kapcsolat és ÁSZF oldalon — a BimPhoneLink-et csak ott hívd. */

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

/** Kattintható telefon — üres config esetén null. */
export function BimPhoneLink({
  className,
  forras = "inline",
  children,
}: {
  className?: string;
  forras?: string;
  children?: ReactNode;
}) {
  if (!bimPhoneVisible()) return null;
  return (
    <a
      href={BIM_CONFIG.phoneTel}
      className={className}
      onClick={() => trackConversion("phone_click", { forras })}
    >
      {children ?? BIM_CONFIG.phoneDisplay}
    </a>
  );
}

export function BimChrome({
  prefix,
  children,
}: {
  prefix: boolean;
  children: ReactNode;
}) {
  const linkPrefix = prefix ? "/bim" : "";

  return (
    <PrefixContext.Provider value={prefix}>
      <Navbar
        logoHref={prefix ? "/bim" : "/"}
        logoLabel="VRGO BIM – kezdőlap"
        logoSrc="/bim-logo.png"
        logoWidth={412}
        logoHeight={103}
        items={BIM_MENU}
        linkPrefix={linkPrefix}
        cta={{ label: "Ajánlatkérés", href: "/kapcsolat" }}
      />
      <div className="flex-1">{children}</div>
      <Footer
        variant="bim"
        linkPrefix={linkPrefix}
        description="Ipari és épületfelmérési specialisták: országosan gyors helyszíni lézeres felmérés, pontfelhő és szükség szerint modellalap."
      />
    </PrefixContext.Provider>
  );
}
