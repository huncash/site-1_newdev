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
        "scroll-mt-20 bg-[#33373D] py-10 text-section-dark-foreground sm:py-14",
        className
      )}
      style={{ backgroundImage: "none" }}
    >
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <h2 className="mx-auto max-w-xl text-center text-lg font-semibold text-brand sm:max-w-2xl sm:text-xl md:text-2xl">
          {heading}
        </h2>
        <div className="section-rule" />
        {/* 2×2 / 2×3 csempe mobilon; asztalin 3 oszlop */}
        <div className="mt-8 grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-3 lg:gap-6">
          {items.map((item) => (
            <article
              key={item.title}
              className="flex flex-col items-center rounded-md border border-white/10 bg-white/[0.03] px-2.5 py-4 text-center sm:px-4 sm:py-5"
            >
              {/* Egységes ikonkeret: GSV = alaprajz méret */}
              <div className="flex h-14 w-14 items-center justify-center sm:h-16 sm:w-16">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={item.image}
                  alt=""
                  width={64}
                  height={64}
                  className="max-h-full max-w-full object-contain"
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <h3 className="mt-3 text-sm font-semibold leading-snug text-section-dark-foreground sm:text-base">
                {item.title}
              </h3>
              <p className="mt-1.5 text-xs leading-relaxed text-section-dark-foreground/80 sm:text-sm">
                {item.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
