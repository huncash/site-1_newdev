import { BimLink } from "@/components/bim/BimChrome";

export function BimScopeNote() {
  return (
    <div className="space-y-3">
      <p>
        A költséghatékony, nagy tömegű 3D lézerszkennelés (volumen- és téradatgyűjtés) és a
        hivatalos geodéziai hitelesítés kombinációjával biztosítjuk a tökéletes mérnöki pontosságot.
        A 3D szkenner gyűjti össze a részletes térbeli adatokat a modellalkotáshoz, míg a dedikált,
        eljárásra jogosult földmérő partnerünk biztosítja a szabványos georeferálást és a hivatalos
        ellenőrző méréseket.
      </p>
      <p>
        A projektjeinket ezen az optimalizált, bejáratott mérnöki workflow-kon keresztül szállítjuk.
        Természetesen, amennyiben a megrendelő saját földmérővel rendelkezik, készséggel és
        rugalmasan együttműködünk vele is.{" "}
        <BimLink href="/pontossag-es-formatumok" className="font-semibold text-brand">
          Pontosság és formátumok
        </BimLink>
      </p>
    </div>
  );
}
