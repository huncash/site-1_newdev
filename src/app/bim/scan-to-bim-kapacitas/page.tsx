import { BimSolutionLayout } from "@/components/bim/BimSolutionLayout";
import { bimMetadata } from "@/lib/bim-site";

export const metadata = bimMetadata(
  "/scan-to-bim-kapacitas",
  "BIM-modellezőknek | VRGO BIM",
  "Helyszíni adatgyűjtés a modellezőcsapattal egyeztetett követelmények szerint."
);

export default function ScanToBimCapacityPage() {
  return (
    <BimSolutionLayout
      title="BIM-modellezőknek"
      subtitle="A helyszíni felmérést mi végezzük; az ügyfélkapcsolat és a modellezés a megrendelőnél marad."
      intro="Ha a saját mérőkapacitás vagy műszerek nem fedik le a feladatot, külső felmérőként mi végezzük a terepi mérést. A pontfelhőt és az EOV-illesztett adatot a megrendelő dolgozza fel a saját modellfolyamatában."
      imageSrc="/blog/bim/scan-to-bim-gepeszet.jpg"
      imageAlt="Gépészeti tér pontfelhő-felvétele — illusztráció modellezői átadáshoz"
      sections={[
        {
          question: "Mikor érdemes külső felmérőt bevonni?",
          answer:
            "Ha a határidő, a műszertípus vagy a helyszín meghaladja a saját mérőkapacitást. Ilyenkor a terepi mérést mi végezzük; a modellezés és a koordináció a megrendelő csapatánál marad.",
        },
        {
          question: "Milyen adatot kapunk a modellmunkához?",
          answer:
            "Pontfelhőt (például E57) a megrendelés szerinti formátumban, és ha kell, EOV-ba illesztett adatot. Scan-to-BIM vagy IFC modellkészítést házon belül nem vállalunk.",
        },
        {
          question: "Hogyan egyeztetjük az átadási követelményeket?",
          answer:
            "A projekt előtt írásban rögzítjük a terjedelmet, a koordináta-rendszert, az átadási formátumot és az ellenőrzés módját. A munka alatt felmerülő kérdéseket írásban jelezzük.",
        },
        {
          question: "Mennyi ideig tart a terepi felvétel?",
          answer:
            "A terület, a hozzáférés és a kért kimenet határozza meg. A helyszíni napok számát és a határidőt az ajánlat rögzíti.",
        },
        {
          question: "Országosan vállalnak helyszíni munkát?",
          answer:
            "Igen. Budapesten belül a kiszállási díjat nem számítjuk fel. Távolabbi feladatoknál a munkát tömbösítve ütemezzük, hogy az utazás ne csökkentse a mérési időt.",
        },
        {
          question: "Mi a különbség a felmérési és a modellmunka között?",
          answer:
            "A felmérés a terepi adatot állítja elő. A modell, a LOD és a szakági koordináció a megrendelő feladata — nálunk nincs házon belüli CAD/BIM-modellezési kapacitás.",
        },
      ]}
      form={{
        heading: "Terepi felmérés modellezőknek — megkeresés",
        topicId: "modellezo",
        forras: "scan-to-bim-kapacitas",
        projectTypes: ["Épület", "Ipari létesítmény", "Infrastruktúra", "Egyéb"],
        dataNeeds: ["Pontfelhő", "EOV-illesztett adat", "Ellenőrző pont", "Egyéb"],
      }}
    />
  );
}
