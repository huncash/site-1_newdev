import { BimLink } from "@/components/bim/BimChrome";

type BimDeliverableBlockProps = {
  deliverables: string;
  timeline: string;
  fromYou: string;
  ctaHref?: string;
  ctaLabel?: string;
};

/** Területi oldalak végére: Mit kapsz / mennyi idő / mi kell tőlünk. */
export function BimDeliverableBlock({
  deliverables,
  timeline,
  fromYou,
  ctaHref = "/kapcsolat",
  ctaLabel = "Küldje el a feladat leírását vagy az EIR-t, módszertant és árajánlatot adunk.",
}: BimDeliverableBlockProps) {
  return (
    <section className="rounded-md border border-border bg-card p-5">
      <h2 className="text-xl font-semibold text-foreground">Mit kap / mennyi idő / mi kell tőlünk</h2>
      <dl className="mt-4 space-y-3 text-sm text-muted-foreground sm:text-base">
        <div>
          <dt className="font-semibold text-foreground">Mit kap</dt>
          <dd className="mt-1">{deliverables}</dd>
        </div>
        <div>
          <dt className="font-semibold text-foreground">Mennyi idő</dt>
          <dd className="mt-1">{timeline}</dd>
        </div>
        <div>
          <dt className="font-semibold text-foreground">Mi kell tőlünk</dt>
          <dd className="mt-1">{fromYou}</dd>
        </div>
      </dl>
      <BimLink
        href={ctaHref}
        className="mt-5 inline-flex rounded-md bg-brand px-5 py-2.5 text-sm font-semibold text-brand-foreground"
      >
        {ctaLabel}
      </BimLink>
    </section>
  );
}
