"use client";

import { createContext, useContext, type ReactNode } from "react";
import Link from "next/link";

import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { BIM_MENU } from "@/config/menu";
import { MAIN_ORIGIN } from "@/lib/bim-site";

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
        cta={{ label: "Ajánlatkérés", href: "/ajanlatkeres" }}
        quietLink={{ label: "← vrgo.hu", href: MAIN_ORIGIN, newTab: true }}
      />
      <div className="flex-1">{children}</div>
      <Footer
        variant="bim"
        linkPrefix={linkPrefix}
        description="Professzionális Leica 3D lézerszkennelés, pontfelhő és BIM-modell az építőipar és az ipari létesítmények számára."
      />
    </PrefixContext.Provider>
  );
}
