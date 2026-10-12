import { BimLink } from "@/components/bim/BimChrome";
import { bimMetadata } from "@/lib/bim-site";

export const metadata = bimMetadata(
  "/uzemeltetes",
  "Üzemeltetés: éves digitális iker és BIM-mentés | VRGO BIM",
  "Éves újrafelvétel és kézi jelölés üzemeltetőknek. A Matterport-túra tárolása nem azonos a rendelet szerinti BIM-mentéssel."
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
          <h2 className="text-xl font-semibold text-foreground">Amit nyújtunk</h2>
          <ul className="mt-2 list-disc space-y-2 pl-5">
            <li>Éves újrafelvétel. A helyszíni ablakot és a leadást az ajánlat rögzíti; decemberi felvétel és január–februári átadás kérhető.</li>
            <li>Az előző évi felvétel és az új felvétel egymás mellett megnézhető. Automatikus változáslistát nem adunk.</li>
            <li>Mattertaggel jelölt eszközök, hibajegyek és akadálymentesítési megfigyelések. A jelölés kézi.</li>
            <li>Hozzáférési szintek a Matterport-fiók beállításai szerint, ha a megrendelés kéri.</li>
          </ul>
        </section>
        <section>
          <h2 className="text-xl font-semibold text-foreground">Határ</h2>
          <p className="mt-2">
            A Matterport-túra tárolása nem azonos a rendelet szerinti BIM-mentéssel. A mentés
            formátumát és tartalmát az EIR írja elő. Az IFC- és BCF-állomány a modellezési fázis
            része, külön ajánlati tétel.
          </p>
        </section>
        <BimLink
          href="/ajanlatkeres"
          className="inline-flex rounded-md bg-brand px-6 py-3 text-sm font-semibold uppercase tracking-wider text-brand-foreground"
        >
          Ajánlatot kérek
        </BimLink>
      </div>
    </article>
  );
}
