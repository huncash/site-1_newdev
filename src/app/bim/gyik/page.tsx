import { DECREE_CHECKED, MAIN_ORIGIN, NJT_URL, bimMetadata } from "@/lib/bim-site";

export const metadata = bimMetadata(
  "/gyik",
  "GYIK — 31/2024. ÉKM rendelet és rögzítés | VRGO BIM",
  "Kell-e BIM meglévő állami épületre, ki végzi a geodéziai ellenőrző mérést, és hogyan készül az IFC. A válaszok a rendelet 2026.01.01-i szövegére hivatkoznak."
);

const faqs = [
  {
    q: "Kell-e BIM egy meglévő állami épületre?",
    a: "Új állami beruházásnál, valamint meglévő létesítmény állami beruházás keretében történő átépítésénél, bővítésénél, felújításánál vagy bontásánál igen, és a magyar állam tulajdonában álló vagy tulajdonába kerülő létesítmény üzemeltetésénél is (9. §). A rendelet hatálybalépésekor már állami tulajdonú, BIM nélküli létesítménynél a modellt legkésőbb 2035. december 31-ig kell létrehozni (22. § (2)).",
  },
  {
    q: "Ki végzi a geodéziai ellenőrző mérést?",
    a: "A 3D rögzítés gyors és áttekinthető, de nem helyettesíti a hivatalos geodéziai ellenőrző mérést (11. § (2)). Dedikált, hivatalban eljárásra jogosult földmérő partnerrel dolgozunk együtt, összehangolt, stabil workflow-val. Ha a megrendelőnek saját földmérője van, készségesen és rugalmasan együttműködünk vele is.",
  },
  {
    q: "Tudtok IFC-t adni?",
    a: "Igen. Az IFC-modell a pontfelhőből precíz modellezéssel készül, modellezési partnerünkkel, az EIR szerinti részletezettségben, BCF-fel és natív formátummal együtt. A helyszíni felmérésből E57, OBJ, XYZ és alaprajz készül.",
  },
  {
    q: "Mennyi idő alatt készül el?",
    a: "A helyszíni munkaidőt a feladat méretéhez és a megkövetelt pontossági szinthez igazítjuk. A határidőt az ajánlat rögzíti; általános napra szóló vállalást nem teszünk.",
  },
  {
    q: "Mi az az EIR?",
    a: "Az információcsere-követelmények dokumentuma (Employer's Information Requirements): a megbízó elvárásai a BIM-mel szemben (3. § 8. pont, 17–18. §, 1. melléklet). A pontossági szintet minden projektnél az EIR-hez mérjük, és előre jelezzük, ha a feladathoz más módszer szükséges. Az EIR megírása a Pontosság és formátumok oldalon van a nem vállalt tételek között.",
  },
  {
    q: "Dolgoztok közbeszerzésben?",
    a: "A szerepet — alvállalkozó vagy közvetlen megbízott — az adott ajánlat rögzíti. Ezen az oldalon nem állítjuk, hogy önálló ajánlattevőként indulunk közbeszerzésen.",
  },
  {
    q: "Hogyan kezelitek az adatokat?",
    a: "Az ajánlatkérés adatait az adatvédelmi tájékoztató szerint kezeljük. A felvételek tulajdonjogát és tárolását a szerződés rögzíti.",
  },
  {
    q: "Ki végzi a bekötést, a telekalakítást és a kitűzést?",
    a: "A bekötést és a 11. § (2) szerinti ellenőrző mérést dedikált, hivatalban eljárásra jogosult földmérő partnerrel végezzük, mérési jegyzőkönyvvel. Ha a megrendelőnek saját földmérője van, készségesen és rugalmasan együttműködünk vele is. A telekalakítás, a kitűzés és az ingatlan-nyilvántartási földmérés a Pontosság és formátumok oldal „Első körben nem vállalt” listáján szerepel.",
  },
  {
    q: "Mi történik, ha lejár a hosztolt modell előfizetése?",
    a: "A hosztolt modell elérhetősége az azt tároló előfizetéshez kötött. A leadáskor a megrendelt fájlokat (E57, OBJ és a csomagban lévő további exportokat) is átadjuk. A pontos feltétel a szerződésben van.",
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
        <p className="text-xs text-muted-foreground">
          Jogforrás:{" "}
          <a href={NJT_URL} className="underline" target="_blank" rel="noopener noreferrer">
            Nemzeti Jogszabálytár
          </a>
          , 2026.01.01. Utolsó ellenőrzés: {DECREE_CHECKED}. Adatkezelés:{" "}
          <a href={`${MAIN_ORIGIN}/adatvedelem`} className="underline">
            vrgo.hu/adatvedelem
          </a>
          . Az oldal tájékoztató, nem jogi tanácsadás.
        </p>
      </div>
    </article>
  );
}
