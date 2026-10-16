/**
 * Állandó megjelenési ritmus a bim.vrgo.hu cikkeihez.
 * A javasolt naptár kéthetente, csütörtökönként sorolta a cikkeket.
 * Helyette heti két megjelenés van, más napszakban:
 * hétköznap kedd 9:00, hétvégén szombat 18:00, Europe/Budapest.
 * A további cikkek és a YouTube-videók ugyanezt a ritmust követik.
 */
export const BIM_PUBLISH_RHYTHM = {
  timezone: "Europe/Budapest",
  weekday: { label: "kedd", time: "09:00" },
  weekend: { label: "szombat", time: "18:00" },
} as const;

export const BIM_PUBLISH_RHYTHM_NOTE =
  "Hetente kétszer jelenik meg anyag: kedden 9:00-kor és szombaton 18:00-kor, budapesti idő szerint. A további cikkek és a YouTube-videók ugyanezt követik.";
