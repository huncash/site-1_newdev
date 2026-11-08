import { BimBreadcrumb } from "@/components/bim/BimBreadcrumb";
import { BimLink } from "@/components/bim/BimChrome";
import { BIM_STATE_HUB_HREF, BIM_STATE_HUB_LABEL } from "@/config/menu";
import { BIM_SOLUTIONS } from "@/lib/bim-catalog";
import { bimMetadata } from "@/lib/bim-site";

export const metadata = bimMetadata(
  "/megoldasok",
  "Megoldásaink — felújítástól az üzemeltetésig | VRGO BIM",
  "Felhasználási esetek: felújítás előtti felmérés, as-built, kivitelezés követése, digitális iker, ipari layout, állami beruházások."
);

const details: Record<
  string,
  { id: string; body: string; links: { href: string; label: string }[] }
> = {
  "/megoldasok#felujitas": {
    id: "felujitas",
    body: "Hiányzó vagy pontatlan terv helyett mért alaprajz, metszet és igény szerint pontfelhő.",
    links: [
      { href: "/lakossagi-felmeres", label: "Lakás- és házfelmérés" },
      { href: "/tervezoknek", label: "Tervezőknek" },
    ],
  },
  "/megoldasok#as-built": {
    id: "as-built",
    body: "A kész vagy átadandó állapot rögzítése pontfelhővel és rajzzal — ellenőrzéshez és dokumentációhoz.",
    links: [
      { href: "/tervezoknek", label: "Helyszíni rögzítés" },
      { href: "/szolgaltatasok/georeferalas-eov", label: "EOV-bekötés" },
    ],
  },
  "/megoldasok#kivitelezes": {
    id: "kivitelezes",
    body: "Előrehaladás, hibakövetés és ellenőrzés a helyszíni állapothoz képest.",
    links: [{ href: "/kivitelezes", label: "Kivitelezés dokumentálása" }],
  },
  "/megoldasok#uzemeltetes": {
    id: "uzemeltetes",
    body: "Időszakos frissítés és változáskövetés üzemeltetéshez — éves digitális iker jelleggel.",
    links: [{ href: "/uzemeltetes", label: "Üzemeltetés" }],
  },
  "/megoldasok#ipar": {
    id: "ipar",
    body: "Csarnok- és gépészeti téradat layout-tervezéshez és ütközésvizsgálathoz.",
    links: [{ href: "/ipari-felmeres", label: "Ipari felmérés" }],
  },
  [BIM_STATE_HUB_HREF]: {
    id: "allami",
    body: "Állami beruházásnál vagy üzemeltetésnél a szabályozásnak megfelelő felmérés — egy a megoldások közül.",
    links: [
      { href: BIM_STATE_HUB_HREF, label: BIM_STATE_HUB_LABEL },
      { href: "/ekm-rendelet", label: "Az előírások egy oldalon" },
    ],
  },
};

export default function SolutionsPage() {
  return (
    <article className="bg-background">
      <section className="bg-section-dark py-14 text-section-dark-foreground">
        <div className="mx-auto max-w-4xl px-4">
          <BimBreadcrumb
            tone="dark"
            items={[{ href: "/", label: "Kezdőlap" }, { label: "Megoldások" }]}
          />
          <h1 className="text-3xl font-bold sm:text-4xl">Megoldásaink</h1>
          <p className="mt-3 max-w-2xl text-sm opacity-90 sm:text-base">
            Felhasználási eset szerint — felújítástól az üzemeltetésig. Az állami beruházások
            külön megoldásként jelennek meg.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-4xl space-y-12 px-4 py-12">
        {BIM_SOLUTIONS.map((item) => {
          const detail = details[item.href];
          const id = detail?.id ?? item.href.replace(/[#/]/g, "");
          return (
            <section key={item.href} id={id} className="scroll-mt-24">
              <h2 className="text-xl font-semibold text-foreground">{item.title}</h2>
              <p className="mt-2 text-sm text-muted-foreground sm:text-base">
                {detail?.body ?? item.summary}
              </p>
              {detail?.links ? (
                <ul className="mt-3 flex flex-wrap gap-3 text-sm">
                  {detail.links.map((link) => (
                    <li key={link.href}>
                      <BimLink href={link.href} className="font-semibold text-brand">
                        {link.label} →
                      </BimLink>
                    </li>
                  ))}
                </ul>
              ) : (
                <BimLink href={item.href} className="mt-3 inline-block text-sm font-semibold text-brand">
                  Részletek →
                </BimLink>
              )}
            </section>
          );
        })}
      </div>
    </article>
  );
}
