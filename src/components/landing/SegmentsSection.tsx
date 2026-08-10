"use client";

import Link from "next/link";

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
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <h2 className="mx-auto max-w-xl text-center text-lg font-semibold sm:text-xl md:text-2xl">
          {heading}
        </h2>
        <div className="section-rule" />
        <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-4">
          {items.map((item) => (
            <Link
              key={item.title}
              href={item.href}
              className="group flex flex-col rounded-md border border-border bg-card p-4 shadow-sm transition hover:border-brand hover:shadow-md sm:p-5"
            >
              <h3 className="text-base font-semibold transition group-hover:text-brand sm:text-lg">
                {item.title}
              </h3>
              <p className="mt-2 text-xs text-muted-foreground sm:text-sm">{item.description}</p>
              <span className="mt-4 text-xs font-semibold uppercase tracking-wider text-brand">
                Részletek →
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
