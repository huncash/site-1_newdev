import { BimSolutionLayout } from "@/components/bim/BimSolutionLayout";
import { bimMetadata } from "@/lib/bim-site";

export const metadata = bimMetadata(
  "/tervezoknek",
  "Tervezőknek | VRGO BIM",
  "Meglévő épületek felmérése a tervezőcsapattal egyeztetett követelmények szerint, EOV-rendszerbe illesztett adattal."
);

export default function DesignersPage() {
  return (
    <BimSolutionLayout
      title="Tervezőknek"
      subtitle="Meglévő épületek terepi felmérése felújítás, bővítés és rekonstrukció tervezéséhez."
      intro="Ha a meglévő állapotról nincs megbízható terv, a tervezés előtt terepi méréssel rögzítjük az épületet. A kimenetet a tervezőcsapat követelményei szerint adjuk át."
      imageSrc="/blog/bim/kozepulet-homlokzat.jpg"
      imageAlt="Épülethomlokzat — illusztráció meglévő épület felméréséhez"
      sections={[
        {
          question: "Milyen adatot kapunk a tervezéshez?",
          answer:
            "Pontfelhőt (például E57) és, ha a feladat kéri, EOV-ba illesztett adatot. Alaprajz vagy metszet csak akkor kerül az ajánlatba, ha a megrendelés ezt külön rögzíti.",
        },
        {
          question: "Mikor van szükség EOV-illesztésre?",
          answer:
            "Ha az EIR vagy a tervezési cél georeferálást kér. Ilyenkor a lézeres felmérést geodéziai ellenőrzéssel és EOV-bekötéssel egészítjük ki, jogosult földmérő közreműködésével.",
        },
        {
          question: "Mi a különbség a csak pontfelhő és a teljes dokumentáció között?",
          answer:
            "A pontfelhő a mért állapot. A további feldolgozás (például alaprajz) külön tétel; a modellezés a tervezőcsapatnál marad, hacsak a projektben másképp nem egyeztetjük.",
        },
        {
          question: "Mennyi ideig tart egy épületfelmérés?",
          answer:
            "A terület, a belső–külső hatókör és a kért kimenet határozza meg. A helyszíni napok számát és a határidőt az ajánlat rögzíti.",
        },
        {
          question: "Hogyan illeszkedik a saját tervezői folyamatunkhoz?",
          answer:
            "A felmérés előtt írásban rögzítjük a terjedelmet, a koordináta-rendszert és az átadási formátumot. A munka alatt felmerülő kérdéseket írásban jelezzük.",
        },
      ]}
      form={{
        heading: "Felmérés tervezőknek — ajánlatkérés",
        topicId: "tervezo",
        forras: "tervezoknek",
        projectTypes: ["Épület", "Rekonstrukció", "Bővítés", "Egyéb"],
        dataNeeds: ["Pontfelhő", "EOV-illesztett adat", "Alaprajz / metszet (ha megrendelve)", "Egyéb"],
      }}
    />
  );
}
