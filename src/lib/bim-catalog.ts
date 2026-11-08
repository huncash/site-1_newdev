import { BIM_INDUSTRIAL_HREF, BIM_MODELER_HREF, BIM_STATE_HUB_HREF, BIM_STATE_HUB_LABEL } from "@/config/menu";

/** Szolgáltatás- és megoldáskatalógus — menü, főoldal, áttekintő oldalak. */

export type CatalogItem = {
  href: string;
  title: string;
  summary: string;
};

/** Ajánlatkérő űrlap — érdeklődés tárgya (érték = e-mailbe kerülő címke). */
export const BIM_QUOTE_SERVICE_OPTIONS = [
  "Lakás- és házfelmérés",
  "Tervezőknek és kivitelezőknek",
  "Ipari létesítmények és csarnokok",
  "Drónos felmérés",
  "Georeferálás és EOV-bekötés",
  "BIM-modellezés és 2D tervek",
  BIM_STATE_HUB_LABEL,
  "Árak és folyamat — általános érdeklődés",
  "Egyéb / nem tudom",
] as const;

export type BimQuoteServiceOption = (typeof BIM_QUOTE_SERVICE_OPTIONS)[number];

export const BIM_RESIDENTIAL_SERVICE_OPTIONS = [
  "Lakás- és házfelmérés",
  "Drónos felmérés",
  "Georeferálás és EOV-bekötés",
  "BIM-modellezés és 2D tervek",
  "Egyéb / nem tudom",
] as const;

export const BIM_SERVICES: readonly CatalogItem[] = [
  {
    href: BIM_INDUSTRIAL_HREF,
    title: "Ipari létesítmények és csarnokok",
    summary: "Layout, géptelepítés és ütközésvizsgálati alapadat nagy terekben.",
  },
  {
    href: "/tervezoknek",
    title: "Tervezőknek és kivitelezőknek",
    summary: "Pontfelhő, CAD és szükség szerint Scan-to-BIM alap a tervezéshez.",
  },
  {
    href: BIM_MODELER_HREF,
    title: "BIM-modellezőknek",
    summary: "Terepi felmérés és modellezési kapacitás a saját munkafolyamatába.",
  },
  {
    href: "/lakossagi-felmeres",
    title: "Lakás- és házfelmérés",
    summary: "Pontos alaprajz és metszet felújításhoz, tervezéshez — egy bejárással.",
  },
  {
    href: "/szolgaltatasok/dronos-felmeres",
    title: "Drónos felmérés",
    summary: "Homlokzat, tető és telek fotogrammetriával, egy koordináta-rendszerben.",
  },
  {
    href: "/szolgaltatasok/georeferalas-eov",
    title: "Georeferálás és EOV-bekötés",
    summary: "Hivatalos bekötés jogosult földmérő közreműködésével.",
  },
  {
    href: "/szolgaltatasok/bim-modellezes",
    title: "BIM-modellezés és 2D tervek",
    summary: "Kiegészítő tétel: Revit, ArchiCAD, IFC — a feladat és az LOD szerint.",
  },
] as const;

export const BIM_SOLUTIONS: readonly CatalogItem[] = [
  {
    href: "/megoldasok#felujitas",
    title: "Felújítás és tervezés előtti felmérés",
    summary: "Hiányzó vagy pontatlan terv helyett mért alaprajz és pontfelhő.",
  },
  {
    href: "/megoldasok#as-built",
    title: "Megvalósulási (as-built) dokumentáció",
    summary: "A kész állapot rögzítése pontfelhővel és rajzzal.",
  },
  {
    href: "/megoldasok#kivitelezes",
    title: "Kivitelezés követése",
    summary: "Előrehaladás és hibakövetés a helyszíni állapothoz képest.",
  },
  {
    href: "/megoldasok#uzemeltetes",
    title: "Üzemeltetési frissítés",
    summary: "Időszakos frissítés és változáskövetés üzemeltetéshez.",
  },
  {
    href: "/megoldasok#ipar",
    title: "Ipari layout és ütközésvizsgálat",
    summary: "Csarnok- és gépészeti téradat layout-tervezéshez.",
  },
  {
    href: BIM_STATE_HUB_HREF,
    title: BIM_STATE_HUB_LABEL,
    summary: "Állami beruházásnál vagy üzemeltetésnél a szabályozásnak megfelelő felmérés.",
  },
] as const;
