import { Suspense } from "react";

import { BimResidentialForm } from "@/components/bim/BimResidentialForm";
import { BimLink } from "@/components/bim/BimChrome";
import { bimMetadata } from "@/lib/bim-site";

export const metadata = bimMetadata(
  "/lakossagi-felmeres",
  "Lakás- és házfelmérés | VRGO BIM",
  "Felújítás, tetőtér-beépítés vagy átépítés előtti pontos alaprajz lézeres felméréssel."
);

export default function ResidentialSurveyPage() {
  return (
    <article className="bg-background">
      <section className="bg-section-dark py-10 text-section-dark-foreground sm:py-12">
        <div className="mx-auto max-w-3xl px-4">
          <h1 className="text-3xl font-bold leading-tight sm:text-4xl">Lakás- és házfelmérés</h1>
          <p className="mt-3 text-base opacity-90 sm:text-lg">
            Felújítás, tetőtér-beépítés vagy átépítés előtti pontos alaprajz.
          </p>
          <BimLink
            href="#ajanlat"
            className="mt-8 inline-flex items-center justify-center rounded-md bg-brand px-6 py-3 text-sm font-semibold uppercase tracking-wider text-brand-foreground hover:bg-brand-dark"
          >
            Árajánlat kérése
          </BimLink>
        </div>
      </section>

      <div className="mx-auto max-w-3xl space-y-10 px-4 py-12 text-sm text-muted-foreground sm:text-base">
        <section>
          <h2 className="text-xl font-semibold text-foreground">Mikor van rá szükség</h2>
          <ul className="mt-4 list-disc space-y-2 pl-5">
            <li>Felújítás vagy átalakítás előtt</li>
            <li>Tetőtér-beépítésnél</li>
            <li>Ha nincs meg a régi ház terve</li>
            <li>Belsőépítészeti vagy gépészeti tervezéshez</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground">Mit kap a megrendelő</h2>
          <ul className="mt-4 list-disc space-y-2 pl-5">
            <li>Alaprajz és metszet (PDF, DWG)</li>
            <li>Mért méretek a tervezőnek</li>
            <li>Pontfelhő-nézet kérésre</li>
            <li>Modell külön tételként, ha kéri</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground">Hogyan zajlik</h2>
          <p className="mt-3">
            Egyeztetjük a feladatot, egy bejárással rögzítjük a teret, majd átadjuk a megrendelt
            rajzokat. A részleteket a helyszínen és az ajánlatban rögzítjük.
          </p>
        </section>

        <section id="ajanlat" className="scroll-mt-24">
          <h2 className="text-xl font-semibold text-foreground">Árajánlat kérése</h2>
          <p className="mt-3">
            Írja le röviden a lakást vagy házat. A módszert és az árajánlatot utána egyeztetjük.
          </p>
          <div className="mt-6">
            <Suspense fallback={<p className="text-sm text-muted-foreground">Űrlap betöltése…</p>}>
              <BimResidentialForm />
            </Suspense>
          </div>
        </section>
      </div>
    </article>
  );
}
