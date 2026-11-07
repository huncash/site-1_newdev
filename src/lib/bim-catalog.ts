import { BIM_STATE_HUB_HREF, BIM_STATE_HUB_LABEL } from "@/config/menu";

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
    href: "/szolgaltatasok/lakas-es-hazfelmeres",
    title: "Lakás- és házfelmérés",
    summary: "Pontos alaprajz és metszet felújításhoz, tervezéshez — egy bejárással.",
  },
  {
    href: "/szolgaltatasok/tervezoknek-es-kivitelezoknek",
    title: "Tervezőknek és kivitelezőknek",
    summary: "Georeferált pontfelhő és DWG; modellezés opcionális vagy Önöknél.",
  },
  {
    href: "/szolgaltatasok/ipari-letesitmenyek",
    title: "Ipari létesítmények és csarnokok",
    summary: "Layout, géptelepítés és ütközésvizsgálati alapadat nagy terekben.",
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
    summary: "Hiányzó vagy pontatlan terv helyett mérhető digitális másolat.",
  },
  {
    href: "/megoldasok#as-built",
    title: "Megvalósulási (as-built) dokumentáció",
    summary: "A kész állapot rögzítése pontfelhővel és georeferált rajzzal.",
  },
  {
    href: "/megoldasok#kivitelezes",
    title: "Kivitelezés követése",
    summary: "Előrehaladás, hibakövetés, ellenőrzés a helyszíni állapothoz képest.",
  },
  {
    href: "/megoldasok#uzemeltetes",
    title: "Üzemeltetés és éves digitális iker",
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

export const BIM_AUDIENCES = [
  {
    href: "/szolgaltatasok/lakas-es-hazfelmeres",
    title: "Lakás- és háztulajdonosoknak",
    text: "Felújítás, tetőtér-beépítés vagy átépítés előtt pontos alaprajz — a tervezőnek is használható anyag.",
    cta: "Lakossági felmérés",
  },
  {
    href: "/szolgaltatasok/tervezoknek-es-kivitelezoknek",
    title: "Tervezőknek és kivitelezőknek",
    text: "Georeferált pontfelhő, DWG. Csak a terepi munkát is megrendelheti; a modellezés külön tétel vagy Önöknél.",
    cta: "Tervezőknek",
  },
  {
    href: "/megoldasok#uzemeltetes",
    title: "Beruházóknak és üzemeltetőknek",
    text: "Megvalósulási állapot, éves frissítés, specifikáció szerinti átadás.",
    cta: "Üzemeltetés",
  },
  {
    href: "/szolgaltatasok/ipari-letesitmenyek",
    title: "Ipari létesítményeknek",
    text: "Csarnok- és gépészeti felmérés layout-tervezéshez és ütközésvizsgálathoz.",
    cta: "Ipari felmérés",
  },
] as const;
