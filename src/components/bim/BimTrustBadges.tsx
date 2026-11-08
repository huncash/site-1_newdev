function ScallopRim() {
  return (
    <g fill="#6cb9f1">
      <circle cx="80" cy="80" r="62" />
      <circle cx="80" cy="18" r="11" />
      <circle cx="111.4" cy="26.4" r="11" />
      <circle cx="133.6" cy="48.6" r="11" />
      <circle cx="142" cy="80" r="11" />
      <circle cx="133.6" cy="111.4" r="11" />
      <circle cx="111.4" cy="133.6" r="11" />
      <circle cx="80" cy="142" r="11" />
      <circle cx="48.6" cy="133.6" r="11" />
      <circle cx="26.4" cy="111.4" r="11" />
      <circle cx="18" cy="80" r="11" />
      <circle cx="26.4" cy="48.6" r="11" />
      <circle cx="48.6" cy="26.4" r="11" />
      <circle cx="95.9" cy="20.1" r="11" />
      <circle cx="124" cy="36" r="11" />
      <circle cx="140" cy="64.1" r="11" />
      <circle cx="140" cy="95.9" r="11" />
      <circle cx="124" cy="124" r="11" />
      <circle cx="95.9" cy="139.9" r="11" />
      <circle cx="64.1" cy="139.9" r="11" />
      <circle cx="36" cy="124" r="11" />
      <circle cx="20.1" cy="95.9" r="11" />
      <circle cx="20.1" cy="64.1" r="11" />
      <circle cx="36" cy="36" r="11" />
      <circle cx="64.1" cy="20.1" r="11" />
    </g>
  );
}

function BadgeTenYears() {
  return (
    <svg
      viewBox="0 0 160 160"
      className="h-[4.25rem] w-[4.25rem] sm:h-[4.75rem] sm:w-[4.75rem]"
      role="img"
      aria-label="10 év terepi tapasztalat"
    >
      <ScallopRim />
      <circle cx="80" cy="80" r="58" fill="#ffffff" />
      <circle cx="80" cy="80" r="55" fill="none" stroke="#4a4f55" strokeWidth="1.75" />
      <text
        x="80"
        y="78"
        textAnchor="middle"
        fill="#4a4f55"
        fontFamily="Open Sans, Segoe UI, system-ui, sans-serif"
        fontSize="34"
        fontWeight="800"
      >
        10
      </text>
      <text
        x="80"
        y="96"
        textAnchor="middle"
        fill="#4a4f55"
        fontFamily="Open Sans, Segoe UI, system-ui, sans-serif"
        fontSize="10"
        fontWeight="700"
        letterSpacing="0.2em"
      >
        ÉV
      </text>
      <text
        x="80"
        y="118"
        textAnchor="middle"
        fill="#4a4f55"
        fontFamily="Open Sans, Segoe UI, system-ui, sans-serif"
        fontSize="7.2"
        fontWeight="700"
        letterSpacing="0.04em"
      >
        TEREPI TAPASZTALAT
      </text>
    </svg>
  );
}

function BadgeNationwide() {
  return (
    <svg
      viewBox="0 0 160 160"
      className="h-[4.25rem] w-[4.25rem] sm:h-[4.75rem] sm:w-[4.75rem]"
      role="img"
      aria-label="Országos kiszállás"
    >
      <ScallopRim />
      <circle cx="80" cy="80" r="58" fill="#ffffff" />
      <circle cx="80" cy="80" r="55" fill="none" stroke="#4a4f55" strokeWidth="1.75" />
      <path
        fill="#4a4f55"
        d="M28 68c4-3 9-5 14-6 6-1 11 1 17 0 5-1 8-4 13-4 6 0 10 2 15 1 5-1 9-4 14-3 5 1 9 3 13 1 3-1 6-1 8 2 2 3 1 7 0 10-1 4-4 6-5 9-1 4 1 7 1 10 0 4-2 7-5 9-4 2-8 0-12 1-4 1-7 5-12 6-5 1-9-2-14-1-4 1-7 4-12 3-5-1-9-3-12-7-3-4-5-8-4-13 0-3 2-6 1-9-1-2-2-5 0-7 1-2 4-2 7-3z"
      />
      <path
        fill="#ffffff"
        d="M80 54c-6.5 0-11.8 5.3-11.8 11.8 0 8.9 11.8 21.2 11.8 21.2s11.8-12.3 11.8-21.2C91.8 59.3 86.5 54 80 54z"
      />
      <circle cx="80" cy="65.2" r="3.8" fill="#4a4f55" />
      <text
        x="80"
        y="118"
        textAnchor="middle"
        fill="#4a4f55"
        fontFamily="Open Sans, Segoe UI, system-ui, sans-serif"
        fontSize="7.5"
        fontWeight="700"
        letterSpacing="0.07em"
      >
        ORSZÁGOS KISZÁLLÁS
      </text>
    </svg>
  );
}

/** Compact trust seals for the homepage hero — equal weight, no cards/animation. */
export function BimTrustBadges() {
  return (
    <ul
      className="mt-6 flex list-none flex-wrap items-center gap-3 p-0 sm:gap-4"
      aria-label="Bizalmi jelzések"
    >
      <li>
        <BadgeTenYears />
      </li>
      <li>
        <BadgeNationwide />
      </li>
    </ul>
  );
}
