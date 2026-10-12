import * as React from "react";

export type KpiIndicator = {
  label: string;
  detail: string;
};

/** @deprecated A régi név. Számokat nem tartalmaz: mért ügyféleredmény nincs közzétéve. */
export type Kpi = KpiIndicator;

export const defaultIndicators: KpiIndicator[] = [
  {
    label: "Bérbeadási idő",
    detail: "A túra megosztásától a szerződésig. Csak a megrendelő saját nyilvántartásából tölthető.",
  },
  {
    label: "Karbantartási előzmény",
    detail: "Hibajegy és planned maintenance a térponthoz köthető, ha a megrendelés tartalmazza.",
  },
  {
    label: "Káresemény előtti állapot",
    detail: "Időbélyegzett szken. A kárrendezés időtartamát nem összesítjük.",
  },
  {
    label: "Vizuális melléklet",
    detail: "A 3D modell melléklet lehet egy jelentéshez. Önmagában nem ESG-jelentés és nem EU-taxonómia-igazolás.",
  },
  {
    label: "Méret a modellből",
    detail: "Küszöb, lejtő, távolság mérhető. Jogszabályi akadálymentesítési auditot nem helyettesít.",
  },
  {
    label: "Bérlőváltás állapota",
    detail: "A leadás időbélyeggel rögzíthető. A viták számát nem mérjük.",
  },
];

/** @deprecated */
export const defaultKpis = defaultIndicators;

type Props = {
  kpis?: KpiIndicator[];
  indicators?: KpiIndicator[];
  title?: string;
  subtitle?: string;
  caption?: string;
  footnote?: string;
  className?: string;
};

/**
 * Portfólió-nézet: milyen mutatók férnek egy listába.
 * Szándékosan nincs érték és nincs delta — közzétett mérés nincs hozzá.
 */
export function PropertyKpiLeaderboard({
  kpis,
  indicators = kpis ?? defaultIndicators,
  title = "Milyen mutatók férnek egy nézetbe",
  subtitle = "A számokat a megrendelő saját adataiból lehet beírni. Közzétett, mért ügyféleredmény nincs.",
  caption = "Mutatólista · nem mérési eredmény",
  footnote = "A TWIN és ENTERPRISE csomagban a lista a megrendelő nyilvántartására szabható.",
  className,
}: Props) {
  return (
    <div className={className}>
      <div className="text-center">
        <h2 className="text-2xl font-semibold sm:text-3xl">{title}</h2>
        <p className="mt-2 text-sm text-muted-foreground">{subtitle}</p>
      </div>

      <div className="mt-8 overflow-hidden rounded-lg border border-border bg-card shadow-sm">
        <div className="border-b border-border bg-secondary/40 px-4 py-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground sm:px-6">
          {caption}
        </div>
        <ul className="divide-y divide-border">
          {indicators.map((item) => (
            <li key={item.label} className="px-4 py-4 sm:px-6">
              <div className="text-sm font-semibold text-foreground">{item.label}</div>
              <p className="mt-1 text-sm text-muted-foreground">{item.detail}</p>
            </li>
          ))}
        </ul>
      </div>

      {footnote ? <p className="mt-4 text-center text-xs text-muted-foreground">{footnote}</p> : null}
    </div>
  );
}
