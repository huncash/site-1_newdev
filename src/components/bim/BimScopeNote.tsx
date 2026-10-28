import { BimLink } from "@/components/bim/BimChrome";

export function BimScopeNote() {
  return (
    <p>
      A 3D rögzítés gyors és áttekinthető, de nem helyettesíti a hivatalos geodéziai ellenőrző
      mérést (31/2024. (VIII. 22.) ÉKM rendelet 11. § (2)). A projektek során dedikált, hivatalban
      eljárásra jogosult földmérő partnerrel dolgozunk együtt, összehangolt, stabil workflow-val és
      folyamatosan bővülő közös referenciákkal. Ha a megrendelőnek saját földmérője van, készségesen
      és rugalmasan együttműködünk vele is.{" "}
      <BimLink href="/pontossag-es-formatumok" className="font-semibold text-brand">
        Pontosság és formátumok
      </BimLink>
    </p>
  );
}
