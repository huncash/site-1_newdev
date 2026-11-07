/**
 * Egyetlen válaszidő-forrás mindkét hoston.
 * Oldalanként legfeljebb egy időígéret, az űrlap mellett.
 */
export const RESPONSE_TIME = {
  /** vrgo.hu — feladat záró megkötés */
  vrgo: "48 órán belül",
  /** bim.vrgo.hu */
  bim: "1 munkanapon belül",
} as const;

export function vrgoReplySlaSentence(): string {
  return `Árajánlatot az űrlap alapján ${RESPONSE_TIME.vrgo} küldünk.`;
}

export function bimReplySlaSentence(): string {
  return `Árajánlatot az űrlap alapján ${RESPONSE_TIME.bim} küldünk.`;
}
