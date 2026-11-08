import { Suspense } from "react";

import { BimPhoneLink } from "@/components/bim/BimChrome";
import { BimQuoteForm } from "@/components/bim/BimQuoteForm";
import { BIM_CONFIG, bimPhoneVisible } from "@/config/bim";
import { bimMetadata } from "@/lib/bim-site";

export const metadata = bimMetadata(
  "/ajanlatkeres",
  "Ajánlatkérés — ipari felmérés és Scan-to-BIM kapacitás | VRGO BIM",
  "Kérjen helyszíni felmérési vagy Scan-to-BIM kapacitásajánlatot. Árajánlatot az űrlap alapján 1 munkanapon belül küldünk."
);

export default function BimQuotePage() {
  return (
    <article className="bg-background">
      <section className="bg-section-dark py-14 text-section-dark-foreground">
        <div className="mx-auto max-w-3xl px-4">
          <h1 className="text-3xl font-bold text-section-dark-foreground sm:text-4xl">
            Ajánlatkérés
          </h1>
          <p className="mt-4 opacity-90">
            Kérjen helyszíni felmérési vagy Scan-to-BIM kapacitásajánlatot.
          </p>
          {BIM_CONFIG.replySlaText ? (
            <p className="mt-3 text-sm opacity-80">{BIM_CONFIG.replySlaText}</p>
          ) : null}
        </div>
      </section>
      <div className="mx-auto max-w-3xl px-4 py-12">
        <Suspense fallback={<p className="text-sm text-muted-foreground">Űrlap betöltése…</p>}>
          <BimQuoteForm />
        </Suspense>
        {bimPhoneVisible() ? (
          <p className="mt-8 text-sm text-muted-foreground">
            Másodlagos kapcsolat: telefon{" "}
            <BimPhoneLink forras="ajanlatkeres" className="font-semibold text-brand underline" />
          </p>
        ) : null}
      </div>
    </article>
  );
}
