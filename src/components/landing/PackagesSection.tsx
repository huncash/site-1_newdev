"use client";

import { cn } from "@/lib/utils";

export interface PackageItem {
  tier: string;
  title: string;
  audience: string;
  priceOnce: string;
  priceRecurring: string;
  cta: string;
}

export interface PackagesSectionProps {
  heading: string;
  disclaimer: string;
  items: readonly PackageItem[];
  className?: string;
}

export function PackagesSection({
  heading,
  disclaimer,
  items,
  className,
}: PackagesSectionProps) {
  return (
    <section
      id="csomagok"
      className={cn(
        "scroll-mt-20 bg-section-dark py-12 text-section-dark-foreground sm:py-16",
        className
      )}
    >
      <div className="mx-auto max-w-6xl px-4">
        <h2 className="text-center text-xl font-semibold text-brand sm:text-2xl md:text-3xl">
          {heading}
        </h2>
        <div className="section-rule" />
        <p className="mx-auto mt-6 max-w-3xl text-center text-sm text-section-dark-foreground/75">
          {disclaimer}
        </p>
        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {items.map((item) => (
            <article
              key={item.tier}
              className="flex flex-col rounded-md border border-white/10 bg-section-dark/40 p-6 shadow-sm"
            >
              <p className="text-xs font-semibold uppercase tracking-wider text-brand">
                {item.tier}
              </p>
              <h3 className="mt-2 text-lg font-semibold text-section-dark-foreground">
                {item.title}
              </h3>
              <p className="mt-3 flex-1 text-sm text-section-dark-foreground/80">
                {item.audience}
              </p>
              <div className="mt-5 space-y-1 border-t border-white/10 pt-4 text-sm">
                <p className="font-medium">{item.priceOnce}</p>
                <p className="text-section-dark-foreground/70">{item.priceRecurring}</p>
              </div>
              <a
                href={`mailto:info@vrgo.hu?subject=${encodeURIComponent(item.cta)}`}
                className="mt-6 inline-flex items-center justify-center rounded-md bg-brand px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-brand-foreground transition hover:bg-brand-dark"
              >
                {item.cta}
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
