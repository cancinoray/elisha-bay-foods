import { ArrowRight, ArrowUpRight, Fish, Info } from 'lucide-react';
import { productDisclaimer, products, type Product } from '../data/products';
import { Sunburst } from './Decor';
import { WaveScratch } from './Waves';

type ProductSectionProps = {
  onProductInquiry: (productName: string) => void;
};

export function ProductsSection({ onProductInquiry }: ProductSectionProps) {
  return (
    <section
      id="products"
      aria-labelledby="products-heading"
      className="relative overflow-hidden py-16 sm:py-20 lg:py-24"
    >
      <Sunburst
        ariaHidden
        className="pointer-events-none absolute -left-10 top-24 h-36 w-36 text-gold/60 sm:left-4 sm:h-44 sm:w-44"
      />
      <Sunburst
        ariaHidden
        className="pointer-events-none absolute -right-12 top-40 h-32 w-32 text-gold/50 sm:right-6 sm:h-40 sm:w-40"
      />

      <div className="eb-shell relative">
        <header className="mx-auto max-w-[52rem] text-center" data-reveal>
          <p className="eb-eyebrow">Our Products</p>
          <h2
            id="products-heading"
            className="mt-4 text-[clamp(2rem,3.9vw,3.2rem)] font-semibold text-burgundy"
          >
            Delicious Seafood Goodness
          </h2>
          <WaveScratch className="mx-auto mt-3 h-4 w-28 text-gold" />
          <p className="mx-auto mt-4 max-w-[34rem] text-[0.98rem] leading-relaxed text-bark-soft">
            A variety of gourmet seafood products, crafted for your family&apos;s enjoyment.
          </p>
        </header>

        <figure className="relative mt-9 sm:mt-11" data-reveal>
          <div className="relative overflow-hidden rounded-[1.9rem] border border-gold/35 bg-cream-deep shadow-card">
            <picture>
              <source
                type="image/webp"
                srcSet="/images/elisha-bay-range-900.webp 900w, /images/elisha-bay-range-1200.webp 1200w, /images/elisha-bay-range-1800.webp 1800w"
                sizes="(min-width: 1024px) 72rem, 100vw"
              />
              <img
                src="/images/elisha-bay-range-1800.jpg"
                alt="The actual Elisha Bay range: seven jars of bangus and tuyo varieties displayed with their product descriptions"
                width={1800}
                height={721}
                loading="lazy"
                decoding="async"
                className="aspect-[2.5/1] w-full object-cover object-[50%_42%] sm:aspect-[2.35/1]"
              />
            </picture>
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 bg-gradient-to-t from-burgundy-deep via-burgundy-deep/25 to-transparent"
            />
            <figcaption className="absolute inset-x-0 bottom-0 flex flex-col gap-1 p-5 sm:flex-row sm:items-end sm:justify-between sm:p-7">
              <div>
                <p className="font-script text-[1.6rem] leading-none text-cream sm:text-[2rem]">
                  The actual range.
                </p>
                <p className="mt-1.5 text-[0.62rem] font-medium uppercase tracking-[0.18em] text-cream/80">
                  Seven varieties · dagupan, philippines
                </p>
              </div>
              <span className="inline-flex w-fit items-center gap-1.5 rounded-full border border-cream/25 bg-cream/10 px-3 py-1.5 text-[0.62rem] font-medium text-cream/90 backdrop-blur-sm">
                <Fish className="h-3.5 w-3.5 text-gold" aria-hidden="true" />
                Actual product photography
              </span>
            </figcaption>
          </div>
        </figure>

        <ul className="mt-8 grid grid-cols-1 gap-4 min-[440px]:grid-cols-2 sm:mt-10 lg:grid-cols-4 lg:gap-5">
          {products.map((product, index) => (
            <li key={product.id} data-reveal style={{ transitionDelay: `${index * 50}ms` }}>
              <ProductCard product={product} onSelect={onProductInquiry} />
            </li>
          ))}
          <li data-reveal style={{ transitionDelay: `${products.length * 50}ms` }}>
            <RangeCta onSelect={onProductInquiry} />
          </li>
        </ul>

        <div
          className="mx-auto mt-9 flex max-w-[52rem] flex-col items-center gap-4 text-center sm:mt-11"
          data-reveal
        >
          <p className="flex items-start justify-center gap-2 text-[0.72rem] leading-relaxed text-bark-soft">
            <Info className="mt-[0.15rem] h-3.5 w-3.5 shrink-0 text-gold-deep/80" aria-hidden="true" />
            <span>{productDisclaimer}</span>
          </p>
          <a href="#contact" className="eb-link">
            Looking for a specific product? Ask us
            <ArrowRight className="eb-arrow h-4 w-4" aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  );
}

type ProductCardProps = {
  product: Product;
  onSelect: (productName: string) => void;
};

function ProductCard({ product, onSelect }: ProductCardProps) {
  return (
    <a
      href="#contact"
      onClick={() => onSelect(product.name)}
      className="group flex h-full flex-col rounded-[1.5rem] border border-gold/30 bg-cream-soft/90 p-5 shadow-card transition-[transform,box-shadow,border-color,background-color] duration-300 hover:-translate-y-1 hover:border-gold/65 hover:bg-cream-soft hover:shadow-[0_28px_55px_-30px_rgba(92,9,20,0.45)] focus-visible:-translate-y-1"
    >
      <div className="flex items-start justify-between gap-3">
        <span className="rounded-full border border-gold/30 bg-cream px-2.5 py-1 font-display text-[0.58rem] font-semibold uppercase tracking-[0.15em] text-burgundy">
          {product.category}
        </span>
        <Fish className="h-4 w-4 shrink-0 text-gold-deep/70" aria-hidden="true" />
      </div>
      <h3 className="mt-4 font-display text-[1.02rem] font-semibold leading-snug text-burgundy">
        {product.name}
      </h3>
      <p className="mt-2 flex-1 text-[0.8rem] leading-relaxed text-bark-soft">
        {product.description}
      </p>
      <span className="mt-4 inline-flex items-center gap-1.5 border-t border-gold/25 pt-3 font-display text-[0.7rem] font-medium text-bark-soft transition-colors group-hover:text-burgundy">
        Inquire
        <ArrowUpRight
          className="h-3 w-3 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
          aria-hidden="true"
        />
      </span>
    </a>
  );
}

function RangeCta({ onSelect }: { onSelect: (productName: string) => void }) {
  return (
    <a
      href="#contact"
      onClick={() => onSelect('the full Elisha Bay range')}
      className="group flex h-full flex-col justify-between rounded-[1.5rem] border border-burgundy bg-burgundy p-5 text-cream shadow-card transition-[transform,box-shadow,background-color] duration-300 hover:-translate-y-1 hover:bg-crimson hover:shadow-[0_28px_55px_-26px_rgba(92,9,20,0.6)] focus-visible:-translate-y-1"
    >
      <div>
        <span className="inline-flex items-center gap-2 rounded-full border border-cream/25 bg-cream/10 px-2.5 py-1 font-display text-[0.58rem] font-semibold uppercase tracking-[0.15em] text-cream">
          <Fish className="h-3.5 w-3.5" aria-hidden="true" />
          Full range
        </span>
        <h3 className="mt-4 font-script text-[1.75rem] leading-tight text-cream">
          And More Seafood Delights
        </h3>
        <p className="mt-2 text-[0.8rem] leading-relaxed text-cream/75">
          Looking for a specific variant, a reseller pack, or an export inquiry? Ask us.
        </p>
      </div>
      <span className="mt-5 inline-flex items-center gap-1.5 border-t border-cream/20 pt-3 font-display text-[0.7rem] font-medium text-cream">
        Talk to us
        <ArrowUpRight
          className="h-3 w-3 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
          aria-hidden="true"
        />
      </span>
    </a>
  );
}
