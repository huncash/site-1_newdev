"use client";

import { cn } from "@/lib/utils";

export interface ProcessStep {
  text: string;
  image: string;
}

export interface ProcessSectionProps {
  heading: string;
  steps: readonly ProcessStep[];
  ctaLabel: string;
  ctaHref: string;
  className?: string;
}

export function ProcessSection({
  heading,
  steps,
  ctaLabel,
  ctaHref,
  className,
}: ProcessSectionProps) {
  return (
    <section
      id="folyamat"
      className={cn("scroll-mt-20 bg-background py-12 sm:py-16", className)}
    >
      <div className="mx-auto max-w-6xl px-4">
        <h2 className="text-center text-xl font-semibold sm:text-2xl md:text-3xl">
          {heading}
        </h2>
        <div className="section-rule" />
        <div className="mt-10 grid gap-8 sm:grid-cols-3 sm:gap-10">
          {steps.map((step, index) => (
            <div key={index} className="text-center">
              <img
                src={step.image}
                alt=""
                loading="lazy"
                className="mx-auto h-auto w-[140px] rounded-sm object-cover sm:w-[180px]"
              />
              <p className="mt-4 text-sm font-medium">{step.text}</p>
            </div>
          ))}
        </div>
        <div className="mt-10 text-center">
          <a
            href={ctaHref}
            className="inline-flex items-center justify-center rounded-md bg-brand px-6 py-3 text-sm font-semibold uppercase tracking-wider text-brand-foreground transition hover:bg-brand-dark"
          >
            {ctaLabel}
          </a>
        </div>
      </div>
    </section>
  );
}
