import { BimLink } from "@/components/bim/BimChrome";

/** „Mit vállalunk” — rövid, nem ismétli a földmérő-bekezdést. */
export function BimScopeNote() {
  return (
    <div className="space-y-3">
      <p>
        Három dolgot vállalunk: <strong className="text-foreground">mért, ellenőrzött adatot</strong>{" "}
        (szabványos geodéziai kontrollal),{" "}
        <strong className="text-foreground">hivatalos EOV-kötést</strong> a jogosult földmérő
        közreműködésével, és{" "}
        <strong className="text-foreground">a megrendelő felhasználási céljához illeszkedő átadást</strong>{" "}
        (E57, DWG, IFC). A pontossági szintet az EIR vagy a megrendelés határozza meg, és előre
        jelezzük, ha a feladathoz más módszer kell.{" "}
        <BimLink href="/pontossag-es-formatumok" className="font-semibold text-brand">
          Pontosság és formátumok
        </BimLink>
      </p>
    </div>
  );
}

/** „Munkafolyamat” alá — egyetlen helyen a földmérő-partner bekezdés. */
export function BimSurveyorNote() {
  return (
    <p>
      Optimalizált munkafolyamatunk ötvözi a gyors, nagy pontosságú lézerszkennelést a jogosult
      földmérő partnerünk által végzett hivatalos alappont-meghatározással és bekötéssel (31/2024.
      (VIII. 22.) ÉKM rendelet 11. § (2) szerinti megfelelés). A terepi méréstől a pontfelhő
      feldolgozáson át — és igény szerint — a szabványos BIM modellalkotásig egy szerződéssel, egy
      felelőssel szállítjuk az eredményt. Természetesen, amennyiben a megrendelő saját földmérővel
      rendelkezik, készséggel és rugalmasan együttműködünk vele is.
    </p>
  );
}
