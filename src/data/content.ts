import { bimLink } from "@/lib/links";
import { VRGO_CONFIG } from "@/config/vrgo";

export interface ContentLink {
  label: string;
  href: string;
}

export interface ContentService {
  title: string;
  description: string;
  image: string;
  icon: string;
}

export interface ContentSegment {
  title: string;
  description: string;
  href: string;
  asideLabel?: string;
  asideHref?: string;
}

export interface ContentTestimonial {
  name: string;
  company: string;
  text: string;
}

export interface ContentProcessStep {
  text: string;
  image: string;
}

export interface ContentPackage {
  tier: string;
  title: string;
  audience: string;
  cta: string;
  image: string;
  secondaryCta?: string;
  secondaryHref?: string;
  footnote?: string;
}

/** vrgo.hu főoldal — bejárható 3D túra + Google Térkép / Utcakép. */
export const CONTENT = {
  hero: {
    title: "Bejárható 3D túra, amit a Google Térképen is megtalálnak",
    subtitle:
      "Gyors helyszíni felvétel, megosztható és beágyazható 3D túra, méretezett alaprajz – kedvező áron.",
    ctaPrimary: { label: "Ajánlatot kérek", href: "/ajanlat?forras=hero" },
    ctaSecondary: { label: "Csomagok megnézése", href: "/csomagok" },
  },

  services: {
    heading: "Mit kap a bejárható 3D túrával",
    items: [
      {
        title: "Valódi 3D séta",
        description: "Járja be a helyszínt 3D-ben, belső és külső terekben is.",
        image: "/icons/3d-valoban.png",
        icon: "3D",
      },
      {
        title: "Google Térkép és Utcakép",
        description: "Az utcáról indulva a belső terekig bejárható.",
        image: "/icons/gsv.png",
        icon: "GSV",
      },
      {
        title: "Méretezett alaprajz",
        description: "A modellből méretezett alaprajz is kérhető, ha a csomag tartalmazza.",
        image: "/icons/alaprajz.png",
        icon: "2D",
      },
      {
        title: "Megosztható és beágyazható",
        description: "Egy linkkel elküldhető, a honlapjába beágyazható.",
        image: "/icons/embed.svg",
        icon: "EMBED",
      },
      {
        title: "Minden eszközön",
        description: "Asztalon, mobilon és VR-ban is megnyitható.",
        image: "/icons/vr-mode.svg",
        icon: "VR",
      },
      {
        title: "Gyors felvétel",
        description: "Egy helyszín felvétele rövid helyszíni munka.",
        image: "/icons/360.svg",
        icon: "360",
      },
    ] satisfies ContentService[],
  },

  audiences: {
    heading: "Kinek?",
    items: [
      {
        title: "Ingatlan eladás és bérbeadás",
        description: "Az érdeklődő már a találkozó előtt végigjárhatja a teret.",
        href: "/csomagok#classic",
      },
      {
        title: "Üzlet, szalon, galéria, kiállítótér",
        description: "Online bemutatkozás a valódi térről, nem csak fotókról.",
        href: "/csomagok#classic",
      },
      {
        title: "Szálloda, apartman, panzió",
        description: "A vendég foglalás előtt látja, mit kap.",
        href: "/csomagok#classic",
      },
      {
        title: "Iroda, coworking, retail",
        description: "Egy megosztható link a helyszíni mutatás előtt vagy helyett.",
        href: "/csomagok#classic",
      },
      {
        title: "Oktatás és kampusz",
        description: "Több épület és külső terület egyetlen túrában.",
        href: "/megoldasok/oktatas",
      },
      {
        title: "Üzemeltetés és portfólió",
        description: "Több telephely digitális mása egy helyen, üzemeltetési célra.",
        href: "/megoldasok/facility",
      },
    ] satisfies ContentSegment[],
  },

  experience: {
    heading: "Tapasztalat",
    text: "2016-ban, két másik magyar céggel egyidejűleg elsőként hoztuk be Magyarországra a Matterport technológiát. Azóta a gyors, kedvező árú, nem ipari felhasználásra szakosodtunk: üzletekre, galériákra, szállásokra, irodákra, ingatlanokra.",
  },

  testimonials: {
    heading: "Mit mondanak ügyfeleink",
    items: [
      {
        name: "Bering Dorottya",
        company: "Home Design Buda",
        text: "A VRGO-tól egy olyan profi szolgáltatást kaptunk, aminek köszönhetően üzletünk online jelenléte jóval színvonalasabb lett. Megbízhatóságuk, profizmusuk és lelkiismeretességük miatt bátran ajánljuk őket bárkinek!",
      },
      {
        name: "Paróczay László",
        company: "Galéria Optika",
        text: "Mindenkinek ajánljuk a VRGO virtuális felvétel szolgáltatását. Gyors, zökkenőmentes volt a felvételek elkészítése, profi munkát végeztek, minden kérésünket megvalósították. A szolgáltatás ár-érték aránya a legjobb.",
      },
      {
        name: "Marton Nemes",
        company: "Deák Erika Galéria",
        text: "A VRGO által készített 3D-s bemutató teljesen új dimenziót nyit a kiállítások dokumentálásában. A művészet online bemutatása soha nem volt még ennyire pontos, átélhető, és bárki számára hozzáférhető. Fantasztikus!",
      },
    ] satisfies ContentTestimonial[],
  },

  process: {
    heading: "A helyszíni rögzítéstől a megosztható túráig",
    steps: [
      {
        text: "Egyeztetett időpontban a helyszíni munkálatok elvégzése.",
        image: "/process/fotozas.jpg",
      },
      {
        text: "Kívánt tartalmakkal a túra feltöltése a felhőbe.",
        image: "/process/upload.jpg",
      },
      {
        text: "Kész túra megosztási linkjének átadása.",
        image: "/process/megosztas.jpg",
      },
    ] satisfies ContentProcessStep[],
    cta: { label: "3D fotózás csomagjaink", href: "/csomagok" },
  },

  packages: {
    heading: "Három csomag — három üzleti probléma, megoldva",
    disclaimer: `${VRGO_CONFIG.replySlaText} A digitális iker átadási határidejét az ajánlat tartalmazza; ha külön határidő nincs benne, az ÁSZF szerinti határidő érvényes.`,
    items: [
      {
        tier: "CLASSIC",
        title: "Bérbeadás- és értékesítés-bemutató",
        audience:
          "Iroda-, retail-, raktár- és prémium szálláshely portfóliókat kezelő üzemeltetők, ingatlanforgalmazók, franchise-hálózatok.",
        cta: "CLASSIC igénylése",
        image: "/packages/csomag-a.jpg",
      },
      {
        tier: "TWIN",
        title: "Létesítmény-üzemeltetés és portfólió-iker",
        audience:
          "Facility management cégek, irodaház- és bevásárlóközpont-üzemeltetők, többtelephelyes vállalatok, biztosítók, ESG-jelentésre kötelezett cégek.",
        cta: "TWIN igénylése",
        image: "/packages/csomag-b.jpg",
      },
      {
        tier: "ENTERPRISE",
        title: "Kampusz, ipari telephely, több épület egy digitális ikerben",
        audience:
          "Egyetemek és kutatóhelyek, gyártó- és logisztikai vállalatok, energetikai és infrastruktúra-üzemeltetők, generálkivitelezők.",
        cta: "ENTERPRISE igénylése",
        image: "/packages/csomag-c.jpg",
        secondaryCta: "Mérnöki pontosságú felmérés kell? → bim.vrgo.hu",
        secondaryHref: bimLink("/", "enterprise"),
      },
    ] satisfies ContentPackage[],
  },
} as const;
