import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: 'GYIK — digitális iker, BIM-export, Property Intelligence | VRGO',
  description: 'Gyakori kérdések a Matterport-alapú digitális ikerről: kampusz-szintű túra, BIM/MatterPak export, Defects AI, ESG ingatlanjelentés, IoT és CMMS integráció, biztosítási kárrendezés 3D-ben.',
};

type Faq = { q: string; a: string };

const faqs: Faq[] = [
  {
    q: "Mi a különbség egy 3D virtuális túra és egy digitális iker (digital twin) között?",
    a: "A virtuális túra egy egyszeri vizuális élmény. A digitális iker egy folyamatosan frissíthető, mérési adattal, dokumentációval, IoT-szenzorral, karbantartási előzménnyel és audit-trail-lel összekötött 3D mása az épületnek. A VRGO TWIN és ENTERPRISE csomag már digitális ikret szállít, nem csak túrát.",
  },
  {
    q: "Több hektáros területet vagy több épületet is meg tudtok jeleníteni egyetlen túrában?",
    a: "Igen. Külön rögzített Matterport-szkeneket egyetlen, folytonosan bejárható túrává illesztünk össze — kampusz, ipari telephely, gyár vagy kórház esetén is. A Pannon Egyetem Zalaegerszeg referenciánkban 7+ hektár, 8 különálló szken egyetlen URL alatt érhető el.",
  },
  {
    q: "Milyen BIM-export formátumokat tudtok adni a Matterport-modellből?",
    a: "MatterPak csomagban E57 pontfelhőt, OBJ mesh-t, XYZ-t és méretezett 2D alaprajzot szállítunk — ezekből generálkivitelező és tervezőiroda képes IFC/Revit/ArchiCAD as-built dokumentációt előállítani BIM-koordinációhoz.",
  },
  {
    q: "Mi az a Property Intelligence és milyen KPI-okat lát egy portfólió-vezető?",
    a: "Portfólió-szintű döntéstámogató adatréteg a digitális iker fölött: bérbeadási idő, SLA-teljesülés, karbantartási hibajegy-átfutás, akadálymentesítési megfelelés, ESG audit-trail, energetikai eltérés, biztosítási kockázat — egyetlen leaderboard nézetben.",
  },
  {
    q: "Mit tud a Defects AI és hogyan használjátok kivitelezésnél?",
    a: "Gépi képi elemzés a Matterport-szkenek fölött: kivitelezési hibákat, eltéréseket, hiányzó elemeket ismer fel és időbélyegzett vizuális bizonyítékot ad — generálkivitelező és tulajdonos közötti viták minimalizálására, minőségbiztosítási (QM) audit-trail építésére.",
  },
  {
    q: "Milyen IoT, CMMS és vállalati rendszer-integrációkat támogattok?",
    a: "A digitális iker pontjaira Mattertaggel köthető IoT-szenzor adat (hőmérséklet, energia, légminőség), CMMS hibajegy (planned maintenance, eszközleltár), valamint SAP és ServiceNow workflow. A bérlő, üzemeltető és befektető más-más jogosultsági nézetet kap.",
  },
  {
    q: "Hogyan használható a digitális iker biztosítási kárrendezésnél?",
    a: "A káresemény előtti, időbélyegzett 3D állapotrögzítés gyorsabb és vitamentes kárrendezést tesz lehetővé. A biztosító távolról bejárja a helyszínt, a dokumentáció auditálható, a kárrendezési átfutási idő tapasztalataink szerint akár 60%-kal rövidül.",
  },
  {
    q: "Akadálymentesítési és ESG ingatlanjelentéshez használható a 3D modell?",
    a: "Igen. A méretezett alaprajz, küszöb- és lejtésmérés akadálymentesítési auditot támogat, az energetikai audit a 3D modellből ellenőrizhető (gépészet, homlokzat, napelempark), és az ESG riportokhoz auditálható vizuális bizonyítékot ad.",
  },
  {
    q: "Lakást vagy családi házat is szkenneltek?",
    a: "B2C ingatlan-eladási scaneket általában nem vállalunk. Kivétel: 500 m² feletti vagy egyedi prémium ingatlan, egyedi ajánlat alapján. Tipikus megrendelőink: B2B portfólió-tulajdonosok, kampuszüzemeltetők, gyártók, FM-szolgáltatók.",
  },
  {
    q: "Hogyan tudok időpontot kérni — kell telefonálni?",
    a: "Nem. Az ajánlatkérő űrlap kitöltése (csomag, helyszín, terület, igények) után 1 munkanapon belül e-mailben küldünk árajánlatot. A helyszíni szkennelés időpontját a folyamat szükségletei és egyeztetés alapján rögzítjük.",
  },
];

function buildFaqSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

export default function FaqPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildFaqSchema()) }}
      />
      <section className="bg-section-dark py-14 text-section-dark-foreground sm:py-20">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <span className="inline-block rounded-full border border-brand/60 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-brand">
            GYIK · 10. éve a Matterport-piacon
          </span>
          <h1 className="mt-4 text-3xl font-bold sm:text-4xl md:text-5xl">
            Gyakori kérdések
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-base opacity-90 sm:text-lg">
            Digitális iker, BIM-export, Property Intelligence, Defects AI, IoT/CMMS-integráció,
            ESG és biztosítási felhasználás — a leggyakoribb döntés-előkészítő kérdések.
          </p>
        </div>
      </section>

      <section className="bg-background py-12 sm:py-16">
        <div className="mx-auto max-w-3xl space-y-4 px-4">
          {faqs.map((f) => (
            <details
              key={f.q}
              className="group rounded-md border border-border bg-card p-5 shadow-sm open:border-brand/60"
            >
              <summary className="cursor-pointer list-none text-base font-semibold text-foreground marker:hidden">
                <span className="inline-block transition group-open:rotate-90 mr-2 text-brand">
                  ›
                </span>
                {f.q}
              </summary>
              <p className="mt-3 pl-6 text-sm text-foreground/85">{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="bg-section-dark py-12 text-section-dark-foreground sm:py-16">
        <div className="mx-auto max-w-3xl px-4 text-center">
          <h2 className="text-2xl font-semibold sm:text-3xl">Nem találtad a választ?</h2>
          <p className="mt-3 opacity-90">
            Töltsd ki az ajánlatkérő űrlapot — 1 munkanapon belül személyre szabott ajánlattal
            válaszolunk.
          </p>
          <Link
            href="/ajanlat"
            className="mt-6 inline-flex items-center justify-center rounded-md bg-brand px-6 py-3 text-sm font-semibold uppercase tracking-wider text-brand-foreground hover:bg-brand-dark"
          >
            Ajánlatkérés
          </Link>
        </div>
      </section>
    </>
  );
}
