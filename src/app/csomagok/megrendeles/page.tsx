import { Suspense } from "react";
import type { Metadata } from "next";

import { QuoteOrderForm } from "@/components/QuoteOrderForm";

export const metadata: Metadata = {
  title: "Ajánlatkérés — VRGO",
  description:
    "Strukturált ajánlatkérő űrlap: válassz csomagot (CLASSIC / TWIN / ENTERPRISE), add meg a helyszínt és az igényeket.",
};

export default function MegrendelesPage() {
  return (
    <>
      <section className="bg-section-dark py-12 text-section-dark-foreground sm:py-16">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
          <span className="inline-block rounded-full border border-brand/60 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-brand">
            Ajánlatkérés
          </span>
          <h1 className="mt-4 text-2xl font-bold sm:text-3xl md:text-4xl">
            Csomag és ajánlat igénylése
          </h1>
          <p className="mx-auto mt-3 max-w-xl text-sm opacity-90 sm:text-base">
            Csomag, terület, kiegészítők — 1 munkanapon belül visszajelzés. A helyszíni időpontot a
            szkennelési folyamat alapján egyeztetjük.
          </p>
        </div>
      </section>

      <section className="bg-background py-10 sm:py-14">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <Suspense fallback={<p className="text-sm text-muted-foreground">Űrlap betöltése…</p>}>
            <QuoteOrderForm />
          </Suspense>
        </div>
      </section>
    </>
  );
}
