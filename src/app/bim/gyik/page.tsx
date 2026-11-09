import { BimLink } from "@/components/bim/BimChrome";
import { BIM_MODELER_HREF } from "@/config/menu";
import { bimMetadata } from "@/lib/bim-site";

export const metadata = bimMetadata(
  "/gyik",
  "GYIK — felmérés, pontfelhő és EOV | VRGO BIM",
  "Gyakori kérdések lakossági, tervezői, ipari, BIM-modellezői és állami BIM témákban."
);

type FaqItem = { q: string; a: string };
type FaqCategory = { title: string; items: FaqItem[] };

const CATEGORIES: FaqCategory[] = [
  {
    title: "Lakossági kérdések",
    items: [
      {
        q: "Mennyibe kerül egy lakás vagy ház felmérése?",
        a: "Az ár a mérettől, a kért kimenetektől és a helyszíntől függ. Rövid leírás alapján egyedi ajánlatot adunk.",
      },
      {
        q: "Milyen formátumban kapom meg a pontfelhőt?",
        a: "Tipikusan E57 formátumban. További formátumokat az ajánlat rögzít.",
      },
    ],
  },
  {
    title: "Tervezői és kivitelezői kérdések",
    items: [
      {
        q: "Kell-e EOV-bekötés?",
        a: "Ha a felhasználási cél vagy az EIR georeferálást kér, igen. A bekötést jogosult földmérő közreműködésével végezzük; a megrendelő saját földmérőjével is együttműködünk.",
      },
      {
        q: "Milyen formában kaphatok modellt a pontfelhőből?",
        a: "A mérések eredménye pontfelhő, EOV-ban illesztett modell vagy az ezekből készített 3D-vetületi modell lehet, a megrendelő előzetesen rögzített követelménye szerint. A modellezést a projektben egyeztetve biztosítjuk.",
      },
      {
        q: "Milyen LOD-szintet vállalnak?",
        a: "A részletezettséget az EIR vagy a megrendelés határozza meg. A vállalt szintet az ajánlatban rögzítjük; házon belüli modellezési kapacitást nem ígérünk általános szolgáltatásként.",
      },
      {
        q: "Hogyan zajlik a minőség-ellenőrzés?",
        a: "Regisztráció után ellenőrző pontokkal és dokumentált átadási listával dolgozunk.",
      },
    ],
  },
  {
    title: "Ipari kérdések",
    items: [
      {
        q: "Vállalnak országos kiszállást?",
        a: "Igen, országosan vállalunk helyszíni munkát. Budapesten belül a kiszállási díjat nem számítjuk fel.",
      },
      {
        q: "Hogyan minimalizálják az ipari üzem megszakítását?",
        a: "A helyszíni munkát a termelési és üzemeltetési korlátokhoz igazítjuk. Nagyobb ipari projektnél több napig a helyszínen dolgozunk, hogy kevesebb legyen az ismételt kiszállás.",
      },
      {
        q: "Vállalnak többnapos helyszíni munkát?",
        a: "Igen, ha a projekt mérete vagy a termelési ütemezés ezt indokolja.",
      },
    ],
  },
  {
    title: "BIM-modellezői kérdések",
    items: [
      {
        q: "Csak terepi adatot is átadnak, modell nélkül?",
        a: "Igen. Vállaljuk a csak helyszíni rögzítést: a pontfelhőt és az egyeztetett felmérési kimenetet átadjuk, a modellezést Ön vagy a csapata végzi.",
      },
      {
        q: "Hogyan lehet alvállalkozói terepi kapacitást kérni?",
        a: "Az ajánlatkérő űrlapon válassza a kapacitásbővítési lehetőséget, vagy nyissa meg a BIM-modellezőknek szóló oldalt. Ön tartja az ügyfélkapcsolatot és a modellezést; mi a terepi adatot biztosítjuk.",
      },
    ],
  },
  {
    title: "Állami BIM kérdések",
    items: [
      {
        q: "Melyik állami beruházásoknál releváns a BIM-mentés?",
        a: "Ahol a megrendelő vagy a vonatkozó előírás BIM-alapú dokumentációt kér. A részleteket az állami BIM megoldásoldalon találja.",
      },
    ],
  },
];

function faqSchema() {
  const items = CATEGORIES.flatMap((cat) => cat.items);
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
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
          <h1 className="text-3xl font-bold sm:text-4xl">Gyakori kérdések</h1>
          <p className="mt-4 max-w-2xl text-sm opacity-90 sm:text-base">
            Rövid válaszok a leggyakoribb lakossági, tervezői, ipari és modellezői kérdésekre.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-4xl space-y-12 px-4 py-12">
        {CATEGORIES.map((cat) => (
          <section key={cat.title}>
            <h2 className="text-xl font-semibold">{cat.title}</h2>
            <dl className="mt-4 space-y-4">
              {cat.items.map((item) => (
                <div key={item.q} className="rounded-md border border-border bg-card p-4">
                  <dt className="font-semibold text-foreground">{item.q}</dt>
                  <dd className="mt-2 text-sm text-muted-foreground">{item.a}</dd>
                </div>
              ))}
            </dl>
          </section>
        ))}

        <p className="text-sm text-muted-foreground">
          Kapacitás BIM-modellezőként?{" "}
          <BimLink href={BIM_MODELER_HREF} className="font-semibold text-brand">
            Tovább a BIM-modellezőknek →
          </BimLink>
        </p>
        <BimLink
          href="/kapcsolat?forras=gyik"
          className="inline-flex rounded-md bg-brand px-6 py-3 text-sm font-semibold text-brand-foreground"
        >
          Ajánlatot kérek
        </BimLink>
      </div>
    </article>
  );
}
