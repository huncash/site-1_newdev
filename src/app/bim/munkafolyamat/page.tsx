import { BimLink } from "@/components/bim/BimChrome";
import { BimScopeNote } from "@/components/bim/BimScopeNote";
import { bimMetadata } from "@/lib/bim-site";

export const metadata = bimMetadata(
  "/munkafolyamat",
  "A felmérés menete | VRGO BIM",
  "Rövid, követhető folyamat a felmérési igény tisztázásától az adatátadásig. Pontfelhő, EOV-illesztés, átadás a kért formátumban."
);

const STEPS = [
  {
    title: "Igény tisztázása",
    text: "A felmérés előtt írásban rögzítjük a feladat célját, a helyszínt, a pontossági követelményt és az átadási formátumot. Ha van EIR vagy felmérési specifikáció, abból indulunk ki.",
  },
  {
    title: "Helyszíni felmérés",
    text: "A lézeres és geodéziai mérést a helyszín hozzáférési és működési feltételeihez igazítjuk. Nagyobb ipari projekteknél több napon át a helyszínen dolgozunk, a tömbösített ütemezést a helyszínhez közelre tervezzük.",
  },
  {
    title: "Feldolgozás",
    text: "A pontfelhőt regisztráljuk és tisztítjuk. A megrendelt kimenetet a megrendelő által kért formában állítjuk elő.",
  },
  {
    title: "Minőség-ellenőrzés",
    text: "Az ellenőrző pontokat, az EOV-illesztést és az átadási listát az igények alapján rögzítjük. Ha a megrendelő modellezési ellenőrzést is kér, annak módját külön egyeztetjük.",
  },
  {
    title: "Adatátadás",
    text: "A kimenetet a megrendelő által kért formátumban adjuk át. A részletes formátumokat az ajánlat rögzíti.",
  },
] as const;

export default function ProcessPage() {
  return (
    <article className="bg-background">
      <section className="bg-section-dark py-14 text-section-dark-foreground">
        <div className="mx-auto max-w-4xl px-4">
          <h1 className="text-3xl font-bold sm:text-4xl">A felmérés menete</h1>
          <p className="mt-4 max-w-3xl text-sm opacity-90 sm:text-base">
            Rövid, követhető folyamat a felmérési igény tisztázásától az adatátadásig.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-4xl space-y-12 px-4 py-12 text-sm text-muted-foreground sm:text-base">
        <ol className="space-y-8">
          {STEPS.map((step, i) => (
            <li key={step.title}>
              <h2 className="text-xl font-semibold text-foreground">
                {i + 1}. {step.title}
              </h2>
              <p className="mt-2">{step.text}</p>
            </li>
          ))}
        </ol>

        <section>
          <h2 className="text-xl font-semibold text-foreground">Kimenetek</h2>
          <p className="mt-3">
            A felmérés eredménye pontfelhő (például E57), EOV-ba illesztett adat vagy a partnerrel
            egyeztetett egyéb kimenet lehet. A megrendelésben rögzítjük, hogy mit adunk át és milyen
            ellenőrzéssel.
          </p>
          <div className="mt-3">
            <BimScopeNote />
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground">EOV és georeferálás</h2>
          <p className="mt-3">
            Ha az EIR vagy a felhasználási cél EOV-illesztést kér, a lézeres felmérést geodéziai
            ellenőrzéssel és EOV-bekötéssel egészítjük ki, jogosult földmérő közreműködésével. A
            megrendelő saját földmérőjével is együttműködünk. Részletek a{" "}
            <BimLink href="/szolgaltatasok/georeferalas-eov" className="font-semibold text-brand">
              georeferálás
            </BimLink>{" "}
            oldalon.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground">GYIK</h2>
          <p className="mt-3">
            Gyakori kérdések a{" "}
            <BimLink href="/gyik" className="font-semibold text-brand">
              GYIK
            </BimLink>{" "}
            oldalon.
          </p>
        </section>

        <BimLink
          href="/kapcsolat?forras=munkafolyamat"
          className="inline-flex rounded-md bg-brand px-6 py-3 text-sm font-semibold text-brand-foreground"
        >
          Ajánlat kérése
        </BimLink>
      </div>
    </article>
  );
}
