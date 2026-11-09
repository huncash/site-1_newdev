type BadgeSet = {
  alt: string;
  src80: string;
  src84: string;
  src104: string;
};

const BADGES: readonly BadgeSet[] = [
  {
    alt: "10 év terepi tapasztalat",
    src80: "/badges/10-ev-terepi-tapasztalat-80.png",
    src84: "/badges/10-ev-terepi-tapasztalat-84.png",
    src104: "/badges/10-ev-terepi-tapasztalat-104.png",
  },
  {
    alt: "Országos kiszállás",
    src80: "/badges/orszagos-kiszallas-80.png",
    src84: "/badges/orszagos-kiszallas-84.png",
    src104: "/badges/orszagos-kiszallas-104.png",
  },
] as const;

type BimTrustBadgesProps = {
  size?: "hero" | "footer";
  className?: string;
};

/** Compact trust seals — 1:1 PNG sizes (80 / 84 / 104), no browser rescale of wrong assets. */
export function BimTrustBadges({ size = "hero", className }: BimTrustBadgesProps) {
  return (
    <ul
      className={
        className ??
        (size === "footer"
          ? "mt-3 flex list-none flex-wrap items-start gap-3 p-0"
          : "mt-5 flex list-none flex-wrap items-center gap-3 p-0 sm:gap-4")
      }
      aria-label="Bizalmi jelzések"
    >
      {BADGES.map((badge) => (
        <li key={`${size}-${badge.alt}`}>
          {size === "footer" ? (
            <img
              src={badge.src104}
              alt={badge.alt}
              width={104}
              height={104}
              className="h-[6.5rem] w-[6.5rem]"
              decoding="async"
              loading="lazy"
            />
          ) : (
            <picture>
              <source media="(min-width: 640px)" srcSet={badge.src84} width={84} height={84} />
              <img
                src={badge.src80}
                alt={badge.alt}
                width={80}
                height={80}
                className="h-[5rem] w-[5rem] sm:h-[5.25rem] sm:w-[5.25rem]"
                decoding="async"
                loading="eager"
              />
            </picture>
          )}
        </li>
      ))}
    </ul>
  );
}
