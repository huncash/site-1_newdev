import { BimLink } from "@/components/bim/BimChrome";
import { BIM_SOLUTIONS, type BimSolution } from "@/lib/bim-solutions";

function SolutionIcon({ solution }: { solution: BimSolution }) {
  if (solution.iconSrc) {
    return (
      <img
        src={solution.iconSrc}
        alt=""
        width={64}
        height={64}
        className="h-16 w-16 object-contain"
        decoding="async"
        loading="lazy"
      />
    );
  }
  return (
    <span
      aria-hidden="true"
      className="block h-16 w-16 rounded-md border border-border bg-secondary/60"
    />
  );
}

export function BimSolutionCards() {
  return (
    <ul className="mt-8 grid list-none grid-cols-1 gap-4 p-0 sm:grid-cols-2 lg:grid-cols-3">
      {BIM_SOLUTIONS.map((item) => (
        <li key={item.href} className="h-full">
          <article className="flex h-full flex-col rounded-md border border-border bg-card p-5 transition hover:border-brand/40">
            <SolutionIcon solution={item} />
            <h2 className="mt-4 text-base font-semibold leading-snug text-foreground">
              {item.title}
            </h2>
            <p className="mt-2 flex-1 text-sm text-muted-foreground">{item.summary}</p>
            <BimLink
              href={item.href}
              className="mt-4 text-sm font-semibold text-brand hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
            >
              {item.cta} →
            </BimLink>
          </article>
        </li>
      ))}
    </ul>
  );
}
