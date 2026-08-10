import type { Metadata } from "next";
import Link from "next/link";
import { Term } from "@/components/Term";

export const metadata: Metadata = {
  title: 'B2B csomagok — digitális iker bérbeadáshoz, üzemeltetéshez, kampuszhoz | VRGO',
  description: 'Három célzott B2B csomag: bérbeadás-marketing (CLASSIC), létesítmény-üzemeltetés (TWIN) és kampusz/ipari digitális iker (ENTERPRISE). Strukturált megrendelés.',
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
    title: "Bérbeadás- és értékesítés-gyorsító",
    audience:
      "Iroda-, retail-, raktár- és prémium szálláshely portfóliókat kezelő üzemeltetők, ingatlanforgalmazók, franchise-hálózatok.",
    problem:
      "A potenciális bérlő/vevő nem akar 3-4 helyszínt végigjárni, mielőtt szűkíti a listát. A klasszikus fotó és alaprajz kevés a döntéshez, a felesleges helyszíni séta pedig drága mindenkinek.",
    outcome:
      "Egyetlen linkről bejárható, méretezhető 3D túra — a komoly érdeklődő már a helyszíni találkozó előtt eldönti, hogy a hely megfelel-e neki.",
    benefits: [
      "Rövidebb bérbeadási / értékesítési ciklus, kevesebb felesleges helyszíni mutatás",
      "Megosztható egy linkkel — döntéshozó kollégák, befektetők, külföldi partnerek számára is",
      "Beágyazható a saját honlapba, tárgyalási anyagba, exposéba",
      "Pontos belső méretek, alaprajzi nézet — az ajánlatkéréshez nem kell visszamenni",
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
      "A karbantartás, akadálymentesítés, biztosítási dokumentáció és bérlőváltás ma is papír alapú vagy szétszórt fotókban él. Egy káresemény után hetekig tart bizonyítani, mi volt az állapot előtte.",
    outcome:
      "Egyetlen, mindig elérhető digitális iker az épületről — a kollégák távolról is látják a kontextust, a karbantartás és a biztosítási kárrendezés napokkal gyorsabb.",
    benefits: [
      "Hibajegyek és planned maintenance Mattertaggel a 3D-modellben — CMMS karbantartás-koordináció, opcionális SAP / ServiceNow integráció",
      "Akadálymentesítés-audit (küszöb, lejtő, méret) és műszaki dokumentum a digitális iker alapján",
      "Biztosítási kárrendezés 3D-ben — időbélyegzett állapotrögzítés, vitamentes és gyors elszámolás",
      "Bérlőváltáskor nincs többé 'ki rongálta el' vita: a leadási állapot rögzítve van",
      "ESG ingatlanjelentés és energetikai audit 3D modellből — gépészet, homlokzat, alaprajz egy nézetben",
      "IoT-integráció Matterport-túrában — szenzoradat (hőmérséklet, energia, légminőség) a térponton",
      "Jogosultsági szintek — bérlő, üzemeltető, befektető más-más nézetet kap",
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
      "A több épületből, csarnokból, külső területből álló telephely egyetlen szkenneléssel lefedhetetlen. A BIM-tervek és a megvalósult állapot között sokszor hónapok és milliós hibák vannak.",
    outcome:
      "A teljes kampusz vagy ipari terület — beleértve a homlokzatokat, parkolókat, napelemparkot — egyetlen, folyamatosan bejárható digitális ikerként, BIM- és IoT-integrációra felkészítve.",
    benefits: [
      "Több hektár, több épület — különálló terek egyetlen, folytonosan bejárható túrába illesztve",
      "MatterPak export (E57, OBJ, XYZ, alaprajz) — BIM-koordináció as-built dokumentációhoz, generálkivitelezőnek",
      "Defects AI — kivitelezési hibák felismerése időbélyegzett vizuális bizonyítékkal, QM minőségbiztosítási audit-trail",
      "Property Intelligence KPI-leaderboard: bérbeadás, SLA, ESG, energetika, kárrendezés egy nézetben",
      "Kampusz digitalizáció — felvételi, akkreditációs, befektetői és sajtóanyag egyetlen URL-ről",
      "Energetikai audit 3D modellből (napelempark, gépészet) és környezetvédelmi dokumentáció alapja",
      "Referencia: Pannon Egyetem Zalaegerszeg — 7+ ha, 8 szken → 1 túra, 4 munkanap",
    ],
    cta: "ENTERPRISE igénylése",
  },
];

const niches = [
  {
    title: "Iroda, coworking, retail",
    desc: "Bérbeadási idő 18–32%-os csökkenése, kevesebb felesleges helyszíni mutatás.",
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
            B2B csomagok · 10. éve a piacon
          </span>
          <h1 className="mt-4 text-3xl font-bold sm:text-4xl md:text-5xl">
            Három csomag — három üzleti probléma, megoldva
          </h1>
          <p className="mx-auto mt-4 max-w-3xl text-base opacity-90 sm:text-lg">
            Nem fotózást adunk el. Bérbeadási ciklust rövidítünk, üzemeltetési kockázatot csökkentünk
            és kampusz-léptékű digitális ikret szállítunk. Válaszd a problémádhoz illő csomagot.
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
          Árajánlatot a projekt egyedi jellemzői szerint az ajánlatkérő űrlap + szükség esetén
          telefonos egyeztetés/ helyszín bejárása után legfeljebb 24 órán belül adunk. A helyszín
          rögzítéstől a digitális iker átadásáig jellemző átfutási időnk általában 12-24 óra.
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
          <h2 className="text-2xl font-semibold sm:text-3xl">Strukturált megrendelés, nem telefonálás</h2>
          <p className="mt-3 opacity-90">
            Egyetlen űrlap: csomag, terület, kiegészítők, 3 időpontjavaslat. 24 órán belül
            visszaigazolás és konkrét ajánlat — felesleges egyeztető körök nélkül.
          </p>
          <Link
            href="/csomagok/megrendeles"
            className="mt-6 inline-flex items-center justify-center rounded-md bg-brand px-6 py-3 text-sm font-semibold uppercase tracking-wider text-brand-foreground hover:bg-brand-dark"
          >
            Megrendelő űrlap megnyitása
          </Link>
        </div>
      </section>
    </>
  );
}
