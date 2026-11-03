/**
 * Nyilvános listing: irányárak a komoly érdeklődők szűrésére.
 * Belső padlóár / eladási kényszer / deadline soha nem szerepelhet szövegként.
 */

export const TOUR_URL = "https://my.matterport.com/show/?m=92EPXPjr6gR&ts=1";
export const PHOTO_STATE = "2026. szeptember 2.";

/** Hirdetett felépítmény — barna faház fehér ablakokkal a tölgyesben. */
export const HERO_IMAGE = {
  src: "/hirdetes/20260902-01.jpg",
  alt: "Barna faház fehér ablakokkal a Börzsönyliget ősfás tölgyesében",
} as const;

export const LISTING_LOGO = {
  src: "/hirdetes/logo-tolgyes.png",
  alt: "Kismaros–Börzsönyliget — ősfás tölgyes és kabin sziluett",
} as const;

/**
 * Személyes kapcsolat — a telefonszám NEM itt van plain textben.
 * Összerakás: ListingContact (csak megjelenítés után). Nincs avatar / WhatsApp.
 */
export const LISTING_SELLER = {
  name: "Patrik",
  role: "Tulajdonos · közvetlen kapcsolat",
} as const;

export type ListingVariant = "a" | "b";

export const VARIANT_OFFER = {
  a: {
    code: "a" as const,
    optionLabel: "1. opció",
    title: "1. opció: magáncélú, nyugalmat őrző használat",
    short: "Magáncélú · nyugalom",
    listPrice: "33 M Ft",
    bandNote: "Kedvezményes irányár · kb. 10%-kal kedvezőbb a standard konstrukciónál",
    perSqm: "kb. 31,5 ezer Ft/m² az irányárból",
    summary:
      "Kedvezményes irányár azoknak, akik vállalják a zsákutca csendjének megőrzését: nem alakítanak ki rövid távú szálláshelyet, és nem indítanak a helyi lakosságot terhelő, forgalomhozó üzleti tevékenységet. A lakhatás, a pihenés, a home office és a hosszú távú bérbeadás szabad. A kedvezmény a békés szomszédságot támogatja.",
  },
  b: {
    code: "b" as const,
    optionLabel: "2. opció",
    title: "2. opció: szabad felhasználású / üzleti hasznosítás",
    short: "Szabad felhasználás · üzleti",
    listPrice: "36,5 M Ft",
    bandNote: "Standard piaci ár · +3,5 M Ft felár az alapárhoz képest",
    perSqm: "kb. 34,9 ezer Ft/m² az irányárból",
    summary:
      "Standard piaci irányár korlátlanabb, szabad felhasználási kerettel. A +3,5 M Ft az alapárhoz képest a szabad felhasználású / kereskedelmi célú konstrukció reális piaci ellenértéke — a vételár része, nem kártérítés. A hatályos jogszabályok és a helyi építési szabályzat továbbra is érvényesek.",
  },
  plotSqm: 1046,
  premiumDiff: "3,5 M Ft",
  discountNote: "kb. 10%",
  premiumNote:
    "Két használati konstrukció: az 1. opció kedvezményes irányárral a zsákutca nyugalmát őrzi; a 2. opció +3,5 M Ft-tal a szabadabb / üzleti hasznosítás standard piaci ára (a felár a vételár része).",
  marketNote:
    "A Börzsöny–Dunakanyar térségében a kínálat gyakran a jogi státusz, a beépíthetőség és a közművesítettség szerint szóródik. A változtatási tilalommal érintett porták másképp pozicionálódnak, mint a tiszta lakóövezeti, azonnal használható felépítménnyel rendelkező telkek. Ez az ingatlan Lke-4, a tilalmi listán kívül, 1046 m² hivatalos telekkel.",
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
