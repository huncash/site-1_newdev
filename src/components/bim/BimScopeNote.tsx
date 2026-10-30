import { BimLink } from "@/components/bim/BimChrome";

export function BimScopeNote() {
  return (
    <div className="space-y-3">
      <p>
        A tervezési, kivitelezési és üzemeltetési folyamatokat szigorú tűrési határok (EIR
        konformitás) és szabványos geodéziai ellenőrző mérések mellett támogatjuk. A nagytömegű 3D
        lézerszkennelés és a hivatalos EOV georeferálás kombinációjával biztosítjuk, hogy a
        pontfelhő ne csak vizuális illúzió, hanem jogilag és metrikailag is hiteles mérnöki
        alapanyag legyen.
      </p>
      <p>
        Optimalizált munkafolyamatunk ötvözi a gyors, nagy pontosságú lézerszkennelést a jogosult
        földmérő partnerünk által végzett hivatalos alappont-meghatározással és bekötéssel (31/2024.
        (VIII. 22.) ÉKM rendelet 11. § (2) szerinti megfelelés). A terepi méréstől a pontfelhő
        feldolgozáson át a szabványos BIM modellalkotásig egy kézből szállítjuk az eredményt.
        Természetesen, amennyiben a megrendelő saját földmérővel rendelkezik, készséggel és
        rugalmasan együttműködünk vele is.{" "}
        <BimLink href="/pontossag-es-formatumok" className="font-semibold text-brand">
          Pontosság és formátumok
        </BimLink>
      </p>
    </div>
  );
}
