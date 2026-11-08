import { Suspense } from "react";

import { BimPhoneLink } from "@/components/bim/BimChrome";
import { BimQuoteForm } from "@/components/bim/BimQuoteForm";
import { BIM_CONFIG, bimPhoneVisible } from "@/config/bim";
import { bimMetadata } from "@/lib/bim-site";

export const metadata = bimMetadata(
  "/kapcsolat",
  "Kapcsolat — ajánlatkérés | VRGO BIM",
  "Kérjen helyszíni felmérési vagy Scan-to-BIM kapacitásajánlatot. Űrlap, telefonszám és rövid válaszidő tájékoztatás."
);

export default function BimContactPage() {
  return (
    <article className="bg-background">
      <section className="bg-section-dark py-14 text-section-dark-foreground">
        <div className="mx-auto max-w-3xl px-4">
          <h1 className="text-3xl font-bold sm:text-4xl">Kapcsolat</h1>
          <p className="mt-4 opacity-90">
            Ipari és épületfelmérési specialisták: helyszíni lézeres felmérés, pontfelhő és szükség
            szerint Scan-to-BIM alap.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-3xl space-y-10 px-4 py-12">
        <section className="text-sm text-muted-foreground sm:text-base">
          <h2 className="text-xl font-semibold text-foreground">Elérhetőségek</h2>
          <p className="mt-3">
            Az elsődleges kapcsolat az űrlap. Írja le a feladatot, mi visszajelzünk.
          </p>
          {bimPhoneVisible() ? (
            <p className="mt-3">
              Telefon:{" "}
              <BimPhoneLink forras="kapcsolat" className="font-semibold text-brand underline" />
            </p>
          ) : null}
          {BIM_CONFIG.replySlaText ? (
            <p className="mt-3 text-sm">{BIM_CONFIG.replySlaText}</p>
          ) : null}
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground">Ajánlatkérés</h2>
          <p className="mt-3 text-sm text-muted-foreground">
            Kérjen helyszíni felmérési vagy Scan-to-BIM kapacitásajánlatot.
          </p>
          <div className="mt-6">
            <Suspense fallback={<p className="text-sm text-muted-foreground">Űrlap betöltése…</p>}>
              <BimQuoteForm />
            </Suspense>
          </div>
        </section>
      </div>
    </article>
  );
}
