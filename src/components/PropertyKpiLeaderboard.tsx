import * as React from "react";

export type Kpi = {
  label: string;
  value: string;
  delta: string;
  direction: "up" | "down";
  context: string;
};

export const defaultKpis: Kpi[] = [
  { label: "Bérbeadási idő", value: "30 nap", delta: "−27%", direction: "down", context: "átlag 41 → 30 nap" },
  { label: "Karbantartási SLA", value: "97%", delta: "+18%", direction: "up", context: "átlag 92% → 97%" },
  { label: "Káresemény-átfutás", value: "10 nap", delta: "−54%", direction: "down", context: "átlag 22 → 10 nap" },
  { label: "ESG audit-trail", value: "100%", delta: "+100%", direction: "up", context: "papír → 3D bizonyíték" },
  { label: "Akadálymentesség", value: "4 ép.", delta: "+4", direction: "up", context: "teljes körű audit" },
  { label: "Bérlőváltási vita", value: "0", delta: "−100%", direction: "down", context: "időbélyegzett leadás" },
];

type Props = {
  kpis?: Kpi[];
  title?: string;
  subtitle?: string;
  caption?: string;
  footnote?: string;
  className?: string;
};

/**
 * Portfólió-szintű KPI leaderboard. Mock-adat (referencia-aggregát).
 * Design-token alapú, reszponzív (634px-en is olvasható).
 */
export function PropertyKpiLeaderboard({
  kpis = defaultKpis,
  title = "Portfólió-KPI leaderboard",
  subtitle = "Élő digitális iker · 12 ingatlan · referencia-aggregát, valós ügyfél-adatokból",
  caption = "Negyedéves portfólió-KPI · vs. iparági benchmark",
  footnote = "Saját portfóliós KPI-szettre szabott leaderboard a TWIN és ENTERPRISE csomagok részeként.",
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
          {kpis.map((k) => (
            <li
              key={k.label}
              className="flex flex-col gap-2 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:gap-6 sm:px-6"
            >
              <div className="min-w-0">
                <div className="text-sm font-semibold text-foreground">{k.label}</div>
                <div className="text-xs text-muted-foreground">{k.context}</div>
              </div>
              <div className="flex items-center gap-3 sm:gap-6">
                <div className="text-lg font-bold tabular-nums text-foreground sm:text-xl">{k.value}</div>
                <div
                  className={
                    "inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold tabular-nums " +
                    (k.direction === "up"
                      ? "bg-brand/10 text-brand"
                      : "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400")
                  }
                >
                  <span aria-hidden>{k.direction === "up" ? "▲" : "▼"}</span>
                  {k.delta}
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {footnote && (
        <p className="mt-4 text-center text-xs text-muted-foreground">{footnote}</p>
      )}
    </div>
  );
}
