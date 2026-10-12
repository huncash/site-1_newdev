/** A 2016–2017-es VRGO-cikkek archív anyagok. */
export function isArchivePost(date: string): boolean {
  const year = Number(date.slice(0, 4));
  return year === 2016 || year === 2017;
}
