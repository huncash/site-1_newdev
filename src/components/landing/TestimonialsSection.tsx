"use client";

import { cn } from "@/lib/utils";

export interface TestimonialItem {
  name: string;
  company: string;
  text: string;
}

export interface TestimonialsSectionProps {
  heading: string;
  items: readonly TestimonialItem[];
  className?: string;
}

export function TestimonialsSection({
  heading,
  items,
  className,
}: TestimonialsSectionProps) {
  return (
    <section
      id="velemenyek"
      className={cn("scroll-mt-20 bg-background py-12 sm:py-16", className)}
    >
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <h2 className="mx-auto max-w-xl text-center text-lg font-semibold sm:text-xl md:text-2xl">
          {heading}
        </h2>
        <div className="section-rule" />
        <div className="mt-8 grid gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
          {items.map((item) => (
            <figure
              key={item.name}
              className="flex flex-col rounded-md border border-border bg-card p-6 shadow-sm"
            >
              <blockquote className="flex-1 text-sm italic text-foreground/85">
                „{item.text}”
              </blockquote>
              <figcaption className="mt-4 text-sm">
                <strong className="block">{item.name}</strong>
                <span className="text-muted-foreground">{item.company}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
