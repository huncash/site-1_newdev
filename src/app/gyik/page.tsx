import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: 'GYIK — digitális iker, BIM-export, Property Intelligence | VRGO',
  description: 'Gyakori kérdések a Matterport-alapú digitális ikerről: kampusz-túra, BIM-export, kézi hibajelölés, ESG-melléklet és káresemény előtti állapotrögzítés.',
};

type Faq = { q: string; a: string };

const faqs: Faq[] = [
  {
    q: "Mi a különbség egy 3D virtuális túra és egy digitális iker (digital twin) között?",
    a: "A virtuális túra bejárható 3D állapot. Digitális ikernek akkor hívjuk, ha ehhez a megrendelés szerint dokumentum, kézi jelölés vagy ismételt szken is tartozik. Élő IoT-szenzor és automatikus audit nem része az alapszolgáltatásnak.",
  },
  {
    q: "Több hektáros területet vagy több épületet is meg tudtok jeleníteni egyetlen túrában?",
    a: "Igen. Külön rögzített Matterport-szkeneket egyetlen, folytonosan bejárható túrává illesztünk össze — kampusz, ipari telephely, gyár vagy kórház esetén is. A Pannon Egyetem Zalaegerszeg referenciánkban 7+ hektár, 8 különálló szken egyetlen URL alatt érhető el.",
  },
  {
    q: "Milyen BIM-export formátumokat tudtok adni a Matterport-modellből?",
    a: "MatterPak csomagban E57 pontfelhőt, OBJ mesh-t, XYZ-t és méretezett 2D alaprajzot szállítunk. Ezekből modellezéssel készülhet IFC; ezt partnerrel végezzük (https://bim.vrgo.hu).",
  },
  {
    q: "Mi az a Property Intelligence, és vannak közzétett KPI-eredményeink?",
    a: "Egy nézet, amelybe a megrendelő saját adatai tehetők: bérbeadási idő, karbantartási előzmény, káresemény előtti állapot, méretek. Közzétett mérési eredmény nincs.",
  },
  {
    q: "Felismeritek automatikusan a kivitelezési hibákat?",
    a: "A szabványos szolgáltatás időbélyegzett szken és a modellen kézzel elhelyezett Mattertag. Automatikus repedés-, korrózió- vagy szivárgás-felismerést nem végzünk. A jelölés a kivitelező és a megrendelő közös, visszakereshető dokumentuma.",
  },
  {
    q: "Milyen IoT-, CMMS- és vállalati rendszer-integrációt szállítotok?",
    a: "A túra URL-je és a Mattertag hivatkozása beilleszthető, ha a másik rendszer külső linket fogad. Élő szenzor-adatfolyamot és tanúsított SAP- vagy ServiceNow-csatlakozót nem szállítunk. Jogosultsági szintek a Matterport-fiók beállításai szerint kérhetők.",
  },
  {
    q: "Hogyan használható a digitális iker biztosítási kárrendezésnél?",
    a: "A káresemény előtti, időbélyegzett 3D állapotrögzítést a biztosító távolról bejárhatja. A dokumentáció a szken időpontjához kötött. A kárrendezés időtartamát nem mérjük összesítve.",
  },
  {
    q: "Akadálymentesítési és ESG ingatlanjelentéshez használható a 3D modell?",
    a: "Mellékletként igen: méretezett alaprajz, küszöb és lejtő a modellben mérhető, a homlokzat és a látható gépészet képen rögzíthető. Energetikai tanúsítványt, hőhídmérést, jogszabályi akadálymentesítési auditot és EU-taxonómia-igazolást nem helyettesít.",
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
            GYIK · 2016 óta
          </span>
          <h1 className="mt-4 text-3xl font-bold sm:text-4xl md:text-5xl">
            Gyakori kérdések
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-base opacity-90 sm:text-lg">
            Digitális iker, BIM-export, kézi hibajelölés, ESG-melléklet és káresemény előtti
            állapotrögzítés — a leggyakoribb kérdések.
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
