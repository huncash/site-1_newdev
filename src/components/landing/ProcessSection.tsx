"use client";

import Image from "next/image";

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
      className={cn("scroll-mt-20 bg-background py-10 sm:py-14", className)}
    >
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <h2 className="mx-auto max-w-xl text-center text-lg font-semibold sm:max-w-2xl sm:text-xl md:text-2xl">
          {heading}
        </h2>
        <div className="section-rule" />
        <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-6">
          {steps.map((step, index) => (
            <div
              key={index}
              className={cn(
                "flex flex-col items-center rounded-md border border-border bg-card px-2.5 py-4 text-center sm:px-4",
                // 3. lépés középre a 2 oszlopos rácsban
                index === 2 && "col-span-2 sm:col-span-1"
              )}
            >
              <div className="flex h-14 w-14 items-center justify-center sm:h-16 sm:w-16">
                <Image
                  src={step.image}
                  alt=""
                  width={64}
                  height={64}
                  sizes="64px"
                  loading="lazy"
                  className="max-h-full max-w-full object-contain"
                />
              </div>
              <p className="mt-3 max-w-[16rem] text-xs font-medium leading-snug sm:text-sm">
                {step.text}
              </p>
            </div>
          ))}
        </div>
        <div className="mt-8 text-center">
          <a
            href={ctaHref}
            className="inline-flex items-center justify-center rounded-md bg-brand px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-brand-foreground transition hover:bg-brand-dark sm:px-6 sm:py-3 sm:text-sm"
          >
            {ctaLabel}
          </a>
        </div>
      </div>
    </section>
  );
}
