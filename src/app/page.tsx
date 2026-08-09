import { Suspense } from "react";

import { authProvider } from "@/auth/auth-provider";
import { getProducts } from "@/lib/data-provider";
import { Catalog } from "@/components/Catalog";
import { HeroSection } from "@/components/landing/HeroSection";
import { PackagesSection } from "@/components/landing/PackagesSection";
import { ProcessSection } from "@/components/landing/ProcessSection";
import { SegmentsSection } from "@/components/landing/SegmentsSection";
import { ServicesSection } from "@/components/landing/ServicesSection";
import { TestimonialsSection } from "@/components/landing/TestimonialsSection";
import { CONTENT } from "../data/content";

export default function HomePage() {
  const products = getProducts().map((p) => ({
    ...p,
    editable: authProvider.isAdmin(),
  }));

  const { hero, segments, services, testimonials, process, packages, catalog } = CONTENT;

  return (
    <>
      <HeroSection
        badge={hero.badge}
        title={hero.title}
        subtitle={hero.subtitle}
        proof={hero.proof}
        ctaLabel={hero.ctaPrimary.label}
        ctaHref={hero.ctaPrimary.href}
        secondaryLabel={hero.ctaSecondary.label}
        secondaryHref={hero.ctaSecondary.href}
      />

      <SegmentsSection heading={segments.heading} items={segments.items} />

      <ServicesSection heading={services.heading} items={services.items} />

      <TestimonialsSection heading={testimonials.heading} items={testimonials.items} />

      <ProcessSection
        heading={process.heading}
        steps={process.steps}
        ctaLabel={process.cta.label}
        ctaHref={process.cta.href}
      />

      <PackagesSection
        heading={packages.heading}
        disclaimer={packages.disclaimer}
        items={packages.items}
      />

      <section className="mx-auto max-w-6xl px-4 py-12 sm:py-16">
        <h2 className="text-center text-xl font-semibold sm:text-2xl md:text-3xl">
          {catalog.heading}
        </h2>
        <div className="section-rule" />
        <div className="mt-10">
          <Suspense>
            <Catalog products={products} />
          </Suspense>
        </div>
      </section>
    </>
  );
}
