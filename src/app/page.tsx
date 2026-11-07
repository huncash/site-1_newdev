import type { Metadata } from "next";

import { BimOutboundLink } from "@/components/BimOutboundLink";
import { CaseStudySection } from "@/components/landing/CaseStudySection";
import { HeroSection } from "@/components/landing/HeroSection";
import { PackagesSection } from "@/components/landing/PackagesSection";
import { ProcessSection } from "@/components/landing/ProcessSection";
import { SegmentsSection } from "@/components/landing/SegmentsSection";
import { ServicesSection } from "@/components/landing/ServicesSection";
import { TestimonialsSection } from "@/components/landing/TestimonialsSection";
import { CONTENT } from "@/data/content";
import { bimLink } from "@/lib/links";
import { VRGO_CONFIG } from "@/config/vrgo";

export const metadata: Metadata = {
  title: "Bejárható 3D fotózás és Google Utcakép | VRGO",
  description:
    "Bejárható 3D túra, méretezett alaprajz és megjelenés a Google Térképen és Utcaképen. Üzleteknek, szállásoknak, irodáknak, ingatlanoknak. Kedvező áron. Kérjen ajánlatot.",
  alternates: { canonical: "https://vrgo.hu/" },
};

function buildHomeJsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://vrgo.hu/#organization",
        name: VRGO_CONFIG.organizationName,
        url: VRGO_CONFIG.organizationUrl,
      },
      {
        "@type": "LocalBusiness",
        "@id": "https://vrgo.hu/#localbusiness",
        name: VRGO_CONFIG.organizationName,
        url: VRGO_CONFIG.organizationUrl,
        description:
          "Bejárható 3D túra, méretezett alaprajz és megjelenés a Google Térképen és Utcaképen.",
        parentOrganization: { "@id": "https://vrgo.hu/#organization" },
      },
      {
        "@type": "Service",
        "@id": "https://vrgo.hu/#service-3d-tura",
        name: "Bejárható 3D túra és Google Utcakép",
        provider: { "@id": "https://vrgo.hu/#organization" },
        description:
          "Gyors helyszíni felvétel, megosztható és beágyazható 3D túra, méretezett alaprajz – kedvező áron.",
        areaServed: "HU",
        url: "https://vrgo.hu/",
      },
    ],
  };
}

export default function HomePage() {
  const {
    hero,
    services,
    audiences,
    experience,
    testimonials,
    process,
    packages,
  } = CONTENT;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildHomeJsonLd()) }}
      />

      <HeroSection
        badge=""
        title={hero.title}
        subtitle={hero.subtitle}
        ctaLabel={hero.ctaPrimary.label}
        ctaHref={hero.ctaPrimary.href}
        secondaryLabel={hero.ctaSecondary.label}
        secondaryHref={hero.ctaSecondary.href}
      />

      <ServicesSection heading={services.heading} items={services.items} />

      <SegmentsSection heading={audiences.heading} items={audiences.items} />

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

      <section id="tapasztalat" className="scroll-mt-20 bg-background py-10 sm:py-12">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h2 className="text-center text-base font-semibold text-muted-foreground sm:text-lg">
            {experience.heading}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-center text-sm leading-relaxed text-muted-foreground">
            {experience.text}
          </p>
        </div>
      </section>

      <section id="bejarhato-vagy-mernoki" className="scroll-mt-20 bg-secondary py-12 sm:py-16">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <h2 className="mx-auto max-w-2xl text-center text-lg font-semibold sm:text-xl md:text-2xl">
            Bejárható 3D túra vagy mérnöki felmérés?
          </h2>
          <div className="section-rule" />
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            <div className="rounded-md border border-border bg-card p-6 shadow-sm">
              <h3 className="text-base font-semibold">Maradjon a bejárható 3D túra</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                ha online bemutatásra, marketingre, ingatlanhirdetésre vagy gyors dokumentálásra
                van szükség, és a méretekhez tájékoztató pontosság elég.
              </p>
            </div>
            <div className="rounded-md border border-border bg-card p-6 shadow-sm">
              <h3 className="text-base font-semibold">Mérnöki lézerszkennelés kell</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                ha nagy a terület, ha tervezéshez, kivitelezéshez, hatósági vagy üzemeltetési
                adatátadáshoz kell a pontos adat, EOV-ban és/vagy modellel, vagy ipari
                létesítményről van szó.
              </p>
            </div>
          </div>
          <p className="mx-auto mt-8 max-w-3xl text-center text-sm leading-relaxed text-muted-foreground sm:text-base">
            Ha bizonytalan, írja le a feladatot, és megmondjuk, melyik kell.
          </p>
          <div className="mt-6 flex justify-center">
            <BimOutboundLink
              href={bimLink("/", "mikor")}
              forras="mikor"
              className="inline-flex items-center justify-center rounded-md bg-brand px-6 py-3 text-sm font-semibold uppercase tracking-wider text-brand-foreground transition hover:bg-brand-dark"
            >
              Mérnöki 3D felmérés → bim.vrgo.hu
            </BimOutboundLink>
          </div>
        </div>
      </section>

      <section id="zaro-cta" className="scroll-mt-20 bg-section-dark py-12 text-section-dark-foreground sm:py-16">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
          <p className="text-base font-semibold sm:text-lg">
            Mondja el, melyik helyszínről van szó, és ajánlatot küldünk.
          </p>
          <a
            href="/ajanlat?forras=fooldal-cta"
            className="mt-6 inline-flex items-center justify-center rounded-md bg-brand px-6 py-3 text-sm font-semibold uppercase tracking-wider text-brand-foreground transition hover:bg-brand-dark"
          >
            Ajánlatot kérek
          </a>
        </div>
      </section>
    </>
  );
}
