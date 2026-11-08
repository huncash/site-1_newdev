import { BimResidentialForm } from "@/components/bim/BimResidentialForm";
import { BimLink } from "@/components/bim/BimChrome";
import { BimServiceLayout, ServiceSection } from "@/components/bim/BimServiceLayout";
import { bimHasFromPrices, BIM_CONFIG } from "@/config/bim";
import { bimMetadata } from "@/lib/bim-site";

export const metadata = bimMetadata(
  "/szolgaltatasok/lakas-es-hazfelmeres",
  "Lakás- és házfelmérés lézerszkennerrel | VRGO BIM",
  "Lakás, ház, telek felmérése lézerszkennerrel – pontos alaprajz felújításhoz és tervezéshez."
);

const whenGood = [
  "felújítás előtt",
  "tetőtér-beépítésnél",
  "régi házhoz, amelynek nincs meg a terve",
  "belsőépítészeti vagy gépészeti tervezéshez",
  "bővítés, átalakítás előtt",
  "telek, kert, tető drónos felméréséhez",
] as const;

export default function ResidentialServicePage() {
  return (
    <BimServiceLayout
      crumbs={[
        { href: "/", label: "Kezdőlap" },
        { href: "/szolgaltatasok", label: "Szolgáltatások" },
        { label: "Lakás- és házfelmérés" },
      ]}
      title="Lakás, ház, telek felmérése lézerszkennerrel – pontos alaprajz felújításhoz és tervezéshez"
      lead="Tetőtér-beépítés, felújítás, átépítés vagy eladás előtt a legnagyobb költség a hibás vagy hiányzó alaprajz. Egy lézerszkennelt felmérés egy bejárással rögzíti a teljes teret."
      ctaHref="#ajanlat"
      ctaLabel="Rövid érdeklődés"
    >
      <ServiceSection title="Kinek">
        <p>Magánszemélyeknek, háztulajdonosoknak, és a tervezőjüknek, akik pontos alaprajzot kérnek.</p>
      </ServiceSection>

      <ServiceSection title="Mikor érdemes">
        <ul className="list-disc space-y-1 pl-5">
          {whenGood.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </ServiceSection>

      <ServiceSection title="Mit kap (leadott anyag)">
        <ul className="list-disc space-y-1 pl-5">
          <li>Alaprajz és metszet (PDF, DWG)</li>
          <li>Pontfelhő-nézet kérésre</li>
          <li>Mért méretek, amelyeket a tervező használni tud</li>
          <li>Modell külön tételként, ha kéri</li>
        </ul>
      </ServiceSection>

      <ServiceSection title="Hogyan zajlik">
        <ol className="list-decimal space-y-2 pl-5">
          <li>Megadja a települést, a célt és a kb. méretet.</li>
          <li>Egyeztetünk időpontot; a helyszínen jellemzően egy bejárás elég.</li>
          <li>Átadjuk az anyagot a megbeszélt formátumban.</li>
        </ol>
      </ServiceSection>

      <ServiceSection title="Mennyi időt vesz igénybe">
        <p>
          A helyszíni munka általában egy bejárás. A feldolgozás határidejét az ajánlat rögzíti.
        </p>
      </ServiceSection>

      <ServiceSection title="Mennyibe kerül?">
        {bimHasFromPrices() ? (
          <p>
            Irányár lakossági felmérésre:{" "}
            {BIM_CONFIG.residentialFromPriceHuf!.toLocaleString("hu-HU")} Ft-tól
            {typeof BIM_CONFIG.residentialMinPriceHuf === "number"
              ? ` (minimumdíj: ${BIM_CONFIG.residentialMinPriceHuf.toLocaleString("hu-HU")} Ft)`
              : null}
            . A végleges összeget az ajánlat tartalmazza.
          </p>
        ) : (
          <p>
            Az ajánlat a méret, a terek bonyolultsága és a leadott anyag alapján készül. A díjszerkezet
            magyarázata:{" "}
            <BimLink href="/arak-es-folyamat" className="font-semibold text-brand">
              Árak és folyamat
            </BimLink>
            .
          </p>
        )}
      </ServiceSection>

      <ServiceSection title="Fontos tudni">
        <p>
          Ha a felmérést hatósági eljáráshoz vagy földhivatali ügyintézéshez szeretné használni,
          jelezze előre: ez földmérői feladat, külön egyeztetjük.
        </p>
      </ServiceSection>

      <ServiceSection title="Gyakori kérdések">
        <dl className="space-y-3">
          <div>
            <dt className="font-semibold text-foreground">Be kell-e menni többször?</dt>
            <dd>Általában nem. Hiányzó zóna esetén egyeztetünk pótló bejárást.</dd>
          </div>
          <div>
            <dt className="font-semibold text-foreground">Kap-e 3D modellt?</dt>
            <dd>Alapból alaprajzot és metszetet; a modell külön tétel.</dd>
          </div>
          <div>
            <dt className="font-semibold text-foreground">Használható tervezőnek?</dt>
            <dd>Igen — DWG / PDF a megbeszélt tartalommal.</dd>
          </div>
        </dl>
      </ServiceSection>

      <ServiceSection title="Kérjen ajánlatot" id="ajanlat">
        <BimResidentialForm sourceDefault="lakas-es-hazfelmeres" hideServiceInterest />
      </ServiceSection>
    </BimServiceLayout>
  );
}
