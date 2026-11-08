import { BimLink } from "@/components/bim/BimChrome";
import { BimScopeNote } from "@/components/bim/BimScopeNote";
import { bimMetadata } from "@/lib/bim-site";

export const metadata = bimMetadata(
  "/munkafolyamat",
  "Hogyan dolgozunk — felmérés, feldolgozás, átadás | VRGO BIM",
  "Igény tisztázása, helyszíni felmérés, feldolgozás, minőség-ellenőrzés és dokumentált átadás. Formátumok, EOV és georeferálás egy helyen."
);

const STEPS = [
  {
    title: "Igény tisztázása",
    text: "Felhasználási cél, helyszín, kimenetek, határidő és helyszíni korlátok egyeztetése. Ha van EIR, abból indulunk.",
  },
  {
    title: "Helyszíni felmérés",
    text: "Lézeres rögzítés a helyszínhez igazítva. Nagyabb projektnél helyszíni tartózkodással dolgozunk.",
  },
  {
    title: "Feldolgozás",
    text: "Pontfelhő regisztráció, tisztítás, majd a megrendelt CAD vagy modell előkészítése.",
  },
  {
    title: "Minőség-ellenőrzés",
    text: "Ellenőrző pontok, átadási lista, és ha releváns, BCF hibajegyzék.",
  },
  {
    title: "Átadás",
    text: "A megrendelt kimenetek dokumentált átadása a megállapított formátumokban.",
  },
] as const;

export default function ProcessPage() {
  return (
    <article className="bg-background">
      <section className="bg-section-dark py-14 text-section-dark-foreground">
        <div className="mx-auto max-w-4xl px-4">
          <h1 className="text-3xl font-bold sm:text-4xl">Hogyan dolgozunk</h1>
          <p className="mt-4 max-w-3xl text-sm opacity-90 sm:text-base">
            Rövid, követhető folyamat a terepi felméréstől az átadásig.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-4xl space-y-12 px-4 py-12 text-sm text-muted-foreground sm:text-base">
        <ol className="space-y-8">
          {STEPS.map((step, i) => (
            <li key={step.title}>
              <h2 className="text-xl font-semibold text-foreground">
                {i + 1}. {step.title}
              </h2>
              <p className="mt-2">{step.text}</p>
            </li>
          ))}
        </ol>

        <section>
          <h2 className="text-xl font-semibold text-foreground">Formátumok</h2>
          <p className="mt-3">
            Tipikus kimenetek: pontfelhő, DWG, IFC, Revit vagy ArchiCAD — a megrendelés szerint. A
            vállalt formátumokat az ajánlat rögzíti.
          </p>
          <BimScopeNote />
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground">EOV és georeferálás</h2>
          <p className="mt-3">
            Ha a felhasználási cél vagy az EIR bekötést kér, a georeferálást jogosult földmérő
            közreműködésével végezzük. A megrendelő saját földmérőjével is együttműködünk. A
            részletes szolgáltatásleírás a{" "}
            <BimLink href="/szolgaltatasok/georeferalas-eov" className="font-semibold text-brand">
              georeferálás
            </BimLink>{" "}
            oldalon található.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground">GYIK</h2>
          <p className="mt-3">
            Gyakori kérdések a{" "}
            <BimLink href="/gyik" className="font-semibold text-brand">
              GYIK
            </BimLink>{" "}
            oldalon.
          </p>
        </section>

        <BimLink
          href="/kapcsolat?forras=munkafolyamat"
          className="inline-flex rounded-md bg-brand px-6 py-3 text-sm font-semibold text-brand-foreground"
        >
          Ajánlatot kérek
        </BimLink>
      </div>
    </article>
  );
}
