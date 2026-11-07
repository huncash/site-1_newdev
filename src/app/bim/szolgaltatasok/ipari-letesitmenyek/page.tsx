import { BimDeliverableBlock } from "@/components/bim/BimDeliverableBlock";
import { BimLink } from "@/components/bim/BimChrome";
import { BimServiceLayout, ServiceSection } from "@/components/bim/BimServiceLayout";
import { bimMetadata } from "@/lib/bim-site";

export const metadata = bimMetadata(
  "/szolgaltatasok/ipari-letesitmenyek",
  "Ipari létesítmények és csarnokok 3D felmérése | VRGO BIM",
  "Gyártócsarnok, raktár, technológiai tér — layout, géptelepítés, ütközésvizsgálati alapadat."
);

export default function IndustrialServicePage() {
  return (
    <BimServiceLayout
      crumbs={[
        { href: "/", label: "Kezdőlap" },
        { href: "/szolgaltatasok", label: "Szolgáltatások" },
        { label: "Ipari létesítmények" },
      ]}
      title="Ipari létesítmények és csarnokok felmérése"
      lead="Gyártócsarnokok, raktárak és technológiai terek pontos 3D felmérése layout-tervezéshez, géptelepítéshez és ütközésvizsgálathoz."
      ctaHref="/ajanlatkeres?forras=ipari-szolgaltatas"
    >
      <ServiceSection title="Kinek">
        <p>Üzemeltetők, beruházók, ipari tervezők és kivitelezők.</p>
      </ServiceSection>

      <ServiceSection title="Mikor érdemes">
        <ul className="list-disc space-y-1 pl-5">
          <li>Layout-tervezés és géptelepítés előtt</li>
          <li>Gépészeti ütközésvizsgálat alapadata</li>
          <li>Átalakítás, bővítés előkészítése</li>
        </ul>
      </ServiceSection>

      <ServiceSection title="Mit kap">
        <ul className="list-disc space-y-1 pl-5">
          <li>Pontfelhő (E57 / RCP)</li>
          <li>2D layout / CAD rajzok a megrendelés szerint</li>
          <li>Ütközésvizsgálati alapadat igény szerint</li>
        </ul>
      </ServiceSection>

      <ServiceSection title="Hogyan zajlik">
        <p>
          Állványos szkenner (pl. Trimble X9) a nagy terekhez, Leica mobil szkenner a zsúfolt /
          szűk részekhez, drón a tetőhöz és külső területhez — egy koordináta-rendszerben.
        </p>
      </ServiceSection>

      <ServiceSection title="Mennyi időt vesz igénybe">
        <p>
          A helyszíni napok száma a csarnok méretétől és a zónák hozzáférhetőségétől függ; a
          határidőt az ajánlat rögzíti.
        </p>
      </ServiceSection>

      <ServiceSection title="Gyakori kérdések">
        <dl className="space-y-3">
          <div>
            <dt className="font-semibold text-foreground">Üzem közben is lehet?</dt>
            <dd>Igen, a biztonsági előírások és a zónák egyeztetése után.</dd>
          </div>
          <div>
            <dt className="font-semibold text-foreground">Kell-e BIM-modell?</dt>
            <dd>Nem kötelező — a pontfelhő és a 2D layout gyakran elegendő; a modell külön tétel.</dd>
          </div>
        </dl>
      </ServiceSection>

      <BimDeliverableBlock
        deliverables="Pontfelhő, 2D layout, igény szerint ütközésvizsgálati alapadat és CAD rajzok."
        timeline="A helyszíni napok száma a csarnok méretétől függ; a határidőt az ajánlat rögzíti."
        fromYou="Helyszíni hozzáférés, biztonsági előírások, felmérendő zónák, ha van: meglévő layout / EIR."
        ctaHref="/ajanlatkeres?forras=ipari-szolgaltatas"
      />

      <p>
        Korábbi URL is él:{" "}
        <BimLink href="/ipari-letesitmenyek" className="font-semibold text-brand">
          /ipari-letesitmenyek
        </BimLink>
        .
      </p>
    </BimServiceLayout>
  );
}
