export type Product = {
  id: string;
  name: string;
  category: string;
  image: {
    src: string;
    srcSet: string;
    alt: string;
    width: number;
    height: number;
    position?: string;
  };
};

/**
 * PLACEHOLDER CONTENT.
 * Product names, packaging and photography are illustrative only. Replace this
 * data and the images in /public/images with approved Elisha Bay product assets
 * before launch. Do not add prices, weights or ingredient claims until verified.
 */
export const products: Product[] = [
  {
    id: 'bangus-soy',
    name: 'Bangus in Soy Sauce',
    category: 'Bangus',
    image: {
      src: '/images/product-soy-800.webp',
      srcSet:
        '/images/product-soy-400.webp 400w, /images/product-soy-800.webp 800w, /images/product-soy-1000.webp 1000w',
      alt: 'Glass jar of preserved bangus in soy sauce with garlic — placeholder product photography',
      width: 1000,
      height: 1200,
      position: '50% 45%',
    },
  },
  {
    id: 'bangus-spanish',
    name: 'Bangus Spanish Style',
    category: 'Bangus',
    image: {
      src: '/images/product-spanish-800.webp',
      srcSet:
        '/images/product-spanish-400.webp 400w, /images/product-spanish-800.webp 800w, /images/product-spanish-1000.webp 1000w',
      alt: 'Glass jar of bangus in a rich tomato sauce with carrots — placeholder product photography',
      width: 1000,
      height: 1200,
      position: '50% 45%',
    },
  },
  {
    id: 'bangus-olive-oil',
    name: 'Bangus in Olive Oil',
    category: 'Bangus',
    image: {
      src: '/images/product-olive-800.webp',
      srcSet:
        '/images/product-olive-400.webp 400w, /images/product-olive-800.webp 800w, /images/product-olive-1000.webp 1000w',
      alt: 'Glass jar of bangus in golden olive oil with herbs — placeholder product photography',
      width: 1000,
      height: 1200,
      position: '50% 45%',
    },
  },
  {
    id: 'seafood-selection',
    name: 'And More Seafood Delights',
    category: 'Seafood selection',
    image: {
      src: '/images/product-variety-800.webp',
      srcSet:
        '/images/product-variety-400.webp 400w, /images/product-variety-800.webp 800w, /images/product-variety-1000.webp 1000w',
      alt: 'A selection of glass jars filled with preserved seafood — placeholder product photography',
      width: 1000,
      height: 1200,
      position: '50% 45%',
    },
  },
];

export const productDisclaimer =
  'Product names, packaging and photography are placeholders pending official Elisha Bay assets.';
