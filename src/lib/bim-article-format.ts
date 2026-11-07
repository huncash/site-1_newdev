/** Böngészőben is biztonságos cikk-segédek (nincs fs). */

export function formatHuDate(isoDate: string, time = "00:00"): string {
  const day = new Date(`${isoDate}T12:00:00`).toLocaleDateString("hu-HU", {
    timeZone: "Europe/Budapest",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  if (!time || time === "00:00") return day;
  const [hour, minute] = time.split(":");
  return `${day}, ${Number(hour)}:${minute}`;
}

export type BimArticleListItem = {
  slug: string;
  title: string;
  description: string;
  date: string;
  time: string;
  category: string;
  readingTime: number;
};
