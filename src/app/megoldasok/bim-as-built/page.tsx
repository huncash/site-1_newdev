import type { Metadata } from "next";
import Link from "next/link";
import { Term } from "@/components/Term";

export const metadata: Metadata = {
  title: 'BIM-koordináció és as-built dokumentáció 3D szkenből | VRGO',
  description: 'MatterPak export (E57 pontfelhő, OBJ mesh, XYZ, méretezett alaprajz) a BIM-koordinációhoz és as-built dokumentációhoz. A tervezett és megvalósult állapot összevetése órák alatt.',
};

const usecases = [
  {
    title: (
      <>
        <Term k="MatterPak">MatterPak</Term> export csomag
      </>
    ),
    desc: "E57 pontfelhő, OBJ mesh, XYZ koordináta-export, méretezett alaprajz (PDF + DWG-kompatibilis) — közvetlenül beemelhető a tervező BIM-környezetébe.",
  },
  {
    title: (
      <>
        <Term k="as-built">As-built</Term> vs. terv összevetés
      </>
    ),
    desc: "A megvalósult állapot pontfelhője a tervezői modell mellett — eltérés-detektálás órák, nem hetek alatt. Generálkivitelező és műszaki ellenőr közös nézete.",
  },
  {
    title: (
      <>
        <Term k="BIM">BIM</Term>-koordinációs hivatkozás
      </>
    ),
    desc: "A 3D bejárható túra URL-jei és Mattertag-jei a BIM-modell nézetéből hivatkozhatók — a tervező és a kivitelező egyetlen vizuális forráson dolgozik.",
  },
  {
    title: "Felmérési idő töredékére csökken",
    desc: "Egy nap szken pótolja a több hét manuális felmérést. A pontfelhő és mesh export még aznap a tervező asztalán.",
  },
  {
    title: "Műemlék- és átalakítás-tervezés",
    desc: "Meglévő épület 3D rögzítése a tervezés indulása előtt — a koncepciós szakaszban már valós geometriával dolgozik az építész.",
  },
  {
    title: "Átadás-átvétel dokumentum",
    desc: "Időbélyegzett 3D állapot az átadáskor — későbbi szavatossági vita esetén objektív, vizuális bizonyíték.",
  },
];

export default function BimAsBuiltPage() {
  return (
    <>
      <section className="bg-section-dark text-section-dark-foreground">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:py-20">
          <span className="inline-block rounded-full border border-brand/60 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-brand">
            BIM as-built · MatterPak · Pontfelhő
          </span>
          <h1 className="mt-4 text-3xl font-bold sm:text-4xl md:text-5xl">
            BIM-koordináció és as-built dokumentáció a 3D szken alól
          </h1>
          <p className="mt-4 max-w-3xl text-base opacity-90 sm:text-lg">
            A <Term k="digitális iker">digitális iker (digital twin)</Term> nem áll meg a
            bejárható túránál: <Term k="MatterPak">MatterPak</Term> exporttal a tervező
            közvetlenül a megvalósult geometriával dolgozik. E57, OBJ, XYZ, méretezett
            alaprajz — egy szkenből.
          </p>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/csomagok/megrendeles"
              className="inline-flex items-center justify-center rounded-md bg-brand px-6 py-3 text-sm font-semibold uppercase tracking-wider text-brand-foreground hover:bg-brand-dark"
            >
              BIM-export igénylése
            </Link>
            <Link
              href="/csomagok"
              className="inline-flex items-center justify-center rounded-md border-2 border-white px-6 py-3 text-sm font-semibold uppercase tracking-wider hover:bg-white hover:text-section-dark"
            >
              ENTERPRISE csomag
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-background py-12 sm:py-16">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="text-center text-2xl font-semibold sm:text-3xl">
            Hat felhasználás — egy export-csomagból
          </h2>
          <div className="mx-auto mt-4 h-px w-24 bg-brand/60" />
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {usecases.map((u, i) => (
              <article key={i} className="rounded-md border border-border bg-card p-6 shadow-sm">
                <h3 className="text-lg font-semibold">{u.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{u.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-secondary py-12 sm:py-16">
        <div className="mx-auto max-w-4xl px-4">
          <h2 className="text-center text-2xl font-semibold sm:text-3xl">
            Mit kap a tervező a szken után?
          </h2>
          <div className="mx-auto mt-4 h-px w-24 bg-brand/60" />
          <ul className="mt-8 space-y-4 text-sm text-muted-foreground sm:text-base">
            <li>
              <strong className="text-foreground">E57 pontfelhő</strong> — minden BIM-szoftver
              (Revit, ArchiCAD, AutoCAD, Bentley) be tudja olvasni.
            </li>
            <li>
              <strong className="text-foreground">OBJ mesh + textúra</strong> — vizualizációhoz,
              koncepció-tervhez, renderhez.
            </li>
            <li>
              <strong className="text-foreground">XYZ koordináta-export</strong> — nyers
              pontkoordináták egyedi feldolgozáshoz.
            </li>
            <li>
              <strong className="text-foreground">Méretezett alaprajz</strong> — PDF és
              DWG-kompatibilis vektor, helyiséglista, négyzetméter.
            </li>
            <li>
              <strong className="text-foreground">Bejárható 3D URL</strong> — a tervező a
              modellt nem csak fájlként, hanem közös nézetként is megosztja.
            </li>
          </ul>
        </div>
      </section>

      <section className="bg-section-dark py-12 text-section-dark-foreground sm:py-16">
        <div className="mx-auto max-w-3xl px-4 text-center">
          <h2 className="text-2xl font-semibold sm:text-3xl">BIM-export rendelés</h2>
          <p className="mt-3 opacity-90">
            Épülettípus, négyzetméter, megrendelő (építész / generálkivitelező / FM), kívánt
            export-formátumok. 24 órán belül visszaigazolás és határidő.
          </p>
          <Link
            href="/csomagok/megrendeles"
            className="mt-6 inline-flex items-center justify-center rounded-md bg-brand px-6 py-3 text-sm font-semibold uppercase tracking-wider text-brand-foreground hover:bg-brand-dark"
          >
            BIM as-built igénylése
          </Link>
        </div>
      </section>
    </>
  );
}
