import { BimLink } from "@/components/bim/BimChrome";
import { BIM_MODELER_HREF } from "@/config/menu";
import { bimMetadata } from "@/lib/bim-site";

export const metadata = bimMetadata(
  "/gyik",
  "GYIK — ipari felmérés, pontfelhő és Scan-to-BIM | VRGO BIM",
  "Gyakori kérdések a lézeres állapotfelmérésről, EOV-bekötésről, Scan-to-BIM formátumokról és a kapacitás-együttműködésről."
);

const faqs = [
  {
    q: "Milyen projekteket érdemes lézeres felméréssel rögzíteni?",
    a: "Ipari létesítményeket, rekonstrukciókat, felújításokat, as-built dokumentációt, layout- és ütközésvizsgálati alapot — minden olyan feladatot, ahol a meglévő állapot a tervezés kiindulópontja.",
  },
  {
    q: "Milyen formátumban kapom meg a pontfelhőt?",
    a: "Tipikusan E57 formátumban. További formátumokat az ajánlat rögzít.",
  },
  {
    q: "Kell-e EOV-bekötés?",
    a: "Ha a felhasználási cél vagy az EIR georeferálást kér, igen. A bekötést jogosult földmérő közreműködésével végezzük; a megrendelő saját földmérőjével is együttműködünk.",
  },
  {
    q: "Milyen modellformátumban készül a Scan-to-BIM modell?",
    a: "Igény szerint Revit, ArchiCAD vagy IFC — külön tételként, a feladat és az LOD szerint.",
  },
  {
    q: "Milyen LOD-szintig modelleznek?",
    a: "A részletezettséget az EIR vagy a megrendelés határozza meg. Az ajánlatban rögzítjük a vállalt LOD-szintet.",
  },
  {
    q: "Hogyan zajlik a minőség-ellenőrzés?",
    a: "Regisztráció után ellenőrző pontokkal és dokumentált átadási listával dolgozunk. Ha releváns, BCF hibajegyzéket is adunk.",
  },
  {
    q: "Vállalnak országos kiszállást?",
    a: "Igen. Kiindulópontunk a Duna-kanyar; Budapest és a Duna-kanyar környékén akár azonos napi kiszállás is lehetséges.",
  },
  {
    q: "Hogyan minimalizálják az ipari üzem megszakítását?",
    a: "A helyszíni munkát a termelési és üzemeltetési korlátokhoz igazítjuk. Nagyobb projektnél helyszíni tartózkodással csökkentjük az ismételt kiszállások miatti zavarokat.",
  },
  {
    q: "Vállalnak többnapos helyszíni munkát?",
    a: "Igen, ha a projekt mérete vagy a termelési ütemezés ezt indokolja.",
  },
  {
    q: "Csak teljes modellt készítenek, vagy csak terepi adatot is?",
    a: "Vállaljuk a csak helyszíni rögzítést és georeferálást is: a pontfelhőt és a georeferált alaprajzot átadjuk, a modellezést Ön vagy a csapata végzi. A Scan-to-BIM külön tétel.",
  },
  {
    q: "Hogyan lehet kapacitást kérni BIM-modellezőként?",
    a: "Az ajánlatkérő űrlapon válassza a kapacitás útvonalat, vagy nyissa meg a Scan-to-BIM kapacitás oldalt. Ön tartja az ügyfélkapcsolatot; mi a terepi adatot és szükség szerint a modellezési kapacitást biztosítjuk.",
  },
];

function faqSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };
}

export default function BimFaqPage() {
  return (
    <article className="bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema()) }}
      />
      <section className="bg-section-dark py-14 text-section-dark-foreground">
        <div className="mx-auto max-w-4xl px-4">
          <h1 className="text-3xl font-bold text-section-dark-foreground sm:text-4xl">
            Gyakori kérdések
          </h1>
          <p className="mt-4 max-w-2xl opacity-90">
            Ipari felmérés, georeferálás, Scan-to-BIM és kapacitás-együttműködés.
          </p>
        </div>
      </section>
      <section className="py-12 sm:py-16">
        <div className="mx-auto max-w-3xl space-y-3 px-4">
          {faqs.map((item) => (
            <details
              key={item.q}
              className="group rounded-md border border-border bg-card p-5 open:border-brand/50"
            >
              <summary className="cursor-pointer list-none font-semibold marker:hidden">
                <span className="mr-2 text-brand transition group-open:rotate-90">›</span>
                {item.q}
              </summary>
              <p className="mt-3 pl-5 text-sm text-muted-foreground">
                {item.a}
                {item.q.includes("kapacitást kérni") ? (
                  <>
                    {" "}
                    <BimLink href={BIM_MODELER_HREF} className="font-semibold text-brand underline">
                      Scan-to-BIM kapacitás →
                    </BimLink>
                  </>
                ) : null}
              </p>
            </details>
          ))}
        </div>
      </section>
      <section className="bg-section-dark py-12 text-section-dark-foreground">
        <div className="mx-auto max-w-3xl px-4 text-center">
          <h2 className="text-2xl font-semibold">Nem találta a választ?</h2>
          <BimLink
            href="/ajanlatkeres?forras=gyik"
            className="mt-6 inline-flex items-center justify-center rounded-md bg-brand px-6 py-3 text-sm font-semibold uppercase tracking-wider text-brand-foreground hover:bg-brand-dark"
          >
            Ajánlatkérés
          </BimLink>
        </div>
      </section>
    </article>
  );
}
