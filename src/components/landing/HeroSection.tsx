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
  ctaHref = "mailto:info@vrgo.hu",
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
      <div className="relative mx-auto flex max-w-6xl flex-col items-center px-4 py-16 text-center sm:py-24 md:py-32">
        {badge ? (
          <span className="animate-fade-up mb-3 inline-block rounded-full border border-brand/60 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-brand">
            {badge}
          </span>
        ) : null}

        <h1 className="animate-fade-up-delay text-3xl font-bold leading-tight text-section-dark-foreground sm:text-4xl md:text-5xl lg:text-6xl">
          {title.includes("egyetlen") ? (
            <>
              {title.slice(0, title.indexOf("egyetlen")).trim()}
              <br className="hidden sm:inline" />{" "}
              {title.slice(title.indexOf("egyetlen"))}
            </>
          ) : (
            title
          )}
        </h1>

        <p className="animate-fade-up-delay-2 mt-4 max-w-2xl text-base text-section-dark-foreground/90 sm:text-lg md:text-xl">
          {subtitle}
        </p>

        {proof ? (
          <p className="mt-2 text-sm text-section-dark-foreground/70">{proof}</p>
        ) : null}

        <div className="mt-7 flex w-full flex-col gap-3 sm:mt-8 sm:w-auto sm:flex-row">
          <a
            href={ctaHref}
            className="inline-flex items-center justify-center rounded-md bg-brand px-6 py-3 text-sm font-semibold uppercase tracking-wider text-brand-foreground transition hover:bg-brand-dark"
          >
            {ctaLabel}
          </a>
          <a
            href={secondaryHref}
            className="inline-flex items-center justify-center rounded-md border-2 border-white px-6 py-3 text-sm font-semibold uppercase tracking-wider text-white transition hover:bg-white hover:text-section-dark"
          >
            {secondaryLabel}
          </a>
        </div>
      </div>
    </section>
  );
}
