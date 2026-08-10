import type { Metadata } from "next";
import Link from "next/link";
import { Term } from "@/components/Term";

export const metadata: Metadata = {
  title: 'ESG ingatlanjelentés és energetikai audit 3D modellből | VRGO',
  description: 'ESG fenntarthatósági jelentés, energetikai audit, akadálymentesítési megfelelőség egyetlen 3D digitális ikerből. Audit-trail, vizuális bizonyíték, EU-taxonómia-konform dokumentáció.',
};

const usecases = [
  {
    title: (
      <>
        <Term k="ESG">ESG</Term> ingatlanjelentés vizuális alapja
      </>
    ),
    desc: "Befektetői és EU-taxonómia szerinti fenntarthatósági jelentés bizonyító anyaga — nem szöveg, hanem időbélyegzett 3D. A könyvvizsgáló és az auditor ugyanazt látja.",
  },
  {
    title: "Energetikai audit 3D modellből",
    desc: "Homlokzat, nyílászárók, gépészet, hőhídak rögzítése méretezetten — energetikai tanúsítvány és felújítási tervezés vizuális forrása.",
  },
  {
    title: "Akadálymentesítés-megfelelőség",
    desc: "Küszöbök, lejtők, mosdók, vészkijáratok pontos méretezése — jogszabályi audit a 3D modellből, helyszíni séta nélkül.",
  },
  {
    title: "Audit-trail és változás-követés",
    desc: "Évenkénti vagy negyedéves szken-kör — a változás (felújítás, eszközcsere, energetikai beavatkozás) verzióban követhető.",
  },
  {
    title: "Napelempark és gépészet",
    desc: "Tetőszerkezet, napelem-elhelyezés, hőszivattyú, légtechnika — ESG-jelentésben hivatkozható, méretezett vizuális dokumentáció.",
  },
  {
    title: "Bérlői ESG-elvárások kielégítése",
    desc: "Multinacionális bérlők egyre gyakrabban követelik az épület fenntarthatósági adatait — a digitális iker gyors, audit-kompatibilis válasz.",
  },
];

export default function EsgPage() {
  return (
    <>
      <section className="bg-section-dark text-section-dark-foreground">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:py-20">
          <span className="inline-block rounded-full border border-brand/60 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-brand">
            ESG · Energetika · Akadálymentesítés
          </span>
          <h1 className="mt-4 text-3xl font-bold sm:text-4xl md:text-5xl">
            ESG ingatlanjelentés és energetikai audit egyetlen 3D modellből
          </h1>
          <p className="mt-4 max-w-3xl text-base opacity-90 sm:text-lg">
            A <Term k="digitális iker">digitális iker (digital twin)</Term> az ESG-jelentés
            vizuális bizonyítéka: energetika, akadálymentesítés, fenntarthatósági audit-trail
            egyetlen, időbélyegzett forrásból. A könyvvizsgáló és az auditor ugyanazt a 3D
            állapotot látja, amit a facility-csapat.
          </p>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/csomagok/megrendeles"
              className="inline-flex items-center justify-center rounded-md bg-brand px-6 py-3 text-sm font-semibold uppercase tracking-wider text-brand-foreground hover:bg-brand-dark"
            >
              ESG-felmérés igénylése
            </Link>
            <Link
              href="/megoldasok/facility"
              className="inline-flex items-center justify-center rounded-md border-2 border-white px-6 py-3 text-sm font-semibold uppercase tracking-wider hover:bg-white hover:text-section-dark"
            >
              Facility megoldás
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-background py-12 sm:py-16">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="text-center text-2xl font-semibold sm:text-3xl">
            Hat felhasználás — egy fenntarthatósági adatbázisból
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
            Miért gyorsabb a 3D modellből készült ESG-jelentés?
          </h2>
          <div className="mx-auto mt-4 h-px w-24 bg-brand/60" />
          <div className="mt-8 space-y-5 text-sm text-muted-foreground sm:text-base">
            <p>
              <strong className="text-foreground">Egyszer szkennelünk, többször hivatkozunk.</strong>{" "}
              A modellből az energetikai szakértő, az akadálymentesítési auditor, az
              ESG-tanácsadó és a könyvvizsgáló ugyanabból a forrásból dolgozik — nincs
              párhuzamos helyszíni séta.
            </p>
            <p>
              <strong className="text-foreground">Audit-trail mint vizuális bizonyíték.</strong>{" "}
              Évről évre, vagy negyedévről negyedévre rögzített állapot — a változás (felújítás,
              eszközcsere, beruházás) nem csak számadat, hanem 3D-ben is bizonyítható.
            </p>
            <p>
              <strong className="text-foreground">EU-taxonómia és bérlői elvárás.</strong> A
              fenntarthatósági jelentés nem opció, hanem belépő — a digitális iker szabványos
              válasz.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-section-dark py-12 text-section-dark-foreground sm:py-16">
        <div className="mx-auto max-w-3xl px-4 text-center">
          <h2 className="text-2xl font-semibold sm:text-3xl">ESG-felmérés űrlap</h2>
          <p className="mt-3 opacity-90">
            Épület(ek) száma, terület, jelenlegi tanúsítvány (BREEAM / LEED / DGNB),
            jelentési kötelezettség típusa, 3 időpontjavaslat. 24 órán belül visszaigazolás.
          </p>
          <Link
            href="/csomagok/megrendeles"
            className="mt-6 inline-flex items-center justify-center rounded-md bg-brand px-6 py-3 text-sm font-semibold uppercase tracking-wider text-brand-foreground hover:bg-brand-dark"
          >
            ESG digitális iker
          </Link>
        </div>
      </section>
    </>
  );
}
