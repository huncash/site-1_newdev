import { BimBreadcrumb } from "@/components/bim/BimBreadcrumb";
import { BimDeliverableBlock } from "@/components/bim/BimDeliverableBlock";
import { BimLink } from "@/components/bim/BimChrome";
import { BIM_STATE_HUB_HREF, BIM_STATE_HUB_LABEL } from "@/config/menu";
import { bimMetadata } from "@/lib/bim-site";

export const metadata = bimMetadata(
  "/uzemeltetes",
  "Üzemeltetés: éves digitális iker | VRGO BIM",
  "Éves újrafelvétel, változáskövetés és digitális iker üzemeltetőknek."
);

export default function OperationsPage() {
  return (
    <article className="bg-background">
      <section className="bg-section-dark py-14 text-section-dark-foreground">
        <div className="mx-auto max-w-4xl px-4">
          <BimBreadcrumb
            tone="dark"
            items={[
              { href: "/", label: "Kezdőlap" },
              { href: "/megoldasok", label: "Megoldások" },
              { label: "Üzemeltetés és éves digitális iker" },
            ]}
          />
          <h1 className="text-3xl font-bold text-section-dark-foreground sm:text-4xl">
            Üzemeltetés: éves digitális iker és állapotkövetés
          </h1>
          <p className="mt-3 text-sm opacity-90 sm:text-base">
            Időszakos felmérés és változáskövetés — hogy az üzemeltetés mindig a tényleges
            állapotra épülhessen.
          </p>
        </div>
      </section>
      <div className="mx-auto max-w-4xl space-y-8 px-4 py-12 text-sm text-muted-foreground sm:text-base">
        <section>
          <h2 className="text-xl font-semibold text-foreground">Kinek</h2>
          <p className="mt-2">Üzemeltetők, fenntartók, vagyonkezelők, létesítménygazdálkodó cégek.</p>
        </section>
        <section>
          <h2 className="text-xl font-semibold text-foreground">Mikor érdemes</h2>
          <ul className="mt-2 list-disc space-y-1 pl-5">
            <li>Éves vagy mérföldkő szerinti állapotfrissítés</li>
            <li>Átalakítások, berendezéscsere utáni dokumentálás</li>
            <li>Portfólió-szintű összehasonlítható téradat</li>
          </ul>
        </section>
        <section>
          <h2 className="text-xl font-semibold text-foreground">Mit kap</h2>
          <ul className="mt-2 list-disc space-y-2 pl-5">
            <li>Éves vagy időszakos újrafelvétel — a helyszíni ablakot az ajánlat rögzíti</li>
            <li>Az előző és az új pontfelhő egymás mellett áttekinthető</li>
            <li>Kézzel jelölt eszközök, hibajegyek és megfigyelések a megrendelés szerint</li>
            <li>Hozzáférési szintek a megrendelés szerint</li>
          </ul>
        </section>
        <section>
          <h2 className="text-xl font-semibold text-foreground">Hogyan zajlik</h2>
          <p className="mt-2">
            Egyeztetjük a zónákat és az ütemet, elvégezzük a helyszíni rögzítést, majd átadjuk a
            frissített pontfelhőt és a változásjelentést. Modellfrissítés külön tételként kérhető.
          </p>
        </section>
        <section>
          <h2 className="text-xl font-semibold text-foreground">Mit vállalunk</h2>
          <p className="mt-2">
            A pontossági szintet az EIR vagy a megrendelés határozza meg. Részletek:{" "}
            <BimLink href="/pontossag-es-formatumok" className="font-semibold text-brand">
              pontosság és formátumok
            </BimLink>
            .
          </p>
        </section>

        <section className="rounded-md border border-border bg-secondary/60 p-5">
          <h2 className="text-lg font-semibold text-foreground">
            Állami beruházásnál / a BIM-előírások szerint
          </h2>
          <p className="mt-2">
            Üzemeltetési szakaszban a szabályozás szerinti éves állapot rögzítése és mentés
            (tartalom az EIR szerint) is releváns lehet. A részletek és a kapcsolódó
            szolgáltatások:
          </p>
          <ul className="mt-3 list-disc space-y-1 pl-5 text-sm">
            <li>
              Üzemeltetés felhasználási eset (200): éves felvétel, decemberi állapot, márciusig
              kérhető átadás
            </li>
            <li>
              BIM-mentés: a formátumot és a tartalmat az EIR írja elő; a pontfelhő-felvételt mi
              készítjük, az IFC külön modellezési tétel
            </li>
          </ul>
          <BimLink href={BIM_STATE_HUB_HREF} className="mt-3 inline-block font-semibold text-brand">
            {BIM_STATE_HUB_LABEL} →
          </BimLink>
        </section>

        <BimDeliverableBlock
          deliverables="Frissített pontfelhő, változásjelentés; modellfrissítés külön tételként."
          timeline="Éves vagy mérföldkő szerinti ütem; a konkrét napokat az ajánlat rögzíti."
          fromYou="Üzemeltetési prioritások, hozzáférés, előző átadás anyagai, specifikáció vagy EIR."
        />
        <BimLink
          href="/ajanlatkeres?forras=uzemeltetes"
          className="inline-flex rounded-md bg-brand px-6 py-3 text-sm font-semibold text-brand-foreground"
        >
          Küldje el a feladat leírását, módszertant és árajánlatot adunk.
        </BimLink>
      </div>
    </article>
  );
}
