import { BimBreadcrumb } from "@/components/bim/BimBreadcrumb";
import { BimLink } from "@/components/bim/BimChrome";
import {
  BimEducationalInstrumentNotes,
  BimServiceInstrumentClaims,
} from "@/components/bim/BimInstrumentClaims";
import { bimMetadata } from "@/lib/bim-site";

export const metadata = bimMetadata(
  "/technologia-es-minoseg",
  "Technológia és átadási minőség | VRGO BIM",
  "A mérési beállítás, a regisztráció, az ellenőrzés és az átadott eredmény kapcsolata — gyártói maximum nélkül összekeverve."
);

const PIPELINE = [
  {
    title: "1. Műszer gyártói képessége",
    text: "A gyártói adatlap a műszer elméleti maximumát írja le. Ez nem egyenlő a konkrét projektben vállalt eredménnyel, és nem jelenik meg szolgáltatási ígéretként jóváhagyott rekord nélkül.",
  },
  {
    title: "2. Konkrét mérési beállítás",
    text: "A helyszíni beállítás (távolság, szögfelbontás, ismétlések, takarások) határozza meg, milyen sűrűségű és lefedettségű adat keletkezik. A beállítást a megrendelés előtt rögzítjük.",
  },
  {
    title: "3. Álláspontok regisztrációja",
    text: "A különálló álláspontokat közös koordináta-rendszerbe illesztjük. A regisztrációs eltérés a illesztés minőségét jellemzi — nem automatikusan a projekt abszolút pontossága.",
  },
  {
    title: "4. Projektellenőrzés",
    text: "Az ellenőrzés a megrendelésben rögzített elemekre terjed ki (például ellenőrző pontok, EOV-illesztés, átadási lista). Független tanúsítást vagy automatikus hibamentességet nem állítunk.",
  },
  {
    title: "5. Pontfelhő feldolgozása",
    text: "Regisztráció, tisztítás és a megrendelt formátum előállítása. A sűrűbb pontfelhő nem automatikusan pontosabb: a pontköz/részletesség és a pontosság külön fogalom.",
  },
  {
    title: "6. Rajz- vagy modellkészítés",
    text: "Alaprajz, metszet vagy BIM-modell csak akkor része az átadásnak, ha a megrendelés ezt külön rögzíti. A modellkészítés nem automatikus része minden felmérésnek; házon belüli CAD/BIM-modellezési kapacitást nem vállalunk.",
  },
  {
    title: "7. Átadás és dokumentált korlátok",
    text: "Az átadáskor rögzítjük a kiadott állományokat, a koordinátákat és mértékegységet, valamint az ismert takarásokat vagy hozzáférési korlátokat — ha ezek a projektben relevánsak.",
  },
] as const;

const TERMS = [
  {
    title: "Pontosság",
    text: "A mért és a valós helyzet közötti eltérés a vállalt ellenőrzési keretben. A vállalt szintet az ajánlat vagy az EIR rögzíti.",
  },
  {
    title: "Pontköz / részletesség",
    text: "A pontok távolsága a felületen. Sűrűbb felvétel több részletet rögzíthet, de önmagában nem garantál kisebb mérési hibát.",
  },
  {
    title: "Adatgyűjtési sebesség",
    text: "A műszer beállított üteme. A gyártói maximum és a projektben használt beállítás eltérhet; a helyszín és a takarások is befolyásolják.",
  },
  {
    title: "Regisztrációs eltérés",
    text: "Az álláspontok közös rendszerbe illesztésének maradékhibája. Ez nem azonos automatikusan a projekt abszolút pontosságával.",
  },
  {
    title: "Koordinátaillesztés",
    text: "EOV vagy más megadott rendszerbe illesztés, ha a megrendelés kéri. Jogosult földmérő közreműködésével, ha a feladat ezt megköveteli.",
  },
  {
    title: "Lefedettség",
    text: "A ténylegesen elérhető és mért területek. Takarás, zárva tartott helyiség vagy biztonsági zóna dokumentált korlát lehet.",
  },
] as const;

const DELIVERY_LAYERS = [
  {
    title: "Terepi adatfelvétel",
    text: "Helyszíni mérés a rögzített hatókör szerint.",
  },
  {
    title: "Regisztrált pontfelhő",
    text: "Álláspontok illesztése és tisztítás a megrendelés szerint.",
  },
  {
    title: "Optimalizált átadás",
    text: "A kért formátumú állományok átadása (például E57).",
  },
  {
    title: "Rajzkészítés",
    text: "Csak ha a megrendelés külön kéri.",
  },
  {
    title: "BIM-modellezés",
    text: "Nem házon belüli alapkapacitás; a modell a kijelölt modellezőnél marad, hacsak a projektben másképp nem egyeztetjük.",
  },
  {
    title: "Opcionális megtekintés / tárhely",
    text: "Csak ha a megrendelés ezt külön tartalmazza — nincs színlelt viewer- vagy letöltőgomb.",
  },
] as const;

const QUALITY_BASE = [
  "Felmért területek rögzítése a megrendelés szerint",
  "Regisztrációs eljárás a projektben alkalmazott módon",
  "A megrendelésben vállalt ellenőrzési elemek",
  "Koordináták és mértékegység az átadáskor",
  "Kiadott állományok listája",
  "Ismert takarások vagy hozzáférési korlátok, ha relevánsak",
] as const;

const PRICE_FACTORS = [
  "Terjedelem és tagoltság",
  "Hozzáférés és helyszíni korlátok",
  "Szükséges részletesség és ellenőrzés",
  "Kért kimenetek",
  "Ütemezés — a helyszíni és az irodai munka időigénye külön",
] as const;

export default function TechnologyQualityPage() {
  return (
    <article className="bg-background">
      <section className="bg-section-dark py-10 text-section-dark-foreground sm:py-12">
        <div className="mx-auto max-w-4xl px-4">
          <BimBreadcrumb
            tone="dark"
            items={[
              { href: "/", label: "Kezdőlap" },
              { label: "Technológia és minőség" },
            ]}
          />
          <h1 className="text-3xl font-bold text-section-dark-foreground sm:text-4xl">
            Technológia és átadási minőség
          </h1>
          <p className="mt-3 max-w-3xl text-base opacity-90 sm:text-lg">
            A gyártói képesség, a helyszíni beállítás, a regisztráció és az átadott eredmény
            külön lépés. Nem olvasztjuk össze őket egyetlen általános pontossági ígéretté.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-4xl space-y-10 px-4 py-12 text-sm text-muted-foreground sm:text-base">
        <section className="space-y-6">
          <h2 className="text-xl font-semibold text-foreground">A folyamat hét lépése</h2>
          {PIPELINE.map((step) => (
            <div key={step.title}>
              <h3 className="text-base font-semibold text-foreground">{step.title}</h3>
              <p className="mt-2">{step.text}</p>
            </div>
          ))}
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-foreground">Fogalmak röviden</h2>
          <dl className="space-y-4">
            {TERMS.map((term) => (
              <div key={term.title}>
                <dt className="font-semibold text-foreground">{term.title}</dt>
                <dd className="mt-1">{term.text}</dd>
              </div>
            ))}
          </dl>
        </section>

        <BimServiceInstrumentClaims />
        <BimEducationalInstrumentNotes />

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-foreground">Mit ellenőrzünk a gyakorlatban</h2>
          <p>
            Csak a megrendelésben vállalt ellenőrzési elemeket tüntetjük fel alapcsomagként. Nem
            állítunk kitalált kontrollhálózatot, automatikus hibamentességet vagy általános
            tanúsítást.
          </p>
          <ul className="list-disc space-y-2 pl-5">
            {QUALITY_BASE.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-foreground">Átadási rétegek</h2>
          <ul className="space-y-3">
            {DELIVERY_LAYERS.map((item) => (
              <li key={item.title}>
                <span className="font-semibold text-foreground">{item.title}.</span> {item.text}
              </li>
            ))}
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-foreground">Árazási tényezők</h2>
          <p>
            Nem publikálunk konkurens árból képzett díjat, és nem vállalunk kitalált ajánlatadási
            vagy feldolgozási határidőt. Az árajánlat a konkrét feladat alapján készül.
          </p>
          <ul className="list-disc space-y-2 pl-5">
            {PRICE_FACTORS.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-foreground">Kapcsolódó oldalak</h2>
          <ul className="list-disc space-y-2 pl-5">
            <li>
              <BimLink href="/munkafolyamat" className="font-semibold text-brand">
                Munkafolyamat
              </BimLink>{" "}
              — a felmérés menete
            </li>
            <li>
              <BimLink href="/pontossag-es-formatumok" className="font-semibold text-brand">
                Pontosság és formátumok
              </BimLink>{" "}
              — EIR és átadási formátumok
            </li>
            <li>
              <BimLink href="/referenciak" className="font-semibold text-brand">
                Referenciák
              </BimLink>{" "}
              — módszer és engedéllyel átadható anyag
            </li>
          </ul>
        </section>

        <BimLink
          href="/kapcsolat?forras=technologia-es-minoseg"
          className="inline-flex rounded-md bg-brand px-6 py-3 text-sm font-semibold text-brand-foreground"
        >
          Projektet egyeztetek
        </BimLink>
      </div>
    </article>
  );
}
