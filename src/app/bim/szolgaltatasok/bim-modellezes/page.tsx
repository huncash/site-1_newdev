import { BimServiceLayout, ServiceSection } from "@/components/bim/BimServiceLayout";
import { bimMetadata } from "@/lib/bim-site";

export const metadata = bimMetadata(
  "/szolgaltatasok/bim-modellezes",
  "BIM-modellezés és 2D tervek | VRGO BIM",
  "BIM-modell és 2D tervek a pontfelhőből, külön tételként, a feladat és az LOD szerint."
);

export default function ModelingServicePage() {
  return (
    <BimServiceLayout
      crumbs={[
        { href: "/", label: "Kezdőlap" },
        { href: "/szolgaltatasok", label: "Szolgáltatások" },
        { label: "BIM-modellezés" },
      ]}
      title="BIM-modellezés és 2D tervek"
      lead="A modellezés külön tételként kérhető szolgáltatás. A részletezettség a feladat és az LOD szerint."
      ctaHref="/ajanlatkeres?forras=bim-modellezes"
    >
      <ServiceSection title="Kinek">
        <p>
          Tervezők, beruházók és üzemeltetők, akiknek a pontfelhő mellett Revit / ArchiCAD / IFC
          modell vagy részletes 2D terv kell.
        </p>
      </ServiceSection>
      <ServiceSection title="Mikor érdemes">
        <ul className="list-disc space-y-1 pl-5">
          <li>EIR szerinti BIM-átadás</li>
          <li>Szakági koordináció, ütközésvizsgálat modellalapon</li>
          <li>Részletes 2D dokumentáció a pontfelhőből</li>
        </ul>
      </ServiceSection>
      <ServiceSection title="Mit kap">
        <ul className="list-disc space-y-1 pl-5">
          <li>2D: DWG / PDF alaprajz, metszet, homlokzat — a megrendelés szerint</li>
          <li>3D: RVT / PLN / IFC — LOD és EIR szerint, külön tétel</li>
        </ul>
        <p className="mt-2">Az árat az ajánlat tartalmazza.</p>
      </ServiceSection>
      <ServiceSection title="Hogyan zajlik">
        <p>
          A helyszíni rögzítés és a georeferálás után (vagy az Ön által átadott pontfelhőből)
          készül a 2D / BIM termék. Egy szerződéssel, egy felelőssel.
        </p>
      </ServiceSection>
      <ServiceSection title="Mennyi időt vesz igénybe">
        <p>A modellezés átfutása a LOD-tól és a terület méretétől függ; a határidő az ajánlatban.</p>
      </ServiceSection>
      <ServiceSection title="Gyakori kérdések">
        <dl className="space-y-3">
          <div>
            <dt className="font-semibold text-foreground">Csak modellezést is vállalnak?</dt>
            <dd>
              Igen, ha van megfelelő pontfelhő. Gyakori a helyszíni rögzítés + modellezés egy
              ajánlatban.
            </dd>
          </div>
          <div>
            <dt className="font-semibold text-foreground">Mi a kapcsolat a felméréssel?</dt>
            <dd>
              A modellezés a georeferált helyszíni rögzítésre épül. Ha a felmérés nálunk készül,
              egy ajánlatban kérheti a kettőt.
            </dd>
          </div>
        </dl>
      </ServiceSection>
    </BimServiceLayout>
  );
}
