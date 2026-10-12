import type { Metadata } from "next";
import Link from "next/link";
import { Term } from "@/components/Term";

export const metadata: Metadata = {
  title: 'ESG ingatlanjelentés és energetikai audit 3D modellből | VRGO',
  description: '3D digitális iker vizuális mellékletnek: homlokzat, terek, gépészet helye. Nem energetikai tanúsítvány és nem EU-taxonómia-igazolás.',
};

const usecases = [
  {
    title: (
      <>
        <Term k="ESG">ESG</Term> ingatlanjelentés vizuális alapja
      </>
    ),
    desc: "Időbélyegzett 3D melléklet, amelyet a jelentés készítője hivatkozhat. A modell önmagában nem ESG-jelentés és nem EU-taxonómia-igazolás.",
  },
  {
    title: "Energetikai audit 3D modellből",
    desc: "Homlokzat, nyílászárók és látható gépészet képi rögzítése. Hőhidat nem mérünk, energetikai tanúsítványt nem állítunk ki.",
  },
  {
    title: "Akadálymentesítés-megfelelőség",
    desc: "Küszöb, lejtő és közlekedő a modellben mérhető. Jogszabályi akadálymentesítési auditot nem helyettesít.",
  },
  {
    title: "Audit-trail és változás-követés",
    desc: "Évenkénti vagy negyedéves szken-kör — a változás (felújítás, eszközcsere, energetikai beavatkozás) verzióban követhető.",
  },
  {
    title: "Napelempark és gépészet",
    desc: "Tető, napelem, hőszivattyú és légtechnika látható elhelyezése rögzíthető. A jelentés szövegét és számítását nem mi készítjük.",
  },
  {
    title: "Bérlői ESG-elvárások kielégítése",
    desc: "A bérlő vagy az auditor ugyanazt a 3D mellékletet nézheti meg. Azt, hogy ez kielégíti-e a bérlői elvárást, a jelentés készítője dönti el.",
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
            3D melléklet ESG- és energetikai anyagokhoz
          </h1>
          <p className="mt-4 max-w-3xl text-base opacity-90 sm:text-lg">
            A <Term k="digitális iker">digitális iker (digital twin)</Term> időbélyegzett képi
            állapot: homlokzat, terek, látható gépészet. A könyvvizsgáló és a facility-csapat
            ugyanazt a modellt nézheti. Energetikai tanúsítványt, hőhídmérést és
            EU-taxonómia-igazolást nem helyettesít.
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
            Mire használható a 3D modell egy ESG-mellékletben?
          </h2>
          <div className="mx-auto mt-4 h-px w-24 bg-brand/60" />
          <div className="mt-8 space-y-5 text-sm text-muted-foreground sm:text-base">
            <p>
              <strong className="text-foreground">Egyszer szkennelünk, többször hivatkozunk.</strong>{" "}
              A modellből az energetikai szakértő, az akadálymentesítési auditor és a
              jelentés készítője ugyanazt a képi állapotot nézheti. A mérést és a
              jelentést ők készítik, nem a szken.
            </p>
            <p>
              <strong className="text-foreground">Ismételt szken.</strong>{" "}
              Ismételt szkennél a korábbi és az új állapot egymás mellett megnézhető. Ez
              képi összevetés, nem auditált mérési jegyzőkönyv.
            </p>
            <p>
              <strong className="text-foreground">Amit a modell nem helyettesít.</strong> Az
              EU-taxonómia, az energetikai tanúsítvány és a jogszabályi audit külön szakértői
              munka. A 3D túra ezekhez melléklet lehet.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-section-dark py-12 text-section-dark-foreground sm:py-16">
        <div className="mx-auto max-w-3xl px-4 text-center">
          <h2 className="text-2xl font-semibold sm:text-3xl">ESG-felmérés űrlap</h2>
          <p className="mt-3 opacity-90">
            Épület(ek) száma, terület, jelenlegi tanúsítvány (BREEAM / LEED / DGNB),
            jelentési kötelezettség típusa. 1 munkanapon belül visszajelzés.
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
