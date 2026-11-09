import { BimSolutionLayout } from "@/components/bim/BimSolutionLayout";
import { bimMetadata } from "@/lib/bim-site";

export const metadata = bimMetadata(
  "/lakossagi-felmeres",
  "Lakossági felmérés | VRGO BIM",
  "Lakások és családi házak meglévő állapotának felmérése felújítás vagy átépítés előtt."
);

export default function ResidentialSurveyPage() {
  return (
    <BimSolutionLayout
      title="Lakossági felmérés"
      subtitle="Lakóépületek és kisebb építmények terepi felmérése, ha a meglévő állapotról megbízható adat kell."
      intro="Felújítás, bővítés vagy átadás előtt a helyszíni méréssel rögzítjük a meglévő állapotot. A kimenetet a megrendelés szerint adjuk át; a tervezés és a modellezés a megbízott tervezőnél marad."
      imageSrc="/blog/bim/epiteszeti-bim-modell.jpg"
      imageAlt="Építészeti modell illusztráció — lakossági felméréshez kapcsolódó vizuál"
      sections={[
        {
          question: "Mikor érdemes lakossági felmérést kérni?",
          answer:
            "Felújítás, bővítés, tetőtér-beépítés vagy átadás előtt, ha nincs megbízható meglévő terv. A mérés a tényleges állapotot rögzíti a tervezéshez.",
        },
        {
          question: "Milyen adatot kapunk?",
          answer:
            "Pontfelhőt, és ha a feladat kéri, EOV-ba illesztett adatot. Alaprajz csak akkor kerül az ajánlatba, ha a megrendelés ezt külön rögzíti.",
        },
        {
          question: "Mennyi ideig tart a felmérés?",
          answer:
            "A terület és a kért kimenet határozza meg. A helyszíni napok számát és a határidőt az ajánlat rögzíti.",
        },
        {
          question: "Kell-e geodéziai bekötés?",
          answer:
            "Csak ha a tervezési cél vagy a hatóság georeferálást kér. Ilyenkor EOV-bekötéssel dolgozunk, jogosult földmérő közreműködésével.",
        },
        {
          question: "Ki készíti a terveket a felmérés után?",
          answer:
            "A tervezés és a modell a megbízott tervező feladata. Mi a terepi adatot adjuk át; házon belüli CAD/BIM-modellezést nem vállalunk.",
        },
      ]}
      form={{
        heading: "Lakossági felmérés — ajánlatkérés",
        topicId: "lakossagi",
        forras: "lakossagi-felmeres",
        companyRequired: false,
        projectTypes: ["Lakóépület", "Családi ház", "Kisebb építmény", "Egyéb"],
        dataNeeds: ["Pontfelhő", "EOV-illesztett adat", "Alaprajz (ha megrendelve)", "Egyéb"],
      }}
    />
  );
}
