import type { Metadata } from "next";
import Link from "next/link";
import { Term } from "@/components/Term";

export const metadata: Metadata = {
  title: 'B2B csomagok — digitális iker és BIM-alapadat, ENTERPRISE | VRGO',
  description: 'CLASSIC és TWIN bemutató és üzemeltetés. ENTERPRISE: E57/OBJ/XYZ export, BIM-modellezés partnerrel (IFC), kampusz és ipari terület.',
};

type Package = {
  img: string;
  tier: string;
  title: string;
  audience: string;
  problem: string;
  outcome: string;
  benefits: string[];
  cta: string;
};

const packages: Package[] = [
  {
    img: "/packages/csomag-a.jpg",
    tier: "CLASSIC",
    title: "Bérbeadás- és értékesítés-bemutató",
    audience:
      "Iroda-, retail-, raktár- és prémium szálláshely portfóliókat kezelő üzemeltetők, ingatlanforgalmazók, franchise-hálózatok.",
    problem:
      "A potenciális bérlő vagy vevő több helyszínt néz meg, mielőtt szűkíti a listát. A fotó és az alaprajz mellett a tér a találkozó előtt is bejárható.",
    outcome:
      "Egyetlen linkről bejárható 3D túra, a modellben mérhető méretekkel. A túra a helyszíni találkozó előtt megosztható.",
    benefits: [
      "A túra a helyszíni mutatás előtt elküldhető",
      "Megosztható egy linkkel — döntéshozó kollégák, befektetők, külföldi partnerek számára is",
      "Beágyazható a saját honlapba, tárgyalási anyagba, exposéba",
      "Belső méretek a modellből mérhetők; geodéziai tanúsítvány csak akkor készül, ha az ajánlat külön kéri",
      "Google Térkép / Utcakép integráció (bolti, vendéglátós, retail egységeknél)",
      "Egyszeri felvétel, hosszú távon hasznosul",
    ],
    cta: "CLASSIC igénylése",
  },
  {
    img: "/packages/csomag-b.jpg",
    tier: "TWIN",
    title: "Létesítmény-üzemeltetés és portfólió-iker",
    audience:
      "Facility management cégek, irodaház- és bevásárlóközpont-üzemeltetők, többtelephelyes vállalatok, biztosítók, ESG-jelentésre kötelezett cégek.",
    problem:
      "A karbantartás, az akadálymentesítés, a biztosítási dokumentáció és a bérlőváltás gyakran papíron vagy szétszórt fotókon van. Káresemény után a korábbi állapotot ezekből kell összerakni.",
    outcome:
      "Egy digitális iker az épületről: a kollégák távolról látják a teret, a karbantartási jelölés és a káresemény előtti állapot egy felületen kereshető.",
    benefits: [
      "Hibajegy és planned maintenance Mattertaggel a 3D-modellben. A túra linkje beilleszthető, ha a CMMS külső hivatkozást fogad",
      "Küszöb, lejtő és méret a modellből mérhető. Jogszabályi akadálymentesítési auditot nem helyettesít",
      "Káresemény előtti, időbélyegzett állapotrögzítés. Az elszámolás idejéről és kimeneteléről nem nyilatkozunk",
      "Bérlőváltáskor a leadási állapot időbélyeggel rögzíthető",
      "Homlokzat, látható gépészet és alaprajz egy nézetben, ESG-mellékletnek. Energetikai tanúsítványt nem állítunk ki",
      "A térponthoz hivatkozás köthető. Élő szenzor-adatfolyamot nem szállítunk",
      "Jogosultsági szintek a Matterport-fiók beállításai szerint",
    ],
    cta: "TWIN igénylése",
  },
  {
    img: "/packages/csomag-c.jpg",
    tier: "ENTERPRISE",
    title: "Kampusz, ipari telephely, hektáros digitális iker",
    audience:
      "Egyetemek és kutatóhelyek, gyártó- és logisztikai vállalatok, energetikai és infrastruktúra-üzemeltetők, generálkivitelezők.",
    problem:
      "A több épületből, csarnokból, külső területből álló telephely egyetlen szkenneléssel lefedhetetlen. A BIM-tervek és a megvalósult állapot között gyakran jelentős eltérés van.",
    outcome:
      "A kampusz vagy ipari terület — homlokzat, parkoló, napelempark látható felülete — egy összefüggő, bejárható túraként, a megrendelt exportokkal.",
    benefits: [
      "Több hektár, több épület — különálló terek egyetlen, folytonosan bejárható túrába illesztve",
      "E57/OBJ/XYZ export, BIM-modellezés partnerrel (IFC)",
      "Kivitelezési állapot időbélyegzett szkennelése, hibák kézi jelölése a modellen",
      "Mutatólista a megrendelő saját adataiból. Közzétett KPI-eredmény nincs",
      "Kampusz digitalizáció — felvételi, akkreditációs, befektetői és sajtóanyag egyetlen URL-ről",
      "Napelempark és látható gépészet képi rögzítése. Energetikai számítást és környezetvédelmi dokumentációt nem készítünk",
      "Referencia: Pannon Egyetem Zalaegerszeg — 7+ ha, 8 szken → 1 túra, 4 munkanap",
    ],
    cta: "ENTERPRISE igénylése",
  },
];

const niches = [
  {
    title: "Iroda, coworking, retail",
    desc: "A túra a helyszíni mutatás előtt megosztható.",
    pkg: "CLASSIC / TWIN",
  },
  {
    title: "Szálloda, apartman, panzió",
    desc: (
      <>
        Foglalási konverzió-növekedés, <Term k="OTA">OTA-leírás</Term> helyett valódi bejárás.
      </>
    ),
    pkg: "CLASSIC",
  },
  {
    title: "Felsőoktatás és kutatóhely",
    desc: (
      <>
        Felvételi marketing, akkreditáció, <Term k="FM">létesítménygazdálkodás</Term> egy linken.
      </>
    ),
    pkg: "ENTERPRISE",
  },
  {
    title: "Gyár, raktár, logisztikai központ",
    desc: (
      <>
        <Term k="BIM">BIM</Term> <Term k="as-built">as-built</Term>, beüzemelés, karbantartás,
        biztosítási dokumentáció.
      </>
    ),
    pkg: "ENTERPRISE",
  },
  {
    title: "Múzeum, galéria, kulturális örökség",
    desc: "Online látogathatóság, pályázati és örökségvédelmi dokumentáció.",
    pkg: "TWIN",
  },
  {
    title: "Egészségügy, klinika, idősellátás",
    desc: "Akadálymentesítési audit, betegtájékoztatás, hozzátartozói transzparencia.",
    pkg: "TWIN",
  },
];

export default function PackagesPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-section-dark py-14 text-section-dark-foreground sm:py-20">
        <div className="mx-auto max-w-5xl px-4 text-center">
          <span className="inline-block rounded-full border border-brand/60 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-brand">
            B2B csomagok · 2016 óta
          </span>
          <h1 className="mt-4 text-3xl font-bold sm:text-4xl md:text-5xl">
            Három csomag — három üzleti probléma, megoldva
          </h1>
          <p className="mx-auto mt-4 max-w-3xl text-base opacity-90 sm:text-lg">
            Bejárható 3D túrát, portfólió-ikret és kampusz-léptékű, összefűzött túrát szállítunk.
            Válaszd a feladathoz illő csomagot.
          </p>
        </div>
      </section>

      {/* Csomagok */}
      <section className="bg-background py-12 sm:py-16">
        <div className="mx-auto grid max-w-6xl gap-6 px-4 sm:gap-8 md:grid-cols-3">
          {packages.map((p) => (
            <article
              key={p.tier}
              className="flex flex-col rounded-lg border border-border bg-card p-6 shadow-sm"
            >
              <div className="flex items-center justify-between">
                <span className="rounded-full bg-brand/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-brand">
                  {p.tier}
                </span>
              </div>
              <img
                src={p.img}
                alt={`${p.tier} csomag illusztráció`}
                width={280}
                height={200}
                loading="lazy"
                className="mx-auto mt-4 h-auto w-[200px] sm:w-[240px]"
              />
              <h2 className="mt-4 text-center text-xl font-semibold">{p.title}</h2>

              <div className="mt-5 space-y-4 text-sm">
                <div>
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Kinek szól
                  </h3>
                  <p className="mt-1 text-foreground">{p.audience}</p>
                </div>
                <div>
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    A probléma
                  </h3>
                  <p className="mt-1 text-foreground">{p.problem}</p>
                </div>
                <div>
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Mit kapsz
                  </h3>
                  <p className="mt-1 text-foreground">{p.outcome}</p>
                </div>
                <div>
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Miért éri meg
                  </h3>
                  <ul className="mt-2 space-y-2">
                    {p.benefits.map((b) => (
                      <li key={b} className="flex gap-2">
                        <span aria-hidden className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <Link
                href={`/csomagok/megrendeles?csomag=${encodeURIComponent(p.tier)}`}
                className="mt-6 inline-flex items-center justify-center rounded-md bg-brand px-4 py-2.5 text-sm font-semibold uppercase tracking-wider text-brand-foreground hover:bg-brand-dark"
              >
                {p.cta}
              </Link>
            </article>
          ))}
        </div>

        <p className="mx-auto mt-8 max-w-3xl px-4 text-center text-sm text-muted-foreground">
          Árajánlatot az űrlap alapján 1 munkanapon belül küldünk. A digitális iker átadási
          határidejét az ajánlat tartalmazza; ha külön határidő nincs benne, az ÁSZF szerinti
          határidő érvényes.
        </p>
      </section>

      {/* Réspiacok */}
      <section className="bg-secondary py-12 sm:py-16">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="text-center text-2xl font-semibold sm:text-3xl">
            Mely réspiacokon dolgozunk leggyakrabban
          </h2>
          <div className="mx-auto mt-4 h-px w-24 bg-brand/60" />
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {niches.map((n) => (
              <article key={n.title} className="rounded-md border border-border bg-card p-5 shadow-sm">
                <div className="flex items-center justify-between gap-3">
                  <h3 className="text-base font-semibold">{n.title}</h3>
                  <span className="shrink-0 rounded-full bg-brand/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-brand">
                    {n.pkg}
                  </span>
                </div>
                <p className="mt-2 text-sm text-muted-foreground">{n.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-section-dark py-12 text-section-dark-foreground sm:py-16">
        <div className="mx-auto max-w-3xl px-4 text-center">
          <h2 className="text-2xl font-semibold sm:text-3xl">Ajánlatkérés</h2>
          <p className="mt-3 opacity-90">
            Egyetlen űrlap: csomag, terület, kiegészítők. 1 munkanapon belül visszajelzés és konkrét
            ajánlat — a helyszíni szkennelés időpontját egyeztetjük.
          </p>
          <Link
            href="/csomagok/megrendeles"
            className="mt-6 inline-flex items-center justify-center rounded-md bg-brand px-6 py-3 text-sm font-semibold uppercase tracking-wider text-brand-foreground hover:bg-brand-dark"
          >
            Ajánlatkérő űrlap
          </Link>
        </div>
      </section>
    </>
  );
}
