export interface SegmentPage {
  slug: string;
  title: string;
  menuLabel?: string;
  summary: string;
  paragraphs: string[];
  bullets: string[];
  ctaLabel: string;
}

export const SEGMENTS: SegmentPage[] = [
  {
    slug: "ingatlan",
    title: "Ingatlan · Ügynökségek",
    summary:
      "Lakás, ház, iroda — virtuális bemutató az érdeklődőknek, kevesebb felesleges helyszíni megtekintéssel.",
    paragraphs: [
      "A bejárható 3D túra segít előszűrni az érdeklődőket: aki már online körbejárt, célzottabban kér személyes megtekintést.",
      "A túra megosztható linkkel és beágyazható kóddal is elérhető — hirdetésben, weblapon vagy e-mailben.",
    ],
    bullets: [
      "A túra a helyszíni megtekintés előtt elküldhető",
      "Távoli érdeklődő is bejárhatja a teret",
      "Egységes megjelenés a portfólióban",
    ],
    ctaLabel: "Ajánlatot kérek ingatlan bemutatóra",
  },
  {
    slug: "lakoparkok-szallas",
    title: "Lakóparkok · Szállás",
    summary:
      "Típuslakások, közösségi terek, apartmanok és szállodák bejárható 3D bemutatója.",
    paragraphs: [
      "Típuslakások és közös terek egyetlen digitális élményben: a vendég vagy vevő előre „belép” a térbe.",
      "A vendég a foglalás előtt bejárhatja a teret. A túra a szállás weboldalára is beágyazható.",
    ],
    bullets: [
      "Típuslakás és közösségi terek egy túrában",
      "Beágyazás a saját weboldalra",
      "Többnyelvű / megosztható link",
    ],
    ctaLabel: "Ajánlatot kérek szállás / lakópark projektre",
  },
  {
    slug: "iroda-kereskedelem",
    title: "Iroda · Kereskedelem",
    summary:
      "Irodaházak és üzlethelyiségek — több helyszín bemutatása egyetlen VR élményben.",
    paragraphs: [
      "Bérbeadásnál és értékesítésnél a térérzet döntő: a 3D séta pótolja a hiányzó helyszíni első benyomást.",
      "Több telephely vagy üzlet egy portfólió-túrába is szervezhető.",
    ],
    bullets: [
      "Iroda- és retail-bemutató",
      "Portfólió-szintű összehasonlítás",
      "A tér a személyes bejárás előtt is megnézhető",
    ],
    ctaLabel: "Ajánlatot kérek iroda / retail túrára",
  },
  {
    slug: "ipar-iot",
    title: "Ipar · IoT · Nagyvállalat",
    menuLabel: "Ipar / IoT",
    summary:
      "Üzembejárás, belső oktatás, munkakörnyezet bemutatása távoli partnereknek és munkavállalóknak.",
    paragraphs: [
      "Ipari és logisztikai területen a túra távolról is bejárható, ezért nem minden egyeztetéshez kell a helyszínre menni. Az onboardinghoz útvonal jelölhető.",
      "IoT / facility adatokkal összekötve a tér nemcsak bemutató, hanem üzemeltetési eszköz is lehet (TWIN / ENTERPRISE csomag).",
    ],
    bullets: [
      "Üzem- és telephely-bejárás távolról",
      "Oktatás és biztonsági tájékoztatás",
      "Skálázható több telephelyre",
    ],
    ctaLabel: "Ajánlatot kérek ipari / IoT projektre",
  },
  {
    slug: "oktatas",
    title: "Oktatás",
    menuLabel: "Oktatás",
    summary:
      "Virtuális séta kampuszon, laborban vagy oktatási terekben — bemutató, nyílt nap és belső képzés támogatására.",
    paragraphs: [
      "Az oktatási intézmények a 3D túrával távoli érdeklődőknek is megmutathatják a kampuszt és a tantermeket.",
      "Belső képzéshez a tér ismételten bejárható — anélkül, hogy minden alkalommal a helyszínre kellene menni.",
    ],
    bullets: [
      "Kampusz- és laborbemutató",
      "Nyílt nap / felvételi marketing",
      "Ismételhető belső képzési útvonalak",
    ],
    ctaLabel: "Ajánlatot kérek oktatási projektre",
  },
  {
    slug: "facility",
    title: "Facility management",
    menuLabel: "Facility",
    summary:
      "Létesítményüzemeltetéshez digitális iker: bejárható tér, megosztható állapotfelmérés, kevesebb helyszíni koordináció.",
    paragraphs: [
      "A facility csapat a 3D térben, helyszínre utazás nélkül egyeztethet beszállítóval és bérlővel.",
      "A TWIN csomag a portfólió-szintű üzemeltetést és a dokumentált állapotkövetést támogatja.",
    ],
    bullets: [
      "Állapotfelmérés és bejárás digitálisan",
      "Beszállítói / bérlői egyeztetés támogatása",
      "Portfólió-iker több épületre",
    ],
    ctaLabel: "Ajánlatot kérek facility megoldásra",
  },
];

export function getSegmentBySlug(slug: string): SegmentPage | undefined {
  return SEGMENTS.find((s) => s.slug === slug);
}

/** Homepage „Hol használható” cards */
export const HOME_SEGMENT_SLUGS = [
  "ingatlan",
  "lakoparkok-szallas",
  "iroda-kereskedelem",
  "ipar-iot",
] as const;
