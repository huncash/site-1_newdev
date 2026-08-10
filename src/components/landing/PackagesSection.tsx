"use client";

import Image from "next/image";

import { cn } from "@/lib/utils";

export interface PackageItem {
  tier: string;
  title: string;
  audience: string;
  cta: string;
  image: string;
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
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <h2 className="mx-auto max-w-xl text-center text-lg font-semibold text-brand sm:max-w-2xl sm:text-xl md:text-2xl">
          {heading}
        </h2>
        <div className="section-rule" />
        <div className="mt-8 grid gap-4 sm:gap-5 lg:grid-cols-3">
          {items.map((item) => (
            <article
              key={item.tier}
              className="flex flex-col rounded-md border border-white/10 bg-section-dark/40 p-6 shadow-sm"
            >
              <div className="mb-4 overflow-hidden rounded-sm bg-white/5">
                <Image
                  src={item.image}
                  alt={item.tier}
                  width={320}
                  height={200}
                  sizes="(max-width: 1024px) 100vw, 320px"
                  loading="lazy"
                  className="h-28 w-full object-cover sm:h-36"
                />
              </div>
              <p className="text-xs font-semibold uppercase tracking-wider text-brand">
                {item.tier}
              </p>
              <h3 className="mt-2 text-lg font-semibold text-section-dark-foreground">
                {item.title}
              </h3>
              <p className="mt-3 flex-1 text-sm text-section-dark-foreground/80">
                {item.audience}
              </p>
              <a
                href={`/csomagok/megrendeles?csomag=${encodeURIComponent(item.tier)}`}
                className="mt-6 inline-flex items-center justify-center rounded-md bg-brand px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-brand-foreground transition hover:bg-brand-dark"
              >
                {item.cta}
              </a>
            </article>
          ))}
        </div>
        <p className="mx-auto mt-8 max-w-3xl text-center text-sm text-section-dark-foreground/75">
          {disclaimer}
        </p>
      </div>
    </section>
  );
}
