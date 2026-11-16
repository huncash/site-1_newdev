/**
 * bim.vrgo.hu — strukturált műszer- és mutatórekordok.
 *
 * Nyilvános szolgáltatási állítás CSAK akkor renderelődik, ha a rekord
 * minden kötelező mezője kitöltött ÉS ownerApproved + accessConfirmed igaz.
 *
 * Ez a fájl nem publikus API-végpont; csak szerveroldali import.
 */

export type InstrumentClaimKind = "service" | "educational";

export type InstrumentClaim = {
  id: string;
  kind: InstrumentClaimKind;
  /** Gyártó / család — pl. lézerszkenner típus. */
  instrumentType: string;
  /** Konfiguráció / változat. */
  configuration: string;
  /** Mutató neve (pontgyűjtési sebesség, PRR stb.). */
  metricName: string;
  value: number;
  unit: string;
  measurementConditions: string;
  manufacturerSourceUrl: string;
  /** YYYY-MM-DD — forrásellenőrzés dátuma. */
  verifiedOn: string;
  /** A forrás URL elérhető volt az ellenőrzéskor. */
  accessConfirmed: boolean;
  /** Tulajdonosi jóváhagyás a nyilvános megjelenésre. */
  ownerApproved: boolean;
  /**
   * true = a VRGO jelenleg biztosítható szolgáltatásához kötött állítás.
   * false = csak technológiai ismertető (nem szolgáltatásbizonyíték).
   */
  currentlyAssurable: boolean;
  notes: string;
};

/**
 * Gyártói adatlapokból ellenőrzött, de jelenleg NEM jóváhagyott rekordok.
 * Szolgáltatási állításként nem jelennek meg, amíg ownerApproved && accessConfirmed.
 */
export const BIM_INSTRUMENT_CLAIMS: readonly InstrumentClaim[] = [
  {
    id: "trimble-x9-core-max-pts",
    kind: "educational",
    instrumentType: "Trimble X9",
    configuration: "Core LT / Core",
    metricName: "Maximális pontgyűjtési sebesség (gyártói adatlap)",
    value: 500_000,
    unit: "pont/s",
    measurementConditions:
      "Gyártói maximum; a tényleges projektsebesség a beállítástól, hatótávtól és helyszíntől függ. Nem egyidejű maximum minden mutatóval.",
    manufacturerSourceUrl: "https://geospatial.trimble.com/en/products/hardware/trimble-x9",
    verifiedOn: "2026-11-16",
    accessConfirmed: true,
    ownerApproved: false,
    currentlyAssurable: false,
    notes: "Ne jelenjen meg szolgáltatási bizonyítékként jóváhagyás nélkül.",
  },
  {
    id: "trimble-x9-premium-max-pts",
    kind: "educational",
    instrumentType: "Trimble X9",
    configuration: "Premium",
    metricName: "Maximális pontgyűjtési sebesség (gyártói adatlap)",
    value: 1_000_000,
    unit: "pont/s",
    measurementConditions:
      "Gyártói maximum; a tényleges projektsebesség a beállítástól, hatótávtól és helyszíntől függ.",
    manufacturerSourceUrl: "https://geospatial.trimble.com/en/products/hardware/trimble-x9",
    verifiedOn: "2026-11-16",
    accessConfirmed: true,
    ownerApproved: false,
    currentlyAssurable: false,
    notes: "Ne jelenjen meg szolgáltatási bizonyítékként jóváhagyás nélkül.",
  },
  {
    id: "leica-rtc360-max-pts",
    kind: "educational",
    instrumentType: "Leica RTC360",
    configuration: "Gyártói adatlap",
    metricName: "Maximális pontgyűjtési sebesség (gyártói adatlap)",
    value: 2_000_000,
    unit: "pont/s",
    measurementConditions:
      "Gyártói maximum; nem minden projektbeállítás mellett elérhető.",
    manufacturerSourceUrl:
      "https://leica-geosystems.com/-/media/files/leicageosystems/products/datasheets/leica-rtc360-ds.ashx",
    verifiedOn: "2026-11-16",
    accessConfirmed: true,
    ownerApproved: false,
    currentlyAssurable: false,
    notes: "Ne jelenjen meg szolgáltatási bizonyítékként jóváhagyás nélkül.",
  },
  {
    id: "riegl-vz-600i-prr",
    kind: "educational",
    instrumentType: "RIEGL VZ-600i",
    configuration: "Gyártói adatlap",
    metricName: "Maximális impulzusismétlési frekvencia (PRR)",
    value: 2.2,
    unit: "MHz PRR",
    measurementConditions:
      "A PRR nem azonos automatikusan az átadott pontok számával. Maximális sebesség és hatótáv nem egyidejű, feltételek nélküli képesség.",
    manufacturerSourceUrl: "https://www.riegl.com/de-deutschland/products/detail/riegl-vz-600i",
    verifiedOn: "2026-11-16",
    accessConfirmed: true,
    ownerApproved: false,
    currentlyAssurable: false,
    notes:
      "Tervezett / nem bizonyított eszközpark esetén sem szolgáltatási bizonyíték. Csak egyértelmű technológiai ismertetőben, elkülönítve.",
  },
] as const;
