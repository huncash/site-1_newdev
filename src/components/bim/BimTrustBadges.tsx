const BADGES = [
  {
    src: "/badges/10-ev-terepi-tapasztalat.png",
    alt: "10 év terepi tapasztalat",
  },
  {
    src: "/badges/orszagos-kiszallas.png",
    alt: "Országos kiszállás",
  },
] as const;

const SIZE_CLASS = {
  hero: "h-[5rem] w-[5rem] sm:h-[5.25rem] sm:w-[5.25rem]",
  footer: "h-12 w-12 sm:h-14 sm:w-14",
} as const;

type BimTrustBadgesProps = {
  size?: keyof typeof SIZE_CLASS;
  className?: string;
};

/** Compact trust seals — hero or smaller footer. */
export function BimTrustBadges({ size = "hero", className }: BimTrustBadgesProps) {
  const dim = size === "footer" ? 56 : 96;
  return (
    <ul
      className={
        className ??
        (size === "footer"
          ? "mt-4 flex list-none flex-wrap items-center gap-2.5 p-0"
          : "mt-5 flex list-none flex-wrap items-center gap-3 p-0 sm:gap-4")
      }
      aria-label="Bizalmi jelzések"
    >
      {BADGES.map((badge) => (
        <li key={`${size}-${badge.src}`}>
          <img
            src={badge.src}
            alt={badge.alt}
            width={dim}
            height={dim}
            className={SIZE_CLASS[size]}
            decoding="async"
            loading={size === "footer" ? "lazy" : "eager"}
          />
        </li>
      ))}
    </ul>
  );
}
