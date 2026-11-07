import { BimLink } from "@/components/bim/BimChrome";
import { DECREE_CHECKED, MAIN_ORIGIN, NJT_URL, bimMetadata } from "@/lib/bim-site";

export const metadata = bimMetadata(
  "/gyik",
  "GYIK — lézerszkennelés, rendelet és lakossági felmérés | VRGO BIM",
  "Mennyibe kerül, mennyi idő, kell-e BIM állami épületre, mit kap a tervező. Lakossági és B2B válaszok."
);

const faqs = [
  {
    q: "Mennyibe kerül egy lakás vagy ház felmérése?",
    a: "A díj a mérettől, a terek bonyolultságától, a kiszállástól és a leadott anyagtól függ. Nyilvánosan a díjszerkezetet mutatjuk; a végleges összeget az ajánlat tartalmazza. Részletek: Árak és folyamat.",
  },
  {
    q: "Mennyi idő alatt készül el?",
    a: "A helyszínen jellemzően egy bejárás elég. A feldolgozás határidejét az ajánlat rögzíti; általános napra szóló vállalást nem teszünk — csak olyat, amit tartani tudunk.",
  },
  {
    q: "Be kell-e menni a lakásba többször?",
    a: "Általában nem. Ha a terek zárva vannak, vagy később derül ki hiányzó zóna, egyeztetünk pótló bejárást.",
  },
  {
    q: "Mit kapok a felmérés végén?",
    a: "Alaprajz és metszet (PDF, DWG), kérésre pontfelhő-nézet. 3D modell külön tétel. Tervezői átadáshoz E57/RCP és jegyzőkönyv is kérhető.",
  },
  {
    q: "Használható-e hatósági eljáráshoz?",
    a: "A felhasználási céltól és a földmérői közreműködéstől függ. Ha földhivatali vagy hatósági ügyintézés a cél, jelezze előre — ezt külön egyeztetjük.",
  },
  {
    q: "Kell-e BIM egy meglévő állami épületre?",
    a: "Új állami beruházásnál, valamint meglévő létesítmény állami beruházás keretében történő átépítésénél, bővítésénél, felújításánál vagy bontásánál igen, és a magyar állam tulajdonában álló vagy tulajdonába kerülő létesítmény üzemeltetésénél is (9. §). A rendelet hatálybalépésekor már állami tulajdonú, BIM nélküli létesítménynél a modellt legkésőbb 2035. december 31-ig kell létrehozni (22. § (2)).",
  },
  {
    q: "Ki végzi a geodéziai ellenőrző mérést és a bekötést?",
    a: "A hivatalos alappont-meghatározást és EOV-bekötést jogosult földmérő partnerünk végzi (31/2024. (VIII. 22.) ÉKM rendelet 11. § (2)). Ha a megrendelő saját földmérővel rendelkezik, együttműködünk vele. A terepi szkenneléstől az átadásig egy szerződéssel, egy felelőssel dolgozunk.",
  },
  {
    q: "Tudtok IFC-t adni?",
    a: "Igen. A szabványos BIM-modell (IFC és natív formátum) a pontfelhőből, precíz modellezéssel készül, az EIR szerinti részletezettségben — külön tételként. A helyszíni felmérésből E57 és XYZ pontfelhő, valamint georeferált CAD alaprajz és metszet készül.",
  },
  {
    q: "Mi az az EIR?",
    a: "Az információcsere-követelmények dokumentuma (Employer's Information Requirements): a megbízó elvárásai a BIM-mel szemben (3. § 8. pont, 17–18. §, 1. melléklet). A pontossági szintet minden projektnél az EIR-hez mérjük.",
  },
  {
    q: "Dolgoztok közbeszerzésben?",
    a: "A szerepet — alvállalkozó vagy közvetlen megbízott — az adott ajánlat rögzíti. Ezen az oldalon nem állítjuk, hogy önálló ajánlattevőként indulunk közbeszerzésen.",
  },
  {
    q: "Hogyan kezelitek az adatokat?",
    a: "Az ajánlatkérés adatait az adatvédelmi tájékoztató szerint kezeljük. Lakások belső terének szkennelése személyes adatot is rögzíthet; a felvételek tulajdonjogát és tárolását a szerződés rögzíti.",
  },
  {
    q: "Milyen állományokat adnak át?",
    a: "Pontfelhő exportot (E57, XYZ), georeferált CAD alaprajzot és metszetet, valamint — ha megrendelték — szabványos BIM-modellt (IFC és natív formátum).",
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
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema()) }} />
      <section className="bg-section-dark py-14 text-section-dark-foreground">
        <div className="mx-auto max-w-4xl px-4">
          <h1 className="text-3xl font-bold text-section-dark-foreground sm:text-4xl">Gyakori kérdések</h1>
        </div>
      </section>
      <div className="mx-auto max-w-4xl space-y-6 px-4 py-12">
        {faqs.map((item) => (
          <section key={item.q} className="rounded-md border border-border bg-card p-5">
            <h2 className="text-lg font-semibold">{item.q}</h2>
            <p className="mt-2 text-sm text-muted-foreground sm:text-base">{item.a}</p>
          </section>
        ))}
        <p className="text-sm text-muted-foreground">
          Lakossági belépő:{" "}
          <BimLink href="/lakossagnak" className="font-semibold text-brand">
            /lakossagnak
          </BimLink>
          . Díjszerkezet:{" "}
          <BimLink href="/arak-es-folyamat" className="font-semibold text-brand">
            /arak-es-folyamat
          </BimLink>
          .
        </p>
        <p className="text-xs text-muted-foreground">
          Jogforrás:{" "}
          <a href={NJT_URL} className="underline" target="_blank" rel="noopener noreferrer">
            Nemzeti Jogszabálytár
          </a>
          . Ellenőrizve: {DECREE_CHECKED}. Adatvédelem:{" "}
          <a href={`${MAIN_ORIGIN}/adatvedelem`} className="underline">
            vrgo.hu/adatvedelem
          </a>
          .
        </p>
      </div>
    </article>
  );
}
