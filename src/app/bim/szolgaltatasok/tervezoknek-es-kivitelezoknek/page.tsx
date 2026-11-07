import { BimLink } from "@/components/bim/BimChrome";
import { BimServiceLayout, ServiceSection } from "@/components/bim/BimServiceLayout";
import { bimHasSamplePack, BIM_CONFIG } from "@/config/bim";
import { MAIN_ORIGIN, bimMetadata } from "@/lib/bim-site";

export const metadata = bimMetadata(
  "/szolgaltatasok/tervezoknek-es-kivitelezoknek",
  "Tervezőknek és kivitelezőknek — georeferált pontfelhő | VRGO BIM",
  "Georeferált pontfelhő és DWG alaprajz tervezőirodáknak, akár csak terepi munkára."
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
      lead="Georeferált pontfelhő és DWG alaprajz a terepi munkától az átadásig. Egy szerződéssel, egy felelőssel."
      ctaHref="/ajanlatkeres?forras=tervezoknek-szolgaltatas"
      ctaLabel="Küldje el a feladat leírását vagy az EIR-t"
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
          Vállaljuk a csak helyszíni rögzítést és georeferálást is: a pontfelhőt és a georeferált
          alaprajzot átadjuk, a modellezést Ön vagy a csapata végzi.
        </p>
        {bimHasSamplePack() ? (
          <p className="mt-3">
            <a href={BIM_CONFIG.samplePackUrl} className="font-semibold text-brand" download>
              Minta-adatcsomag letöltése
            </a>
          </p>
        ) : null}
      </ServiceSection>

      <ServiceSection title="Hogyan zajlik">
        <p>
          EIR vagy felmérési specifikáció áttekintése, helyszíni rögzítés, regisztráció és
          georeferálás, átadás a megbeszélt formátumokban. Ha az EIR tartalmazza, a
          koordináta-rendszert és a fájlnevezést az 1. melléklet 3.3–3.4 pontjai szerint vesszük
          figyelembe. A pontossági szintet az EIR-hez mérjük, és előre jelezzük, ha a feladathoz
          más módszer szükséges. Részletek:{" "}
          <BimLink href="/pontossag-es-formatumok" className="font-semibold text-brand">
            pontosság és formátumok
          </BimLink>
          .
        </p>
        <p>
          <strong className="text-foreground">Mennyi idő:</strong> a helyszíni napok és a
          feldolgozás határideje az ajánlatban szerepel.
        </p>
        <p>
          <strong className="text-foreground">Mi kell tőlünk:</strong> EIR vagy felmérési
          specifikáció, hozzáférés az épülethez, a koordináta-rendszerre vonatkozó elvárás.
        </p>
      </ServiceSection>

      <ServiceSection title="Megrendelési forma">
        <p>
          A szerződést az adott projektre kötjük. Az ár négyzetméter-alapú vagy projektár, a
          végleges összeget az épület jellege szerint az ajánlat tartalmazza.
        </p>
      </ServiceSection>

      <ServiceSection title="Gyakori kérdések">
        <dl className="space-y-3">
          <div>
            <dt className="font-semibold text-foreground">Adnak IFC-t?</dt>
            <dd>Igen, külön tételként, az EIR és az LOD szerint.</dd>
          </div>
          <div>
            <dt className="font-semibold text-foreground">Saját földmérővel dolgozhatunk?</dt>
            <dd>Igen, együttműködünk a megrendelő földmérőjével is.</dd>
          </div>
        </dl>
      </ServiceSection>

      <p className="text-sm">
        Partner belépés:{" "}
        <a href={`${MAIN_ORIGIN}/partner/login`} className="font-semibold text-brand">
          vrgo.hu/partner
        </a>
        .
      </p>
    </BimServiceLayout>
  );
}
