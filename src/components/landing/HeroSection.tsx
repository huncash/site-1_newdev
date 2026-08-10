"use client";

import { cn } from "@/lib/utils";

export interface HeroSectionProps {
  badge?: string;
  title: string;
  subtitle: string;
  proof?: string;
  ctaLabel?: string;
  ctaHref?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
  className?: string;
}

export function HeroSection({
  badge = "Enterprise Digital Twin",
  title,
  subtitle,
  proof,
  ctaLabel = "Csomag és időpont igénylése",
  ctaHref = "/ajanlat?forras=hero",
  secondaryLabel = "Csomagok megnézése",
  secondaryHref = "/#csomagok",
  className,
}: HeroSectionProps) {
  return (
    <section
      className={cn(
        "relative bg-section-dark text-section-dark-foreground",
        className
      )}
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(106,181,238,0.18),_transparent_55%)]" />
      <div className="relative mx-auto flex max-w-5xl flex-col items-center px-5 py-12 text-center sm:px-6 sm:py-16 md:py-20">
        {badge ? (
          <span className="animate-fade-up mb-3 inline-block rounded-full border border-brand/60 px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-brand sm:text-xs">
            {badge}
          </span>
        ) : null}

        <h1 className="animate-fade-up-delay mx-auto max-w-[18rem] text-balance text-2xl font-bold leading-snug text-section-dark-foreground sm:max-w-lg sm:text-3xl md:max-w-2xl md:text-4xl lg:text-[2.5rem] lg:leading-tight">
          {title}
        </h1>

        <p className="animate-fade-up-delay-2 mx-auto mt-4 max-w-md text-sm leading-relaxed text-section-dark-foreground/90 sm:max-w-xl sm:text-base md:text-lg">
          {subtitle}
        </p>

        {proof ? (
          <p className="mx-auto mt-2 max-w-md text-xs text-section-dark-foreground/70 sm:text-sm">
            {proof}
          </p>
        ) : null}

        <div className="mt-6 flex w-full max-w-sm flex-col gap-2.5 sm:mt-8 sm:max-w-none sm:w-auto sm:flex-row sm:gap-3">
          <a
            href={ctaHref}
            className="inline-flex items-center justify-center rounded-md bg-brand px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-brand-foreground transition hover:bg-brand-dark sm:px-6 sm:py-3 sm:text-sm"
          >
            {ctaLabel}
          </a>
          <a
            href={secondaryHref}
            className="inline-flex items-center justify-center rounded-md border-2 border-white px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-white transition hover:bg-white hover:text-section-dark sm:px-6 sm:py-3 sm:text-sm"
          >
            {secondaryLabel}
          </a>
        </div>
      </div>
    </section>
  );
}
