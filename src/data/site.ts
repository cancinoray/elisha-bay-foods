export const site = {
  name: 'Elisha Bay',
  legalName: 'Elisha Bay Dagupan Bangus and Seafoods',
  tagline: 'Every mouthful is delightful!',
  description:
    'Premium Dagupan bangus and gourmet seafood products made with quality, care, and Filipino pride.',
  location: {
    city: 'Dagupan City',
    region: 'Pangasinan',
    country: 'Philippines',
    label: 'Dagupan City, Pangasinan',
  },
  social: {
    facebook: 'https://www.facebook.com/elishabayfoods/',
    messenger: 'https://m.me/elishabayfoods',
    handle: '@elishabayfoods',
  },
  /**
   * Client contact details are intentionally withheld until supplied and confirmed.
   * Add email / phone / full address here when available; the contact section
   * and footer adapt automatically.
   */
  contact: {
    email: '',
    phone: '',
    streetAddress: '',
  },
  credentials: [
    {
      id: 'gmp',
      label: 'Good Manufacturing Practices',
      status: 'Verification pending',
      description:
        'Credential details will be published once supporting documents are confirmed by Elisha Bay.',
      icon: 'shield-check' as const,
    },
    {
      id: 'product-registration',
      label: 'Product Registration',
      status: 'Verification pending',
      description:
        'Product registration references are pending documentary confirmation.',
      icon: 'badge-check' as const,
    },
    {
      id: 'facility-registration',
      label: 'Facility Registration',
      status: 'Verification pending',
      description:
        'Facility registration details are pending documentary confirmation.',
      icon: 'factory' as const,
    },
  ],
  credentialsNote:
    'Certification details are being verified. They will only be displayed once supporting documents have been confirmed.',
  nav: [
    { label: 'Home', href: '#home' },
    { label: 'Our Products', href: '#products' },
    { label: 'About Us', href: '#about' },
    { label: 'Quality & Certifications', href: '#quality' },
    { label: 'Contact Us', href: '#contact' },
  ],
  inquiryTypes: [
    'Product inquiry',
    'Wholesale / reseller',
    'Distribution / export',
    'Partnership',
    'Other',
  ],
  /** Official page confirmed as Elisha Bay's public Facebook presence. */
  facebookVerified: true,
  /** Certification badges are deliberately withheld until verified. */
  credentialsVerified: false,
};

export type Site = typeof site;

/** Compose a Messenger handoff URL with the inquiry pre-filled. */
export function buildMessengerUrl(message: string) {
  return `${site.social.messenger}?text=${encodeURIComponent(message)}`;
}
