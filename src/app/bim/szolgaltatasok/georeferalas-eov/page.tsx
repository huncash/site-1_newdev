import { BimSurveyorNote } from "@/components/bim/BimScopeNote";
import { BimLink } from "@/components/bim/BimChrome";
import { BimServiceLayout, ServiceSection } from "@/components/bim/BimServiceLayout";
import { BIM_CONFIG } from "@/config/bim";
import { bimMetadata } from "@/lib/bim-site";

export const metadata = bimMetadata(
  "/szolgaltatasok/georeferalas-eov",
  "Georeferálás és EOV-bekötés | VRGO BIM",
  "Hivatalos EOV-bekötés jogosult földmérő közreműködésével — pontfelhő és CAD átadáshoz."
);

export default function GeorefServicePage() {
  return (
    <BimServiceLayout
      crumbs={[
        { href: "/", label: "Kezdőlap" },
        { href: "/szolgaltatasok", label: "Szolgáltatások" },
        { label: "Georeferálás és EOV" },
      ]}
      title="Georeferálás és EOV-bekötés"
      lead="A pontfelhő és a rajzok hivatalos magyarországi koordináta-rendszerbe kötése Trimble GNSS és terepi méréssel, jogosult földmérő közreműködésével."
      ctaHref="/ajanlatkeres?forras=georeferalas-eov"
    >
      <ServiceSection title="Kinek">
        <p>Tervezők, beruházók, üzemeltetők — ahol EOV-kötött adat az elvárás.</p>
      </ServiceSection>
      <ServiceSection title="Mikor érdemes">
        <ul className="list-disc space-y-1 pl-5">
          <li>EIR vagy megrendelő előírja a georeferálást</li>
          <li>Több helyszín / több szakterület közös rendszerben dolgozik</li>
          <li>Állami vagy hatósági elvárás a bekötésre</li>
        </ul>
      </ServiceSection>
      <ServiceSection title="Mit kap">
        <ul className="list-disc space-y-1 pl-5">
          <li>EOV-ba kötött pontfelhő / CAD</li>
          <li>Pontossági jegyzőkönyv</li>
          <li>Koordináta-rendszer leírás</li>
        </ul>
        {BIM_CONFIG.surveyorLicenseDisplay ? (
          <p className="mt-2">Jogosultság: {BIM_CONFIG.surveyorLicenseDisplay}</p>
        ) : null}
      </ServiceSection>
      <ServiceSection title="Hogyan zajlik">
        <div className="text-sm sm:text-base">
          <BimSurveyorNote />
        </div>
      </ServiceSection>
      <ServiceSection title="Mennyi időt vesz igénybe">
        <p>A terepi kontroll és a feldolgozás a projekt méretétől függ; a határidő az ajánlatban.</p>
      </ServiceSection>
      <ServiceSection title="Gyakori kérdések">
        <dl className="space-y-3">
          <div>
            <dt className="font-semibold text-foreground">Saját földmérővel is megy?</dt>
            <dd>Igen, készséggel együttműködünk a megrendelő földmérőjével.</dd>
          </div>
          <div>
            <dt className="font-semibold text-foreground">Részletek a pontosságról?</dt>
            <dd>
              <BimLink href="/pontossag-es-formatumok" className="font-semibold text-brand">
                Pontosság és formátumok
              </BimLink>
            </dd>
          </div>
        </dl>
      </ServiceSection>
    </BimServiceLayout>
  );
}
