/**
 * vrgo.hu nyilvános konfiguráció.
 * Üres string / null → a kapcsolódó UI rejtve marad.
 */

export const VRGO_CONFIG = {
  organizationName: "VRGO",
  organizationUrl: "https://vrgo.hu",

  /**
   * Ajánlatkérés válaszideje. Üres = ne írj konkrét napot.
   * TODO-reply-sla: csak ellenőrzött vállalás.
   */
  replySlaText: "Árajánlatot az űrlap alapján 1 munkanapon belül küldünk.",

  /**
   * CLASSIC „-tól” ár (HUF). Üres = ne mutass árat.
   * TODO-classic-from-price
   */
  classicFromPriceHuf: null as number | null,

  /**
   * Google Térkép / Utcakép megjelenés feltételei (rövid megjegyzés).
   * TODO-google-streetview-terms: a szolgáltatási feltételek ide kerülnek.
   */
  googleStreetViewNote: "",
} as const;

export function vrgoHasClassicFromPrice(): boolean {
  return (
    typeof VRGO_CONFIG.classicFromPriceHuf === "number" &&
    VRGO_CONFIG.classicFromPriceHuf > 0
  );
}
