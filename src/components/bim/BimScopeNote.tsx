import { BimLink } from "@/components/bim/BimChrome";

export function BimScopeNote() {
  return (
    <p>
      A 3D rögzítés gyors és áttekinthető, de nem helyettesíti a hivatalos geodéziai ellenőrző
      mérést (31/2024. (VIII. 22.) ÉKM rendelet 11. § (2)). Hivatalban eljárásra jogosult
      földmérővel együtt dolgozva, az esethez leginkább optimális eszközparkkal alakítjuk ki a
      workflow-t. Ha a megrendelőnek nincs saját földmérője, partneri alapon tudunk földmérőt
      ajánlani, és a mérést vele együtt végezzük.{" "}
      <BimLink href="/pontossag-es-formatumok" className="font-semibold text-brand">
        Pontosság és formátumok
      </BimLink>
    </p>
  );
}
