import { Suspense } from "react";

import { BimQuoteForm } from "@/components/bim/BimQuoteForm";
import { bimMetadata } from "@/lib/bim-site";

export const metadata = bimMetadata(
  "/scan-to-bim-kapacitas",
  "Terepi felmérés modellezőknek | VRGO BIM",
  "A helyszíni felmérést mi végezzük, az ügyfélkapcsolat és a modellezés az Önnél marad. A felmérési adatot az előre egyeztetett követelmények szerint adjuk át."
);

const WHEN = [
  "Nagyobb terepi felmérésre nincs szabad belső kapacitás.",
  "Ipari vagy nehezen megközelíthető helyszínen kell mérni.",
  "A modellezőcsapat ellenőrzött terepi adatot vár.",
  "Rövid határidejű feladatnál a vállalhatóságot a kapacitásunk alapján jelezzük.",
] as const;

const WE_DO = [
  "Helyszíni lézeres és geodéziai felmérés, szükség szerint drónos fotogrammetriával kiegészítve.",
  "Pontfelhő regisztrálása és tisztítása.",
  "Illesztés EOV-rendszerbe, ha a feladat megköveteli.",
  "Adatátadás a megrendelő által kért formátumban.",
] as const;

const PARTNER_KEEPS = [
  "Az ügyfélkapcsolat.",
  "A modellezés és a modellezési részletezettség.",
  "A végfelhasználói átadás.",
] as const;

export default function ScanToBimCapacityPage() {
  return (
    <article className="bg-background">
      <section className="bg-section-dark py-10 text-section-dark-foreground sm:py-12">
        <div className="mx-auto max-w-4xl px-4">
          <h1 className="text-3xl font-bold leading-tight sm:text-4xl">
            Terepi felmérés modellezőknek
          </h1>
          <p className="mt-3 max-w-3xl text-base opacity-90 sm:text-lg">
            A helyszíni felmérést mi végezzük, az ügyfélkapcsolat és a modellezés az Önnél marad. A
            felmérési adatot az előre egyeztetett követelmények szerint adjuk át.
          </p>
          <div className="mt-8">
            <a
              href="#egyuttmukodes"
              className="inline-flex items-center justify-center rounded-md bg-brand px-6 py-3 text-sm font-semibold uppercase tracking-wider text-brand-foreground hover:bg-brand-dark"
            >
              Együttműködés egyeztetése
            </a>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-4xl space-y-12 px-4 py-12 text-sm text-muted-foreground sm:text-base">
        <section>
          <h2 className="text-xl font-semibold text-foreground">Mikor lehet hasznos?</h2>
          <ul className="mt-4 list-disc space-y-2 pl-5">
            {WHEN.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground">Mit vállalunk?</h2>
          <ul className="mt-4 list-disc space-y-2 pl-5">
            {WE_DO.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground">Mi marad a partnernél?</h2>
          <ul className="mt-4 list-disc space-y-2 pl-5">
            {PARTNER_KEEPS.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground">Hogyan dolgozunk?</h2>
          <p className="mt-3">
            A felmérés előtt írásban rögzítjük a terjedelmet, a koordináta-rendszert, az átadási
            formátumot és az ellenőrzés módját. A pontossági követelményt a feladat és a megrendelő
            elvárása szerint egyeztetjük. A munka alatt felmerülő kérdéseket írásban jelezzük.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground">Átadás</h2>
          <p className="mt-3">
            Pontfelhő (például E57), EOV-ba illesztett adat vagy a partnerrel egyeztetett egyéb
            kimenet.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground">Országos kiszállás és ütemezés</h2>
          <p className="mt-3">
            Országosan vállalunk helyszíni munkát. Budapesten belül a kiszállási díjat nem számítjuk
            fel.
          </p>
          <p className="mt-3">
            Távolabbi vagy hosszabb feladatoknál a munkát igyekszünk tömbösítve végezni, hogy az
            utazási idő ne csökkentse a tényleges mérési időt. Az esetleges szállási igényt a
            projekt ütemezésével együtt egyeztetjük.
          </p>
        </section>

        <section id="egyuttmukodes">
          <h2 className="text-xl font-semibold text-foreground">Együttműködés és ajánlatkérés</h2>
          <p className="mt-3">
            Írja meg a feladatot vagy az együttműködési igényt, írásban válaszolunk.
          </p>
          <div className="mt-6">
            <Suspense fallback={<p className="text-sm text-muted-foreground">Űrlap betöltése…</p>}>
              <BimQuoteForm variant="partner" />
            </Suspense>
          </div>
        </section>
      </div>
    </article>
  );
}
