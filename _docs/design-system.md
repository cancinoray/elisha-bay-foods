# Design System

The rules that keep the Elisha Bay site recognizable as it grows. Tokens live in
[`src/index.css`](../src/index.css); this document explains how to use them. If a value is missing,
add a token rather than hard-coding a one-off.

## 1. Brand idea

Premium Filipino seafood, warm and appetizing, with a hand-made editorial feel. Cream paper,
burgundy depth, gold accents, large food photography, organic waves and restrained script
statements. Avoid generic corporate SaaS layouts, hard edges, neon accents and e-commerce chrome.

## 2. Tokens

| Token | Value | Use |
| ----- | ----- | --- |
| `--color-cream` | `#FFF5E9` | page background |
| `--color-cream-soft` | `#FFFAF3` | cards, light surfaces |
| `--color-cream-deep` | `#F8E8D3` | image backdrops, soft depth |
| `--color-burgundy` | `#8F1427` | primary brand, dark sections |
| `--color-burgundy-deep` | `#5C0914` | footer, depth |
| `--color-crimson` | `#B50918` | primary CTA hover, errors |
| `--color-gold` | `#F2BD36` | accents, rules, focus on dark |
| `--color-gold-deep` | `#7D5810` | small text on cream |
| `--color-charcoal` | `#252525` | strong text |
| `--color-bark` | `#4A332D` | body text |
| `--color-bark-soft` | `#6D554C` | secondary text |

Shadows: `--shadow-card`, `--shadow-frame`, `--shadow-button`. Radii are deliberately generous;
use the existing `rounded-*`/`eb-arch`/`eb-organic` treatments, not arbitrary new shapes.

## 3. Type

| Role | Family | Rules |
| ---- | ------ | ----- |
| Brand statements | Kaushan Script | Hero, About heading, footer CTA only. Never navigation, body or product descriptions. |
| Headings / labels / nav / CTAs | Poppins | 500–700; tight tracking for display, wider uppercase tracking for eyebrows. |
| Body / supporting copy | Inter | 400–600; 1.65–1.8 line-height. |

Type scale is fluid via `clamp()` in components. Keep the H1 as the only H1; section headings are
H2; cards use H3. Do not add a second script face.

## 4. Logo

The supplied official logo is the only brand mark. Transparent variants live in `public/logo/`;
`assets/brand/` keeps the source and master. Use the full lockup in the header/footer/OG; keep its
clear space and aspect ratio. On burgundy surfaces, place it on the cream badge used in the footer —
the tagline and fish rely on a light ground. Never recolor, redraw, crop the tagline or substitute
the earlier custom crest. Favicons/app icons are derived from the same asset; regenerate them if the
official vector replaces the source.

## 5. Components

| Component | Responsibility | States |
| --------- | -------------- | ------ |
| `Navbar` | fixed navigation, scroll spy, mobile disclosure | transparent at top, solid on scroll, open/closed, active link |
| `HeroSection` | proposition, CTA, still-life frame | load animation, reduced motion |
| `ProductsSection` | actual range banner, ten packshot product cards and a full-range CTA strip | default, hover/focus lift, prefill on activate |
| `QualitySection` | trust posture and withheld credentials | neutral “verification pending” only |
| `AboutSection` | story, values disclosure, image | collapsed/expanded, reduced motion |
| `ContactSection` / `InquiryForm` | channels and form | default, focus, invalid, submitted, blocked popup, copied |
| `Logo` | official Elisha Bay lockup | header on cream, footer on cream badge, OG, icons |
| `Footer` | brand, trust lines, social, location | light-on-dark only |
| `Decor` / `Waves` | sunbursts, brush stroke, dividers | decorative, `aria-hidden` |

Rules:

- Components own their spacing; parents do not reach in.
- Reuse `eb-btn`, `eb-field`, `eb-eyebrow`, `eb-shell` and the decorative components before adding
  new patterns.
- Every interactive element has a visible keyboard focus. On dark sections the ring is gold; inside
  the cream form it is burgundy.
- Hover effects never carry information alone; the same action is available by keyboard.
- Do not introduce a component library or icon set. Lucide is the icon source.

## 6. Layout and responsive

- Content shell: `eb-shell`, max width 78rem with 1.25rem/2rem/2.5rem gutters.
- Breakpoints follow Tailwind defaults; the important behavior changes are:
  - navigation switches to the mobile disclosure below `1024px`;
  - product grid: 1 column below 440px, 2 columns to 1023px, 4 columns at 1024px+, 5 columns at 1280px+ (10 products, CTA strip below); mobile uses compact horizontal cards;
  - hero stacks below 1024px; the image remains the dominant element;
  - contact/form and about/image stack below 1024px.
- Verify 320, 375, 414, 768, 1024, 1440 and 1920. No horizontal overflow at any of them.
- Images always have width/height and a meaningful `sizes`/`srcSet`. No layout shift.

## 7. Motion

- Purposeful only: hero entrance, scroll reveals, card lift, menu panel, hover arrows.
- Respect `prefers-reduced-motion: reduce`; content must be readable with transitions and
  animations disabled.
- No parallax, autoplay video, looping ambient motion or scroll hijacking.

## 8. Accessibility

- WCAG 2.1 AA contrast for all text. Gold is not used for small text on cream.
- Semantic landmarks, one H1, labelled sections, skip link, visible focus.
- The mobile menu is a disclosure with `aria-expanded`, `aria-controls`, Escape, focus return and a
  tab loop. Body scroll is locked while open.
- Form labels are real labels; errors are linked with `aria-describedby`/`aria-invalid`; the status
  message is announced.
- Decorative SVG is `aria-hidden`; icons never replace a text label for a meaningful action.
- axe must report zero WCAG A/AA violations at 1440 and 390 before merge.

## 9. Content

- Voice: warm, confident, specific, never over-claiming. “Every mouthful is delightful!” is the
  brand line.
- Never invent a certification, contact detail, price, size, ingredient, award or company-history
  fact. Use the placeholder state and flag it for human approval.
- Product copy uses the supplied name, category, description and packshot. Do not add sizes, prices
  or ingredients that are not in the approved source; printed size/batch details are pending.
- The hero still-life is concept photography; the range photograph is actual. Keep the distinction
  clear in the product disclaimer and do not present the hero as a packshot.
- Contact channels use the confirmed phone/email/Facebook/Instagram data. The street address is
  withheld until supplied.
- Errors say what happened and what to do next; they do not blame the user.
- Keep disclosures legible: concept hero photography, pending packshots and concept About
  photography are visible, not buried.
