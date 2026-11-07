import { BimDeliverableBlock } from "@/components/bim/BimDeliverableBlock";
import { BimLink } from "@/components/bim/BimChrome";
import { BimScopeNote } from "@/components/bim/BimScopeNote";
import { BimServiceLayout, ServiceSection } from "@/components/bim/BimServiceLayout";
import { bimHasSamplePack, BIM_CONFIG } from "@/config/bim";
import { MAIN_ORIGIN, bimMetadata } from "@/lib/bim-site";

export const metadata = bimMetadata(
  "/szolgaltatasok/tervezoknek-es-kivitelezoknek",
  "Tervezőknek és kivitelezőknek — georeferált pontfelhő | VRGO BIM",
  "Georeferált pontfelhő, DWG alaprajz. Csak terepi munka is; modellezés külön tételként vagy Önöknél."
);

export default function DesignersServicePage() {
  return (
    <BimServiceLayout
      crumbs={[
        { href: "/", label: "Kezdőlap" },
        { href: "/szolgaltatasok", label: "Szolgáltatások" },
        { label: "Tervezőknek és kivitelezőknek" },
      ]}
      title="Helyszíni rögzítés tervezőknek és kivitelezőknek"
      lead="Georeferált pontfelhő és DWG — modellezés opcionális. Egy szerződéssel, egy felelőssel a terepi munkától az átadásig."
      ctaHref="/ajanlatkeres?forras=tervezoknek-szolgaltatas"
    >
      <ServiceSection title="Kinek">
        <p>
          Tervezőirodák, BIM-managerek, generáltervezők és kivitelezők, akik meglévő épületre
          készítenek modellt vagy ellenőrzik a helyszíni állapotot.
        </p>
      </ServiceSection>

      <ServiceSection title="Mikor érdemes">
        <ul className="list-disc space-y-1 pl-5">
          <li>Felmérési alapadat EIR vagy saját specifikáció szerint</li>
          <li>Csak helyszíni rögzítés és georeferálás, modellezés nélkül</li>
          <li>As-built ellenőrzés a tervezéshez vagy átadáshoz</li>
        </ul>
      </ServiceSection>

      <ServiceSection title="Mit kap egy átadás?">
        <ul className="list-disc space-y-1 pl-5">
          <li>E57 / RCP pontfelhő</li>
          <li>Georeferált alaprajz DWG</li>
          <li>Pontossági jegyzőkönyv</li>
          <li>Koordináta-rendszer leírás</li>
        </ul>
        <p className="mt-3">
          Csak helyszíni rögzítést és georeferálást is vállalunk, a modellezést Ön vagy a csapata
          végzi, vagy külön tételként mi.
        </p>
        {bimHasSamplePack() ? (
          <p className="mt-3">
            <a
              href={BIM_CONFIG.samplePackUrl}
              className="font-semibold text-brand"
              download
            >
              Minta-adatcsomag letöltése
            </a>
          </p>
        ) : (
          <p className="mt-3 text-sm">
            Minta-adatcsomag: kérjen névtelenített részletet az{" "}
            <BimLink
              href="/ajanlatkeres?forras=tervezoknek-minta"
              className="font-semibold text-brand"
            >
              ajánlatkérésben
            </BimLink>
            .
          </p>
        )}
      </ServiceSection>

      <ServiceSection title="Hogyan zajlik">
        <p>
          EIR vagy felmérési specifikáció áttekintése, helyszíni rögzítés, regisztráció és
          georeferálás, átadás a megbeszélt formátumokban. Részletek:{" "}
          <BimLink href="/pontossag-es-formatumok" className="font-semibold text-brand">
            pontosság és formátumok
          </BimLink>
          .
        </p>
      </ServiceSection>

      <ServiceSection title="Mennyi időt vesz igénybe">
        <p>
          A helyszíni napok és a feldolgozás határideje az ajánlatban szerepel; általános
          átfutási ígéretet nem teszünk.
        </p>
      </ServiceSection>

      <ServiceSection title="Mit vállalunk">
        <BimScopeNote />
      </ServiceSection>

      <ServiceSection title="Gyakori kérdések">
        <dl className="space-y-3">
          <div>
            <dt className="font-semibold text-foreground">Adnak IFC-t?</dt>
            <dd>Igen, külön modellezési tételként, az EIR / LOD szerint.</dd>
          </div>
          <div>
            <dt className="font-semibold text-foreground">Saját földmérővel dolgozhatunk?</dt>
            <dd>Igen — együttműködünk a megrendelő földmérőjével is.</dd>
          </div>
        </dl>
      </ServiceSection>

      <BimDeliverableBlock
        deliverables="Pontfelhő, georeferált DWG, jegyzőkönyv; IFC/natív modell külön tételként."
        timeline="A helyszíni napok és a feldolgozás határideje az ajánlatban."
        fromYou="EIR vagy felmérési specifikáció, hozzáférés, koordináta-rendszer elvárás."
        ctaHref="/ajanlatkeres?forras=tervezoknek-szolgaltatas"
      />

      <p>
        A korábbi{" "}
        <BimLink href="/tervezoknek" className="font-semibold text-brand">
          /tervezoknek
        </BimLink>{" "}
        oldal továbbra is elérhető. Partner belépés:{" "}
        <a href={`${MAIN_ORIGIN}/partner/login`} className="font-semibold text-brand">
          vrgo.hu/partner
        </a>
        .
      </p>
    </BimServiceLayout>
  );
}
