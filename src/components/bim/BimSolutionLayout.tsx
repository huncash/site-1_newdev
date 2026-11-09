import { Suspense, type ReactNode } from "react";

import { BimBreadcrumb } from "@/components/bim/BimBreadcrumb";
import { BimSolutionForm, type BimSolutionFormConfig } from "@/components/bim/BimSolutionForm";

type BimSolutionLayoutProps = {
  title: string;
  subtitle: string;
  intro: string;
  imageSrc: string;
  imageAlt: string;
  sections: readonly { question: string; answer: string }[];
  form: BimSolutionFormConfig;
  children?: ReactNode;
};

export function BimSolutionLayout({
  title,
  subtitle,
  intro,
  imageSrc,
  imageAlt,
  sections,
  form,
  children,
}: BimSolutionLayoutProps) {
  return (
    <article className="bg-background">
      <section className="bg-section-dark py-10 text-section-dark-foreground sm:py-12">
        <div className="mx-auto max-w-4xl px-4">
          <BimBreadcrumb
            tone="dark"
            items={[
              { href: "/", label: "Kezdőlap" },
              { href: "/megoldasok", label: "Megoldások" },
              { label: title },
            ]}
          />
          <h1 className="text-3xl font-bold leading-tight sm:text-4xl">{title}</h1>
          <p className="mt-3 max-w-3xl text-base opacity-90 sm:text-lg">{subtitle}</p>
        </div>
      </section>

      <div className="mx-auto max-w-4xl space-y-10 px-4 py-12 text-sm text-muted-foreground sm:text-base">
        <figure className="overflow-hidden rounded-md border border-border">
          <img
            src={imageSrc}
            alt={imageAlt}
            width={1280}
            height={720}
            className="aspect-video w-full object-cover"
            decoding="async"
            fetchPriority="high"
          />
        </figure>

        <p>{intro}</p>

        {sections.map((section) => (
          <section key={section.question}>
            <h2 className="text-xl font-semibold text-foreground">{section.question}</h2>
            <p className="mt-3">{section.answer}</p>
          </section>
        ))}

        {children}

        <section id="ajanlat" className="scroll-mt-24">
          <h2 className="text-xl font-semibold text-foreground">{form.heading}</h2>
          <div className="mt-6">
            <Suspense fallback={<p className="text-sm text-muted-foreground">Űrlap betöltése…</p>}>
              <BimSolutionForm config={form} />
            </Suspense>
          </div>
        </section>
      </div>
    </article>
  );
}
