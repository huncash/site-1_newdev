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
    "Bejárható 3D túra, méretezett alaprajz és megjelenés a Google Térképen és Utcaképen. Üzleteknek, szállásoknak, irodáknak, ingatlanoknak. Gyors felvétel, kedvező ár. Kérjen ajánlatot.",
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
          "Bejárható 3D túra, méretezett alaprajz és megjelenés a Google Térképen és Utcaképen. Üzleteknek, szállásoknak, irodáknak, ingatlanoknak.",
        parentOrganization: { "@id": "https://vrgo.hu/#organization" },
      },
      {
        "@type": "Service",
        "@id": "https://vrgo.hu/#service-3d-tura",
        name: "Bejárható 3D túra és Google Utcakép",
        provider: { "@id": "https://vrgo.hu/#organization" },
        description:
          "Gyors helyszíni felvétel, megosztható és beágyazható 3D túra, méretezett alaprajz, és megjelenés a Google Térképen és Utcaképen, belső gömbpanorámákkal.",
        areaServed: "HU",
        url: "https://vrgo.hu/",
      },
    ],
  };
}

const GOOGLE_STEPS = [
  { title: "Utca", text: "Az érdeklődő a Google Térképen vagy Utcaképen indul." },
  { title: "Bejárat", text: "Belép a helyszínhez tartozó bejárható túrába." },
  { title: "Belső tér", text: "Gömbpanorámákon sétál tovább a belső terekben." },
] as const;

export default function HomePage() {
  const {
    hero,
    services,
    audiences,
    experience,
    testimonials,
    process,
    packages,
    homeFaqs,
  } = CONTENT;

  const googleNote = VRGO_CONFIG.googleStreetViewNote.trim();

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

      <section id="google-terkep" className="scroll-mt-20 bg-background py-12 sm:py-16">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <h2 className="mx-auto max-w-2xl text-center text-lg font-semibold sm:text-xl md:text-2xl">
            Találjanak meg a Google-ben, és sétáljanak be az ajtón
          </h2>
          <div className="section-rule" />
          <p className="mx-auto mt-6 max-w-3xl text-center text-sm leading-relaxed text-muted-foreground sm:text-base">
            A felvételből a Google Térképen és az Utcaképen is bejárható túra készül. Az érdeklődő
            az utcáról indul, és a belső terekben tovább sétál gömbpanorámákon. Nem kell előbb
            elmennie a helyszínre, hogy eldöntse, odavaló-e.
          </p>
          {googleNote ? (
            <p className="mx-auto mt-3 max-w-3xl text-center text-xs text-muted-foreground">
              {googleNote}
            </p>
          ) : null}
          <ol className="mt-10 grid gap-4 sm:grid-cols-3">
            {GOOGLE_STEPS.map((step, i) => (
              <li
                key={step.title}
                className="flex flex-col items-center rounded-md border border-border bg-card px-4 py-6 text-center shadow-sm"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-brand/15 text-sm font-bold text-brand">
                  {i + 1}
                </span>
                <h3 className="mt-3 text-base font-semibold">{step.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{step.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <SegmentsSection heading={audiences.heading} items={audiences.items} />

      <section id="tapasztalat" className="scroll-mt-20 bg-background py-12 sm:py-16">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <h2 className="mx-auto max-w-xl text-center text-lg font-semibold sm:text-xl md:text-2xl">
            {experience.heading}
          </h2>
          <div className="section-rule" />
          <p className="mx-auto mt-6 max-w-3xl text-center text-sm leading-relaxed text-muted-foreground sm:text-base">
            {experience.text}
          </p>
        </div>
      </section>

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

      <section id="mikor-ne-ezt" className="scroll-mt-20 bg-secondary py-12 sm:py-16">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <h2 className="mx-auto max-w-2xl text-center text-lg font-semibold sm:text-xl md:text-2xl">
            Mikor ne ezt válassza?
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
            Őszintén megmondjuk, melyik kell Önnek. Nagyobb területeknél, vagy ha nem csak online
            bemutatás a cél, mérnöki felmérést ajánlunk.
          </p>
          <div className="mt-6 flex justify-center">
            <BimOutboundLink
              href={bimLink("/", "mikor-ne-ezt")}
              forras="mikor-ne-ezt"
              className="inline-flex items-center justify-center rounded-md bg-brand px-6 py-3 text-sm font-semibold uppercase tracking-wider text-brand-foreground transition hover:bg-brand-dark"
            >
              Mérnöki 3D felmérés → bim.vrgo.hu
            </BimOutboundLink>
          </div>
        </div>
      </section>

      <section id="rovid-gyik" className="scroll-mt-20 bg-background py-12 sm:py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h2 className="text-center text-lg font-semibold sm:text-xl md:text-2xl">
            Gyakori kérdések
          </h2>
          <div className="section-rule" />
          <div className="mt-8 space-y-3">
            {homeFaqs.map((f) => (
              <details
                key={f.q}
                className="group rounded-md border border-border bg-card p-5 shadow-sm open:border-brand/60"
              >
                <summary className="cursor-pointer list-none text-base font-semibold marker:hidden">
                  <span className="mr-2 inline-block text-brand transition group-open:rotate-90">
                    ›
                  </span>
                  {f.q}
                </summary>
                <p className="mt-3 pl-6 text-sm text-muted-foreground">{f.a}</p>
              </details>
            ))}
          </div>
          <div className="mt-10 rounded-md border border-border bg-secondary/60 px-5 py-8 text-center">
            <p className="text-base font-semibold sm:text-lg">
              Mondja el, melyik helyszínről van szó, és ajánlatot küldünk.
            </p>
            {VRGO_CONFIG.replySlaText ? (
              <p className="mt-2 text-sm text-muted-foreground">{VRGO_CONFIG.replySlaText}</p>
            ) : null}
            <a
              href="/ajanlat?forras=fooldal-gyik"
              className="mt-5 inline-flex items-center justify-center rounded-md bg-brand px-6 py-3 text-sm font-semibold uppercase tracking-wider text-brand-foreground transition hover:bg-brand-dark"
            >
              Ajánlatot kérek
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
