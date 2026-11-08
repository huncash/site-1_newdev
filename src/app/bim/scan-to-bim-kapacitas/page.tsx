import { Suspense } from "react";

import { BimQuoteForm } from "@/components/bim/BimQuoteForm";
import { BimLink } from "@/components/bim/BimChrome";
import { BIM_CONFIG, bimHasSamplePack } from "@/config/bim";
import { bimMetadata } from "@/lib/bim-site";

export const metadata = bimMetadata(
  "/scan-to-bim-kapacitas",
  "BIM-modellezőknek: terepi felmérés együttműködés | VRGO BIM",
  "Ha a helyszíni felmérésre nincs elég belső kapacitás, mi a terepi mérést végezzük. A felmérési adatot a saját modellező csapata dolgozza fel."
);

const WHEN = [
  "Nagyobb terepi felmérés, amelyre nincs belső kapacitás",
  "Ipari vagy nehezen hozzáférhető helyszín",
  "Hiteles terepi adat kell a saját modellező csapatához",
  "Szoros átadási határidő mellett a helyszíni munkát szeretné kiszervezni",
] as const;

const WE_DO = [
  "Helyszíni lézeres felmérés",
  "Pontfelhő regisztráció és tisztítás",
  "CAD-alap a megrendelés szerint",
  "A kimenetet a modellezéshez használható formában adjuk át",
] as const;

const YOU_GET = [
  "A helyszíni mérést mi vállaljuk",
  "A kimenetet a megrendelő által kért formátumban adjuk át",
  "BCF és minőség-ellenőrzés, ha releváns",
  "Országos kiszállás; Budapesten belül kiszállási díj nélkül",
] as const;

export default function ScanToBimCapacityPage() {
  return (
    <article className="bg-background">
      <section className="bg-section-dark py-14 text-section-dark-foreground sm:py-20">
        <div className="mx-auto max-w-4xl px-4">
          <p className="text-xs font-semibold uppercase tracking-wider text-brand">
            BIM-modellezőknek
          </p>
          <h1 className="mt-3 text-3xl font-bold sm:text-4xl">
            Terepi felmérés a saját modellező munkafolyamatához
          </h1>
          <p className="mt-4 max-w-3xl text-base opacity-90 sm:text-lg">
            Ha a helyszíni felmérésre nincs elég belső kapacitás, mi a terepi mérést végezzük. Ön
            tartja az ügyfélkapcsolatot és a modellezést; mi a felmérési adatot adjuk át.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <BimLink
              href="/kapcsolat?utvonal=kapacitas&forras=scan-to-bim"
              className="inline-flex items-center justify-center rounded-md bg-brand px-6 py-3 text-sm font-semibold uppercase tracking-wider text-brand-foreground hover:bg-brand-dark"
            >
              Felmérési ajánlat kérése
            </BimLink>
            {bimHasSamplePack() ? (
              <a
                href={BIM_CONFIG.samplePackUrl}
                className="inline-flex items-center justify-center rounded-md border-2 border-white px-6 py-3 text-sm font-semibold uppercase tracking-wider hover:bg-white hover:text-section-dark"
              >
                Minta átadási standard letöltése
              </a>
            ) : null}
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-4xl space-y-12 px-4 py-12 text-sm text-muted-foreground sm:text-base">
        <section>
          <h2 className="text-xl font-semibold text-foreground">Nem vesszük el az ügyfelét</h2>
          <p className="mt-3">
            Ön tartja az ügyfélkapcsolatot és a modellezést. Mi a helyszíni felmérést és a
            megrendelt felmérési kimenetet biztosítjuk.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground">Mikor hasznos a külső felmérés</h2>
          <ul className="mt-4 list-disc space-y-2 pl-5">
            {WHEN.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground">Mit vállalunk</h2>
          <ul className="mt-4 list-disc space-y-2 pl-5">
            {WE_DO.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground">Mit kap a megrendelő partner</h2>
          <ul className="mt-4 list-disc space-y-2 pl-5">
            {YOU_GET.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground">
            Hogyan illeszkedünk a saját munkafolyamatába
          </h2>
          <p className="mt-3">
            A részletezettséget és az átadási formátumot a projektje szerint követjük. A
            követelményeket a munka megkezdése előtt egyeztetjük.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground">Formátumok és ellenőrzés</h2>
          <p className="mt-3">
            Tipikus átadás: E57, DWG, IFC. Ha releváns, BCF hibajegyzéket és ellenőrző pontokat
            adunk.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground">Országos kiszállás</h2>
          <p className="mt-3">
            Országosan vállalunk helyszíni munkát. Budapesten belül a kiszállási díjat nem számítjuk
            fel.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground">Felmérési ajánlat űrlap</h2>
          <p className="mt-3">Kérjen helyszíni felmérési ajánlatot a saját munkafolyamatához.</p>
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
