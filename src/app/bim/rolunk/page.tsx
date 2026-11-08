import { BimLink } from "@/components/bim/BimChrome";
import { bimMetadata } from "@/lib/bim-site";

export const metadata = bimMetadata(
  "/rolunk",
  "Rólunk | VRGO BIM",
  "Kis csapatként a terepi felmérésre összpontosítunk. Saját eszközpark, mérnöki háttér, országos helyszíni munka tervezői és Scan-to-BIM együttműködésekhez."
);

export default function AboutPage() {
  return (
    <article className="bg-background">
      <div className="mx-auto max-w-3xl px-4 py-10 sm:py-14">
        <h1 className="text-2xl font-bold text-foreground sm:text-3xl">Rólunk</h1>
        <p className="mt-4 text-sm text-muted-foreground sm:text-base">
          Kis csapatként a terepi felmérésre összpontosítunk. Saját eszközparkkal dolgozunk, és
          olyan tervező- és modellezőcsapatokkal keresünk kapcsolatot, amelyek megbízható felmérési
          adatra és közvetlen szakmai egyeztetésre számítanak.
        </p>

        <section className="mt-10 space-y-3">
          <h2 className="text-xl font-semibold text-foreground">
            Terepi tapasztalat, mérnöki háttér
          </h2>
          <p className="text-sm text-muted-foreground sm:text-base">
            Földmérő kollégánk lakossági és autópálya-építési felméréseken szerzett tapasztalatot.
            Csapatunk másik tagja élelmiszermérnök, ipari folyamatfejlesztési háttérrel és tíz év
            térszkennelési tapasztalattal. Korábbi munkáink között gyártóüzemek, nagy belső terek és
            épülethomlokzatok felmérése is szerepel.
          </p>
          <p className="text-sm text-muted-foreground sm:text-base">
            A munkát a feladat tisztázásával kezdjük. Egyeztetjük, mit kell felmérni, milyen adatot
            vár a partner, és milyen helyszíni körülményekhez kell alkalmazkodnunk. Ezek alapján
            választjuk ki a mérési módszereket és szervezzük meg a terepi munkát. A mérés korlátait
            és a felmerülő kérdéseket is jelezzük.
          </p>
        </section>

        <section className="mt-10 space-y-3">
          <h2 className="text-xl font-semibold text-foreground">
            Mi mérünk, a partnercsapat továbbdolgozik az adatokkal
          </h2>
          <p className="text-sm text-muted-foreground sm:text-base">
            A számunkra ideális együttműködésben mi a helyszíni felmérést végezzük, a partnercsapat
            pedig a tervezéssel vagy modellezéssel foglalkozik. A felmérési adatot az előre
            egyeztetett követelmények szerint adjuk át. Így mindenki arra a munkára összpontosíthat,
            amelyben a legerősebb.
          </p>
        </section>

        <section className="mt-10 space-y-3">
          <h2 className="text-xl font-semibold text-foreground">
            Tervezhető munkák, rugalmas helyszíni jelenlét
          </h2>
          <p className="text-sm text-muted-foreground sm:text-base">
            A Dunakanyarból indulva országosan vállalunk felméréseket. Elsősorban előre egyeztetett,
            ütemezhető projekteket keresünk, mert ezekhez lehet jól megszervezni a terepi munkát. A
            munkavégzés időpontját a helyszín hozzáférhetőségével és az üzem működésével együtt
            egyeztetjük.
          </p>
          <p className="text-sm text-muted-foreground sm:text-base">
            Kisebb feladatokat is vállalunk. Ha rövid határidővel van szükség felmérésre, az aktuális
            kapacitásunk alapján jelezzük, mikorra tudjuk elvégezni.
          </p>
        </section>

        <div className="mt-12">
          <BimLink
            href="/kapcsolat?forras=rolunk"
            className="inline-flex items-center justify-center rounded-md bg-brand px-6 py-3 text-sm font-semibold uppercase tracking-wider text-brand-foreground hover:bg-brand-dark"
          >
            Felmérési feladat egyeztetése
          </BimLink>
        </div>
      </div>
    </article>
  );
}
