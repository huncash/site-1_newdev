import { vrgoReplySlaSentence } from "@/config/response-time";

/**
 * vrgo.hu nyilvános konfiguráció.
 * Üres string / null → a kapcsolódó UI rejtve marad.
 */

export const VRGO_CONFIG = {
  organizationName: "VRGO",
  organizationUrl: "https://vrgo.hu",

  /** Egyetlen időígéret-forrás — lásd response-time.ts */
  get replySlaText() {
    return vrgoReplySlaSentence();
  },

  /**
   * CLASSIC „-tól” ár (HUF). Üres = ne mutass árat.
   */
  classicFromPriceHuf: null as number | null,

  /**
   * Google Térkép / Utcakép megjelenés feltételei.
   * Üres = ne jelenjen meg.
   */
  googleStreetViewNote: "",
} as const;

export function vrgoHasClassicFromPrice(): boolean {
  return (
    typeof VRGO_CONFIG.classicFromPriceHuf === "number" &&
    VRGO_CONFIG.classicFromPriceHuf > 0
  );
}
