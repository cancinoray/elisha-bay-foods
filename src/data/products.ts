export type Product = {
  id: string;
  name: string;
  category: 'Bangus' | 'Tuyo';
  description: string;
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
 * Product names and descriptions come from the brand's own range signs and
 * labels. Individual packshots were supplied on 2026-11-16. Sizes printed on
 * the labels are intentionally not repeated in copy until the client confirms
 * which size statements should be published.
 */
export const products: Product[] = [
  {
    id: 'pinoy-adobo',
    name: 'Pinoy Adobo',
    category: 'Bangus',
    description:
      'Dagupan milkfish marinated in a special adobo sauce with garlic, black peppercorn and bay leaf in corn oil.',
    image: {
      src: '/images/product-pinoy-adobo-800.webp',
      srcSet:
        '/images/product-pinoy-adobo-400.webp 400w, /images/product-pinoy-adobo-800.webp 800w',
      alt: 'Jar of Elisha Bay Pinoy Adobo bangus, label facing forward',
      width: 800,
      height: 1067,
      position: '50% 58%',
    },
  },
  {
    id: 'ba-yo',
    name: 'Ba-Yo (Bangus & Tuyo)',
    category: 'Bangus',
    description:
      'Dagupan milkfish and dried herring in a special adobo sauce with garlic, black pepper, carrots and bay leaf in corn oil.',
    image: {
      src: '/images/product-ba-yo-800.webp',
      srcSet: '/images/product-ba-yo-400.webp 400w, /images/product-ba-yo-800.webp 800w',
      alt: 'Jar of Elisha Bay Ba-Yo bangus and tuyo, label facing forward',
      width: 800,
      height: 1067,
      position: '50% 58%',
    },
  },
  {
    id: 'hawaiian-style',
    name: 'Hawaiian Style Bangus',
    category: 'Bangus',
    description:
      'Dagupan milkfish in pineapple juice with pineapple, green peas, bell peppers, carrots and spices in corn oil.',
    image: {
      src: '/images/product-hawaiian-800.webp',
      srcSet:
        '/images/product-hawaiian-400.webp 400w, /images/product-hawaiian-800.webp 800w',
      alt: 'Jar of Elisha Bay Hawaiian Style Bangus, label facing forward',
      width: 800,
      height: 1067,
      position: '50% 58%',
    },
  },
  {
    id: 'portuguese-style',
    name: 'Portuguese Style Bangus',
    category: 'Bangus',
    description:
      'Dagupan milkfish with carrots, pickled gherkin, bay leaf and whole black peppercorn in corn oil.',
    image: {
      src: '/images/product-portuguese-800.webp',
      srcSet:
        '/images/product-portuguese-400.webp 400w, /images/product-portuguese-800.webp 800w',
      alt: 'Jar of Elisha Bay Portuguese Style Bangus, label facing forward',
      width: 800,
      height: 1067,
      position: '50% 58%',
    },
  },
  {
    id: 'basil-pesto',
    name: 'Bangus in Fresh Basil Pesto',
    category: 'Bangus',
    description:
      'Dagupan milkfish marinated in fresh basil pesto with olive oil and spices, then smothered in olive oil.',
    image: {
      src: '/images/product-basil-pesto-800.webp',
      srcSet:
        '/images/product-basil-pesto-400.webp 400w, /images/product-basil-pesto-800.webp 800w',
      alt: 'Jar of Elisha Bay Bangus in Fresh Basil Pesto, label facing forward',
      width: 800,
      height: 1067,
      position: '50% 58%',
    },
  },
  {
    id: 'tomato-sauce',
    name: 'Bangus with Tomato Sauce',
    category: 'Bangus',
    description: 'Dagupan milkfish with tomato sauce in corn oil.',
    image: {
      src: '/images/product-tomato-sauce-800.webp',
      srcSet:
        '/images/product-tomato-sauce-400.webp 400w, /images/product-tomato-sauce-800.webp 800w',
      alt: 'Jar of Elisha Bay Bangus with Tomato Sauce, label facing forward',
      width: 800,
      height: 1067,
      position: '50% 58%',
    },
  },
  {
    id: 'turmeric',
    name: 'Bangus with Turmeric',
    category: 'Bangus',
    description: 'Dagupan milkfish with turmeric in olive oil.',
    image: {
      src: '/images/product-turmeric-800.webp',
      srcSet:
        '/images/product-turmeric-400.webp 400w, /images/product-turmeric-800.webp 800w',
      alt: 'Jar of Elisha Bay Bangus with Turmeric in Olive Oil, label facing forward',
      width: 800,
      height: 1067,
      position: '50% 58%',
    },
  },
  {
    id: 'sun-dried-tomatoes',
    name: 'Bangus with Sun-Dried Tomatoes',
    category: 'Bangus',
    description: 'Dagupan milkfish with sun-dried tomatoes.',
    image: {
      src: '/images/product-sun-dried-tomatoes-800.webp',
      srcSet:
        '/images/product-sun-dried-tomatoes-400.webp 400w, /images/product-sun-dried-tomatoes-800.webp 800w',
      alt: 'Jar of Elisha Bay Bangus with Sun-Dried Tomatoes, label facing forward',
      width: 800,
      height: 1067,
      position: '50% 58%',
    },
  },
  {
    id: 'pesto-tuyo',
    name: 'Pesto Tuyo Delizioso',
    category: 'Tuyo',
    description:
      'Dried herring marinated in fresh basil pesto and smothered in olive oil for an East-meets-West preparation.',
    image: {
      src: '/images/product-pesto-tuyo-800.webp',
      srcSet:
        '/images/product-pesto-tuyo-400.webp 400w, /images/product-pesto-tuyo-800.webp 800w',
      alt: 'Jar of Elisha Bay Pesto Tuyo Delizioso, label facing forward',
      width: 800,
      height: 1067,
      position: '50% 58%',
    },
  },
  {
    id: 'tuyo-delizioso',
    name: 'Tuyo Delizioso',
    category: 'Tuyo',
    description:
      'Portuguese-style bottled dried herring with spices in corn oil or olive oil. Less salt, more flavor.',
    image: {
      src: '/images/product-tuyo-delizioso-800.webp',
      srcSet:
        '/images/product-tuyo-delizioso-400.webp 400w, /images/product-tuyo-delizioso-800.webp 800w',
      alt: 'Jar of Elisha Bay Tuyo Delizioso, label facing forward',
      width: 800,
      height: 1067,
      position: '50% 58%',
    },
  },
];

