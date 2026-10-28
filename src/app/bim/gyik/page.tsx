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
    a: "A 11. § (2) szerinti digitális geodéziai ellenőrző mérést földmérő partnerünk végzi, a rögzítéssel egy ajánlatban, egy ütemben, mérési jegyzőkönyvvel. A helyszíni rögzítést mi végezzük.",
  },
  {
    q: "Tudtok IFC-t adni?",
    a: "Igen, modellezési partnerünkkel, az EIR szerinti részletezettségben, BCF-fel és natív formátummal együtt. A helyszíni rögzítésből E57, OBJ, XYZ és alaprajz készül.",
  },
  {
    q: "Mennyi idő alatt készül el?",
    a: "A Pannon Egyetem Zalaegerszegi Kampuszán a helyszíni rögzítés 4 munkanap volt (2024 ősz, 8 külön modell, 891 szkennelési pont). Ez ennek a feladatnak az adata, nem általános vállalás. A határidőt az ajánlat rögzíti.",
  },
  {
    q: "Mi az az EIR?",
    a: "Az információcsere-követelmények dokumentuma: a megbízó elvárásai a BIM-mel szemben (3. § 8. pont, 17–18. §, 1. melléklet). Az EIR megírása a Pontosság és formátumok oldalon van a nem vállalt tételek között. A kapott EIR-hez módszert és árat javaslunk.",
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
    a: "A geodéziai ellenőrző mérést és a bekötést földmérő partnerünk végzi, mérési jegyzőkönyvvel. A telekalakítás, a kitűzés és az ingatlan-nyilvántartási földmérés a Pontosság és formátumok oldal „Első körben nem vállalt” listáján szerepel.",
  },
  {
    q: "Mi történik, ha lejár a Matterport-előfizetés?",
    a: "A hosztolt modell elérhetősége az azt tároló előfizetéshez kötött. Ezért a leadáskor a megrendelt fájlokat (E57, OBJ és a csomagban lévő további exportokat) is átadjuk. A fiók pontos feltétele a Matterport érvényes előfizetésében és a szerződésben van.",
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
