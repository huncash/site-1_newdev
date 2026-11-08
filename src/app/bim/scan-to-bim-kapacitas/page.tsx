import { Suspense } from "react";

import { BimQuoteForm } from "@/components/bim/BimQuoteForm";
import { BimLink } from "@/components/bim/BimChrome";
import { BIM_CONFIG, bimHasSamplePack } from "@/config/bim";
import { bimMetadata } from "@/lib/bim-site";

export const metadata = bimMetadata(
  "/scan-to-bim-kapacitas",
  "BIM-modellezőknek: kapacitás és együttműködés | VRGO BIM",
  "Ha a felmérés, a nagyobb modellgyártás vagy a szoros átadási határidő miatt nincs elég belső kapacitás, mi betársulunk a munkafolyamatába."
);

const WHEN = [
  "Nagyobb terepi felmérés, amelyre nincs belső kapacitás",
  "Több párhuzamos modellgyártás szoros átadási határidővel",
  "Ipari vagy nehezen hozzáférhető helyszín",
  "Hiteles terepi adat kell a saját modellező csapatához",
] as const;

const WE_DO = [
  "Helyszíni lézeres felmérés",
  "Pontfelhő regisztráció és tisztítás",
  "CAD-alap a megrendelés szerint",
  "Scan-to-BIM modellezés szükség szerint",
] as const;

const YOU_GET = [
  "Saját név-, réteg- és LOD-konvenció szerinti munka",
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
            BIM-modellezőknek: kapacitás és együttműködés
          </h1>
          <p className="mt-4 max-w-3xl text-base opacity-90 sm:text-lg">
            Ha a felmérés, a nagyobb modellgyártás vagy a szoros átadási határidő miatt nincs elég
            belső kapacitás, mi betársulunk a munkafolyamatába.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <BimLink
              href="/kapcsolat?utvonal=kapacitas&forras=scan-to-bim"
              className="inline-flex items-center justify-center rounded-md bg-brand px-6 py-3 text-sm font-semibold uppercase tracking-wider text-brand-foreground hover:bg-brand-dark"
            >
              Kapacitásajánlat kérése
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
            Ön tartja az ügyfélkapcsolatot, mi a mérési és modellezési kapacitást biztosítjuk.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground">Mikor hasznos a külső kapacitás</h2>
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
          <h2 className="text-xl font-semibold text-foreground">Mit kap a partner</h2>
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
            A konvenciókat, a részletezettséget és az átadási formátumot a projektje szerint
            követjük. Név-, réteg- és LOD-szabályait a munka megkezdése előtt egyeztetjük.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground">Formátumok és ellenőrzés</h2>
          <p className="mt-3">
            Tipikus átadás: E57, DWG, IFC, Revit vagy ArchiCAD. Ha releváns, BCF hibajegyzéket és
            ellenőrző pontokat adunk.
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
          <h2 className="text-xl font-semibold text-foreground">Kapacitásajánlat űrlap</h2>
          <p className="mt-3">Kérjen helyszíni felmérési vagy Scan-to-BIM kapacitásajánlatot.</p>
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
