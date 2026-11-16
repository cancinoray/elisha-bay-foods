import { ArrowRight, BadgeCheck, Factory, Info, ShieldCheck } from 'lucide-react';
import { site } from '../data/site';
import { FishMark } from './Logo';

const iconMap = {
  'shield-check': ShieldCheck,
  'badge-check': BadgeCheck,
  factory: Factory,
} as const;

export function QualitySection() {
  return (
    <section
      id="quality"
      aria-labelledby="quality-heading"
      className="on-dark relative isolate overflow-hidden bg-burgundy py-28 text-cream sm:py-32 lg:py-36"
    >
      {/* organic edges */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 z-10 leading-none"
      >
        <svg
          viewBox="0 0 1440 92"
          preserveAspectRatio="none"
          className="h-[36px] w-full sm:h-[56px] lg:h-[78px]"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M0 0h1440v24c-222 62-382-10-682 34C458 102 246 18 0 62Z" fill="#FFF5E9" />
          <path
            d="M0 62C246 18 458 102 758 58 1058 14 1218 86 1440 24"
            stroke="#F2BD36"
            strokeWidth="2"
            strokeOpacity=".8"
            fill="none"
            vectorEffect="non-scaling-stroke"
          />
        </svg>
      </div>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 z-10 leading-none"
      >
        <svg
          viewBox="0 0 1440 92"
          preserveAspectRatio="none"
          className="h-[36px] w-full sm:h-[56px] lg:h-[78px]"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M0 92h1440V68c-222-62-382 10-682-34C458-10 246 74 0 30Z" fill="#FFF5E9" />
          <path
            d="M0 30C246 74 458-10 758 34 1058 78 1218 6 1440 68"
            stroke="#F2BD36"
            strokeWidth="2"
            strokeOpacity=".8"
            fill="none"
            vectorEffect="non-scaling-stroke"
          />
        </svg>
      </div>

      {/* fish-scale pattern */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.055]"
        style={{
          backgroundImage:
            'radial-gradient(circle at 50% 0, transparent 13px, #FFF5E9 14px, #FFF5E9 14.8px, transparent 15.6px)',
          backgroundSize: '38px 24px',
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_15%_35%,rgba(242,189,54,0.12),transparent_46%),radial-gradient(ellipse_at_88%_80%,rgba(0,0,0,0.18),transparent_45%)]"
      />
      <FishMark
        className="pointer-events-none absolute -bottom-10 right-[-3rem] hidden h-[24rem] w-[24rem] text-cream opacity-[0.06] lg:block"
      />

      <div className="eb-shell relative z-10">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16 xl:gap-20">
          <div data-reveal>
            <p className="eb-eyebrow eb-eyebrow--left !text-gold">Quality &amp; Certifications</p>
            <h2
              id="quality-heading"
              className="mt-4 max-w-[31rem] text-[clamp(2.1rem,3.7vw,3.05rem)] font-semibold text-white"
            >
              Committed to Quality and Safety
            </h2>
            <span aria-hidden="true" className="mt-6 block h-px w-24 bg-gradient-to-r from-gold to-gold/0" />
            <p className="mt-6 max-w-[25rem] text-[0.99rem] leading-[1.75] text-cream/80">
              We follow strict food safety standards to bring you only the best.
            </p>
            <a
              href="#contact"
              className="eb-btn eb-btn--ghost-light mt-8 min-h-[3rem] px-5 text-[0.86rem]"
            >
              Ask about our standards
              <ArrowRight className="eb-arrow h-4 w-4" aria-hidden="true" />
            </a>
          </div>

          <div data-reveal style={{ transitionDelay: '90ms' }}>
            <div className="rounded-[1.75rem] border border-cream/15 bg-cream/[0.06] p-2 shadow-[inset_0_1px_0_rgba(255,245,233,0.08)] backdrop-blur-sm sm:p-3">
              <ul className="grid divide-y divide-cream/12 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
                {site.credentials.map((credential) => {
                  const Icon = iconMap[credential.icon];
                  return (
                    <li
                      key={credential.id}
                      className="flex flex-col items-center px-5 py-7 text-center sm:px-4 sm:py-8 lg:px-5"
                    >
                      <span className="flex h-[4.35rem] w-[4.35rem] items-center justify-center rounded-full border border-gold/55 bg-burgundy-deep/35 text-gold shadow-[inset_0_0_0_5px_rgba(143,20,39,0.5)]">
                        <Icon className="h-7 w-7" strokeWidth={1.6} aria-hidden="true" />
                      </span>
                      <h3 className="mt-5 flex min-h-[3.7rem] max-w-[10.5rem] items-center justify-center font-display text-[0.93rem] font-medium leading-snug text-cream">
                        {credential.label}
                      </h3>
                      <span className="mt-2 whitespace-nowrap rounded-full border border-gold/35 bg-gold/10 px-2 py-1 font-display text-[0.58rem] font-semibold uppercase tracking-[0.12em] text-gold">
                        {credential.status}
                      </span>
                      <p className="sr-only">{credential.description}</p>
                    </li>
                  );
                })}
              </ul>
            </div>

            {!site.credentialsVerified && (
              <p className="mt-5 flex items-start gap-2.5 rounded-xl border border-cream/12 bg-burgundy-deep/20 px-4 py-3 text-[0.73rem] leading-relaxed text-cream/75">
                <Info className="mt-[0.12rem] h-4 w-4 shrink-0 text-gold/85" aria-hidden="true" />
                <span>{site.credentialsNote}</span>
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
