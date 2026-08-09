"use client";

import { cn } from "@/lib/utils";

export interface ServiceItem {
  title: string;
  description: string;
  image: string;
}

export interface ServicesSectionProps {
  heading: string;
  items: readonly ServiceItem[];
  className?: string;
}

export function ServicesSection({
  heading,
  items,
  className,
}: ServicesSectionProps) {
  return (
    <section
      id="szolgaltatasok"
      className={cn(
        "scroll-mt-20 bg-section-dark py-12 text-section-dark-foreground sm:py-16",
        className
      )}
    >
      <div className="mx-auto max-w-6xl px-4">
        <h2 className="text-center text-xl font-semibold text-brand sm:text-2xl md:text-3xl">
          {heading}
        </h2>
        <div className="section-rule" />
        <div className="mt-10 grid gap-8 sm:grid-cols-2 sm:gap-10 lg:grid-cols-3">
          {items.map((item) => (
            <article key={item.title} className="text-center">
              {/* SVG icons: transparent bg blends into section-dark (#33373D) */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={item.image}
                alt={item.title}
                width={200}
                height={200}
                className="mx-auto h-auto w-[140px] object-contain sm:w-[180px] md:w-[200px]"
                loading="lazy"
                decoding="async"
              />
              <h3 className="mt-4 text-lg font-semibold text-section-dark-foreground">
                {item.title}
              </h3>
              <p className="mt-2 text-sm text-section-dark-foreground/85">
                {item.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
