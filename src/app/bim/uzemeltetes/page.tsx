import { BimLink } from "@/components/bim/BimChrome";
import { BimScopeNote } from "@/components/bim/BimScopeNote";
import { BimUseCaseList } from "@/components/bim/BimUseCaseList";
import { bimMetadata } from "@/lib/bim-site";

export const metadata = bimMetadata(
  "/uzemeltetes",
  "Üzemeltetés: éves digitális iker és BIM-mentés | VRGO BIM",
  "Éves újrafelvétel és kézi jelölés üzemeltetőknek. A rendelet szerinti BIM-mentés formátumát az EIR írja elő."
);

export default function OperationsPage() {
  return (
    <article className="bg-background">
      <section className="bg-section-dark py-14 text-section-dark-foreground">
        <div className="mx-auto max-w-4xl px-4">
          <h1 className="text-3xl font-bold text-section-dark-foreground sm:text-4xl">
            Üzemeltetés: éves digitális iker és a BIM-mentés támogatása
          </h1>
        </div>
      </section>
      <div className="mx-auto max-w-4xl space-y-8 px-4 py-12 text-sm text-muted-foreground sm:text-base">
        <section>
          <h2 className="text-xl font-semibold text-foreground">Kinek</h2>
          <p className="mt-2">Üzemeltetők, fenntartók, vagyonkezelők, létesítménygazdálkodó cégek.</p>
        </section>
        <section>
          <h2 className="text-xl font-semibold text-foreground">A szabály</h2>
          <p className="mt-2">
            Üzemeltetési szakaszban a BIM-ről minden üzemeltetési év december 31-i állapotát
            rögzítve, a tárgyévet követő március 15-ig biztonsági mentést kell készíteni. A mentés
            tartalmát az EIR határozza meg (14. § (3) c)).
          </p>
        </section>
        <section>
          <h2 className="text-xl font-semibold text-foreground">Felhasználási esetek</h2>
          <BimUseCaseList items={[{ code: "200" }]} />
        </section>
        <section>
          <h2 className="text-xl font-semibold text-foreground">Amit nyújtunk</h2>
          <ul className="mt-2 list-disc space-y-2 pl-5">
            <li>Éves újrafelvétel. A helyszíni ablakot és a leadást az ajánlat rögzíti; decemberi felvétel és január–februári átadás kérhető.</li>
            <li>Az előző évi és az új pontfelhő egymás mellett áttekinthető.</li>
            <li>Kézzel jelölt eszközök, hibajegyek és akadálymentesítési megfigyelések.</li>
            <li>Hozzáférési szintek a megrendelés szerint.</li>
          </ul>
        </section>
        <section>
          <h2 className="text-xl font-semibold text-foreground">BIM-mentés</h2>
          <p className="mt-2">
            A 14. § (3) c) szerinti mentés formátumát és tartalmát az EIR írja elő. Az éves
            pontfelhő-felvételt mi készítjük; az IFC-állomány pontfelhő alapú precíz modellezéssel készül.
          </p>
        </section>
        <section>
          <h2 className="text-xl font-semibold text-foreground">Mit vállalunk</h2>
          <div className="mt-2">
            <BimScopeNote />
          </div>
        </section>
        <BimLink
          href="/ajanlatkeres"
          className="inline-flex rounded-md bg-brand px-6 py-3 text-sm font-semibold text-brand-foreground"
        >
          Küldje el a feladat leírását vagy az EIR-t, módszert és árat javasolunk.
        </BimLink>
      </div>
    </article>
  );
}
