const BADGES = [
  {
    src: "/badges/10-ev-terepi-tapasztalat-v2.png",
    alt: "10 év terepi tapasztalat",
  },
  {
    src: "/badges/orszagos-kiszallas-v2.png",
    alt: "Országos kiszállás",
  },
] as const;

const SIZE_CLASS = {
  hero: "h-[5rem] w-[5rem] sm:h-[5.25rem] sm:w-[5.25rem]",
  /** 4× text-sm link row + 3× space-y-2 gap (Oldalak oszlop) → négyzet */
  footer: "h-[6.5rem] w-[6.5rem]",
} as const;

type BimTrustBadgesProps = {
  size?: keyof typeof SIZE_CLASS;
  className?: string;
};

/** Compact trust seals — hero or footer under Jogi. */
export function BimTrustBadges({ size = "hero", className }: BimTrustBadgesProps) {
  const dim = size === "footer" ? 104 : 96;
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
