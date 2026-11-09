import { Suspense } from "react";

import { BimQuoteForm } from "@/components/bim/BimQuoteForm";
import { BimLink } from "@/components/bim/BimChrome";
import { bimMetadata } from "@/lib/bim-site";

export const metadata = bimMetadata(
  "/ipari-felmeres",
  "Ipari létesítmények felmérése | VRGO BIM",
  "Gyártóüzemek, raktárak és technológiai csarnokok állapotfelmérése layout-tervezéshez, gépbeépítéshez, átépítéshez és átadáshoz."
);

const USES = [
  "Átépítés, bővítés és géptelepítés előkészítése",
  "Új gép vagy technológia beépítéséhez szükséges térbeli alap",
  "Csővezeték-, gépészeti és szerkezeti állapot rögzítése",
  "Átadási as-built dokumentáció a megrendelés szerint",
] as const;

const OUTPUTS = [
  "Pontfelhő a megrendelés szerinti formátumban",
  "2D layout / CAD a szükséges szelvényekkel",
  "EOV-ban illesztett adat vagy 3D-vetületi modell, ha a megrendelés ezt kéri",
] as const;

const FAQ = [
  {
    q: "Üzem közben is lehet felmérni?",
    a: "Igen, a biztonsági előírások és a zónák egyeztetése után. A munkát a termelési korlátokhoz igazítjuk.",
  },
  {
    q: "Kell-e mindig BIM-modell?",
    a: "Nem. A pontfelhő és a 2D layout gyakran elegendő. Modellátadás csak a megrendelő előzetesen rögzített követelménye szerint, egyeztetve.",
  },
  {
    q: "Vállalnak többnapos helyszíni munkát?",
    a: "Igen, ha a projekt mérete vagy az üzemeltetési ütemezés ezt indokolja.",
  },
] as const;

export default function IndustrialSurveyPage() {
  return (
    <article className="bg-background">
      <section className="bg-section-dark py-10 text-section-dark-foreground sm:py-12">
        <div className="mx-auto max-w-4xl px-4">
          <h1 className="text-3xl font-bold leading-tight sm:text-4xl">
            Ipari létesítmények felmérése
          </h1>
          <p className="mt-3 max-w-3xl text-base opacity-90 sm:text-lg">
            Gyártóüzemek, raktárak és technológiai csarnokok állapotfelmérése layout-tervezéshez,
            gépbeépítéshez, átépítéshez és átadáshoz.
          </p>
          <BimLink
            href="/kapcsolat?utvonal=ipar&forras=ipari-felmeres"
            className="mt-8 inline-flex items-center justify-center rounded-md bg-brand px-6 py-3 text-sm font-semibold uppercase tracking-wider text-brand-foreground hover:bg-brand-dark"
          >
            Ipari felmérés kérése
          </BimLink>
        </div>
      </section>

      <div className="mx-auto max-w-4xl space-y-12 px-4 py-12">
        <section>
          <h2 className="text-xl font-semibold">Milyen feladatokra jó</h2>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-muted-foreground sm:text-base">
            {USES.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold">Mit kap a megrendelő</h2>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-muted-foreground sm:text-base">
            {OUTPUTS.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold">Helyszíni munka és módszer</h2>
          <p className="mt-3 text-sm text-muted-foreground sm:text-base">
            Nagyobb ipari projektnél több napig a helyszínen dolgozunk, hogy a felmérés a termelési
            ütemtervhez igazodjon. Országosan vállalunk kiszállást; Budapesten belül a kiszállási
            díjat nem számítjuk fel.
          </p>
          <p className="mt-3 text-sm text-muted-foreground sm:text-base">
            A terepi felmérést robotmérőállomással, GNSS-vevővel és drónos fotogrammetriával
            végezzük. A konkrét feladathoz tartozó lézerszkennelési kapacitást a megrendelés előtt
            egyeztetjük.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold">Munkafolyamat</h2>
          <p className="mt-3 text-sm text-muted-foreground sm:text-base">
            Igény tisztázása → helyszíni felmérés → feldolgozás és ellenőrzés → átadás. A részletes
            lépéseket a{" "}
            <BimLink href="/munkafolyamat" className="font-semibold text-brand">
              munkafolyamat
            </BimLink>{" "}
            oldalon találja.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold">GYIK</h2>
          <dl className="mt-4 space-y-4">
            {FAQ.map((item) => (
              <div key={item.q}>
                <dt className="font-semibold text-foreground">{item.q}</dt>
                <dd className="mt-1 text-sm text-muted-foreground">{item.a}</dd>
              </div>
            ))}
          </dl>
          <BimLink href="/gyik" className="mt-4 inline-block text-sm font-semibold text-brand">
            További kérdések →
          </BimLink>
        </section>

        <section>
          <h2 className="text-xl font-semibold">Űrlap</h2>
          <p className="mt-3 text-sm text-muted-foreground">
            Kérjen helyszíni felmérési vagy kapacitásajánlatot.
          </p>
          <div className="mt-6">
            <Suspense fallback={<p className="text-sm text-muted-foreground">Űrlap betöltése…</p>}>
              <BimQuoteForm />
            </Suspense>
          </div>
        </section>
      </div>
    </article>
  );
}
