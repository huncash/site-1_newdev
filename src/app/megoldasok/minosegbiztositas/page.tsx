import type { Metadata } from "next";
import Link from "next/link";
import { Term } from "@/components/Term";

export const metadata: Metadata = {
  title: 'Minőségbiztosítás (QM) és Defects AI a digitális ikerben | VRGO',
  description: 'Kivitelezési minőségbiztosítás 3D szkennel: Defects AI hibadetektálás, ütemezett szken-körök, eltérés-elemzés, audit-trail és jegyzőkönyv-export — generálkivitelezőnek, műszaki ellenőrnek, beruházónak.',
};

const usecases = [
  {
    title: (
      <>
        <Term k="Defects AI">Defects AI</Term> hibadetektálás
      </>
    ),
    desc: "Gépi képi elemzés a szkenek fölött — kivitelezési hibák, eltérések, hiányzó elemek automatikus felismerése időbélyegzett vizuális bizonyítékkal.",
  },
  {
    title: (
      <>
        Ütemezett <Term k="QM">QM</Term> szken-körök
      </>
    ),
    desc: "Heti vagy szakaszhatáron rögzített állapot — a generálkivitelező és a műszaki ellenőr azonos, objektív forrásból dolgozik.",
  },
  {
    title: "Eltérés-elemzés terv vs. megvalósulás",
    desc: "Az as-built pontfelhő összevetése a tervezői BIM-modellel — geometria-eltérés, pozícióhiba, hiányzó nyílászáró azonnal látszik.",
  },
  {
    title: "Hibajegy és audit-trail",
    desc: "Mattertag-alapú hibajegyek a 3D-ben — fotó, leírás, felelős, határidő. Lezárás után a javított állapot is dokumentálva, verziózottan.",
  },
  {
    title: "Átadás-átvétel jegyzőkönyv",
    desc: "Exportálható PDF-jegyzőkönyv a teljes QM-ciklusról — műszaki átadás, garanciaidőszak, későbbi vita esetén perdöntő anyag.",
  },
  {
    title: "Garanciaidőszaki minőségfelügyelet",
    desc: "Az átadás után 1, 3, 5 éves szken-kör — a garanciális hibák objektív, időbélyegzett rögzítése. Nincs „ez már akkor is ilyen volt” vita.",
  },
];

export default function QmPage() {
  return (
    <>
      <section className="bg-section-dark text-section-dark-foreground">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:py-20">
          <span className="inline-block rounded-full border border-brand/60 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-brand">
            QM · Defects AI · Audit-trail
          </span>
          <h1 className="mt-4 text-3xl font-bold sm:text-4xl md:text-5xl">
            Minőségbiztosítás és hibadetektálás a digitális ikerben
          </h1>
          <p className="mt-4 max-w-3xl text-base opacity-90 sm:text-lg">
            A <Term k="digitális iker">digitális iker (digital twin)</Term> mint a
            kivitelezési <Term k="QM">minőségbiztosítás (QM)</Term> objektív platformja:
            <Term k="Defects AI"> Defects AI</Term> hibadetektálás, ütemezett szken-körök,
            eltérés-elemzés és exportálható jegyzőkönyv. Egyetlen időbélyegzett forrás
            beruházónak, generálkivitelezőnek, műszaki ellenőrnek.
          </p>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/csomagok/megrendeles"
              className="inline-flex items-center justify-center rounded-md bg-brand px-6 py-3 text-sm font-semibold uppercase tracking-wider text-brand-foreground hover:bg-brand-dark"
            >
              QM-felmérés igénylése
            </Link>
            <Link
              href="/megoldasok/bim-as-built"
              className="inline-flex items-center justify-center rounded-md border-2 border-white px-6 py-3 text-sm font-semibold uppercase tracking-wider hover:bg-white hover:text-section-dark"
            >
              BIM as-built kapcsolat
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-background py-12 sm:py-16">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="text-center text-2xl font-semibold sm:text-3xl">
            Hat felhasználás — egy QM-ciklusból
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
            QM-folyamat — négy lépés
          </h2>
          <div className="mx-auto mt-4 h-px w-24 bg-brand/60" />
          <div className="mt-8 space-y-5 text-sm text-muted-foreground sm:text-base">
            <p>
              <strong className="text-foreground">1. Bázis-szken.</strong> Kivitelezési
              szakaszhatáron (szerkezetkész, gépészet, finiselés) rögzített 3D állapot.
            </p>
            <p>
              <strong className="text-foreground">2. Defects AI futtatás.</strong> A modell
              fölött gépi elemzés — eltérés, hiányzó elem, kivitelezési hiba jelölése
              időbélyeggel és pozícióval.
            </p>
            <p>
              <strong className="text-foreground">3. Hibajegy és lezárás.</strong> Mattertag a
              3D-ben — fotó, leírás, felelős, határidő. A javított állapot szken-körrel
              visszaellenőrzött.
            </p>
            <p>
              <strong className="text-foreground">4. Jegyzőkönyv-export.</strong> Műszaki
              átadás, garanciaidőszaki minőségfelügyelet — PDF jegyzőkönyv 3D
              hivatkozásokkal, audit-kompatibilis formában.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-section-dark py-12 text-section-dark-foreground sm:py-16">
        <div className="mx-auto max-w-3xl px-4 text-center">
          <h2 className="text-2xl font-semibold sm:text-3xl">QM csomag igénylése</h2>
          <p className="mt-3 opacity-90">
            Projekttípus, négyzetméter, kivitelezési szakasz, kívánt szken-körök száma. 24 órán
            belül visszajelzés és QM-tervezet.
          </p>
          <Link
            href="/csomagok/megrendeles"
            className="mt-6 inline-flex items-center justify-center rounded-md bg-brand px-6 py-3 text-sm font-semibold uppercase tracking-wider text-brand-foreground hover:bg-brand-dark"
          >
            Minőségbiztosítás igénylése
          </Link>
        </div>
      </section>
    </>
  );
}
