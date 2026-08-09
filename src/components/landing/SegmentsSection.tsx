"use client";

import { cn } from "@/lib/utils";

export interface SegmentItem {
  title: string;
  description: string;
  href: string;
}

export interface SegmentsSectionProps {
  heading: string;
  items: readonly SegmentItem[];
  className?: string;
}

export function SegmentsSection({
  heading,
  items,
  className,
}: SegmentsSectionProps) {
  return (
    <section
      id="szegmensek"
      className={cn("scroll-mt-20 bg-background py-12 sm:py-16", className)}
    >
      <div className="mx-auto max-w-6xl px-4">
        <h2 className="text-center text-2xl font-semibold sm:text-3xl">{heading}</h2>
        <div className="section-rule" />
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item) => (
            <a
              key={item.title}
              href={item.href}
              className="group flex flex-col rounded-md border border-border bg-card p-6 shadow-sm transition hover:border-brand hover:shadow-md"
            >
              <h3 className="text-lg font-semibold transition group-hover:text-brand">
                {item.title}
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">{item.description}</p>
              <span className="mt-4 text-xs font-semibold uppercase tracking-wider text-brand">
                Részletek →
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
