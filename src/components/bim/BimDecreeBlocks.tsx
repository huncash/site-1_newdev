import { BimLink } from "@/components/bim/BimChrome";

/** A főoldalról a megfelelési hubra költözött „Határidők röviden” tartalom — törlés nélkül. */
export function BimDecreeWhyNow() {
  return (
    <section id="miert-most">
      <h2 className="text-xl font-semibold text-foreground sm:text-2xl">Határidők röviden</h2>
      <ul className="mt-4 list-disc space-y-3 pl-5 text-sm text-muted-foreground sm:text-base">
        <li>
          A BIM létrehozása szükséges új állami építési beruházásnál, valamint meglévő létesítmény
          állami beruházás keretében történő átépítésénél, bővítésénél, felújításánál vagy
          bontásánál, és a magyar állam tulajdonában álló vagy tulajdonába kerülő létesítmények
          üzemeltetésénél (9. §).
        </li>
        <li>
          A rendelet hatálybalépésekor már a magyar állam tulajdonában álló, BIM nélküli
          létesítményeknél a modellt legkésőbb 2035. december 31-ig kell létrehozni (22. § (2)).
        </li>
        <li>
          A tervező és a vállalkozó kivitelező szerződésszerű teljesítésének adatállománya IFC, BCF
          és natív formátumot tartalmaz (20. §). A helyszíni lézerszkennelésből tipikusan E57 / XYZ
          pontfelhő és georeferált alaprajz készül; a BIM-modell külön tétel.
        </li>
      </ul>
    </section>
  );
}

const FOUR_AREAS = [
  { href: "/meglevo-allami-epuletek", title: "Meglévő állami épületek felmérése" },
  { href: "/kivitelezes", title: "Kivitelezés dokumentálása" },
  { href: "/uzemeltetes", title: "Üzemeltetés, éves digitális iker" },
  { href: "/szolgaltatasok/tervezoknek-es-kivitelezoknek", title: "Helyszíni rögzítés tervezőknek" },
] as const;

/** A főoldalról a hubra költözött „Négy terület” blokk — törlés nélkül. */
export function BimDecreeFourAreas() {
  return (
    <section id="negy-terulet">
      <h2 className="text-xl font-semibold text-foreground sm:text-2xl">
        Négy terület, ahol dolgozunk
      </h2>
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        {FOUR_AREAS.map((area) => (
          <BimLink
            key={area.href}
            href={area.href}
            className="rounded-md border border-border bg-card p-5 font-semibold text-foreground hover:border-brand"
          >
            {area.title}
          </BimLink>
        ))}
      </div>
    </section>
  );
}
