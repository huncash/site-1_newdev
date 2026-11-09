import { BimLink } from "@/components/bim/BimChrome";

/** Egyszeri „három dolog” bekezdés — lint:copy ellenőrzi az előfordulást. */
export function BimScopeNote() {
  return (
    <div className="space-y-3">
      <p>
        Minden megbízásnál három dolgot rögzítünk: a mérést és az ellenőrző pontokat, az{" "}
        <strong className="text-foreground">EOV-illesztést jogosult földmérő közreműködésével</strong>
        , ha a feladat megköveteli, és az átadási formátumot. A pontossági szintet az EIR vagy a
        megrendelés határozza meg.{" "}
        <BimLink href="/pontossag-es-formatumok" className="font-semibold text-brand">
          Pontosság és formátumok
        </BimLink>
      </p>
    </div>
  );
}

/** Georeferálás oldal — földmérő-partner bekezdés. */
export function BimSurveyorNote() {
  return (
    <p>
      A lézeres felmérést geodéziai ellenőrzéssel és EOV-bekötéssel egészítjük ki jogosult földmérő
      közreműködésével (31/2024. (VIII. 22.) ÉKM rendelet 11. § (2)). A terepi méréstől a pontfelhő
      feldolgozásig egy szerződéssel dolgozunk. Ha a megrendelőnek saját földmérője van, vele is
      együttműködünk.
    </p>
  );
}
