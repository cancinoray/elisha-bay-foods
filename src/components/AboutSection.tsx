import { ChevronDown, HeartHandshake, MapPin, Users } from 'lucide-react';
import { useState } from 'react';
import { GoldRule, Sunburst } from './Decor';
import { WaveScratch } from './Waves';

const values = [
  {
    icon: HeartHandshake,
    title: 'Handled with care',
    copy: 'Careful preparation and attention at every step, from sourcing to the finished jar.',
  },
  {
    icon: MapPin,
    title: 'Rooted in Dagupan',
    copy: 'From the bangus capital of the Philippines, made for tables here and abroad.',
  },
  {
    icon: Users,
    title: 'A family business',
    copy: 'Built around food, family, and the community that makes every catch possible.',
  },
];

export function AboutSection() {
  const [expanded, setExpanded] = useState(false);

  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="relative overflow-hidden py-16 sm:py-20 lg:py-28"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-28 top-1/4 h-[30rem] w-[30rem] rounded-full bg-cream-deep/60 blur-3xl"
      />
      <Sunburst
        ariaHidden
        className="pointer-events-none absolute left-[44%] top-16 hidden h-24 w-24 text-gold/70 lg:block"
      />

      <div className="eb-shell relative">
        <div className="grid items-center gap-12 lg:grid-cols-[0.96fr_1.04fr] lg:gap-16 xl:gap-20">
          <div data-reveal>
            <p className="eb-eyebrow">Our Story</p>
            <h2
              id="about-heading"
              className="mt-4 font-script text-[clamp(2.8rem,5vw,4.4rem)] leading-[1.02] text-burgundy"
            >
              About Elisha Bay
            </h2>
            <WaveScratch className="mt-1 h-4 w-24 text-gold" />

            <p className="mt-7 max-w-[33rem] text-[0.99rem] leading-[1.8] text-bark sm:text-[1.03rem]">
              A trusted name in premium bangus and seafood products, Elisha Bay is dedicated to
              bringing the best of the sea to your table. With our commitment to quality and
              excellence, we ensure every jar is packed with goodness.
            </p>

            <blockquote className="mt-7 flex max-w-[30rem] gap-4 border-l-2 border-gold/70 pl-4">
              <p className="font-display text-[0.92rem] font-medium leading-relaxed text-burgundy">
                &ldquo;Quality you can trust. A taste of the Philippines.&rdquo;
              </p>
            </blockquote>

            <button
              type="button"
              aria-expanded={expanded}
              aria-controls="about-values"
              onClick={() => setExpanded((value) => !value)}
              className="eb-btn eb-btn--outline mt-8 min-h-[3rem] px-5 text-[0.86rem]"
            >
              {expanded ? 'Show Less' : 'Learn More'}
              <ChevronDown
                className={`h-4 w-4 transition-transform duration-300 ${expanded ? 'rotate-180' : ''}`}
                aria-hidden="true"
              />
            </button>

            <div
              id="about-values"
              className={`grid transition-[grid-template-rows,opacity] duration-500 ease-out ${
                expanded ? 'mt-6 grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
              }`}
              aria-hidden={!expanded}
            >
              <div className="overflow-hidden">
                <GoldRule className="mb-5" />
                <ul className="grid gap-4 sm:grid-cols-3">
                  {values.map(({ icon: Icon, title, copy }) => (
                    <li key={title} className="rounded-2xl border border-gold/25 bg-cream-soft/80 p-4">
                      <Icon className="h-5 w-5 text-gold-deep" aria-hidden="true" />
                      <h3 className="mt-3 font-display text-[0.85rem] font-semibold text-burgundy">
                        {title}
                      </h3>
                      <p className="mt-1.5 text-[0.76rem] leading-relaxed text-bark-soft">{copy}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-[32rem] lg:max-w-none" data-reveal>
            <div
              aria-hidden="true"
              className="absolute -right-4 -top-4 h-[88%] w-[92%] rotate-2 rounded-[54%_46%_48%_52%/44%_52%_48%_56%] border border-gold/40"
            />
            <figure className="relative">
              <div className="eb-organic overflow-hidden border-[6px] border-cream-soft shadow-frame ring-1 ring-gold/35">
                <picture>
                  <source
                    type="image/webp"
                    srcSet="/images/about-dish-720.webp 720w, /images/about-dish-900.webp 900w"
                    sizes="(min-width: 1024px) 46vw, (min-width: 640px) 78vw, 92vw"
                  />
                  <img
                    src="/images/about-dish-900.jpg"
                    alt="Golden fried whole fish served with vegetables and calamansi on a dark slate board"
                    width={900}
                    height={1125}
                    loading="lazy"
                    decoding="async"
                    className="aspect-[4/5] w-full object-cover sm:aspect-[5/5] lg:aspect-[4/5]"
                  />
                </picture>
              </div>

              <figcaption className="absolute -bottom-6 left-2 max-w-[17rem] rounded-2xl border border-gold/35 bg-cream-soft/95 px-5 py-4 shadow-card backdrop-blur-sm sm:-left-6 sm:bottom-6">
                <span className="font-script text-[1.15rem] leading-tight text-burgundy sm:text-[1.3rem]">
                  Every jar is packed with goodness.
                </span>
                <span className="mt-1.5 block font-display text-[0.55rem] font-semibold uppercase tracking-[0.18em] text-gold-deep">
                  The Elisha Bay promise
                </span>
              </figcaption>
            </figure>
            <p className="mt-9 text-right text-[0.62rem] leading-relaxed text-bark-soft sm:mt-8">
              Concept food photography for the brand story. Actual product photography appears in Our Products.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
