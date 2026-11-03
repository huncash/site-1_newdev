/** Nyilvános oldal: csak irányár. A padlóár belső, nem jelenik meg. */

export const TOUR_URL = "https://my.matterport.com/show/?m=92EPXPjr6gR&ts=1";
export const PHOTO_STATE = "2026. szeptember 2.";

export type ListingVariant = "a" | "b";

export const VARIANT_OFFER = {
  a: {
    code: "a" as const,
    title: "A változat: magáncél, nyugalom",
    short: "Magáncél, nyugalom",
    listPrice: "33 M Ft",
    perSqm: "kb. 31,5 ezer Ft/m² az irányárból",
    summary:
      "Magáncélú használatra, a saját és a környékbeli lakosok nyugalma védelmében. Nem újabb börzsönyligeti vendégház létesítésére adom el, hanem annak, aki ezt szerződésben is vállalja: nincs rövid távú szálláshely-szolgáltatás és kereskedelmi szállásadás. A lakhatás, a pihenés, a home office és a hosszú távú bérbeadás szabad. Megszegés: 4 M Ft/év kötbér; a megfizetés nem mentesít. Felmentés: egyszeri 4 M Ft.",
  },
  b: {
    code: "b" as const,
    title: "B változat: magasabb piaci ár, szabad kéz",
    short: "Magasabb piaci ár, szabad kéz",
    listPrice: "36,5 M Ft",
    perSqm: "kb. 34,9 ezer Ft/m² az irányárból",
    summary:
      "Ha a nyugalmi vállalást nem tudja magára venni, de ezt a telket szeretné: azonnali, magasabb, mégis piaci irányáron értékesítem, és nem foglalkozom azzal, hogy mit kezd vele az új tulajdonos. A 3,5 M Ft a két irányár különbsége. A hatályos jogszabályok és a helyi építési szabályzat továbbra is érvényesek.",
  },
  plotSqm: 1046,
  premiumDiff: "3,5 M Ft",
  penalty: "4 M Ft / érintett év",
  releaseFee: "4 M Ft egyszeri",
  marketNote:
    "A környéken gyakran találni olcsóbbnak tűnő portákat. Ezeknél gyakori a változtatási tilalom, a bizonytalanabb jogi státusz, vagy az, hogy nincs azonnal használható, közműves felépítmény. Ez az ingatlan Lke-4 lakóövezet, tiszta jogi státusz, 1046 m² hivatalos telek, bekötött villany és vezetékes víz mellett meglévő felépítménnyel.",
} as const;

export const PHOTOS = [
  { src: "/hirdetes/20260902-01.jpg", alt: "A meglévő épület a tölgyesben, 2026. szeptember 2.", tall: true },
  { src: "/hirdetes/20260902-02.jpg", alt: "Lépcső a felépítményhez", tall: false },
  { src: "/hirdetes/20260902-03.jpg", alt: "A kocsibejáró kapuja", tall: true },
  { src: "/hirdetes/20260902-04.jpg", alt: "Kőkosaras támfal és drótkerítés", tall: false },
  { src: "/hirdetes/20260902-05.jpg", alt: "Kapu a kerítésben", tall: false },
  { src: "/hirdetes/20260902-06.jpg", alt: "Kavicsos kocsibeálló a telek előtt", tall: true },
  { src: "/hirdetes/20260902-07.jpg", alt: "Ösvény a fák között", tall: false },
  { src: "/hirdetes/20260902-08.jpg", alt: "Kiskapu az erdei ösvényen", tall: false },
  { src: "/hirdetes/20260902-09.jpg", alt: "A kapu az utca felől", tall: false },
  { src: "/hirdetes/20260902-10.jpg", alt: "A kerítés és a kapu a telek felől", tall: false },
  { src: "/hirdetes/20260902-11.jpg", alt: "A beálló a kapu mellett", tall: false },
  { src: "/hirdetes/20260902-12.jpg", alt: "A nappali fa burkolattal", tall: true },
  { src: "/hirdetes/20260902-13.jpg", alt: "A cserépkályha és az átjáró a konyha felé", tall: false },
  { src: "/hirdetes/20260902-14.jpg", alt: "A szoba az ajtóból", tall: false },
  { src: "/hirdetes/20260902-15.jpg", alt: "Átnézet a konyhából", tall: false },
  { src: "/hirdetes/20260902-16.jpg", alt: "A konyha tűzhellyel és mosogatóval", tall: false },
  { src: "/hirdetes/20260902-17.jpg", alt: "Kilátás az erdőre az ablakból", tall: true },
  { src: "/hirdetes/20260902-18.jpg", alt: "A konyha sarka", tall: false },
  { src: "/hirdetes/20260902-19.jpg", alt: "A ház oldala az erdő felé", tall: false },
  { src: "/hirdetes/20260902-20.jpg", alt: "A bejárat", tall: false },
  { src: "/hirdetes/20260902-21.jpg", alt: "A felépítmény homlokzata", tall: true },
  { src: "/hirdetes/20260902-22.jpg", alt: "Kavicsos rész a fák között", tall: false },
  { src: "/hirdetes/20260902-23.jpg", alt: "Az épület a lejtőről", tall: false },
  { src: "/hirdetes/20260902-24.jpg", alt: "Az épület oldala", tall: false },
  { src: "/hirdetes/20260902-25.jpg", alt: "A telek erdős része", tall: false },
  { src: "/hirdetes/20260902-26.jpg", alt: "Melléképület a lejtőn", tall: false },
  { src: "/hirdetes/20260902-27.jpg", alt: "Kilátás a fák között a völgy felé", tall: true },
  { src: "/hirdetes/20260902-28.jpg", alt: "A lejtős telekrész", tall: false },
  { src: "/hirdetes/20260902-29.jpg", alt: "A telek a fák alatt", tall: false },
  { src: "/hirdetes/20260902-30.jpg", alt: "Ősfás rész a telken", tall: false },
] as const;

export const UTILITY_PHOTOS = [
  { src: "/hirdetes/20260902-mero.jpg", alt: "A mérőhely, felette a cserélt kismegszakítók", title: "Áram", caption: "A mérőhely. A mérő után a rendszer cserélve." },
  { src: "/hirdetes/20260902-viz.jpg", alt: "Folyó víz a konyhai csapon", title: "Víz", caption: "Folyó víz a vezetékes bekötésen." },
  {
    src: "/hirdetes/20260902-furdo.jpg",
    alt: "A csempézett fürdő. A mosdócsap fölötti tükör fölött látszik a befalazott ajtó helye.",
    title: "Csempe és vezetékes víz",
    caption:
      "A fürdő csempézve van, vezetékes vízzel. Már nem a konyhából nyílik: a mosdócsap fölötti tükör fölött látszik a befalazott ajtó helye.",
  },
] as const;
