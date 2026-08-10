"use client";

import { Suspense } from "react";

import { ContactForm } from "@/components/ContactForm";
import { cn } from "@/lib/utils";

export interface ContactSectionProps {
  className?: string;
  heading?: string;
  subheading?: string;
}

export function ContactSection({
  className,
  heading = "Ajánlatkérés",
  subheading = "Töltsd ki az űrlapot — a projekt jellemzői alapján legfeljebb 24 órán belül visszajelzünk.",
}: ContactSectionProps) {
  return (
    <section
      id="ajanlat"
      className={cn("scroll-mt-20 bg-background py-12 sm:py-16", className)}
    >
      <div className="mx-auto max-w-xl px-4 sm:max-w-2xl sm:px-6">
        <h2 className="text-center text-lg font-semibold sm:text-xl md:text-2xl">{heading}</h2>
        <div className="section-rule" />
        {subheading ? (
          <p className="mx-auto mt-4 max-w-xl text-center text-sm text-muted-foreground">
            {subheading}
          </p>
        ) : null}
        <div className="mt-8">
          <Suspense
            fallback={
              <p className="text-sm text-muted-foreground">Űrlap betöltése…</p>
            }
          >
            <ContactForm defaultSource="fooldal-ajanlat" />
          </Suspense>
        </div>
      </div>
    </section>
  );
}
