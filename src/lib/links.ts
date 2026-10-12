/** A bim.vrgo.hu kanonikus címe. A vrgo.hu-ról ide mutató linkek egy helyen készülnek. */
export const BIM_URL = "https://bim.vrgo.hu";

/** Crawlolható, UTM-es link a BIM oldalra. Azonos fül, nofollow nélkül. */
export function bimLink(path = "/", medium: string): string {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  const url = new URL(normalized, BIM_URL);
  url.searchParams.set("utm_source", "vrgo.hu");
  url.searchParams.set("utm_medium", medium);
  url.searchParams.set("utm_campaign", "bim");
  return url.toString();
}
