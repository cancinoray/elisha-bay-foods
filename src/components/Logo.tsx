type FishMarkProps = {
  className?: string;
  tone?: 'dark' | 'light';
};

/** Brand crest: a bangus leaping over two waves inside a burgundy seal. */
export function FishMark({ className, tone = 'dark' }: FishMarkProps) {
  const isLight = tone === 'light';
  const sealFill = isLight ? '#FFF5E9' : 'currentColor';
  const fishFill = isLight ? '#8F1427' : '#FFF5E9';
  const detail = isLight ? '#FFF5E9' : '#8F1427';
  const secondary = isLight ? '#8F1427' : '#FFF5E9';

  return (
    <svg
      viewBox="0 0 64 64"
      className={className}
      aria-hidden="true"
      focusable="false"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="32" cy="32" r="31" fill={sealFill} />
      <circle cx="32" cy="32" r="27.5" fill="none" stroke="#F2BD36" strokeWidth="1.4" />
      <circle
        cx="32"
        cy="32"
        r="25"
        fill="none"
        stroke={isLight ? "#8F1427" : "#FFF5E9"}
        strokeOpacity={isLight ? ".22" : ".28"}
        strokeWidth=".7"
      />
      <g fill={fishFill}>
        <path d="M17.5 32.2c-3.2-2.4-5.7-4.9-7.3-7.2.3 3.2.9 5.8 2.2 7.9-1.3 2.1-1.9 4.7-2.2 7.9 1.6-2.3 4.1-4.8 7.3-7.2" />
        <path d="M17.5 32.2c4.4-6 11.4-9 17.6-7.1 2.5.8 4.6 2.3 6.9 2.5 1.5.1 2.7-.5 3.5-1.3-.4 2.5-1.6 4-3.5 4.9 1.9.9 3.1 2.5 3.5 4.8-.8-.8-2-1.4-3.5-1.3-2.3.2-4.4 1.7-6.9 2.5-6.2 1.9-13.2-1.1-17.6-5Z" />
      </g>
      <path
        d="M29.2 25.1c1.9-3.3 5.7-3.8 8.1-1.4"
        stroke={fishFill}
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
      />
      <circle cx="40.2" cy="30.2" r="1.5" fill={detail} />
      <path
        d="M36.4 27.4c-1 3-1 5.8 0 8.8"
        stroke={detail}
        strokeWidth="1"
        strokeOpacity=".55"
        fill="none"
      />
      <path
        d="M27.8 30.4c1.1 1.4 2.4 2.2 3.7 2.5M30.6 35.2c1.1 1.4 2.4 2.2 3.7 2.5"
        stroke={detail}
        strokeWidth=".9"
        strokeOpacity=".5"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M16.5 44.2c4-2.4 8-2.4 12 0s8 2.4 12 0 8-2.4 12 0"
        stroke="#F2BD36"
        strokeWidth="1.6"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M20 48.3c3-1.8 6-1.8 9 0s6 1.8 9 0 6-1.8 9 0"
        stroke={secondary}
        strokeWidth="1.2"
        strokeOpacity=".55"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}

type LogoProps = {
  tone?: 'dark' | 'light';
  className?: string;
  markClassName?: string;
};

/**
 * Wordmark lockup. The crest uses a currentColor fill so it can invert cleanly
 * on the burgundy footer without loading a second asset.
 */
export function Logo({ tone = 'dark', className = '', markClassName = 'h-12 w-12' }: LogoProps) {
  const isLight = tone === 'light';

  return (
    <span className={`flex items-center gap-3 ${className}`}>
      <FishMark
        tone={isLight ? 'light' : 'dark'}
        className={`${markClassName} shrink-0 ${isLight ? 'text-cream' : 'text-burgundy'}`}
      />
      <span className="flex flex-col">
        <span
          className={`font-script text-[1.65rem] leading-[0.95] sm:text-[1.8rem] ${
            isLight ? 'text-cream' : 'text-burgundy'
          }`}
        >
          Elisha Bay
        </span>
        <span
          className={`mt-[0.28rem] font-display text-[0.46rem] font-medium uppercase leading-none tracking-[0.2em] sm:text-[0.5rem] ${
            isLight ? 'text-gold' : 'text-gold-deep'
          }`}
        >
          Dagupan Bangus &amp; Seafoods
        </span>
      </span>
    </span>
  );
}
