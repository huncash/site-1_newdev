import { BimLink } from "@/components/bim/BimChrome";
import { BimScopeNote } from "@/components/bim/BimScopeNote";
import { bimMetadata } from "@/lib/bim-site";

export const metadata = bimMetadata(
  "/mi-az-a-bim",
  "Mit jelent a BIM? Magyarázat és fogalomtár | VRGO BIM",
  "Mi az a BIM, mit jelent az IFC, EIR, BEP és CDE, és mi köze a meglévő épületek rögzítéséhez? Rövid magyarázat az állami BIM-szabályozáshoz."
);

const terms: readonly [string, string][] = [
  [
    "BIM",
    "Building Information Modeling, magyarul építményinformációs modellezés: egy épület vagy létesítmény adatokkal ellátott digitális modellje.",
  ],
  ["IFC", "Szabványos, nyílt fájlformátum a modell adatainak átadásához."],
  ["BCF", "Nyílt adatcsere formátum, a modellhez kapcsolódó észrevételek, hibák kezelésére."],
  ["EIR", "A megbízó információcsere-követelményei."],
  ["pre-BEP és BEP", "A vállalkozó előzetes és végleges BIM végrehajtási terve."],
  ["CDE", "Közös adatkörnyezet."],
  [
    "Felhasználási eset",
    "A rendeletben számozott alkalmazás, például 010 meglévő állapot rögzítése, 190 megvalósulási dokumentáció.",
  ],
  ["As-built / megvalósulási dokumentáció", "A ténylegesen kivitelezett állapot rögzítése."],
  ["Pontfelhő és E57", "A szkennelés nyers mérési adatai, és egy gyakori formátuma."],
];

export default function MiAzABimPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "DefinedTermSet",
    name: "Mit jelent a BIM?",
    hasDefinedTerm: terms.map(([name, description]) => ({
      "@type": "DefinedTerm",
      name,
      description,
    })),
  };

  return (
    <article className="bg-background">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <section className="bg-section-dark py-14 text-section-dark-foreground">
        <div className="mx-auto max-w-4xl px-4">
          <h1 className="text-3xl font-bold text-section-dark-foreground sm:text-4xl">Mit jelent a BIM?</h1>
          <p className="mt-4 opacity-90">
            A BIM (Building Information Modeling, magyarul építményinformációs modellezés) olyan
            módszer, amelyben egy épületet vagy létesítményt nem csak rajzok, hanem egy adatokkal
            ellátott digitális modell ír le. A modell elemei geometriai és alfanumerikus
            információt, valamint metaadatot hordoznak. A 31/2024. (VIII. 22.) ÉKM rendelet az
            „építményinformációs modell (BIM)” kifejezést használja.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-4xl space-y-10 px-4 py-12 text-sm text-muted-foreground sm:text-base">
        <section>
          <h2 className="text-xl font-semibold text-foreground">Mire való?</h2>
          <p className="mt-3">
            A modellt az egész életciklusban karban kell tartani: előkészítés, megvalósítás,
            üzemeltetés, bontás (a rendelet ezt „digitális folytonosságnak” nevezi).
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground">Fogalomtár</h2>
          <dl className="mt-4 space-y-4">
            {terms.map(([name, description]) => (
              <div key={name}>
                <dt className="font-semibold text-foreground">{name}</dt>
                <dd className="mt-1">{description}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground">Mi köze ennek a rögzítéshez?</h2>
          <p className="mt-3">
            A meglévő épületek modellezése mért állapotból indul. A bejárható 3D rögzítést mi
            végezzük, a 11. § (2) szerinti geodéziai ellenőrző mérést földmérő partnerünk.
          </p>
          <div className="mt-3">
            <BimScopeNote />
          </div>
          <p className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-sm font-semibold">
            <BimLink href="/ekm-rendelet" className="text-brand underline underline-offset-2">
              ÉKM rendelet
            </BimLink>
            <BimLink href="/pontossag-es-formatumok" className="text-brand underline underline-offset-2">
              Pontosság és formátumok
            </BimLink>
            <BimLink href="/ajanlatkeres" className="text-brand underline underline-offset-2">
              Ajánlatkérés
            </BimLink>
          </p>
        </section>

        <p className="text-xs">Tájékoztató jellegű összefoglaló, nem jogi tanácsadás.</p>
      </div>
    </article>
  );
}
