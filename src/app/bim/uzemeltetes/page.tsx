import { BimSolutionLayout } from "@/components/bim/BimSolutionLayout";
import { bimMetadata } from "@/lib/bim-site";

export const metadata = bimMetadata(
  "/uzemeltetes",
  "Üzemeltetési frissítés | VRGO BIM",
  "Időszakos helyszíni frissítés üzemeltetéshez és változáskövetéshez."
);

export default function OperationsPage() {
  return (
    <BimSolutionLayout
      title="Üzemeltetési frissítés"
      subtitle="Időszakos terepi felvétel, hogy az üzemeltetés a tényleges állapotra épülhessen."
      intro="Az üzemeltetett épület vagy telephely állapota változik. Időszakos felméréssel frissített pontfelhőt adunk, hogy az összehasonlítás és a változáskövetés mért adatból induljon."
      imageSrc="/blog/bim/as-built-gepeszet.webp"
      imageAlt="As-built gépészet — illusztráció üzemeltetési állapotfrissítéshez"
      sections={[
        {
          question: "Mikor érdemes állapotfrissítést kérni?",
          answer:
            "Éves ciklusban, nagyobb átalakítás után, vagy ha a korábbi felvétel már nem tükrözi a tényleges állapotot. A gyakoriságot az üzemeltető dönti el.",
        },
        {
          question: "Mi a különbség az egyszeri és az ismételt felvétel között?",
          answer:
            "Az egyszeri felvétel egy állapotot rögzít. Az ismételt felvétel lehetővé teszi az előző és az új pontfelhő összevetését; a változásértékelés a megrendelő csapatánál marad.",
        },
        {
          question: "Mit adunk át az üzemeltetésnek?",
          answer:
            "Frissített pontfelhőt, és ha kell, EOV-ba illesztett adatot. Modellfrissítést nem vállalunk házon belüli szolgáltatásként; ha kell, a projektben egyeztetjük.",
        },
        {
          question: "Mennyi ideig tart egy frissítő felmérés?",
          answer:
            "A terület és a hozzáférés határozza meg. A helyszíni napokat az üzem működéséhez igazítjuk; a határidőt az ajánlat rögzíti.",
        },
        {
          question: "Hogyan biztosítható az összehasonlíthatóság?",
          answer:
            "Az ismételt felvételeknél ugyanazt a koordináta-keretet és átadási formátumot követjük, amit a projekt elején rögzítettünk.",
        },
      ]}
      form={{
        heading: "Üzemeltetési frissítés — ajánlatkérés",
        topicId: "uzemeltetes",
        forras: "uzemeltetes",
        projectTypes: ["Épület", "Ipari telephely", "Portfólió / több épület", "Egyéb"],
        dataNeeds: ["Pontfelhő", "EOV-illesztett adat", "Összehasonlítható ismételt felvétel", "Egyéb"],
      }}
    />
  );
}