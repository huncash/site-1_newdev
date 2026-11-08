/** Publikálható megoldások — menü almenü + /megoldasok kártyarács közös forrása. */

export const BIM_STATE_HUB_HREF = "/megoldasok/allami-beruhazasok-es-bim-eloirasok";
export const BIM_STATE_HUB_LABEL = "Állami BIM";
export const BIM_MODELER_HREF = "/scan-to-bim-kapacitas";
export const BIM_INDUSTRIAL_HREF = "/ipari-felmeres";
export const BIM_SOLUTIONS_HUB_HREF = "/megoldasok";

export type BimSolution = {
  href: string;
  title: string;
  summary: string;
  cta: string;
  /** Rövid menüfelirat; ha nincs, a title megy a menübe. */
  menuLabel?: string;
  /** Opcionális piktogram; hiányában a kártya placeholdert mutat. */
  iconSrc?: string;
};

export const BIM_SOLUTIONS: readonly BimSolution[] = [
  {
    href: BIM_INDUSTRIAL_HREF,
    title: "Ipari felmérés",
    summary:
      "Üzemek, csarnokok és gépészeti terek felmérése átépítéshez, géptelepítéshez és tervezéshez.",
    cta: "Az ipari felmérés részletei",
  },
  {
    href: BIM_MODELER_HREF,
    title: "Terepi felmérés BIM-modellezőknek",
    menuLabel: "BIM-modellezőknek",
    summary:
      "Helyszíni adatgyűjtés a modellezőcsapattal egyeztetett követelmények szerint.",
    cta: "Felmérés modellezőknek",
  },
  {
    href: "/tervezoknek",
    title: "Felmérés tervezőknek",
    menuLabel: "Tervezőknek",
    summary:
      "Meglévő épületek felmérése felújítás, bővítés és rekonstrukció tervezéséhez.",
    cta: "Felmérés tervezőknek",
  },
  {
    href: "/kivitelezes",
    title: "Kivitelezés követése",
    summary: "Helyszíni állapot rögzítése előrehaladás-követéshez és ellenőrzéshez.",
    cta: "A kivitelezés követése részletei",
  },
  {
    href: "/uzemeltetes",
    title: "Üzemeltetési frissítés",
    summary: "Időszakos helyszíni frissítés üzemeltetéshez és változáskövetéshez.",
    cta: "Az üzemeltetési frissítés részletei",
  },
  {
    href: BIM_STATE_HUB_HREF,
    title: BIM_STATE_HUB_LABEL,
    summary:
      "Állami beruházáshoz vagy üzemeltetéshez kapcsolódó felmérés a szabályozási keretek figyelembevételével.",
    cta: "Az állami BIM megoldás részletei",
  },
  {
    href: "/lakossagi-felmeres",
    title: "Lakossági felmérés",
    summary:
      "Lakások és családi házak meglévő állapotának felmérése felújítás vagy átépítés előtt.",
    cta: "A lakossági felmérés részletei",
  },
] as const;
