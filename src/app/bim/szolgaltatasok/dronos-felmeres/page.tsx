import { BimServiceLayout, ServiceSection } from "@/components/bim/BimServiceLayout";
import { bimMetadata } from "@/lib/bim-site";

export const metadata = bimMetadata(
  "/szolgaltatasok/dronos-felmeres",
  "Drónos felmérés — homlokzat, tető, telek | VRGO BIM",
  "Drónos fotogrammetria tetők, homlokzatok és telkek felméréséhez, georeferált átadással."
);

export default function DroneServicePage() {
  return (
    <BimServiceLayout
      crumbs={[
        { href: "/", label: "Kezdőlap" },
        { href: "/szolgaltatasok", label: "Szolgáltatások" },
        { label: "Drónos felmérés" },
      ]}
      title="Drónos felmérés — homlokzat, tető, telek"
      lead="Fotogrammetriás rögzítés a nehezen elérhető külső felületekről és területekről, a lézerszkenneléssel közös koordináta-rendszerben."
      ctaHref="/kapcsolat?forras=dronos-felmeres"
    >
      <ServiceSection title="Kinek">
        <p>Magánszemélyek, tervezők, kivitelezők, fejlesztők — tető, homlokzat vagy telek esetén.</p>
      </ServiceSection>
      <ServiceSection title="Mikor érdemes">
        <ul className="list-disc space-y-1 pl-5">
          <li>Tetőfelület, eresz, kémények dokumentálása</li>
          <li>Homlokzat, ahol az állványos szkenner nem elegendő</li>
          <li>Telek, kert, külső terület áttekintése</li>
        </ul>
      </ServiceSection>
      <ServiceSection title="Mit kap">
        <ul className="list-disc space-y-1 pl-5">
          <li>Ortofotó / felületmodell a megrendelés szerint</li>
          <li>Pontfelhő vagy mesh, ha a csomag tartalmazza</li>
          <li>EOV-bekötés külön vagy a lézerszkenneléssel együtt</li>
        </ul>
      </ServiceSection>
      <ServiceSection title="Hogyan zajlik">
        <p>
          Helyszíni bejárás és repülési terv, adatgyűjtés, feldolgozás, átadás. A konkrét
          terméklistát az ajánlat rögzíti.
        </p>
      </ServiceSection>
      <ServiceSection title="Mennyi időt vesz igénybe">
        <p>
          A helyszíni időjárás és a terület mérete befolyásolja; a határidőt az ajánlat tartalmazza.
        </p>
      </ServiceSection>
      <ServiceSection title="Gyakori kérdések">
        <dl className="space-y-3">
          <div>
            <dt className="font-semibold text-foreground">Helyettesíti a lézerszkennert?</dt>
            <dd>
              Nem — kiegészíti. Beltérben és nagy pontosságú épületfelmérésnél a lézerszkenner a
              fő eszköz.
            </dd>
          </div>
          <div>
            <dt className="font-semibold text-foreground">Kell-e engedély a repüléshez?</dt>
            <dd>A helyszín és a szabályok szerint; az egyeztetés része az ajánlatkészítésnek.</dd>
          </div>
        </dl>
      </ServiceSection>
    </BimServiceLayout>
  );
}
