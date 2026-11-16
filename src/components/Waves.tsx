/** Decorative sea-ribbon that closes the hero without a hard section edge. */
export function HeroRibbon({ className = '' }: { className?: string }) {
  return (
    <div className={`pointer-events-none relative h-[92px] w-full sm:h-[120px] ${className}`} aria-hidden="true">
      <svg
        viewBox="0 0 1440 150"
        preserveAspectRatio="none"
        className="absolute inset-0 h-full w-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0 62C210 22 430 92 720 70 1020 48 1230 16 1440 46V108C1230 78 1020 112 720 132 420 146 210 84 0 124Z"
          fill="#8F1427"
        />
        <path
          d="M0 62C210 22 430 92 720 70 1020 48 1230 16 1440 46"
          stroke="#F2BD36"
          strokeWidth="2.4"
          fill="none"
        />
        <path
          d="M0 124C210 84 420 146 720 132 1020 112 1230 78 1440 108"
          stroke="#5C0914"
          strokeWidth="2"
          strokeOpacity=".55"
          fill="none"
        />
      </svg>
    </div>
  );
}

/** Cream wave used to cut the top of a full-bleed burgundy section. */
export function WaveTop({ className = '' }: { className?: string }) {
  return (
    <div className={`pointer-events-none absolute inset-x-0 top-0 leading-none ${className}`} aria-hidden="true">
      <svg
        viewBox="0 0 1440 92"
        preserveAspectRatio="none"
        className="h-[42px] w-full sm:h-[62px] lg:h-[82px]"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0 0h1440v24c-222 62-382-10-682 34C458 102 246 18 0 62Z"
          fill="#FFF5E9"
        />
        <path
          d="M0 62C246 18 458 102 758 58 1058 14 1218 86 1440 24"
          stroke="#F2BD36"
          strokeWidth="2"
          strokeOpacity=".85"
          fill="none"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
    </div>
  );
}

/** Cream wave used to cut the bottom of a full-bleed burgundy section. */
export function WaveBottom({ className = '' }: { className?: string }) {
  return (
    <div className={`pointer-events-none absolute inset-x-0 bottom-0 leading-none ${className}`} aria-hidden="true">
      <svg
        viewBox="0 0 1440 92"
        preserveAspectRatio="none"
        className="h-[42px] w-full sm:h-[62px] lg:h-[82px]"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0 92h1440V68c-222-62-382 10-682-34C458-10 246 74 0 30Z"
          fill="#FFF5E9"
        />
        <path
          d="M0 30C246 74 458-10 758 34 1058 78 1218 6 1440 68"
          stroke="#F2BD36"
          strokeWidth="2"
          strokeOpacity=".85"
          fill="none"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
    </div>
  );
}

/** Soft wave underline used beneath light section headings. */
export function WaveScratch({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 180 18"
      className={className}
      aria-hidden="true"
      focusable="false"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M3 11.5c18-8 34 5 52 0s34-9 52-2 34 5 70-4"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
      />
    </svg>
  );
}
