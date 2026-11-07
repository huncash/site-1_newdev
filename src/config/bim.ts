/**
 * bim.vrgo.hu nyilvános konfiguráció.
 * Üres string / null → a kapcsolódó UI elem rejtve marad.
 * TODO- értékeket ne jelenítse meg a felület.
 */

export const BIM_CONFIG = {
  /** Ügyfélszolgálati telefon (ÁSZF-ben is). Üres = rejtve. */
  phoneDisplay: "+36 30 667 2510",
  phoneTel: "tel:+36306672510",

  /**
   * Válaszidő szöveg az űrlap után és a CTA-knál. Üres = ne írj határidőt.
   */
  replySlaText:
    "Átlagosan 24 órán belül válaszolunk e-mailben a megkeresésekre.",

  /**
   * Lakossági „-tól” árak (HUF). Üres = ne mutass árblokkot.
   * TODO-from-prices: kitöltés után jelenik meg.
   */
  residentialFromPriceHuf: null as number | null,
  residentialMinPriceHuf: null as number | null,

  /**
   * Tervezői minta-adatcsomag URL (pl. /downloads/bim-minta.zip).
   * Üres = rejtett letöltés gomb.
   * TODO-sample-pack
   */
  samplePackUrl: "",

  /**
   * Jogosult földmérő megjelenítendő adatai. Üres = ne írj konkrét számot.
   * TODO-surveyor-license
   */
  surveyorLicenseDisplay: "",

  /** Szervezeti schema */
  organizationName: "VRGO BIM",
  organizationUrl: "https://bim.vrgo.hu",
} as const;

export function bimPhoneVisible(): boolean {
  return Boolean(BIM_CONFIG.phoneDisplay.trim() && BIM_CONFIG.phoneTel.trim());
}

export function bimHasFromPrices(): boolean {
  return (
    typeof BIM_CONFIG.residentialFromPriceHuf === "number" &&
    BIM_CONFIG.residentialFromPriceHuf > 0
  );
}

export function bimHasSamplePack(): boolean {
  return Boolean(BIM_CONFIG.samplePackUrl.trim());
}
