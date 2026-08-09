"use client";

import { cn } from "@/lib/utils";

export interface Feature {
  icon: string;
  title: string;
  description: string;
}

export interface FeatureGridProps {
  heading?: string;
  features?: readonly Feature[];
  className?: string;
}

export function FeatureGrid({
  heading = "Miért minket válassz?",
  features = [],
  className,
}: FeatureGridProps) {
  return (
    <section className={cn("bg-background py-12 sm:py-16", className)}>
      <div className="mx-auto max-w-6xl px-4">
        <h2 className="text-center text-2xl font-semibold sm:text-3xl">{heading}</h2>
        <div className="section-rule" />
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <article
              key={feature.title}
              className="rounded-md border border-border bg-card p-6 shadow-sm"
            >
              <h3 className="text-lg font-semibold">{feature.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{feature.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
