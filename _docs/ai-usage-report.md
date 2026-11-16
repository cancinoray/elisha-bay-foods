# AI Usage Report

A session-by-session record of what AI produced and what a human or independent check verified.
Append, newest first. Do not record “done” unless the evidence is named.

## 2026-11-16 — Ten product packshots and card images

**Branch:** `feat/product-card-images` (stacked on `feat/real-products-contacts`; unmerged)

**Scope:** Add the ten supplied product packshots to the product cards and include the three
additional products shown in those photographs.

**What AI produced**

- Ten product entries in `src/data/products.ts`, including the three products not present in the
  earlier range photo: Bangus with Tomato Sauce, Bangus with Turmeric, Bangus with Sun-Dried
  Tomatoes.
- Responsive images for every card (400/800 WebP + JPEG fallback), lightly graded and cropped to a
  3:4 card frame. The supplied green factory/display background is retained; labels are not
  retouched.
- Product cards with images, descriptions and category; mobile uses compact horizontal cards; the
  full-range CTA is now a full-width strip.
- The range photo stays as the section opener but no longer claims a seven-product count.
- Disclaimer updated: hero is concept photography, cards use supplied packshots, and published
  sizes/batch details/final packaging copy are pending.
- QA suite updated for ten cards, product image alt text and the new disclaimer.

**Builder verification**

- `make verify` — typecheck, build and **14/14** Playwright tests passed.
- axe WCAG A/AA: 0 violations at 1440px and 390px.
- No horizontal overflow; mobile horizontal card layout and desktop 4/5-column grid checked.

**Independent QA**

- Not yet run as a separate fresh-context session. This entry is engineering evidence, not a QA PASS.

**Human verification required**

- Confirm the ten names and which printed sizes may be published. Sizes remain absent from copy.
- Confirm the green packshot background and crop are acceptable, or supply studio cutouts.
- Confirm the three added products are current and the card descriptions are accurate.
- A real hero photograph is still the largest outstanding visual asset.

## 2026-11-16 — Real products, range photograph and contact channels

**Branch:** `feat/real-products-contacts` (stacked on `feat/logo-integration`; unmerged)

**Scope:** Replace the four illustrative product cards with the seven actual products and their
sign descriptions, use the supplied range photograph as the real product visual, and publish the
confirmed phone/email/Instagram channels. **(Superseded by the ten-packshot entry above.)**

**What AI produced**

- `src/data/products.ts`: seven products from the supplied range signs (Pinoy Adobo, Ba-Yo,
  Hawaiian Style Bangus, Bangus in Fresh Basil Pesto, Portuguese Style Bangus, Pesto Tuyo Delizioso,
  Tuyo Delizioso) with the sign descriptions. No sizes, prices or extra ingredients were invented.
- Products section: actual range photo (cropped and colour-graded; third-party leaflets excluded),
  seven description cards and an “And More Seafood Delights” enquiry card.
- `src/data/site.ts`: phones 0919 270 1448 / 0917 511 0223, email
  `elisha_bay2017@yahoo.com`, Instagram `@elishabayfoods`; street address remains blank.
- Contact section/footer: phone, email and Instagram rows/links added; the “pending contact details”
  state is removed. Organization JSON-LD now carries email/telephone and the Instagram profile.
- QA suite updated for eight cards, real names/descriptions, range image, contact links and JSON-LD.
- Product description disclaimer now distinguishes concept hero photography from the actual range
  photograph and pending individual packshots.

**Builder verification**

- `make verify` — typecheck, build and **14/14** Playwright tests passed.
- axe WCAG A/AA: 0 violations at 1440px and 390px.
- No horizontal overflow at the tested breakpoints.

**Independent QA**

- Not yet run as a separate fresh-context session. This entry is engineering evidence, not a QA PASS.

**Human verification required**

- Confirm the seven names/descriptions and that no size/price/ingredient should be added yet.
- Approve the trade-show range crop as temporary imagery; commission individual packshots and a
  real hero still-life. The trade show photo is not suitable as the hero.
- Approve the contact channels and confirm the street address (still withheld).
- Confirm the header logo treatment and the cream footer badge.

## 2026-11-16 — Official logo integration

**Branch:** `feat/logo-integration` (unmerged, awaiting human review/merge)

**Scope:** Replace the designed placeholder crest with the official Elisha Bay logo and regenerate
every brand asset that depends on it.

**What AI produced**

- Preserved the supplied 2048×2048 JPEG in `assets/brand/elisha-bay-logo-source.jpg` and created a
  transparent master.
- Generated transparent 256/512/1024 WebP lockups plus a 512 PNG fallback in `public/logo/`.
- Header and footer now render the official logo; the footer uses a cream badge on burgundy because
  the logo’s tagline needs a light ground. Header height/sizing was adjusted for legibility.
- Favicon, Apple touch icon, 192/512 app icons and the 1200×630 OG image are derived from the same
  official asset.
- Removed the earlier custom crest from the Quality/Contact decorative watermarks.
- Added US1-AC5 and a test that both header/footer logos render with alt text and dimensions; the
  asset-reachability test now covers the logo and new favicon.

**Builder verification**

- `make verify` — typecheck, production build and **14/14** Playwright tests passed.
- axe WCAG A/AA: 0 violations at 1440px and 390px.
- Logo-derived public assets return 200; no browser console errors observed during the visual pass.

**Independent QA**

- Not yet run as a separate fresh-context session. This entry is engineering evidence, not a QA PASS.

**Human verification required**

- Confirm the logo crop, clear space and the cream footer badge are acceptable.
- Confirm the larger header/logo treatment is the intended brand presence.
- Provide a vector/SVG master if available; regenerate the logo variants and icons from it.
- Confirm that the supplied red is the official red; it has not been recolored.

## 2026-11-16 — Baseline site + QA harness + agent workflow

**Scope:** Build the Elisha Bay landing page from the supplied reference, optimize the assets, wire
the Messenger inquiry flow, add the PM/engineer/QA process, and create an independent test suite.

**What AI produced**

- Full responsive landing page: nav, hero, products, quality, about, contact/inquiry, footer.
- Brand tokens, typography, decorative system, logo/favicon, OG image, PWA icons and manifest.
- Configurable placeholder site/product data with explicit content guardrails.
- Messenger inquiry handoff with validation, copy fallback and status feedback.
- Playwright suite: 14 tests covering product prefill, validation, handoff, menu, responsive
  breakpoints, axe A/AA, skip link, reduced motion, metadata and claim withholding.
- Agent framework: `AGENTS.md`, `product-spec.md`, process, PM/SE/QA roles, task/PR templates,
  backlog, testing/design docs, Makefile and CI.

**Builder verification**

- `make verify` passed at the time of writing: strict TypeScript, production build, **14/14**
  Playwright tests, axe WCAG A/AA = 0 at 1440px and 390px.
- No browser console errors or failed asset requests in the production preview.
- Responsive checks at 320/375/414/768/1024/1440/1920; no horizontal overflow.
- Production assets (favicon, icons, manifest, OG image, robots, grain SVG) returned 200.

**Bootstrap note**

Two setup commits were made directly on `main` before the workflow was active: the initial site and
this agent/QA setup. That is a bootstrap exception, not a feature merge. From this point, feature
work must use a branch, independent QA and the human merge gate.

**Independent QA**

- Not yet performed as a separate fresh-context QA session.
- The builder’s test run is engineering evidence, **not** a QA PASS. QA must independently verify
  the ACs before the first feature merge. A QA verification of this baseline can be recorded here
  when it runs.

**Human verification required**

- Approve or replace the About copy, logo, product names, packaging, photography and official
  contact details.
- Confirm certification wording and documents before `credentialsVerified` is changed.
- Confirm the production domain and make canonical/OG URLs absolute.
- Review the design reference against the built site and sign off on visual direction.

**Risks / known limits**

- Product, hero and About imagery are concept placeholders.
- The only official contact route wired is Facebook/Messenger.
- No backend, email delivery, CRM, analytics, cart or checkout.
- `og:image` is relative until deployment.
