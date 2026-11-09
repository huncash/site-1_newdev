import { BimLink } from "@/components/bim/BimChrome";
import { BimSolutionLayout } from "@/components/bim/BimSolutionLayout";
import { BIM_STATE_HUB_HREF, BIM_STATE_HUB_LABEL } from "@/config/menu";
import { bimMetadata } from "@/lib/bim-site";

export const metadata = bimMetadata(
  BIM_STATE_HUB_HREF,
  `${BIM_STATE_HUB_LABEL} | VRGO BIM`,
  "Az állami BIM-rendszerekhez illeszkedő felmérési adat, a projekt előre egyeztetett modellkövetelményeivel összhangban."
);

export default function StateProjectsHubPage() {
  return (
    <BimSolutionLayout
      title="Állami BIM"
      subtitle="Közbeszerzési és állami projektek terepi felmérése, ha a feladat EOV-illesztett adatot kér."
      intro="Állami és közbeszerzési projekteknél a felmérésnek az EIR és a geodéziai elvárásokhoz kell igazodnia. A terepi méréssel pontfelhőt és, ha kell, EOV-ba illesztett adatot adunk; a modellezés a projektben kijelölt felelősnél marad."
      imageSrc="/blog/bim/kampusz-illusztracio.jpg"
      imageAlt="Középület környezete — illusztráció állami BIM felmérési környezethez"
      sections={[
        {
          question: "Mikor kérhető állami BIM felmérés?",
          answer:
            "Ha a közbeszerzés vagy az EIR meglévő állapotfelvételt, pontfelhőt vagy georeferálást ír elő. A hatókört és az átadási formátumot a projekt dokumentumaihoz igazítjuk.",
        },
        {
          question: "Kell-e EOV-illesztés?",
          answer:
            "Ha az EIR georeferálást kér, a lézeres felmérést geodéziai ellenőrzéssel és EOV-bekötéssel egészítjük ki, jogosult földmérő közreműködésével. Földhivatali ügyintézést nem végzünk.",
        },
        {
          question: "Mit adunk át a projektnek?",
          answer:
            "Pontfelhőt és, ha a megrendelés kéri, EOV-illesztett adatot. BIM-modell készítését házon belül nem vállaljuk; a modellfelelős a projekt kijelölt szereplője.",
        },
        {
          question: "Mennyi ideig tart az ellenőrző felmérés?",
          answer:
            "A terület, a hozzáférés és a kért kimenet határozza meg. A helyszíni napokat és a határidőt az ajánlat rögzíti.",
        },
        {
          question: "Hogyan kezeljük a dokumentációs elvárásokat?",
          answer:
            "A felmérés előtt írásban rögzítjük a terjedelmet, a koordináta-rendszert és az átadási formátumot. A munka alatt felmerülő eltéréseket írásban jelezzük.",
        },
      ]}
      form={{
        heading: "Állami BIM felmérés — ajánlatkérés",
        topicId: "allami",
        forras: "allami-bim",
        projectTypes: ["Középület", "Infrastruktúra", "Egyéb állami projekt", "Egyéb"],
        dataNeeds: ["Pontfelhő", "EOV-illesztett adat", "Ellenőrző pont", "Egyéb"],
      }}
    >
      <section>
        <h2 className="text-xl font-semibold text-foreground">Kapcsolódó oldalak</h2>
        <ul className="mt-3 list-disc space-y-2 pl-5">
          <li>
            <BimLink href="/meglevo-allami-epuletek" className="font-semibold text-brand">
              Meglévő állami épületek felmérése
            </BimLink>
          </li>
          <li>
            <BimLink href="/szolgaltatasok/georeferalas-eov" className="font-semibold text-brand">
              Georeferálás és EOV-bekötés
            </BimLink>
          </li>
          <li>
            <BimLink href="/ekm-rendelet" className="font-semibold text-brand">
              ÉKM rendelet összefoglaló
            </BimLink>
          </li>
        </ul>
      </section>
    </BimSolutionLayout>
  );
}
