import { Suspense } from "react";
import type { Metadata } from "next";

import { QuoteOrderForm } from "@/components/QuoteOrderForm";

export const metadata: Metadata = {
  title: "Ajánlatkérés — VRGO",
  description:
    "Strukturált ajánlatkérő űrlap: csomag, helyszín, igények. Legfeljebb 24 órán belüli visszajelzés.",
};

export default function AjanlatPage() {
  return (
    <>
      <section className="bg-section-dark py-12 text-section-dark-foreground sm:py-16">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
          <span className="inline-block rounded-full border border-brand/60 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-brand">
            Ajánlatkérés
          </span>
          <h1 className="mt-4 text-2xl font-bold sm:text-3xl md:text-4xl">Ajánlatkérés</h1>
          <p className="mx-auto mt-3 max-w-xl text-sm opacity-90 sm:text-base">
            Csomag, helyszín és igények — az ajánlat legfeljebb 24 órán belül megérkezik. A helyszíni
            szkennelés időpontját egyeztetjük.
          </p>
        </div>
      </section>

      <section className="bg-background py-10 sm:py-14">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <Suspense fallback={<p className="text-sm text-muted-foreground">Űrlap betöltése…</p>}>
            <QuoteOrderForm defaultSource="ajanlat-page" />
          </Suspense>
        </div>
      </section>
    </>
  );
}
