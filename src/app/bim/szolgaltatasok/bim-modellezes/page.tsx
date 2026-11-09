import { BimServiceLayout, ServiceSection } from "@/components/bim/BimServiceLayout";
import { bimMetadata } from "@/lib/bim-site";

export const metadata = bimMetadata(
  "/szolgaltatasok/bim-modellezes",
  "Modellátadás a pontfelhőből | VRGO BIM",
  "Pontfelhőből készülő EOV-illesztett modell vagy 3D-vetület a megrendelő követelménye szerint, egyeztetve."
);

export default function ModelingServicePage() {
  return (
    <BimServiceLayout
      crumbs={[
        { href: "/", label: "Kezdőlap" },
        { href: "/szolgaltatasok", label: "Szolgáltatások" },
        { label: "Modellátadás" },
      ]}
      title="Modellátadás a pontfelhőből"
      lead="A mérések eredménye pontfelhő, EOV-ban illesztett modell vagy az ezekből készített 3D-vetületi modell lehet, a megrendelő előzetesen rögzített követelménye szerint. Házon belüli modellezési kapacitást nem kínálunk általános szolgáltatásként."
      ctaHref="/kapcsolat?forras=bim-modellezes"
    >
      <ServiceSection title="Kinek">
        <p>
          Tervezők, beruházók és üzemeltetők, akiknek a pontfelhő mellett egyeztetett modell- vagy
          3D-vetületi átadás kell.
        </p>
      </ServiceSection>
      <ServiceSection title="Mikor érdemes">
        <ul className="list-disc space-y-1 pl-5">
          <li>EIR szerinti adatátadás, ahol modell is szerepel</li>
          <li>Részletes 2D dokumentáció a pontfelhőből</li>
          <li>Partneri modellezés a projektben egyeztetve</li>
        </ul>
      </ServiceSection>
      <ServiceSection title="Mit kap">
        <ul className="list-disc space-y-1 pl-5">
          <li>2D: DWG / PDF alaprajz, metszet, homlokzat — a megrendelés szerint</li>
          <li>
            3D: EOV-illesztett modell vagy 3D-vetület a megrendelő követelménye szerint —
            egyeztetve, nem automatikus Scan-to-BIM ígéretként
          </li>
        </ul>
        <p className="mt-2">Az árat és a felelősségi határokat az ajánlat tartalmazza.</p>
      </ServiceSection>
      <ServiceSection title="Hogyan zajlik">
        <p>
          A helyszíni rögzítés és az EOV-illesztés után a kimenetet a rögzített követelmények
          szerint adjuk át. Ha a feldolgozáshoz külső közreműködés szükséges, ezt a projektben
          egyeztetjük — nem általános, házon belüli kapacitásként.
        </p>
      </ServiceSection>
      <ServiceSection title="Mennyi időt vesz igénybe">
        <p>Az átfutás a követelményektől és a terület méretétől függ; a határidő az ajánlatban.</p>
      </ServiceSection>
      <ServiceSection title="Gyakori kérdések">
        <dl className="space-y-3">
          <div>
            <dt className="font-semibold text-foreground">Csak pontfelhőt is átadnak?</dt>
            <dd>
              Igen. A modellezés nem kötelező része a felmérésnek; a megrendelő dönt a
              követelményekről.
            </dd>
          </div>
          <div>
            <dt className="font-semibold text-foreground">Mi a kapcsolat a felméréssel?</dt>
            <dd>
              A modell- vagy 3D-vetületi átadás a helyszíni rögzítésre és az egyeztetett
              követelményekre épül. Ha a felmérés nálunk készül, egy ajánlatban kérheti a kettőt.
            </dd>
          </div>
        </dl>
      </ServiceSection>
    </BimServiceLayout>
  );
}
