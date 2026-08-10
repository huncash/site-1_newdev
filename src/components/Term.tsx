"use client";

import type { ReactNode } from "react";

import { glossary } from "@/data/glossary";
import { cn } from "@/lib/utils";

type TermProps = {
  k: string;
  children: ReactNode;
  className?: string;
};

/** Szakkifejezés — hover/title magyarázat a glossary-ból. */
export function Term({ k, children, className }: TermProps) {
  const explanation = (glossary as Record<string, string>)[k];
  if (!explanation) {
    return <span className={className}>{children}</span>;
  }
  return (
    <abbr
      title={explanation}
      className={cn(
        "cursor-help font-medium no-underline decoration-dotted underline-offset-2 hover:underline",
        className
      )}
    >
      {children}
    </abbr>
  );
}
