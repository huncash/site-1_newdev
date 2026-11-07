"use client";

import type { ReactNode } from "react";

import { trackConversion } from "@/lib/conversion";

/** bim.vrgo.hu felé — UTM-es href + kattintásmérés. */
export function BimOutboundLink({
  href,
  className,
  children,
  forras,
}: {
  href: string;
  className?: string;
  children: ReactNode;
  forras: string;
}) {
  return (
    <a
      href={href}
      className={className}
      onClick={() => trackConversion("bim_cta_click", { forras })}
    >
      {children}
    </a>
  );
}
