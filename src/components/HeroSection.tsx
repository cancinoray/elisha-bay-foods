import { ArrowDown, ArrowRight, Mail, MapPin } from 'lucide-react';
import { site } from '../data/site';
import { BrushUnderline, Sunburst } from './Decor';
import { HeroRibbon } from './Waves';

export function HeroSection() {
  return (
    <section
      id="home"
      aria-labelledby="hero-heading"
      className="relative isolate overflow-hidden pt-[6.5rem] sm:pt-[7.5rem] lg:pt-[9rem]"
    >
      {/* Warm ambient wash */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_78%_24%,rgba(242,189,54,0.16),transparent_47%),radial-gradient(ellipse_at_8%_72%,rgba(181,9,24,0.05),transparent_40%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-24 top-24 -z-10 h-[26rem] w-[26rem] rounded-full bg-cream-deep/70 blur-3xl"
      />
      <Sunburst
        ariaHidden
        className="pointer-events-none absolute right-[6%] top-[10%] -z-10 hidden h-40 w-40 text-gold/70 lg:block"
      />

      <div className="eb-shell">
        <div className="grid items-center gap-10 pb-12 sm:gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-8 lg:pb-16 xl:gap-14">
          <div className="relative z-10 max-w-[41rem]">
            <p className="eb-hero-fade inline-flex items-center gap-2 rounded-full border border-burgundy/15 bg-cream-soft/70 px-3.5 py-1.5 font-display text-[0.68rem] font-medium uppercase tracking-[0.18em] text-burgundy">
              <MapPin className="h-3.5 w-3.5 text-gold-deep" aria-hidden="true" />
              Dagupan City, Philippines
            </p>

            <h1
              id="hero-heading"
              className="mt-5 font-script text-[clamp(2.9rem,6.2vw,5.35rem)] font-normal leading-[0.96] text-burgundy sm:mt-6 lg:mt-7"
            >
              <span className="eb-hero-line block whitespace-nowrap">Every Mouthful</span>{' '}
              <span className="eb-hero-line relative mt-1 block whitespace-nowrap pl-[0.14em] sm:pl-[0.2em]">
                is Delightful!
                <BrushUnderline className="absolute -bottom-4 left-[0.1em] h-5 w-[82%] sm:-bottom-5 sm:h-6 lg:w-[88%]" />
              </span>
            </h1>

            <p className="eb-hero-fade mt-9 max-w-[31rem] text-[1.02rem] leading-[1.7] text-bark sm:text-[1.08rem] lg:mt-10">
              Premium Bangus and Seafood Products made with quality, care, and{' '}
              <span className="font-medium text-burgundy">Filipino pride.</span>
            </p>

            <div className="eb-hero-fade mt-7 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-5 lg:mt-8">
              <a href="#contact" className="eb-btn eb-btn--primary w-full sm:w-auto">
                <Mail className="h-[1.1rem] w-[1.1rem]" aria-hidden="true" />
                Inquire Now
                <ArrowRight className="eb-arrow h-[1.05rem] w-[1.05rem]" aria-hidden="true" />
              </a>
              <a
                href="#products"
                className="eb-link group justify-center px-2 py-2 sm:justify-start"
              >
                Explore our products
                <ArrowDown
                  className="h-4 w-4 transition-transform duration-200 group-hover:translate-y-0.5"
                  aria-hidden="true"
                />
              </a>
            </div>

            <p className="eb-hero-fade mt-5 flex items-start gap-2 text-[0.74rem] leading-relaxed text-bark-soft">
              <span className="mt-[0.42rem] h-1.5 w-1.5 shrink-0 rounded-full bg-gold" aria-hidden="true" />
              Inquiries are handled through our official Facebook page.
            </p>
          </div>

          <div className="eb-hero-photo relative mx-auto w-full max-w-[32rem] pb-4 lg:max-w-[35rem] lg:pb-0">
            <div
              aria-hidden="true"
              className="absolute -inset-3 -z-10 rounded-[48%_48%_2.25rem_2.25rem/36%_36%_2.25rem_2.25rem] bg-gradient-to-br from-gold/25 via-cream-deep/40 to-burgundy/10 blur-[2px]"
            />
            <figure className="relative">
              <div className="eb-arch relative overflow-hidden border-[6px] border-cream-soft shadow-frame ring-1 ring-gold/45">
                <picture>
                  <source
                    type="image/webp"
                    srcSet="/images/hero-jars-800.webp 800w, /images/hero-jars-1200.webp 1200w"
                    sizes="(min-width: 1024px) 44vw, (min-width: 640px) 80vw, 92vw"
                  />
                  <img
                    src="/images/hero-jars-1200.jpg"
                    alt="Three glass jars of preserved bangus in tomato sauce, olive oil, and soy sauce, arranged on a wooden board with garlic and tomatoes"
                    width={1200}
                    height={1200}
                    fetchPriority="high"
                    decoding="async"
                    className="aspect-[5/6] h-full w-full object-cover object-[50%_54%] sm:aspect-[1/1] lg:aspect-[5/6]"
                  />
                </picture>
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-burgundy-deep/65 via-burgundy-deep/15 to-transparent"
                />
                <figcaption className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 px-5 pb-5 pt-10 sm:px-6 sm:pb-6">
                  <span className="font-script text-[1.3rem] leading-none text-cream sm:text-[1.5rem]">
                    From Dagupan, with pride.
                  </span>
                  <span className="mb-0.5 inline-flex items-center gap-1.5 rounded-full border border-cream/30 bg-cream/10 px-2.5 py-1 font-display text-[0.56rem] font-medium uppercase tracking-[0.16em] text-cream/95 backdrop-blur-sm">
                    <MapPin className="h-3 w-3 text-gold" aria-hidden="true" />
                    Pangasinan
                  </span>
                </figcaption>
              </div>

            </figure>
          </div>
        </div>
      </div>

      <HeroRibbon />

      <p className="sr-only">{site.tagline}</p>
    </section>
  );
}
