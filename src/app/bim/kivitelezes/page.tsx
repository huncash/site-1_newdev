import { BimLink } from "@/components/bim/BimChrome";
import { BimScopeNote } from "@/components/bim/BimScopeNote";
import { bimMetadata } from "@/lib/bim-site";

export const metadata = bimMetadata(
  "/kivitelezes",
  "Kivitelezés dokumentálása: előrehaladás és hibakövetés | VRGO BIM",
  "Időbélyegzett dokumentáció kivitelezéshez. A 11. § (2) szerinti geodéziai ellenőrző mérést a 3D rögzítés nem helyettesíti."
);

const packages = [
  {
    title: "Falzárás előtti dokumentálás",
    text: "A gépészet, a villamos szerelés és a vízvezeték lezárás előtti rögzítése.",
  },
  {
    title: "Mérföldkő-felvételek",
    text: "Szerkezetkész, szerelés vége, burkolás előtt, átadás-átvétel.",
  },
  {
    title: "Hibakövetési felvétel",
    text: "Időbélyegzett, bejárható dokumentáció a kifogásolt területekről. A jelölést kézzel helyezzük el a modellen.",
  },
];

export default function ConstructionPage() {
  return (
    <article className="bg-background">
      <section className="bg-section-dark py-14 text-section-dark-foreground">
        <div className="mx-auto max-w-4xl px-4">
          <h1 className="text-3xl font-bold text-section-dark-foreground sm:text-4xl">
            Kivitelezés dokumentálása: előrehaladás, hibakövetés, megvalósulási állapot
          </h1>
        </div>
      </section>
      <div className="mx-auto max-w-4xl space-y-8 px-4 py-12 text-sm text-muted-foreground sm:text-base">
        <section>
          <h2 className="text-xl font-semibold text-foreground">Kinek</h2>
          <p className="mt-2">Generálkivitelezők, vállalkozó kivitelezők, lebonyolítók, építtetők.</p>
        </section>
        <section>
          <h2 className="text-xl font-semibold text-foreground">Felhasználási esetek</h2>
          <ul className="mt-2 list-disc space-y-2 pl-5">
            <li>150 Kivitelezés előrehaladásának követése</li>
            <li>170 Építőipari kivitelezési tevékenység teljesítésének elszámolása — a rögzítés a dokumentáció, a mennyiségi igazolás az EIR és a szerződés szerint készül</li>
            <li>180 Hibakövetés</li>
            <li>190 Megvalósulási dokumentáció előállítása — a 11. § (2) szerinti ellenőrző mérést hivatalban eljárásra jogosult földmérővel együtt végezzük</li>
          </ul>
        </section>
        <section>
          <h2 className="text-xl font-semibold text-foreground">Csomagok</h2>
          <div className="mt-4 grid gap-4">
            {packages.map((item) => (
              <div key={item.title} className="rounded-md border border-border bg-card p-5">
                <h3 className="font-semibold text-foreground">{item.title}</h3>
                <p className="mt-2">{item.text}</p>
              </div>
            ))}
          </div>
        </section>
        <section>
          <h2 className="text-xl font-semibold text-foreground">Mit vállalunk</h2>
          <div className="mt-2">
            <BimScopeNote />
          </div>
        </section>
        <BimLink
          href="/ajanlatkeres"
          className="inline-flex rounded-md bg-brand px-6 py-3 text-sm font-semibold uppercase tracking-wider text-brand-foreground"
        >
          1 munkanapon belül módszert és árat javaslunk
        </BimLink>
      </div>
    </article>
  );
}
