import { BimDeliverableBlock } from "@/components/bim/BimDeliverableBlock";
import { BimLink } from "@/components/bim/BimChrome";
import { BimServiceLayout, ServiceSection } from "@/components/bim/BimServiceLayout";
import { bimMetadata } from "@/lib/bim-site";

export const metadata = bimMetadata(
  "/szolgaltatasok/ipari-letesitmenyek",
  "Ipari létesítmények felmérése | VRGO BIM",
  "Gyártóüzemek, raktárak és technológiai csarnokok lézeres állapotfelmérése — a termelési megszakítás minimalizálásával. Georeferált pontfelhő és as-built alap."
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
      ctaHref="/ajanlatkeres?utvonal=ipar&forras=ipari-szolgaltatas"
      ctaLabel="Ipari felmérés kérése"
    >
      <ServiceSection title="Mit vállalunk">
        <ul className="list-disc space-y-1 pl-5">
          <li>Új gép vagy technológia beépítéséhez szükséges térbeli alap</li>
          <li>Csővezeték-, gépészeti és szerkezeti állapot rögzítése</li>
          <li>Layout-tervezéshez és ütközésvizsgálathoz használható pontfelhő</li>
          <li>Átépítések, bővítések és átadások as-built alapja</li>
          <li>
            Nagyobb projektnél helyszíni tartózkodás, a termelési megszakítás minimalizálására
            optimalizált munkavégzés
          </li>
          <li>Országos kiszállás; Budapest és a Duna-kanyar környékén akár azonos napi kiszállás</li>
        </ul>
      </ServiceSection>

      <ServiceSection title="Technológia">
        <p>
          Trimble X9 a nagy terekhez és csarnokokhoz, Leica BLK2GO a szűk és gépészeti részekhez,
          DJI drón a tetőhöz és külső területhez, Trimble GNSS a georeferáláshoz — egy
          koordináta-rendszerben.
        </p>
      </ServiceSection>

      <ServiceSection title="Mit kap">
        <ul className="list-disc space-y-1 pl-5">
          <li>Pontfelhő (E57)</li>
          <li>2D layout / CAD rajzok a megrendelés szerint</li>
          <li>Igény szerint Scan-to-BIM (Revit, ArchiCAD, IFC) — külön tétel</li>
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
              Nem kötelező — a pontfelhő és a 2D layout gyakran elegendő. A modell külön tétel.
            </dd>
          </div>
        </dl>
      </ServiceSection>

      <BimDeliverableBlock
        deliverables="Pontfelhő, 2D layout, igény szerint ütközésvizsgálati alapadat és Scan-to-BIM."
        timeline="A helyszíni napok száma a létesítmény méretétől és a zónák hozzáférhetőségétől függ; a határidőt az ajánlat rögzíti."
        fromYou="Helyszíni hozzáférés, biztonsági előírások, felmérendő zónák; ha van: meglévő layout vagy EIR."
        ctaHref="/ajanlatkeres?utvonal=ipar&forras=ipari-szolgaltatas"
      />

      <p className="text-sm text-muted-foreground">
        Kapacitás BIM-modellezőként?{" "}
        <BimLink href="/scan-to-bim-kapacitas" className="font-semibold text-brand">
          Scan-to-BIM kapacitás →
        </BimLink>
      </p>
    </BimServiceLayout>
  );
}
