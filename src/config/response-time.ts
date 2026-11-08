/**
 * Egyetlen válaszidő-forrás mindkét hoston.
 * Oldalanként legfeljebb egy időígéret, az űrlap mellett.
 */
export const RESPONSE_TIME = {
  /** vrgo.hu — feladat záró megkötés */
  vrgo: "48 órán belül",
  /** bim.vrgo.hu — nem garantált naptári nap */
  bim: "rövid határidőn belül",
} as const;

export function vrgoReplySlaSentence(): string {
  return `Árajánlatot az űrlap alapján ${RESPONSE_TIME.vrgo} küldünk.`;
}

export function bimReplySlaSentence(): string {
  return `A szükséges módszert és árajánlatot ${RESPONSE_TIME.bim} egyeztetjük.`;
}
