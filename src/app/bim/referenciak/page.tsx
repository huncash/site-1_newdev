import { BimLink } from "@/components/bim/BimChrome";
import { BimScopeNote } from "@/components/bim/BimScopeNote";
import { bimMetadata } from "@/lib/bim-site";

const deliverables = [
  ["Pontfelhő", "E57, OBJ és XYZ, a megrendelés szerint."],
  ["2D állomány", "Alaprajz és metszet a feldolgozott pontfelhőből."],
  ["BIM", "Az IFC-modell a pontfelhőből precíz modellezéssel készül, az EIR szerint."],
  ["Geodézia", "A szabványos georeferálást és a hivatalos ellenőrző méréseket dedikált, eljárásra jogosult földmérő partnerünk biztosítja."],
] as const;

export const metadata = bimMetadata(
  "/referenciak",
  "Geodéziai lézerszkennelés és BIM-pontfelhő | VRGO BIM",
  "Ipari létesítmények, homlokzatok és nagyméretű belső terek felmérése professzionális Leica 3D lézerszkenner eszközökkel. Georeferált pontfelhő és szabványos BIM-állomány."
);

export default function ReferencesPage() {
  return (
    <article className="bg-background">
      <section className="bg-section-dark py-14 text-section-dark-foreground">
        <div className="mx-auto max-w-4xl px-4">
          <h1 className="text-3xl font-bold text-section-dark-foreground sm:text-4xl">
            Geodéziai lézerszkennelés és BIM-pontfelhő
          </h1>
          <p className="mt-4 opacity-90">
            Ipari létesítmények, homlokzatok és nagyméretű belső terek felmérése professzionális
            Leica 3D lézerszkenner eszközökkel.
          </p>
        </div>
      </section>
      <div className="mx-auto max-w-4xl space-y-8 px-4 py-12 text-sm text-muted-foreground sm:text-base">
        <p>
          A helyszíni adatgyűjtést a feladat pontossági igényéhez választjuk. A feldolgozás
          georeferált pontfelhőt ad, a modellezési partnerünk ebből szabványos BIM-állományt készít.
        </p>

        <section>
          <h2 className="text-xl font-semibold text-foreground">Mit adunk át</h2>
          <dl className="mt-4 grid gap-4 sm:grid-cols-2">
            {deliverables.map(([label, value]) => (
              <div key={label} className="rounded-md border border-border bg-card p-4">
                <dt className="text-xs font-semibold uppercase tracking-wider text-foreground">{label}</dt>
                <dd className="mt-2">{value}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground">Munkafolyamat</h2>
          <ol className="mt-4 list-decimal space-y-2 pl-5">
            <li>A cél tisztázása: BIM, CAD, dokumentáció vagy megvalósulási állapot.</li>
            <li>Helyszíni lézerszkennelés professzionális Leica 3D lézerszkenner eszközökkel, geodéziai kontrollal.</li>
            <li>Pontfelhő regisztrációja és tisztítása, majd 2D állomány vagy BIM-modell.</li>
            <li>Szabványos formátumok átadása a tervezőnek, a kivitelezőnek és az üzemeltetőnek.</li>
          </ol>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground">Kapcsolat a 31/2024. ÉKM rendelettel</h2>
          <p className="mt-2">
            A felvétel a 010 – Meglévő állapot és környezet rögzítése felhasználási esethez ad
            mérnöki alapadatot. Az IFC-modell a pontfelhőből precíz modellezéssel készül.
          </p>
        </section>

        <BimScopeNote />

        <BimLink
          href="/ajanlatkeres"
          className="inline-flex rounded-md bg-brand px-6 py-3 text-sm font-semibold text-brand-foreground"
        >
          Küldje el a feladat leírását vagy az EIR-t, módszert és árat javasolunk.
        </BimLink>
      </div>
    </article>
  );
}
