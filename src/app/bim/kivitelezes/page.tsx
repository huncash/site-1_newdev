import { BimSolutionLayout } from "@/components/bim/BimSolutionLayout";
import { bimMetadata } from "@/lib/bim-site";

export const metadata = bimMetadata(
  "/kivitelezes",
  "Kivitelezés követése | VRGO BIM",
  "A felépülő állapot és a tervek egyezésének rendszeres ellenőrzése terepi méréssel."
);

export default function ConstructionPage() {
  return (
    <BimSolutionLayout
      title="Kivitelezés követése"
      subtitle="A felépülő állapot és a tervek egyezésének rendszeres ellenőrzése terepi méréssel."
      intro="A kivitelezés közben a tényleges állapot folyamatosan változik. A tervekkel való összhang ellenőrzéséhez ismételt terepi méréseket végzünk, hogy a tervezők, a kivitelezők és az üzemeltetők pontos adatot kapjanak a készülő állapotról."
      imageSrc="/bim/megoldasok/kivitelezes.jpg"
      imageAlt="Lézerszkennelés kivitelezésen: pontfelhő-felvétel vasbeton szerkezet között"
      sections={[
        {
          question: "Miért van szükség a folyamatkövetésre?",
          answer:
            "A kivitelezés alatt könnyen előfordulhat, hogy a tényleges állapot eltér a tervektől. Az eltérések azonosítása később drágává válhat. A folyamatkövető felmérés segít ezek korai felismerésében, mielőtt a hiba beépülne a későbbi szakaszokba.",
        },
        {
          question: "Milyen esetben érdemes külső felmérő partnert bevonni?",
          answer:
            "Ha a saját mérőcsapatkapacitás vagy a jelenlegi műszerek nem alkalmasak az adott típusú ellenőrző mérésekre, külső partnerként mi végezzük el a terepi mérést. A modellezés és a koordináció a megrendelő csapatánál marad.",
        },
        {
          question: "Mit adunk át?",
          answer:
            "A felmérés eredménye pontfelhő vagy EOV-ba illesztett adat lehet, a megrendelés szerint. Az ellenőrző pontokat és az átadási formátumot a projekt előtti egyeztetés során rögzítjük.",
        },
        {
          question: "Mikor érdemes a folyamatkövetést ütemezni?",
          answer:
            "A mérési időpontokat a tervezési fázissal és a tényleges építési menettel összhangban egyeztetjük. Nem minden projektnél van szükség folyamatos jelenlétre; a felmérési gyakoriságot a megrendelő dönti el.",
        },
        {
          question: "Mi történik, ha eltérés mutatkozik?",
          answer:
            "A terepi adatok alapján az eltéréseket a megrendelő tervezőcsapata értékeli. Mi a mérési adatot adjuk át; a modellezést és a beavatkozási döntéseket a megrendelő végzi.",
        },
        {
          question: "Milyen műszerekkel dolgozunk?",
          answer:
            "A mérést lézeres és geodéziai műszerekkel, drónos fotogrammetriával és robotmérőállomással végezzük, a feladat és a helyszín igénye szerint.",
        },
      ]}
      form={{
        heading: "Kivitelezés követési felmérés megrendelése",
        topicId: "kivitelezes",
        forras: "kivitelezes",
        projectTypes: ["Épület", "Ipari létesítmény", "Terepmodell", "Egyéb"],
        dataNeeds: ["Pontfelhő", "EOV-illesztett adat", "Ellenőrző pont", "Egyéb"],
      }}
    />
  );
}
