import { BimBreadcrumb } from "@/components/bim/BimBreadcrumb";
import { BimLink } from "@/components/bim/BimChrome";
import { BIM_INDUSTRIAL_HREF, BIM_MODELER_HREF, BIM_STATE_HUB_HREF, BIM_STATE_HUB_LABEL } from "@/config/menu";
import { BIM_SERVICES } from "@/lib/bim-catalog";
import { bimMetadata } from "@/lib/bim-site";

export const metadata = bimMetadata(
  "/szolgaltatasok",
  "Szolgáltatásaink — felmérés, pontfelhő, EOV | VRGO BIM",
  "Ipari és épületfelmérés, pontfelhő, CAD és a megrendelés szerinti átadás."
);

const groups = [
  {
    title: "Ipari és tervezői felmérés",
    hrefs: [BIM_INDUSTRIAL_HREF, "/tervezoknek", BIM_MODELER_HREF, "/szolgaltatasok/dronos-felmeres"],
  },
  {
    title: "Geodézia és adatátadás",
    hrefs: ["/szolgaltatasok/georeferalas-eov", "/szolgaltatasok/bim-modellezes"],
  },
  {
    title: "Lakossági felmérés",
    hrefs: ["/lakossagi-felmeres"],
  },
] as const;

export default function ServicesPage() {
  const byHref = new Map(BIM_SERVICES.map((s) => [s.href, s]));

  return (
    <article className="bg-background">
      <section className="bg-section-dark py-14 text-section-dark-foreground">
        <div className="mx-auto max-w-4xl px-4">
          <BimBreadcrumb
            tone="dark"
            items={[{ href: "/", label: "Kezdőlap" }, { label: "Szolgáltatások" }]}
          />
          <h1 className="text-3xl font-bold sm:text-4xl">Szolgáltatásaink</h1>
          <p className="mt-3 max-w-2xl text-sm opacity-90 sm:text-base">
            A terepi felmérést robotmérőállomással, GNSS-vevővel és drónos fotogrammetriával
            végezzük. A konkrét feladathoz tartozó lézerszkennelési kapacitást a megrendelés előtt
            egyeztetjük. Modellátadás a megrendelő követelménye szerint.
          </p>
        </div>
      </section>
      <div className="mx-auto max-w-5xl space-y-10 px-4 py-12">
        {groups.map((group) => (
          <section key={group.title}>
            <h2 className="text-xl font-semibold text-foreground">{group.title}</h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              {group.hrefs.map((href) => {
                const item = byHref.get(href);
                if (!item) return null;
                return (
                  <BimLink
                    key={href}
                    href={href}
                    className="rounded-md border border-border bg-card p-5 hover:border-brand"
                  >
                    <h3 className="font-semibold text-foreground">{item.title}</h3>
                    <p className="mt-2 text-sm text-muted-foreground">{item.summary}</p>
                  </BimLink>
                );
              })}
            </div>
          </section>
        ))}
        <p className="text-sm text-muted-foreground">
          Folyamat:{" "}
          <BimLink href="/munkafolyamat" className="font-semibold text-brand">
            hogyan dolgozunk
          </BimLink>
          . Pontosság:{" "}
          <BimLink href="/pontossag-es-formatumok" className="font-semibold text-brand">
            pontosság és formátumok
          </BimLink>
          . Állami beruházás esetén:{" "}
          <BimLink href={BIM_STATE_HUB_HREF} className="font-semibold text-brand">
            {BIM_STATE_HUB_LABEL}
          </BimLink>
          .
        </p>
      </div>
    </article>
  );
}
