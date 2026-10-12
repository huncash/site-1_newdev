import type { Metadata } from "next";
import Link from "next/link";

import { bimLink } from "@/lib/links";
import { PropertyKpiLeaderboard } from "@/components/PropertyKpiLeaderboard";

export const metadata: Metadata = {
  title: 'Facility Management digitális iker — irodaház, portfólió | VRGO',
  description: 'Teljes ingatlanportfólió 3D digitális ikre. Bérbeadás, karbantartás, akadálymentesítés, biztosítási dokumentáció — egyetlen platformról.',
};

const usecases = [
  {
    title: "Portfólió-szintű digitális iker",
    desc: "Több épület, több emelet, több bérlő — egyetlen Matterport workspace alatt, jogosultsági szintekkel és audit-trail-lel.",
  },
  {
    title: "Bérbeadás-marketing (B2B)",
    desc: "Iroda, raktár, retail egység bejárható túra — a helyszíni bemutatás előtt megosztható.",
  },
  {
    title: "CMMS karbantartás-koordináció",
    desc: "Hibajegy, planned maintenance és eszközleltár Mattertaggel a 3D-modellben. A link beilleszthető, ha a másik rendszer külső hivatkozást fogad.",
  },
  {
    title: "Méret a modellből",
    desc: "Küszöb, lejtő és távolság a modellben mérhető. Törvényi megfelelőségi dokumentációt és hivatalos auditot nem helyettesít.",
  },
  {
    title: "Biztosítási kárrendezés 3D-ben",
    desc: "Időbélyegzett állapotrögzítés káresemény előtt. A kárrendezés idejét a biztosító eljárása határozza meg; összesített átfutást nem közlünk.",
  },
  {
    title: "Vizuális melléklet jelentéshez",
    desc: "Méretezett alaprajz, látható gépészet, homlokzat, napelempark. Melléklet egy jelentéshez; energetikai tanúsítványt nem helyettesít.",
  },
  {
    title: "Hivatkozás a térponton",
    desc: "Mattertaggel szöveg, dokumentum vagy külső link köthető egy ponthoz. Élő szenzor-adatfolyamot nem szállítunk.",
  },
  {
    title: "BIM-koordináció as-built",
    desc: "MatterPak export (E57, OBJ, XYZ, alaprajz), ha a csomag tartalmazza. A tervező akkor olvassa be, ha a szoftvere ezt a formátumot fogadja.",
    href: bimLink("/", "csempe"),
  },
];

export default function FacilityPage() {
  return (
    <>
      <section className="bg-section-dark text-section-dark-foreground">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:py-20">
          <span className="inline-block rounded-full border border-brand/60 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-brand">
            Facility Management · Property Portfolio
          </span>
          <h1 className="mt-4 text-3xl font-bold sm:text-4xl md:text-5xl">
            Ingatlanportfólió egyetlen digitális ikerben
          </h1>
          <p className="mt-4 max-w-3xl text-base opacity-90 sm:text-lg">
            Iroda, retail, ipari és vegyes hasznosítású épületek — bérbeadás, karbantartás,
            akadálymentesítés, biztosítás, ESG. Egyszer szkenneljük, sokszor hasznosul.
          </p>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/csomagok/megrendeles"
              className="inline-flex items-center justify-center rounded-md bg-brand px-6 py-3 text-sm font-semibold uppercase tracking-wider text-brand-foreground hover:bg-brand-dark"
            >
              Portfólió-felmérés igénylése
            </Link>
            <Link
              href="/csomagok"
              className="inline-flex items-center justify-center rounded-md border-2 border-white px-6 py-3 text-sm font-semibold uppercase tracking-wider hover:bg-white hover:text-section-dark"
            >
              TWIN csomag
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-background py-10">
        <div className="mx-auto grid max-w-6xl gap-4 px-4 sm:grid-cols-3">
          <figure className="relative overflow-hidden rounded-md border border-border shadow-sm">
            <img
              src="/media/betsson-hubsson.jpg"
              alt="Modern irodai recepció — Matterport bejárható túra"
              loading="lazy"
              className="h-[220px] w-full object-cover sm:h-[280px]"
            />
            <figcaption className="absolute bottom-3 left-3 rounded bg-black/60 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-white">
              Iroda · HQ recepció
            </figcaption>
          </figure>
          <figure className="relative overflow-hidden rounded-md border border-border bg-black shadow-sm">
            <img
              src="/media/dollhouse-view.jpg"
              alt="Dollhouse nézet — iroda felülről"
              loading="lazy"
              className="h-[220px] w-full object-contain sm:h-[280px]"
            />
            <figcaption className="absolute bottom-3 left-3 rounded bg-black/60 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-white">
              Dollhouse · iroda felülnézet
            </figcaption>
          </figure>
          <figure className="relative overflow-hidden rounded-md border border-border bg-black shadow-sm">
            <video
              src="/media/short-intro.mp4"
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              className="h-[220px] w-full object-cover sm:h-[280px]"
            />
            <figcaption className="absolute bottom-3 left-3 rounded bg-black/60 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-white">
              Rövid irodabejárás
            </figcaption>
          </figure>
        </div>
      </section>



      <section className="bg-background py-12 sm:py-16">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="text-center text-2xl font-semibold sm:text-3xl">FM felhasználások</h2>
          <div className="mx-auto mt-4 h-px w-24 bg-brand/60" />
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {usecases.map((u) => {
              const body = (
                <>
                  <h3 className="text-lg font-semibold">{u.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{u.desc}</p>
                  {"href" in u && u.href ? (
                    <span className="mt-3 block text-xs font-semibold text-brand">Részletek a BIM-oldalon →</span>
                  ) : null}
                </>
              );
              if ("href" in u && u.href) {
                return (
                  <a
                    key={u.title}
                    href={u.href}
                    className="block rounded-md border border-border bg-card p-6 shadow-sm transition hover:border-brand hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
                  >
                    {body}
                  </a>
                );
              }
              return (
                <article key={u.title} className="rounded-md border border-border bg-card p-6 shadow-sm">
                  {body}
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-secondary py-12 sm:py-16">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <h2 className="text-2xl font-semibold sm:text-3xl">Miért éri meg portfólió-szinten?</h2>
          <p className="mt-4 text-sm text-muted-foreground sm:text-base">
            A digitális iker itt operatív eszköz: bérbeadási túra, karbantartási jelölés és
            káresemény előtti, időbélyegzett állapotrögzítés egy felületen. Azt, hogy ez mennyivel
            rövidíti az átfutást, csak a megrendelő saját adatai mutatnák — összesített számot nem
            közlünk.
          </p>
        </div>
      </section>

      <section className="bg-background py-12 sm:py-16">
        <div className="mx-auto max-w-6xl px-4">
          <PropertyKpiLeaderboard
            title="Property Intelligence — milyen mutatók férnek egy nézetbe"
            subtitle="A számokat a megrendelő saját nyilvántartása adja. Összesített ügyféleredményt nem közlünk."
          />
          <div className="mt-6 text-center">
            <Link
              href="/megoldasok/property-intelligence"
              className="text-sm font-semibold uppercase tracking-wider text-brand hover:underline"
            >
              Property Intelligence megoldás →
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-section-dark py-12 text-section-dark-foreground sm:py-16">
        <div className="mx-auto max-w-3xl px-4 text-center">
          <h2 className="text-2xl font-semibold sm:text-3xl">Strukturált igénylés</h2>
          <p className="mt-3 opacity-90">
            Egyetlen űrlap: csomag, terület, BIM/IoT igények. 1 munkanapon belül visszajelzés — a
            helyszíni időpontot egyeztetjük.
          </p>
          <Link
            href="/csomagok/megrendeles"
            className="mt-6 inline-flex items-center justify-center rounded-md bg-brand px-6 py-3 text-sm font-semibold uppercase tracking-wider text-brand-foreground hover:bg-brand-dark"
          >
            Portfólió-csomag igénylése
          </Link>
        </div>
      </section>
    </>
  );
}
