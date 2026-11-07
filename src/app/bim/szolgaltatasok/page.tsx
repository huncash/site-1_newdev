import { BimBreadcrumb } from "@/components/bim/BimBreadcrumb";
import { BimLink } from "@/components/bim/BimChrome";
import { BIM_STATE_HUB_HREF, BIM_STATE_HUB_LABEL } from "@/config/menu";
import { BIM_SERVICES } from "@/lib/bim-catalog";
import { bimMetadata } from "@/lib/bim-site";

export const metadata = bimMetadata(
  "/szolgaltatasok",
  "Szolgáltatásaink — lézerszkennelés, georeferálás, BIM | VRGO BIM",
  "Lakásfelméréstől az ipari projektekig: pontfelhő, DWG, drón, EOV-bekötés. BIM-modell külön tételként."
);

const groups = [
  {
    title: "Épület- és telekfelmérés",
    hrefs: [
      "/szolgaltatasok/lakas-es-hazfelmeres",
      "/szolgaltatasok/tervezoknek-es-kivitelezoknek",
      "/szolgaltatasok/ipari-letesitmenyek",
      "/szolgaltatasok/dronos-felmeres",
    ],
  },
  {
    title: "Geodézia és modellezés",
    hrefs: ["/szolgaltatasok/georeferalas-eov", "/szolgaltatasok/bim-modellezes"],
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
            Lézerszkennelés, mobil szkennelés, drónos fotogrammetria és GNSS-mérés egy
            koordináta-rendszerben, a feladathoz választott módszerrel. Eszközeink: Trimble X9,
            Leica BLK2GO, DJI drón, Trimble GNSS. A BIM-modell külön tétel.
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
          Díjszerkezet:{" "}
          <BimLink href="/arak-es-folyamat" className="font-semibold text-brand">
            Árak és folyamat
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
