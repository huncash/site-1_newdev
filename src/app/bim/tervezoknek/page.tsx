import { BimBreadcrumb } from "@/components/bim/BimBreadcrumb";
import { BimDeliverableBlock } from "@/components/bim/BimDeliverableBlock";
import { BimLink } from "@/components/bim/BimChrome";
import { BimScopeNote } from "@/components/bim/BimScopeNote";
import { bimMetadata, MAIN_ORIGIN } from "@/lib/bim-site";

export const metadata = bimMetadata(
  "/tervezoknek",
  "Helyszíni rögzítés tervezőknek | VRGO BIM",
  "Georeferált pontfelhő, DWG alaprajz tervezőirodáknak. Csak terepi munka is, modellezés külön tételként vagy Önöknél."
);

export default function DesignersPage() {
  return (
    <article className="bg-background">
      <section className="bg-section-dark py-14 text-section-dark-foreground">
        <div className="mx-auto max-w-4xl px-4">
          <BimBreadcrumb
            tone="dark"
            items={[
              { href: "/", label: "Kezdőlap" },
              { href: "/szolgaltatasok", label: "Szolgáltatások" },
              { label: "Tervezőknek" },
            ]}
          />
          <h1 className="text-3xl font-bold text-section-dark-foreground sm:text-4xl">
            Helyszíni rögzítés tervezőknek és BIM-modellezőknek
          </h1>
          <p className="mt-3 text-sm opacity-90">
            Frissebb szolgáltatáslap:{" "}
            <BimLink
              href="/szolgaltatasok/tervezoknek-es-kivitelezoknek"
              className="underline"
            >
              Tervezőknek és kivitelezőknek
            </BimLink>
            .
          </p>
        </div>
      </section>
      <div className="mx-auto max-w-4xl space-y-8 px-4 py-12 text-sm text-muted-foreground sm:text-base">
        <section>
          <h2 className="text-xl font-semibold text-foreground">Kinek</h2>
          <p className="mt-2">
            Tervezőirodák, BIM-managerek, generáltervezők, akik meglévő épületre készítenek modellt.
          </p>
        </section>
        <section>
          <h2 className="text-xl font-semibold text-foreground">Mit kapnak</h2>
          <p className="mt-2">
            Helyszíni rögzítés a megadott szempontok szerint. Ha az EIR tartalmazza, a
            koordináta-rendszert és a fájlnevezést az 1. melléklet 3.3–3.4 pontjai szerint vesszük
            figyelembe. Átadjuk az E57, OBJ, XYZ fájlt és az alaprajzot, ha a megrendelés
            tartalmazza. Az IFC-modell a pontfelhőből precíz modellezéssel készül — külön tételként.
            A pontossági szintet az EIR-hez mérjük, és előre jelezzük, ha a feladathoz más módszer
            szükséges. Az átfutási időt az ajánlat rögzíti.
          </p>
        </section>
        <section>
          <h2 className="text-xl font-semibold text-foreground">Üzleti modell</h2>
          <p className="mt-2">
            A szerződést az adott projektre kötjük. Az ár négyzetméter-alapú vagy projektár, a
            végleges összeget az épület jellege szerint az ajánlat tartalmazza. Csak helyszíni
            rögzítést és georeferálást is vállalunk, a modellezést Ön vagy a csapata végzi, vagy
            külön tételként mi.
          </p>
        </section>
        <section>
          <h2 className="text-xl font-semibold text-foreground">Mit kap egy átadás?</h2>
          <ul className="mt-2 list-disc space-y-1 pl-5">
            <li>E57 / RCP pontfelhő</li>
            <li>Georeferált alaprajz DWG</li>
            <li>Pontossági jegyzőkönyv</li>
            <li>Koordináta-rendszer leírás</li>
          </ul>
          <p className="mt-3 text-sm">
            Minta-adatcsomag: hamarosan letölthető névtelenített részlet — addig kérjen mintát az{" "}
            <BimLink href="/ajanlatkeres?forras=tervezoknek-minta" className="font-semibold text-brand">
              ajánlatkérésben
            </BimLink>
            .
          </p>
        </section>
        <section>
          <h2 className="text-xl font-semibold text-foreground">Mit vállalunk</h2>
          <div className="mt-2">
            <BimScopeNote />
          </div>
        </section>
        <BimDeliverableBlock
          deliverables="Pontfelhő, georeferált DWG, jegyzőkönyv; IFC/natív modell külön tételként."
          timeline="A helyszíni napok és a feldolgozás határideje az ajánlatban."
          fromYou="EIR vagy felmérési specifikáció, hozzáférés, koordináta-rendszer elvárás."
          ctaHref="/ajanlatkeres?forras=tervezoknek"
        />
        <div className="flex flex-col gap-3 sm:flex-row">
          <a
            href={`${MAIN_ORIGIN}/partner/login`}
            className="inline-flex items-center justify-center rounded-md border-2 border-brand px-6 py-3 text-sm font-semibold uppercase tracking-wider text-brand"
          >
            Partner belépés
          </a>
          <BimLink
            href="/ajanlatkeres"
            className="inline-flex items-center justify-center rounded-md bg-brand px-6 py-3 text-center text-sm font-semibold text-brand-foreground"
          >
            Küldje el a feladat leírását vagy az EIR-t
          </BimLink>
        </div>
        <p className="text-xs">A partnerbelépés a vrgo.hu oldalon van.</p>
      </div>
    </article>
  );
}
