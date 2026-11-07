import type { Metadata } from "next";
import Link from "next/link";

import { VRGO_CONFIG } from "@/config/vrgo";
import { bimLink } from "@/lib/links";

export const metadata: Metadata = {
  title: "GYIK — bejárható 3D túra és Google Utcakép | VRGO",
  description:
    "Gyakori kérdések a bejárható 3D túráról: Google megjelenés, méretezett alaprajz, Matterport vs. lézerszkennelés, csomagok és ajánlatkérés.",
  alternates: { canonical: "https://vrgo.hu/gyik" },
};

type Faq = { q: string; a: string };

const faqs: Faq[] = [
  {
    q: "Mi a különbség egy 3D virtuális túra és egy digitális iker (digital twin) között?",
    a: "A virtuális túra bejárható 3D állapot. Digitális ikernek akkor hívjuk, ha ehhez a megrendelés szerint dokumentum, kézi jelölés vagy ismételt szken is tartozik. Élő IoT-szenzor és automatikus audit nem része az alapszolgáltatásnak.",
  },
  {
    q: "Több épületet vagy külső területet is meg tudtok jeleníteni egyetlen túrában?",
    a: "Igen. Külön rögzített modelleket egyetlen, folytonosan bejárható túrává illesztünk össze — kampusz, ipari telephely, gyár vagy kórház esetén is. A Pannon Egyetem kampuszán a szkennelt részek egyetlen URL alatt érhetők el.",
  },
  {
    q: "Milyen BIM-export formátumokat tudtok adni a Matterport-modellből?",
    a: "MatterPak csomagban E57 pontfelhőt, OBJ mesh-t, XYZ-t és méretezett 2D alaprajzot szállítunk. Georeferált lézerszkennelés, EOV-bekötés és — igény szerint — IFC-modellezés: https://bim.vrgo.hu.",
  },
  {
    q: "Mi az a BIM?",
    a: "A BIM (építményinformációs modellezés) az épület adatokkal ellátott digitális modellje. A 3D / lézerszkennelés ennek az alapadata, nem maga a BIM. A georeferált felmérés és a modellezés részletei: bim.vrgo.hu.",
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
    a: "Nem. Az ajánlatkérő űrlap kitöltése (csomag, helyszín, terület, igények) után e-mailben küldünk árajánlatot. A helyszíni felvétel időpontját egyeztetjük.",
  },
  {
    q: "Matterport 3D túra vagy lézerszkennelés: mikor melyik?",
    a: "Online bemutatásra, marketingre, ingatlanhirdetésre vagy gyors dokumentálásra a bejárható 3D túra a megfelelő választás. Mérnöki pontossághoz, nagy területekhez, tervezéshez, kivitelezéshez, hatósági vagy üzemeltetési adatátadáshoz lézerszkennelést ajánlunk: bim.vrgo.hu.",
  },
  {
    q: "Mennyire pontos a méretezett alaprajz?",
    a: "A 3D modellből tájékoztató méretek mérhetők. Geodéziai tanúsítványt vagy mérnöki pontosságot igénylő feladathoz a lézerszkennelés a megoldás: bim.vrgo.hu.",
  },
  {
    q: "Hogyan jelenik meg a túra a Google-ben?",
    a: "A felvételből a Google Térképen és az Utcaképen is bejárható túra készül. Az érdeklődő az utcáról indul, és a belső terekben tovább sétál gömbpanorámákon.",
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
            GYIK
          </span>
          <h1 className="mt-4 text-3xl font-bold sm:text-4xl md:text-5xl">
            Gyakori kérdések
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-base opacity-90 sm:text-lg">
            Bejárható 3D túra, Google megjelenés, alaprajz és a lézerszkennelés határa — a
            leggyakoribb kérdések.
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
              <p className="mt-3 pl-6 text-sm text-foreground/85">
                {f.a}
                {f.q.startsWith("Milyen BIM-export") ? (
                  <>
                    {" "}
                    <a
                      href={bimLink("/pontossag-es-formatumok", "gyik")}
                      className="font-semibold text-brand underline underline-offset-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
                    >
                      Részletek: Pontosság és formátumok →
                    </a>
                  </>
                ) : null}
                {f.q === "Mi az a BIM?" ? (
                  <>
                    {" "}
                    <a
                      href={bimLink("/mi-az-a-bim", "gyik-mi-a-bim")}
                      className="font-semibold text-brand underline underline-offset-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
                    >
                      Mi az a BIM? →
                    </a>
                  </>
                ) : null}
                {f.q.startsWith("Matterport 3D túra vagy") ||
                f.q.startsWith("Mennyire pontos") ? (
                  <>
                    {" "}
                    <a
                      href={bimLink("/", "gyik")}
                      className="font-semibold text-brand underline underline-offset-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
                    >
                      bim.vrgo.hu →
                    </a>
                  </>
                ) : null}
              </p>
            </details>
          ))}
        </div>
      </section>

      <section className="bg-section-dark py-12 text-section-dark-foreground sm:py-16">
        <div className="mx-auto max-w-3xl px-4 text-center">
          <h2 className="text-2xl font-semibold sm:text-3xl">Nem találtad a választ?</h2>
          <p className="mt-3 opacity-90">
            Töltse ki az ajánlatkérő űrlapot.
            {VRGO_CONFIG.replySlaText ? ` ${VRGO_CONFIG.replySlaText}` : ""}
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
