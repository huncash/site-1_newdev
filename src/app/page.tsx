import type { Metadata } from "next";

import { CaseStudySection } from "@/components/landing/CaseStudySection";
import { HeroSection } from "@/components/landing/HeroSection";
import { PackagesSection } from "@/components/landing/PackagesSection";
import { ProcessSection } from "@/components/landing/ProcessSection";
import { SegmentsSection } from "@/components/landing/SegmentsSection";
import { ServicesSection } from "@/components/landing/ServicesSection";
import { TestimonialsSection } from "@/components/landing/TestimonialsSection";
import { CONTENT } from "../data/content";

export const metadata: Metadata = {
  title: "VRGO — Bejárható 3D, virtuális túra és BIM-alapadat",
  description:
    "Kampuszok és portfóliók bejárható 3D-je, E57/OBJ-export és BIM-alapadat. Állami létesítmények BIM-felmérése a 31/2024. ÉKM rendelet szerint: bim.vrgo.hu.",
};

export default function HomePage() {
  const { hero, segments, services, testimonials, process, packages } = CONTENT;

  return (
    <>
      <HeroSection
        badge={hero.badge}
        title={hero.title}
        subtitle={
          <>
            Kampuszok, gyártócsarnokok és portfóliók digitális ikre — Matterport alapú
            bejárható 3D, E57/OBJ-export és BIM-alapadat. BIM- és állami projektekhez:{" "}
            <a href="https://bim.vrgo.hu" className="underline underline-offset-2">
              bim.vrgo.hu
            </a>
          </>
        }
        proof={hero.proof}
        ctaLabel={hero.ctaPrimary.label}
        ctaHref={hero.ctaPrimary.href}
        secondaryLabel={hero.ctaSecondary.label}
        secondaryHref={hero.ctaSecondary.href}
      />

      <SegmentsSection heading={segments.heading} items={segments.items} />

      <section className="bg-secondary py-8 sm:py-10">
        <div className="mx-auto flex max-w-5xl flex-col items-start justify-between gap-4 px-4 sm:flex-row sm:items-center sm:px-6">
          <p className="text-sm text-foreground sm:text-base">
            Állami létesítmények BIM-határidői: 31/2024. ÉKM rendelet.
          </p>
          <a
            href="https://bim.vrgo.hu"
            className="inline-flex items-center justify-center rounded-md bg-brand px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-brand-foreground hover:bg-brand-dark"
          >
            bim.vrgo.hu
          </a>
        </div>
      </section>

      <ServicesSection heading={services.heading} items={services.items} />

      <CaseStudySection />

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
    </>
  );
}
