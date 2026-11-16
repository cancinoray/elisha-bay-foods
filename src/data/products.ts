export type Product = {
  id: string;
  name: string;
  category: 'Bangus' | 'Tuyo';
  description: string;
};

/**
 * Product names and descriptions are drawn from the brand's own product signs
 * in the supplied range photograph (2026-11-16). Packshots, sizes and final
 * packaging copy are still pending, so they are intentionally absent here.
 */
export const products: Product[] = [
  {
    id: 'pinoy-adobo',
    name: 'Pinoy Adobo',
    category: 'Bangus',
    description:
      'Dagupan milkfish marinated in a special adobo sauce with garlic, black peppercorn and bay leaf in corn oil.',
  },
  {
    id: 'ba-yo',
    name: 'Ba-Yo (Bangus & Tuyo)',
    category: 'Bangus',
    description:
      'Dagupan milkfish and dried herring in a special adobo sauce with garlic, black pepper, carrots and bay leaf in corn oil.',
  },
  {
    id: 'hawaiian-style',
    name: 'Hawaiian Style Bangus',
    category: 'Bangus',
    description:
      'Dagupan milkfish in pineapple juice with pineapple, green peas, bell peppers, carrots and spices in corn oil.',
  },
  {
    id: 'basil-pesto',
    name: 'Bangus in Fresh Basil Pesto',
    category: 'Bangus',
    description:
      'Dagupan milkfish marinated in fresh basil pesto with olive oil and spices, then smothered in olive oil.',
  },
  {
    id: 'portuguese-style',
    name: 'Portuguese Style Bangus',
    category: 'Bangus',
    description:
      'Dagupan milkfish with carrots, pickled gherkin, bay leaf and whole black peppercorn in corn oil.',
  },
  {
    id: 'pesto-tuyo',
    name: 'Pesto Tuyo Delizioso',
    category: 'Tuyo',
    description:
      'Dried herring marinated in fresh basil pesto and smothered in olive oil for an East-meets-West preparation.',
  },
  {
    id: 'tuyo-delizioso',
    name: 'Tuyo Delizioso',
    category: 'Tuyo',
    description:
      'Portuguese-style bottled dried herring with spices in corn oil or olive oil. Less salt, more flavor.',
  },
];

export const productDisclaimer =
  'The hero still-life is concept photography. The range photograph shows actual Elisha Bay products; individual packshots, sizes and final packaging details are pending confirmation.';
