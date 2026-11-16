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

        <ul className="mt-10 grid grid-cols-1 gap-5 min-[440px]:grid-cols-2 sm:mt-12 sm:gap-6 lg:grid-cols-4 lg:gap-5">
          {products.map((product, index) => (
            <li
              key={product.id}
              data-reveal
              style={{ transitionDelay: `${index * 70}ms` }}
            >
              <ProductCard product={product} onSelect={onProductInquiry} />
            </li>
          ))}
        </ul>

        <div
          className="mx-auto mt-10 flex max-w-[48rem] flex-col items-center gap-4 text-center sm:mt-12"
          data-reveal
        >
          <p className="flex items-start justify-center gap-2 text-[0.73rem] leading-relaxed text-bark-soft/90">
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
      className="group relative flex h-full flex-col rounded-[1.6rem] border border-gold/30 bg-cream-soft/90 p-2.5 shadow-card transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-1.5 hover:border-gold/70 hover:shadow-[0_30px_60px_-30px_rgba(92,9,20,0.5)] focus-visible:-translate-y-1.5"
    >
      <div className="relative overflow-hidden rounded-[1.2rem] bg-cream-deep">
        <picture>
          <source
            type="image/webp"
            srcSet={product.image.srcSet}
            sizes="(min-width: 1024px) 22vw, (min-width: 440px) 46vw, 92vw"
          />
          <img
            src={product.image.src.replace('webp', 'jpg')}
            alt={product.image.alt}
            width={product.image.width}
            height={product.image.height}
            loading="lazy"
            decoding="async"
            style={{ objectPosition: product.image.position }}
            className="aspect-[5/6] w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.045]"
          />
        </picture>
        <span
          aria-hidden="true"
          className="absolute left-3 top-3 flex h-8 w-8 items-center justify-center rounded-full border border-cream/45 bg-cream/85 text-burgundy shadow-sm backdrop-blur-sm"
        >
          <Fish className="h-4 w-4" />
        </span>
        <span
          aria-hidden="true"
          className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full border border-cream/40 bg-burgundy/85 text-cream opacity-0 shadow-sm backdrop-blur-sm transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:opacity-100 sm:translate-y-1"
        >
          <ArrowUpRight className="h-4 w-4" />
        </span>
      </div>

      <div className="relative flex flex-1 flex-col items-center justify-between rounded-[1.15rem] px-2 pb-2 pt-5 text-center">
        <span
          aria-hidden="true"
          className="absolute left-1/2 top-0 h-px w-12 -translate-x-1/2 bg-gold/60"
        />
        <h3 className="font-display text-[1rem] font-semibold leading-snug text-burgundy sm:text-[1.03rem]">
          {product.name}
        </h3>
        <span className="mt-2 inline-flex items-center gap-1.5 font-display text-[0.7rem] font-medium text-bark-soft transition-colors group-hover:text-burgundy">
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
