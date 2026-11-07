/** Nyilvános kategóriaszűrő a /cikkek oldalon. */
export const BIM_ARTICLE_FILTERS = [
  "Lakossági felmérés",
  "Tervezőknek",
  "Technológia",
  "Ipar",
  "Rendelet és megfelelés",
] as const;

export type BimArticleFilter = (typeof BIM_ARTICLE_FILTERS)[number];

/** Régi frontmatter kategóriák → szűrő. */
const LEGACY_MAP: Record<string, BimArticleFilter> = {
  Mindenki: "Rendelet és megfelelés",
  "Vagyonkezelők, üzemeltetők": "Rendelet és megfelelés",
  Üzemeltetők: "Rendelet és megfelelés",
  "Infra-szektor": "Rendelet és megfelelés",
  "Kivitelezők, lebonyolítók": "Rendelet és megfelelés",
  "Tervezők, kivitelezők": "Rendelet és megfelelés",
  "Tervezők, BIM-esek": "Technológia",
  "Rendelet és megfelelés": "Rendelet és megfelelés",
  "Lakossági felmérés": "Lakossági felmérés",
  Tervezőknek: "Tervezőknek",
  Technológia: "Technológia",
  Ipar: "Ipar",
};

export function normalizeBimArticleCategory(raw: string): BimArticleFilter {
  return LEGACY_MAP[raw] ?? "Rendelet és megfelelés";
}
