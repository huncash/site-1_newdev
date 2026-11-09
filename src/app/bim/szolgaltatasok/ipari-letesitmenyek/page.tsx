import { BimDeliverableBlock } from "@/components/bim/BimDeliverableBlock";
import { BimLink } from "@/components/bim/BimChrome";
import { BimServiceLayout, ServiceSection } from "@/components/bim/BimServiceLayout";
import { bimMetadata } from "@/lib/bim-site";

export const metadata = bimMetadata(
  "/ipari-felmeres",
  "Ipari létesítmények felmérése | VRGO BIM",
  "Gyártóüzemek, raktárak és technológiai csarnokok lézeres állapotfelmérése. Pontfelhő és as-built alap a termelési ütemtervhez igazítva."
);

export default function IndustrialServicePage() {
  return (
    <BimServiceLayout
      crumbs={[
        { href: "/", label: "Kezdőlap" },
        { href: "/szolgaltatasok", label: "Szolgáltatások" },
        { label: "Ipari létesítmények" },
      ]}
      title="Ipari létesítmények felmérése, ahol a pontosság és az üzemfolytonosság számít"
      lead="Gyártóüzemek, raktárak, technológiai csarnokok és üzemek állapotfelmérése. Ahol a leállás drága, a felmérésnek a termeléshez kell alkalmazkodnia."
      ctaHref="/kapcsolat?utvonal=ipar&forras=ipari-szolgaltatas"
      ctaLabel="Ipari felmérés kérése"
    >
      <ServiceSection title="Mit vállalunk">
        <ul className="list-disc space-y-1 pl-5">
          <li>Új gép vagy technológia beépítéséhez szükséges térbeli alap</li>
          <li>Csővezeték-, gépészeti és szerkezeti állapot rögzítése</li>
          <li>Layout-tervezéshez használható pontfelhő</li>
          <li>Átépítések, bővítések és átadások as-built alapja</li>
          <li>
            Nagyobb ipari projektnél több napig a helyszínen dolgozunk, hogy a felmérés a termelési
            ütemtervhez igazodjon
          </li>
          <li>Országos kiszállás; Budapesten belül kiszállási díj felszámítása nélkül</li>
        </ul>
      </ServiceSection>

      <ServiceSection title="Módszer">
        <p>
          A terepi felmérést robotmérőállomással, GNSS-vevővel és drónos fotogrammetriával
          végezzük. A konkrét feladathoz tartozó lézerszkennelési kapacitást a megrendelés előtt
          egyeztetjük. A módszert a projekt feladata és a partner követelményei határozzák meg.
        </p>
      </ServiceSection>

      <ServiceSection title="Mit kap">
        <ul className="list-disc space-y-1 pl-5">
          <li>Pontfelhő a megrendelés szerinti formátumban</li>
          <li>2D layout / CAD rajzok a megrendelés szerint</li>
          <li>
            EOV-ban illesztett modell vagy 3D-vetületi modell a megrendelő előzetesen rögzített
            követelménye szerint — egyeztetve
          </li>
        </ul>
      </ServiceSection>

      <ServiceSection title="Gyakori kérdések">
        <dl className="space-y-3">
          <div>
            <dt className="font-semibold text-foreground">Üzem közben is lehet?</dt>
            <dd className="text-sm text-muted-foreground">
              Igen, a biztonsági előírások és a zónák egyeztetése után. A munkát a termelési
              korlátokhoz igazítjuk.
            </dd>
          </div>
          <div>
            <dt className="font-semibold text-foreground">Kell-e BIM-modell?</dt>
            <dd className="text-sm text-muted-foreground">
              Nem kötelező — a pontfelhő és a 2D layout gyakran elegendő. Modellátadás a megrendelő
              követelménye szerint, egyeztetve.
            </dd>
          </div>
        </dl>
      </ServiceSection>

      <BimDeliverableBlock
        deliverables="Pontfelhő, 2D layout; EOV-illesztett modell vagy 3D-vetület a megrendelés szerint."
        timeline="A helyszíni napok száma a létesítmény méretétől és a zónák hozzáférhetőségétől függ; a határidőt az ajánlat rögzíti."
        fromYou="Helyszíni hozzáférés, biztonsági előírások, felmérendő zónák; ha van: meglévő layout vagy EIR."
        ctaHref="/kapcsolat?utvonal=ipar&forras=ipari-szolgaltatas"
      />

      <p className="text-sm text-muted-foreground">
        Kapacitás BIM-modellezőként?{" "}
        <BimLink href="/scan-to-bim-kapacitas" className="font-semibold text-brand">
          Terepi felmérés modellezőknek →
        </BimLink>
      </p>
    </BimServiceLayout>
  );
}
