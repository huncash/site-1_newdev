import { BimBreadcrumb } from "@/components/bim/BimBreadcrumb";
import { BimDeliverableBlock } from "@/components/bim/BimDeliverableBlock";
import { BimLink } from "@/components/bim/BimChrome";
import { bimMetadata } from "@/lib/bim-site";

export const metadata = bimMetadata(
  "/ipari-letesitmenyek",
  "Ipari létesítmények 3D felmérése | VRGO BIM",
  "Csarnokok és ipari létesítmények felmérése átépítéshez, géptelepítéshez és tervezéshez."
);

export default function IndustrialPage() {
  return (
    <article className="bg-background">
      <section className="bg-section-dark py-14 text-section-dark-foreground">
        <div className="mx-auto max-w-4xl px-4">
          <BimBreadcrumb
            tone="dark"
            items={[
              { href: "/", label: "Kezdőlap" },
              { href: "/szolgaltatasok", label: "Szolgáltatások" },
              { label: "Ipari létesítmények" },
            ]}
          />
          <h1 className="text-3xl font-bold sm:text-4xl">Ipari létesítmények felmérése</h1>
          <p className="mt-3 text-sm opacity-90">
            Szolgáltatáslap:{" "}
            <BimLink href="/szolgaltatasok/ipari-letesitmenyek" className="underline">
              Ipari létesítmények és csarnokok
            </BimLink>
            .
          </p>
        </div>
      </section>
      <div className="mx-auto max-w-4xl space-y-8 px-4 py-12 text-sm text-muted-foreground sm:text-base">
        <p>
          Csarnokok és ipari létesítmények felmérése átépítéshez, géptelepítéshez és tervezéshez. A
          terepi felmérést robotmérőállomással, GNSS-vevővel és drónos fotogrammetriával végezzük. A
          konkrét feladathoz tartozó lézerszkennelési kapacitást a megrendelés előtt egyeztetjük.
        </p>
        <BimDeliverableBlock
          deliverables="Pontfelhő, 2D layout; EOV-illesztett modell vagy 3D-vetület a megrendelés szerint."
          timeline="A helyszíni napok száma a csarnok méretétől és a zónák hozzáférhetőségétől függ; a határidőt az ajánlat rögzíti."
          fromYou="Helyszíni hozzáférés, biztonsági előírások, a felmérendő zónák listája, és ha van: meglévő layout / EIR."
        />
        <p>
          Teljes listáért lásd a{" "}
          <BimLink href="/szolgaltatasok" className="font-semibold text-brand">
            szolgáltatások
          </BimLink>{" "}
          oldalt.
        </p>
      </div>
    </article>
  );
}
