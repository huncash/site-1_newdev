import { BimSolutionLayout } from "@/components/bim/BimSolutionLayout";
import { bimMetadata } from "@/lib/bim-site";

export const metadata = bimMetadata(
  "/ipari-felmeres",
  "Ipari felmérés | VRGO BIM",
  "Csarnokok és ipari létesítmények felmérése átépítéshez, géptelepítéshez és tervezéshez."
);

export default function IndustrialSurveyPage() {
  return (
    <BimSolutionLayout
      title="Ipari felmérés"
      subtitle="Csarnokok, üzemek és technológiai terek terepi felmérése átépítéshez vagy géptelepítéshez."
      intro="Ipari környezetben a felmérésnek a termeléshez és a biztonsági zónákhoz kell igazodnia. A helyszíni méréssel pontfelhőt és EOV-illesztett adatot adunk a tervezéshez vagy a layout-egyeztetéshez."
      imageSrc="/blog/bim/viztisztito-telep.jpg"
      imageAlt="Ipari létesítmény — illusztráció a felmérési környezethez"
      sections={[
        {
          question: "Mikor érdemes ipari felmérést kérni?",
          answer:
            "Új gép beépítése, csarnokátalakítás, gépészeti átvezetés vagy átadási as-built előtt. A mérés a meglévő állapotot rögzíti, hogy a tervezés ne feltételezésekre épüljön.",
        },
        {
          question: "Üzem közben is lehet mérni?",
          answer:
            "Igen, a biztonsági előírások és a zónák egyeztetése után. A helyszíni napokat a termelési korlátokhoz igazítjuk; nagyobb projektnél több napon át a helyszínen dolgozunk.",
        },
        {
          question: "Milyen adatot kapunk az ellenőrzéshez?",
          answer:
            "Pontfelhőt a megrendelés szerinti formátumban, és ha kell, EOV-ba illesztett adatot. A layout vagy CAD kimenetet csak akkor vállaljuk, ha a megrendelés ezt külön rögzíti.",
        },
        {
          question: "Mennyi ideig tart egy ipari felmérés?",
          answer:
            "A helyszín mérete, a zónák hozzáférhetősége és a kért kimenet határozza meg. A határidőt az ajánlat rögzíti; rövid határidejű kéréseknél a vállalhatóságot a kapacitásunk alapján jelezzük.",
        },
        {
          question: "Mi a különbség az egyszeri és a többszöri ipari felvétel között?",
          answer:
            "Az egyszeri felvétel egy állapotot rögzít. Többszöri felvétel akkor kell, ha a berendezés vagy a szerkezet a projekt alatt változik, és az állapotokat össze kell vetni.",
        },
      ]}
      form={{
        heading: "Ipari felmérés ajánlatkérése",
        topicId: "ipar",
        forras: "ipari-felmeres",
        projectTypes: ["Ipari létesítmény", "Csarnok", "Technológiai tér", "Egyéb"],
        dataNeeds: ["Pontfelhő", "EOV-illesztett adat", "Layout / CAD (ha megrendelve)", "Egyéb"],
      }}
    />
  );
}
