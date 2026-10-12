import type { Metadata } from "next";
import Link from "next/link";
import { Term } from "@/components/Term";
import { PropertyKpiLeaderboard } from "@/components/PropertyKpiLeaderboard";

export const metadata: Metadata = {
  title: 'Property Intelligence — KPI-k a digitális iker fölött | VRGO',
  description: 'Ingatlanportfólió-szintű döntéstámogatás: bérbeadási, karbantartási, ESG, akadálymentesítési és káresemény-KPI-k a 3D digitális iker fölött, egyetlen nézetben.',
};

const usecases = [
  {
    title: "Portfólió-szintű KPI-vezérlés",
    desc: "Több épület, több bérlő, több alvállalkozó — egyetlen nézet, amelyből az ingatlanportfólió-vezető napi szinten dolgozik.",
  },
  {
    title: (
      <>
        <Term k="CMMS">CMMS</Term> és karbantartási előzmények
      </>
    ),
    desc: "Hibajegyek, planned maintenance, garanciák Mattertaggel a 3D-ben — a kontextus nem vész el két karbantartó között.",
  },
  {
    title: "Bérbeadási adatok a túra mellett",
    desc: "Ha a bérbeadó megadja a saját látogatási és szerződéskötési adatait, azok a túra mellé tehetők. Konverziós százalékot nem közlünk.",
  },
  {
    title: "Káresemény-állapot időbélyegzéssel",
    desc: "Minden szken-kör egy verzió. A korábbi állapot a túrában visszanyitható. A kárrendezés időtartamát nem összesítjük.",
  },
  {
    title: (
      <>
        <Term k="ESG">ESG</Term> és energetikai jelentés
      </>
    ),
    desc: "Homlokzat, terek és látható gépészet egy nézetben, mellékletnek. Energetikai tanúsítványt és jogszabályi auditot nem helyettesít.",
  },
  {
    title: "Enterprise integrációk",
    desc: "A túra URL-je és a Mattertag hivatkozása beilleszthető, ha a meglévő rendszer külső linket fogad. Tanúsított SAP-, ServiceNow- vagy TRIRIGA-csatlakozót nem szállítunk.",
  },
];

export default function PropertyIntelligencePage() {
  return (
    <>
      <section className="bg-section-dark text-section-dark-foreground">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:py-20">
          <span className="inline-block rounded-full border border-brand/60 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-brand">
            Property Intelligence · saját adatok egy nézetben
          </span>
          <h1 className="mt-4 text-3xl font-bold sm:text-4xl md:text-5xl">
            A nézet a megrendelő saját adatait mutatja
          </h1>
          <p className="mt-4 max-w-3xl text-base opacity-90 sm:text-lg">
            A <Term k="digitális iker">digitális iker (digital twin)</Term> mellé a megrendelő
            saját számai tehetők: bérbeadás, karbantartás, káresemény előtti állapot, méretek.
            Közzétett mérési eredmény nincs.
          </p>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/csomagok/megrendeles"
              className="inline-flex items-center justify-center rounded-md bg-brand px-6 py-3 text-sm font-semibold uppercase tracking-wider text-brand-foreground hover:bg-brand-dark"
            >
              Property Intelligence igénylése
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

      {/* KPI Leaderboard */}
      <section className="bg-background py-12 sm:py-16">
        <div className="mx-auto max-w-6xl px-4">
          <PropertyKpiLeaderboard />
        </div>
      </section>

      <section className="bg-secondary py-12 sm:py-16">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="text-center text-2xl font-semibold sm:text-3xl">
            Hat felhasználás portfólió-szinten
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

      <section className="bg-section-dark py-12 text-section-dark-foreground sm:py-16">
        <div className="mx-auto max-w-3xl px-4 text-center">
          <h2 className="text-2xl font-semibold sm:text-3xl">
            Portfólió-szintű digitális iker — egy űrlapon
          </h2>
          <p className="mt-3 opacity-90">
            Ingatlanszám, terület, hivatkozási igények. 1 munkanapon belül
            visszajelzés és KPI-tervezet.
          </p>
          <Link
            href="/csomagok/megrendeles"
            className="mt-6 inline-flex items-center justify-center rounded-md bg-brand px-6 py-3 text-sm font-semibold uppercase tracking-wider text-brand-foreground hover:bg-brand-dark"
          >
            Property Intelligence igénylése
          </Link>
        </div>
      </section>
    </>
  );
}
