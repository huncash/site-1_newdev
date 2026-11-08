import type { ReactNode } from "react";

import { BimBreadcrumb, type Crumb } from "@/components/bim/BimBreadcrumb";
import { BimLink } from "@/components/bim/BimChrome";

export function BimServiceLayout({
  crumbs,
  title,
  lead,
  children,
  ctaHref = "/kapcsolat",
  ctaLabel = "Ajánlatot kérek",
}: {
  crumbs: readonly Crumb[];
  title: string;
  lead?: string;
  children: ReactNode;
  ctaHref?: string;
  ctaLabel?: string;
}) {
  return (
    <article className="bg-background">
      <section className="bg-section-dark py-14 text-section-dark-foreground">
        <div className="mx-auto max-w-4xl px-4">
          <BimBreadcrumb items={crumbs} tone="dark" />
          <h1 className="text-3xl font-bold sm:text-4xl">{title}</h1>
          {lead ? <p className="mt-4 max-w-3xl text-sm opacity-90 sm:text-base">{lead}</p> : null}
        </div>
      </section>
      <div className="mx-auto max-w-4xl space-y-10 px-4 py-12 text-sm text-muted-foreground sm:text-base">
        {children}
        <BimLink
          href={ctaHref}
          className="inline-flex rounded-md bg-brand px-6 py-3 text-sm font-semibold text-brand-foreground"
        >
          {ctaLabel}
        </BimLink>
      </div>
    </article>
  );
}

export function ServiceSection({
  title,
  children,
  id,
}: {
  title: string;
  children: ReactNode;
  id?: string;
}) {
  return (
    <section id={id}>
      <h2 className="text-xl font-semibold text-foreground">{title}</h2>
      <div className="mt-3 space-y-2">{children}</div>
    </section>
  );
}
