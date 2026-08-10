"use client";

import { cn } from "@/lib/utils";

export interface CtaSectionProps {
  heading: string;
  subheading?: string;
  ctaLabel?: string;
  ctaHref?: string;
  variant?: "default" | "dark";
  className?: string;
}

export function CtaSection({
  heading,
  subheading,
  ctaLabel = "Kapcsolatfelvétel",
  ctaHref = "/ajanlat",
  variant = "default",
  className,
}: CtaSectionProps) {
  const dark = variant === "dark";

  return (
    <section
      className={cn(
        "py-16 sm:py-20",
        dark
          ? "bg-section-dark text-section-dark-foreground"
          : "bg-background",
        className
      )}
    >
      <div className="mx-auto flex max-w-3xl flex-col items-center gap-6 px-4 text-center">
        <h2
          className={cn(
            "text-2xl font-semibold sm:text-3xl",
            dark ? "text-brand" : "text-foreground"
          )}
        >
          {heading}
        </h2>
        <div className="section-rule" />

        {subheading ? (
          <p
            className={cn(
              "text-base",
              dark ? "text-section-dark-foreground/80" : "text-muted-foreground"
            )}
          >
            {subheading}
          </p>
        ) : null}

        <a
          href={ctaHref}
          className="inline-flex items-center justify-center rounded-md bg-brand px-6 py-3 text-sm font-semibold uppercase tracking-wider text-brand-foreground transition hover:bg-brand-dark"
        >
          {ctaLabel}
        </a>
      </div>
    </section>
  );
}
