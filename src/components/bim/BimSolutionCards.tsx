import { BimLink } from "@/components/bim/BimChrome";
import { BIM_SOLUTIONS, type BimSolution } from "@/lib/bim-solutions";

function SolutionVisual({ solution }: { solution: BimSolution }) {
  if (solution.imageSrc) {
    return (
      <img
        src={solution.imageSrc}
        alt={solution.imageAlt ?? ""}
        width={640}
        height={360}
        className="aspect-video w-full object-cover"
        decoding="async"
        loading="lazy"
      />
    );
  }
  if (solution.iconSrc) {
    return (
      <div className="px-5 pt-5">
        <img
          src={solution.iconSrc}
          alt=""
          width={64}
          height={64}
          className="h-16 w-16 object-contain"
          decoding="async"
          loading="lazy"
        />
      </div>
    );
  }
  return (
    <div className="px-5 pt-5">
      <span
        aria-hidden="true"
        className="block h-16 w-16 rounded-md border border-border bg-secondary/60"
      />
    </div>
  );
}

export function BimSolutionCards() {
  return (
    <ul className="mt-8 grid list-none grid-cols-1 gap-4 p-0 sm:grid-cols-2 lg:grid-cols-3">
      {BIM_SOLUTIONS.map((item) => (
        <li key={item.href} className="h-full">
          <article className="flex h-full flex-col overflow-hidden rounded-md border border-border bg-card transition hover:border-brand/40">
            <SolutionVisual solution={item} />
            <div className="flex flex-1 flex-col p-5">
              <h2 className="text-base font-semibold leading-snug text-foreground">{item.title}</h2>
              <p className="mt-2 flex-1 text-sm text-muted-foreground">{item.summary}</p>
              <BimLink
                href={item.href}
                className="mt-4 text-sm font-semibold text-brand hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
              >
                {item.cta} →
              </BimLink>
            </div>
          </article>
        </li>
      ))}
    </ul>
  );
}
