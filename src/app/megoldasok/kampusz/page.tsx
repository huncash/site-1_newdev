import type { Metadata } from "next";
import Link from "next/link";
import { Term } from "@/components/Term";

export const metadata: Metadata = {
  title: 'Kampusz digitalizáció — több hektár, egyetlen bejárható túra | VRGO',
  description: 'Egyetemi és ipari kampuszok digitális ikre: több épület, parkoló, külső terület egyetlen URL alatt. Felvételi marketing, akkreditáció, üzemeltetés, BIM-koordináció.',
};

const usecases = [
  {
    title: "Több hektár — egyetlen folytonos túra",
    desc: "Külön rögzített szkenek egy közös térbe illesztve, a látogató szakadásmentesen sétál épületről épületre, kintről beltérre.",
  },
  {
    title: "Felvételi és akkreditációs marketing",
    desc: "Jelentkezők, szülők, akkreditációs bizottság egyetlen linkről bejárja a teljes campust — laborok, kollégium, közösségi terek.",
  },
  {
    title: (
      <>
        Üzemeltetés és <Term k="FM">létesítménygazdálkodás</Term>
      </>
    ),
    desc: "Karbantartás, takarítási útvonalak, eszközleltár, akadálymentesítési audit egy térbeli kontextusban — a kollégák távolról is látnak mindent.",
  },
  {
    title: (
      <>
        <Term k="as-built">As-built</Term> dokumentáció generálkivitelezőnek
      </>
    ),
    desc: (
      <>
        <Term k="MatterPak">MatterPak</Term> export (E57, OBJ, XYZ, méretezett alaprajz) a{" "}
        <Term k="BIM">BIM</Term>-koordinációhoz — a tervezett és megvalósult állapot összevetése
        órák, nem hetek alatt.
      </>
    ),
  },
  {
    title: "Befektetői és sajtóanyag",
    desc: "Pályázati, befektetői, EU-s monitoring és sajtóbemutatóra alkalmas, mindig elérhető bejárás — a fizikai látogatás kiegészítője, nem helyettesítője.",
  },
  {
    title: (
      <>
        Energetikai és <Term k="ESG">ESG</Term> alapdokumentum
      </>
    ),
    desc: "Napelempark, gépészet, homlokzati elemek pontos felmérése — energetikai audit és fenntarthatósági jelentés vizuális alapja.",
  },
];

export default function KampuszPage() {
  return (
    <>
      <section className="bg-section-dark text-section-dark-foreground">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:py-20">
          <span className="inline-block rounded-full border border-brand/60 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-brand">
            Kampusz digitalizáció · Multi-épület digitális iker
          </span>
          <h1 className="mt-4 text-3xl font-bold sm:text-4xl md:text-5xl">
            Több hektár, több épület — egyetlen bejárható túra
          </h1>
          <p className="mt-4 max-w-3xl text-base opacity-90 sm:text-lg">
            Egyetemi kampuszok, ipari telephelyek, kórház-komplexumok és többépületes
            irodaházak <Term k="digitális iker">digitális ikre (digital twin)</Term>: a külön
            rögzített tereket egyetlen, folytonosan bejárható túrába illesztjük. Egy URL — a
            teljes campus.
          </p>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/csomagok/megrendeles"
              className="inline-flex items-center justify-center rounded-md bg-brand px-6 py-3 text-sm font-semibold uppercase tracking-wider text-brand-foreground hover:bg-brand-dark"
            >
              Kampusz-felmérés igénylése
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
            Hat felhasználás — egy adatbázisból
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
            Hogyan illeszkedik össze a több szken?
          </h2>
          <div className="mx-auto mt-4 h-px w-24 bg-brand/60" />
          <div className="mt-8 space-y-5 text-sm text-muted-foreground sm:text-base">
            <p>
              <strong className="text-foreground">1. Felmérés és szken-terv.</strong> A
              telephely alaprajza alapján kijelöljük a szken-pontokat úgy, hogy a külön napokon
              vagy külön csapatokkal készült felvételek később hézagmentesen összekapcsolhatók
              legyenek. Több hektár, egyenetlen terep, kül- és beltér átmenetek tervezett
              kezelése.
            </p>
            <p>
              <strong className="text-foreground">2. Helyszíni szkennelés.</strong> Több
              munkanap, több épületre osztva. Külön kalibrációs pontok biztosítják a későbbi
              összeillesztést — nem szükséges egy menetben mindent rögzíteni.
            </p>
            <p>
              <strong className="text-foreground">3. Összeillesztés.</strong> A különálló
              modelleket egyetlen, folytonos térré fűzzük össze: a látogató szakadásmentesen
              sétál épületről épületre, terem-átjárókon, parkolókon, udvarokon keresztül.
            </p>
            <p>
              <strong className="text-foreground">4. Élesítés.</strong> Egy URL, jogosultsági
              szintekkel: nyilvános marketing-nézet, belső üzemeltetői nézet, BIM-export
              csomag a tervező partnernek. <Term k="Mattertag">Mattertag</Term> infópontok a
              fontos eszközökhöz.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-background py-12 sm:py-16">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <h2 className="text-2xl font-semibold sm:text-3xl">Bizonyított eset: Pannon Egyetem Zalaegerszeg</h2>
          <p className="mt-4 text-sm text-muted-foreground sm:text-base">
            7+ hektár, 8 különálló szken egyetlen folyamatos túrává illesztve, 4 munkanap
            alatt. A campus minden épülete, parkolója és külső területe egyetlen URL-ről
            bejárható — felvételi marketingre, akkreditációs anyagra és belső üzemeltetésre
            egyaránt használt digitális iker.
          </p>
          <Link
            href="/egyesitett-tura"
            className="mt-6 inline-flex items-center justify-center rounded-md border-2 border-brand px-6 py-3 text-sm font-semibold uppercase tracking-wider text-brand hover:bg-brand hover:text-brand-foreground"
          >
            Egyesített túra részletei
          </Link>
        </div>
      </section>

      <section className="bg-section-dark py-12 text-section-dark-foreground sm:py-16">
        <div className="mx-auto max-w-3xl px-4 text-center">
          <h2 className="text-2xl font-semibold sm:text-3xl">Strukturált kampusz-igénylés</h2>
          <p className="mt-3 opacity-90">
            Egyetlen űrlap: épületszám, terület, BIM-export és infópont igények, 3
            időpontjavaslat. 24 órán belül visszaigazolás és konkrét projekttervezet —
            telefonálás nélkül.
          </p>
          <Link
            href="/csomagok/megrendeles"
            className="mt-6 inline-flex items-center justify-center rounded-md bg-brand px-6 py-3 text-sm font-semibold uppercase tracking-wider text-brand-foreground hover:bg-brand-dark"
          >
            Kampusz-csomag igénylése
          </Link>
        </div>
      </section>
    </>
  );
}
