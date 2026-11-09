import { Suspense } from "react";

import { BimQuoteForm } from "@/components/bim/BimQuoteForm";
import { BimLink } from "@/components/bim/BimChrome";
import { bimHasSamplePack, BIM_CONFIG } from "@/config/bim";
import { bimMetadata } from "@/lib/bim-site";

export const metadata = bimMetadata(
  "/tervezoknek",
  "Felmérés tervezőknek — pontfelhő és CAD | VRGO BIM",
  "Meglévő épületek felmérése a tervezőcsapattal egyeztetett követelmények szerint, EOV-rendszerbe illesztett adattal."
);

export default function DesignersPage() {
  return (
    <article className="bg-background">
      <section className="bg-section-dark py-10 text-section-dark-foreground sm:py-12">
        <div className="mx-auto max-w-4xl px-4">
          <h1 className="text-3xl font-bold leading-tight sm:text-4xl">
            Meglévő épület felmérése EOV-ban
          </h1>
          <p className="mt-3 max-w-3xl text-base opacity-90 sm:text-lg">
            Meglévő épületek felmérése a tervezőcsapattal egyeztetett követelmények szerint,
            EOV-rendszerbe illesztett adattal.
          </p>
          <BimLink
            href="/kapcsolat?utvonal=tervezo&forras=tervezoknek"
            className="mt-8 inline-flex items-center justify-center rounded-md bg-brand px-6 py-3 text-sm font-semibold uppercase tracking-wider text-brand-foreground hover:bg-brand-dark"
          >
            Ajánlatot kérek
          </BimLink>
        </div>
      </section>

      <div className="mx-auto max-w-4xl space-y-12 px-4 py-12 text-sm text-muted-foreground sm:text-base">
        <section>
          <h2 className="text-xl font-semibold text-foreground">Felújítás és rekonstrukció</h2>
          <p className="mt-3">
            Hiányzó vagy pontatlan terv helyett mért alaprajzot, metszetet és pontfelhőt adunk a
            tervezés kiindulópontjához.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground">Bővítés és átalakítás</h2>
          <p className="mt-3">
            A meglévő szerkezet és gépészet rögzítése csökkenti a helyszíni meglepetéseket a
            kivitelezés előtt.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground">Meglévő állapot rögzítése</h2>
          <p className="mt-3">
            As-built dokumentáció ellenőrzéshez, átadáshoz vagy további tervezési szakaszokhoz.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground">Pontfelhő és CAD</h2>
          <p className="mt-3">
            Tipikus átadás: pontfelhő és DWG alaprajz / metszet. További formátumokat az ajánlat
            rögzít.
          </p>
          {bimHasSamplePack() ? (
            <p className="mt-3">
              <a href={BIM_CONFIG.samplePackUrl} className="font-semibold text-brand" download>
                Minta-adatcsomag letöltése
              </a>
            </p>
          ) : null}
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground">Átadási lehetőségek</h2>
          <p className="mt-3">
            A mérések eredménye pontfelhő, EOV-ban illesztett modell vagy az ezekből készített
            3D-vetületi modell lehet, a megrendelő előzetesen rögzített követelménye szerint.
            Vállaljuk a csak terepi adat átadását is, ha a modellezést Ön végzi.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground">EOV és georeferálás</h2>
          <p className="mt-3">
            Ha az EIR bekötést kér, a lézeres felmérést geodéziai ellenőrzéssel és EOV-bekötéssel
            egészítjük ki. A megrendelő saját földmérőjével is együttműködünk.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground">Munkafolyamat</h2>
          <p className="mt-3">
            A lépéseket a{" "}
            <BimLink href="/munkafolyamat" className="font-semibold text-brand">
              munkafolyamat
            </BimLink>{" "}
            oldalon találja.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground">Űrlap</h2>
          <p className="mt-3">Kérjen helyszíni felmérési vagy kapacitásajánlatot.</p>
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
