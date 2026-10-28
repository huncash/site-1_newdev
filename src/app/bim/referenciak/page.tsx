import { MatterportEmbed } from "@/components/bim/MatterportEmbed";
import { BimLink } from "@/components/bim/BimChrome";
import { BimScopeNote } from "@/components/bim/BimScopeNote";
import { bimMetadata } from "@/lib/bim-site";

const TOUR = "https://my.matterport.com/show/?m=pruUjt76nQU";

const facts = [
  ["Helyszín", "Pannon Egyetem, Zalaegerszegi Kampusz (a kampusz területe több mint 7 hektár)"],
  ["Helyszíni munka", "4 munkanap, 2024 ősz"],
  [
    "Rögzítés",
    "8 külön modell, egyetlen bejárható modellben egyesítve, 891 szkennelési pont",
  ],
  ["Rögzített tartalom", "Oktatási épületek belső terei, a külső homlokzatok, napelempark"],
] as const;

export const metadata = bimMetadata(
  "/referenciak",
  "Referencia: Pannon Egyetem, Zalaegerszeg | VRGO BIM",
  "A Pannon Egyetem zalaegerszegi kampuszának szkennelt részei egy bejárható modellben. 8 külön modell, 891 szkennelési pont, 4 munkanap, 2024 ősz."
);

export default function ReferencesPage() {
  return (
    <article className="bg-background">
      <section className="bg-section-dark py-14 text-section-dark-foreground">
        <div className="mx-auto max-w-4xl px-4">
          <h1 className="text-3xl font-bold text-section-dark-foreground sm:text-4xl">Referencia</h1>
        </div>
      </section>
      <div className="mx-auto max-w-4xl space-y-8 px-4 py-12 text-sm text-muted-foreground sm:text-base">
        <header>
          <h2 className="text-2xl font-semibold text-foreground">
            Pannon Egyetem, Zalaegerszegi Kampusz
          </h2>
          <p className="mt-2">
            Egyetemi kampusz szkennelt részei egyetlen, összefüggő bejárható modellben.
          </p>
        </header>

        <dl className="grid gap-4 sm:grid-cols-2">
          {facts.map(([label, value]) => (
            <div key={label} className="rounded-md border border-border bg-card p-4">
              <dt className="text-xs font-semibold uppercase tracking-wider text-foreground">{label}</dt>
              <dd className="mt-2">{value}</dd>
            </div>
          ))}
        </dl>

        <section>
          <h2 className="text-xl font-semibold text-foreground">Kihívás</h2>
          <p className="mt-2">
            A több épületből és külső területből álló kampusz egyetlen felvételi egységben nem
            rögzíthető. A belső és a külső tereket egyetlen, összefüggő bejárásban kellett
            elérhetővé tenni.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground">Megoldás</h2>
          <p className="mt-2">
            A kampusz különböző zónáiról 8 külön modell készült négy munkanap alatt. A rögzítés az
            üzemelő kampusz használati rendjéhez igazodva, külön ütemekben történt (belső és külső
            terek, eltérő kiindulási pontok). Ezeket egyetlen, folyamatosan bejárható digitális
            ikerré illesztettük, a külső homlokzatokkal és a napelempark rögzítésével együtt. Az
            összefűzött modell 891 szkennelési pontot tartalmaz.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground">Eredmény</h2>
          <p className="mt-2">
            Egyetlen linkről bejárható és megosztható modell, amelyben a méretek mérhetők. A
            rögzítésből igény esetén alaprajz és E57 pontfelhő is kiadható.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground">Kapcsolat a 31/2024. ÉKM rendelettel</h2>
          <p className="mt-2">
            A felvétel a 010 – Meglévő állapot és környezet rögzítése felhasználási esethez nyújt
            gyors, bejárható alapot. A 11. § (2) szerinti geodéziai ellenőrző mérést földmérő
            partnerünk végzi, az IFC-modellt modellezési partnerünk.
          </p>
        </section>

        <MatterportEmbed
          src={`${TOUR}&ts=1`}
          title="Pannon Egyetem Zalaegerszeg — Matterport túra"
          openHref={TOUR}
        />

        <BimScopeNote />
        <p className="text-xs">Az adatok a VRGO projektdokumentációjából származnak.</p>

        <BimLink
          href="/ajanlatkeres"
          className="inline-flex rounded-md bg-brand px-6 py-3 text-sm font-semibold uppercase tracking-wider text-brand-foreground"
        >
          Küldje el a feladat leírását
        </BimLink>
      </div>
    </article>
  );
}
