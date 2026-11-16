type SunburstProps = {
  className?: string;
  ariaHidden?: boolean;
};

/**
 * Hand-drawn gold sunburst used sparingly as a warm, editorial accent.
 * Purely decorative unless explicitly labelled.
 */
export function Sunburst({ className = '', ariaHidden = true }: SunburstProps) {
  const rays = [
    { angle: -166, inner: 16, outer: 41 },
    { angle: -148, inner: 18, outer: 49 },
    { angle: -130, inner: 15, outer: 37 },
    { angle: -112, inner: 20, outer: 53 },
    { angle: -94, inner: 17, outer: 44 },
    { angle: -76, inner: 21, outer: 50 },
    { angle: -58, inner: 16, outer: 39 },
    { angle: -40, inner: 19, outer: 46 },
    { angle: -22, inner: 15, outer: 36 },
    { angle: -4, inner: 20, outer: 51 },
    { angle: 14, inner: 17, outer: 42 },
    { angle: 32, inner: 19, outer: 47 },
  ];

  return (
    <svg
      viewBox="0 0 120 120"
      className={className}
      aria-hidden={ariaHidden}
      focusable="false"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {rays.map(({ angle, inner, outer }) => {
        const radians = (angle * Math.PI) / 180;
        return (
          <line
            key={angle}
            x1={60 + Math.cos(radians) * inner}
            y1={60 + Math.sin(radians) * inner}
            x2={60 + Math.cos(radians) * outer}
            y2={60 + Math.sin(radians) * outer}
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        );
      })}
      <circle cx="84" cy="38" r="2.6" fill="currentColor" opacity=".9" />
      <circle cx="32" cy="76" r="2" fill="currentColor" opacity=".7" />
    </svg>
  );
}

/** A tapered, hand-painted gold underline for the hero statement. */
export function BrushUnderline({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 360 30"
      className={className}
      aria-hidden="true"
      focusable="false"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        className="eb-underline-path"
        d="M4 19.5C74 8.9 187 4.3 356 10.2c-83 3.2-208 8.6-349 13.8Z"
        fill="#F2BD36"
      />
      <path
        className="eb-underline-path"
        d="M16 24.6c75-5.8 171-8.2 305-7.1"
        stroke="#B50918"
        strokeOpacity=".55"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeDasharray="300"
      />
    </svg>
  );
}

/** Fine gold rule with a small diamond centerpiece. */
export function GoldRule({ className = '' }: { className?: string }) {
  return (
    <div className={`flex items-center gap-3 ${className}`} aria-hidden="true">
      <span className="h-px flex-1 bg-gradient-to-r from-transparent via-gold/70 to-gold/70" />
      <span className="h-1.5 w-1.5 rotate-45 bg-gold" />
      <span className="h-px flex-1 bg-gradient-to-l from-transparent via-gold/70 to-gold/70" />
    </div>
  );
}
