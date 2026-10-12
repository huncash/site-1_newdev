"use client";

import type { ReactNode } from "react";

import { glossary } from "@/data/glossary";
import { cn } from "@/lib/utils";

type TermProps = {
  k: string;
  children: ReactNode;
  className?: string;
  moreHref?: string;
};

/** Szakkifejezés — hover/title magyarázat a glossary-ból. */
export function Term({ k, children, className, moreHref }: TermProps) {
  const explanation = (glossary as Record<string, string>)[k];
  if (!explanation) {
    return <span className={className}>{children}</span>;
  }
  return (
    <>
      <abbr
        title={explanation}
        className={cn(
          "cursor-help font-medium no-underline decoration-dotted underline-offset-2 hover:underline",
          className
        )}
      >
        {children}
      </abbr>
      {moreHref ? (
        <>
          {" "}
          <a
            href={moreHref}
            className="text-xs font-semibold text-brand underline-offset-2 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
          >
            Bővebben →
          </a>
        </>
      ) : null}
    </>
  );
}
