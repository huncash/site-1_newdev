import { BimLink } from "@/components/bim/BimChrome";

export function BimScopeNote() {
  return (
    <p>
      Egy csapat, egy ajánlat: a helyszíni rögzítést mi végezzük, a 31/2024. (VIII. 22.) ÉKM
      rendelet 11. § (2) szerinti geodéziai ellenőrző mérést és a bekötést földmérő partnerünk, az
      IFC-modellt modellezési partnerünk.{" "}
      <BimLink href="/pontossag-es-formatumok" className="font-semibold text-brand">
        Mit vállalunk
      </BimLink>
    </p>
  );
}
