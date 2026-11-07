import { BimLink } from "@/components/bim/BimChrome";
import { BIM_ORIGIN } from "@/lib/bim-site";

export type Crumb = { href?: string; label: string };

export function BimBreadcrumb({
  items,
  tone = "light",
}: {
  items: readonly Crumb[];
  /** dark = sötét hero háttéren */
  tone?: "light" | "dark";
}) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.label,
      ...(item.href
        ? { item: item.href.startsWith("http") ? item.href : `${BIM_ORIGIN}${item.href}` }
        : {}),
    })),
  };

  const linkClass =
    tone === "dark"
      ? "font-medium text-white underline-offset-2 hover:underline"
      : "font-medium text-brand hover:underline";
  const currentClass = tone === "dark" ? "text-white/90" : "text-foreground";

  return (
    <nav
      aria-label="Morzsaútvonal"
      className={
        tone === "dark"
          ? "mb-6 text-xs text-white/70 sm:text-sm"
          : "mb-6 text-xs text-muted-foreground sm:text-sm"
      }
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <ol className="flex flex-wrap items-center gap-1.5">
        {items.map((item, index) => {
          const last = index === items.length - 1;
          return (
            <li key={`${item.label}-${index}`} className="inline-flex items-center gap-1.5">
              {index > 0 ? <span aria-hidden="true">›</span> : null}
              {item.href && !last ? (
                <BimLink href={item.href} className={linkClass}>
                  {item.label}
                </BimLink>
              ) : (
                <span className={last ? currentClass : undefined} aria-current={last ? "page" : undefined}>
                  {item.label}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
