import { USE_CASES } from "@/lib/bim-site";

export type BimUseCaseItem = {
  code: string;
  note?: string;
};

export function BimUseCaseList({ items }: { items: readonly BimUseCaseItem[] }) {
  const rows = items.map((item) => ({
    code: item.code,
    name: USE_CASES.find(([code]) => code === item.code)?.[1] ?? item.code,
    note: item.note,
  }));

  return (
    <ul className="mt-4 space-y-3">
      {rows.map((row) => (
        <li
          key={row.code}
          className="flex flex-col gap-3 rounded-md border border-border bg-card p-4 sm:flex-row sm:items-start sm:gap-5 sm:p-5"
        >
          <span className="inline-flex w-14 shrink-0 items-center justify-center rounded bg-brand/15 px-2 py-1 text-sm font-semibold tabular-nums tracking-wide text-brand">
            {row.code}
          </span>
          <div className="min-w-0">
            <p className="font-medium leading-snug text-foreground">{row.name}</p>
            {row.note ? <p className="mt-2 text-sm leading-relaxed">{row.note}</p> : null}
          </div>
        </li>
      ))}
    </ul>
  );
}
