"use client";

import Image from "next/image";

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
          {items.map((item, index) => (
            <article key={item.title} className="text-center">
              <Image
                src={item.image}
                alt={item.title}
                width={200}
                height={157}
                sizes="(max-width: 640px) 160px, 200px"
                priority={index < 3}
                className="mx-auto h-auto w-[160px] rounded-sm object-contain sm:w-[200px]"
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
