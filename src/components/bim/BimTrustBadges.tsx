const BADGES = [
  {
    src: "/badges/10-ev-terepi-tapasztalat.svg",
    alt: "10 év terepi tapasztalat",
  },
  {
    src: "/badges/orszagos-kiszallas.svg",
    alt: "Országos kiszállás",
  },
] as const;

/** Compact trust seals for the homepage hero — equal weight, no cards/animation. */
export function BimTrustBadges() {
  return (
    <ul
      className="mt-8 flex list-none flex-wrap items-center gap-4 p-0 sm:gap-5"
      aria-label="Bizalmi jelzések"
    >
      {BADGES.map((badge) => (
        <li key={badge.src}>
          <img
            src={badge.src}
            alt={badge.alt}
            width={88}
            height={88}
            className="h-[4.25rem] w-[4.25rem] sm:h-[5rem] sm:w-[5rem]"
            decoding="async"
          />
        </li>
      ))}
    </ul>
  );
}
