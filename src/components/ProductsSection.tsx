import { ArrowRight, ArrowUpRight, Fish } from 'lucide-react';
import { products, type Product } from '../data/products';
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
                alt="The Elisha Bay range displayed with product signs and jars"
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
                  The Elisha Bay range · Dagupan, Philippines
                </p>
              </div>
              <span className="inline-flex w-fit items-center gap-1.5 rounded-full border border-cream/25 bg-cream/10 px-3 py-1.5 text-[0.62rem] font-medium text-cream/90 backdrop-blur-sm">
                <Fish className="h-3.5 w-3.5 text-gold" aria-hidden="true" />
                Actual product photography
              </span>
            </figcaption>
          </div>
        </figure>

        <ul className="mt-8 flex flex-wrap justify-center gap-4 sm:mt-10 lg:gap-5">
          {products.map((product, index) => (
            <li
              key={product.id}
              data-reveal
              style={{ transitionDelay: `${index * 40}ms` }}
              className="w-full sm:w-[calc(50%-0.5rem)] lg:w-[calc(25%-0.94rem)] xl:w-[calc(20%-1rem)]"
            >
              <ProductCard product={product} onSelect={onProductInquiry} />
            </li>
          ))}
        </ul>

        <a
          href="#contact"
          onClick={() => onProductInquiry('the full Elisha Bay range')}
          className="group mt-8 flex flex-col gap-5 rounded-[1.75rem] border border-burgundy bg-burgundy p-6 text-cream shadow-card transition-[background-color,transform,box-shadow] duration-300 hover:bg-crimson sm:mt-10 sm:flex-row sm:items-center sm:justify-between sm:p-8"
        >
          <div className="max-w-[40rem]">
            <span className="font-display text-[0.6rem] font-semibold uppercase tracking-[0.18em] text-cream/75">
              Full range
            </span>
            <p className="mt-2 font-script text-[1.8rem] leading-tight text-cream sm:text-[2.2rem]">
              And More Seafood Delights
            </p>
            <p className="mt-2 text-[0.86rem] leading-relaxed text-cream/75">
              Looking for a specific variant, a reseller pack, or an export inquiry? Ask us about the
              full range.
            </p>
          </div>
          <span className="eb-btn eb-btn--gold w-full shrink-0 sm:w-auto">
            Talk to us
            <ArrowUpRight
              className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              aria-hidden="true"
            />
          </span>
        </a>

        <div
          className="mx-auto mt-9 flex max-w-[52rem] flex-col items-center gap-4 text-center sm:mt-11"
          data-reveal
        >
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
      className="group flex h-full flex-row overflow-hidden rounded-[1.5rem] border border-gold/30 bg-cream-soft/90 shadow-card transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-1 hover:border-gold/65 hover:shadow-[0_28px_55px_-30px_rgba(92,9,20,0.45)] focus-visible:-translate-y-1 sm:flex-col"
    >
      <div className="relative w-[6.5rem] shrink-0 overflow-hidden bg-cream-deep sm:w-full">
        <picture>
          <source
            type="image/webp"
            srcSet={product.image.srcSet}
            sizes="(min-width: 1280px) 20vw, (min-width: 1024px) 25vw, (min-width: 640px) 46vw, 34vw"
          />
          <img
            src={product.image.src.replace('webp', 'jpg')}
            alt={product.image.alt}
            width={product.image.width}
            height={product.image.height}
            loading="lazy"
            decoding="async"
            style={{ objectPosition: product.image.position }}
            className="h-full min-h-[8.5rem] w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03] sm:aspect-[3/4] sm:h-auto sm:min-h-0"
          />
        </picture>
        <span className="absolute left-2.5 top-2.5 inline-flex h-7 w-7 items-center justify-center rounded-full border border-cream/50 bg-cream/90 text-burgundy shadow-sm backdrop-blur-sm">
          <Fish className="h-3.5 w-3.5" aria-hidden="true" />
        </span>
      </div>

      <div className="flex min-w-0 flex-1 flex-col p-4 sm:p-4">
        <span className="font-display text-[0.58rem] font-semibold uppercase tracking-[0.15em] text-gold-deep">
          {product.category}
        </span>
        <h3 className="mt-1.5 font-display text-[0.98rem] font-semibold leading-snug text-burgundy">
          {product.name}
        </h3>
        <p className="mt-2 flex-1 text-[0.78rem] leading-relaxed text-bark-soft">
          {product.description}
        </p>
        <span className="mt-3 inline-flex items-center gap-1.5 border-t border-gold/25 pt-3 font-display text-[0.68rem] font-medium text-bark-soft transition-colors group-hover:text-burgundy">
          Inquire
          <ArrowUpRight
            className="h-3 w-3 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            aria-hidden="true"
          />
        </span>
      </div>
    </a>
  );
}
