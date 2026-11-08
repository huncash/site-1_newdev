import { BimLink } from "@/components/bim/BimChrome";
import { BIM_CONFIG, bimHasSamplePack } from "@/config/bim";
import { bimMetadata } from "@/lib/bim-site";

export const metadata = bimMetadata(
  "/scan-to-bim-kapacitas",
  "BIM-modellezőknek: terepi adat és Scan-to-BIM kapacitás | VRGO BIM",
  "Georeferált pontfelhő, mérnöki állapotfelmérés és Revit/ArchiCAD/IFC-kompatibilis Scan-to-BIM alap a saját munkafolyamatába illesztve."
);

const POINTS = [
  "Saját név-, réteg- és LOD-konvenció szerinti munka",
  "BCF és minőség-ellenőrzés",
  "E57 / DWG / IFC / Revit / ArchiCAD átadás",
  "Országos kiszállás",
  "Ipari környezetben való jártasság",
  "Gyors reakció és mérnöki hitelesítés",
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
            BIM-modellezőknek: terepi adat és Scan-to-BIM kapacitás
          </h1>
          <p className="mt-4 max-w-3xl text-base opacity-90 sm:text-lg">
            Georeferált pontfelhő, mérnöki állapotfelmérés és Revit/ArchiCAD/IFC-kompatibilis
            Scan-to-BIM alap a saját munkafolyamatába illesztve.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <BimLink
              href="/ajanlatkeres?utvonal=kapacitas&forras=scan-to-bim"
              className="inline-flex items-center justify-center rounded-md bg-brand px-6 py-3 text-sm font-semibold uppercase tracking-wider text-brand-foreground hover:bg-brand-dark"
            >
              Kérjen kapacitás- vagy projektajánlatot
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

      <section className="py-12 sm:py-16">
        <div className="mx-auto max-w-3xl px-4">
          <h2 className="text-2xl font-semibold">Nem vesszük el az ügyfelét</h2>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground sm:text-base">
            Ön tartja az ügyfélkapcsolatot. Mi a hiteles terepi adatot, a Scan-to-BIM alapot és
            szükség esetén a modellezési kapacitást biztosítjuk. Ha egy felmérés, nagyobb
            modellgyártás vagy szoros átadási határidő miatt nincs elég belső kapacitás, mi
            betársulunk a munkafolyamatába.
          </p>
        </div>
      </section>

      <section className="bg-secondary py-12 sm:py-16">
        <div className="mx-auto max-w-4xl px-4">
          <h2 className="text-2xl font-semibold">Mit kap az együttműködéssel</h2>
          <ul className="mt-6 grid gap-3 sm:grid-cols-2">
            {POINTS.map((item) => (
              <li key={item} className="rounded-md border border-border bg-card px-4 py-3 text-sm">
                {item}
              </li>
            ))}
          </ul>
          <p className="mt-6 text-sm text-muted-foreground">
            Nagyobb projektnél helyszíni tartózkodással dolgozunk, a termelési megszakítás
            minimalizálására optimalizált ütemezéssel.
          </p>
        </div>
      </section>

      <section className="py-12 sm:py-16">
        <div className="mx-auto max-w-3xl px-4 text-center">
          <h2 className="text-2xl font-semibold">Következő lépés</h2>
          <p className="mt-3 text-sm text-muted-foreground">
            Kérjen helyszíni felmérési vagy Scan-to-BIM kapacitásajánlatot.
          </p>
          {BIM_CONFIG.replySlaText ? (
            <p className="mt-2 text-sm text-muted-foreground">{BIM_CONFIG.replySlaText}</p>
          ) : null}
          <BimLink
            href="/ajanlatkeres?utvonal=kapacitas&forras=scan-to-bim-cta"
            className="mt-6 inline-flex items-center justify-center rounded-md bg-brand px-6 py-3 text-sm font-semibold uppercase tracking-wider text-brand-foreground hover:bg-brand-dark"
          >
            Kapacitásajánlat kérése
          </BimLink>
        </div>
      </section>
    </article>
  );
}
