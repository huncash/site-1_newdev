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

/** Hungary outline from border lon/lat points, fitted above the label. */
function HungaryMap() {
  return (
    <g transform="translate(80 58) scale(0.88) translate(-80 -64)">
      <path
        fill="#4a4f55"
        d="M35.4 69.4 L35.4 61.8 L37.8 60.7 L39.9 56.8 L41.6 55.8 L46.9 56.3 L48.5 54.4 L54.4 54.8 L58.8 55.3 L61.5 56.1 L65.5 53.9 L70.1 53.4 L73.4 55 L76.1 51.5 L80.7 47.6 L86.6 45.2 L92.5 42.8 L99.1 43.6 L105 42.8 L110.9 45.2 L115.5 45.2 L122.1 49.1 L124.7 52.3 L120.1 55.5 L122.1 60.2 L114.8 66.6 L108.9 72.1 L102.3 79.3 L95.8 80.9 L89.2 80.1 L82.6 80.9 L73.4 86.4 L65.5 86.4 L59 84.8 L52.4 76.9 L45.8 75.3 L40.6 74.5 L36.6 69.8 Z"
      />
      <path
        fill="#ffffff"
        d="M80 48c-5.5 0-10 4.5-10 10 0 7.5 10 18 10 18s10-10.5 10-18c0-5.5-4.5-10-10-10z"
      />
      <circle cx="80" cy="57.5" r="3.2" fill="#4a4f55" />
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
        y="68"
        textAnchor="middle"
        fill="#4a4f55"
        fontFamily="Open Sans, Segoe UI, system-ui, sans-serif"
        fontSize="30"
        fontWeight="800"
      >
        10
      </text>
      <text
        x="80"
        y="88"
        textAnchor="middle"
        fill="#4a4f55"
        fontFamily="Open Sans, Segoe UI, system-ui, sans-serif"
        fontSize="8"
        fontWeight="700"
        letterSpacing="0.06em"
      >
        ÉV TEREPI
      </text>
      <text
        x="80"
        y="102"
        textAnchor="middle"
        fill="#4a4f55"
        fontFamily="Open Sans, Segoe UI, system-ui, sans-serif"
        fontSize="8"
        fontWeight="700"
        letterSpacing="0.04em"
      >
        TAPASZTALAT
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
      <HungaryMap />
      <text
        x="80"
        y="112"
        textAnchor="middle"
        fill="#4a4f55"
        fontFamily="Open Sans, Segoe UI, system-ui, sans-serif"
        fontSize="7.5"
        fontWeight="700"
        letterSpacing="0.08em"
      >
        ORSZÁGOS
      </text>
      <text
        x="80"
        y="124"
        textAnchor="middle"
        fill="#4a4f55"
        fontFamily="Open Sans, Segoe UI, system-ui, sans-serif"
        fontSize="7.5"
        fontWeight="700"
        letterSpacing="0.06em"
      >
        KISZÁLLÁS
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
