# Product Specification — Elisha Bay Official Website

> A premium Filipino seafood brand landing page that builds trust and turns discovery into an
> inquiry.

Status: **live baseline** · Version: 1.4 · Owner: human owner · Last updated: 2026-11-16

This is the source of truth for behaviour. Code follows this document; when they disagree, one of
them is a bug. Acceptance criteria here are what QA judges.

## 1. Problem

Elisha Bay Dagupan Bangus and Seafoods has a strong local and export business but no owned digital
home. Customers, resellers and distributors discover the brand through social posts and word of
mouth, then have no single place that explains the products, the quality posture, the story and how
to make contact.

The site removes that gap. It is a **brand and lead-generation page**, not a store. Success is a
visitor understanding the brand and choosing to inquire through the confirmed email, phone or social
channels.

## 2. Users

| User | What they need | What they do today |
| ---- | -------------- | ------------------ |
| Individual customer | See the seafood range, understand the brand, ask about ordering | Discover through social media; no product hub |
| Wholesale buyer / reseller | Review the range and quality posture, then start a business conversation | Rely on messages and referrals |
| Distributor / export partner | Confirm the brand is a serious manufacturer and find an official channel | Research across fragmented listings |
| Brand discovery visitor | Understand who Elisha Bay is and whether it is credible | Land on social posts with little context |

**Not for:** shoppers who need a cart, prices, stock status, delivery estimates or online payment in
this phase.

## 3. Product principles

1. **Appetite first.** The hero and product photography should make the product feel premium and
   edible before explaining anything else.
2. **Trust without fabrication.** Quality is communicated through design and process language, but
   no unverified certification claim may be displayed.
3. **One clear next action.** Every primary CTA leads to the inquiry section, and the form always
   ends at a real, official contact channel.
4. **Filipino identity, not a generic template.** Burgundy/cream/gold, script statements, waves,
   fish-scale patterns and Dagupan context carry the brand.
5. **Easy on every screen.** Mobile-first, keyboard-accessible and readable at 375px without
   horizontal scroll.

## 4. User stories and acceptance criteria

Tags name the cheapest proof: `e2e` is the Playwright suite; `manual` is a named check in the QA
verdict.

### US1 — Understand the brand on arrival

As a first-time visitor, I want the hero to say what Elisha Bay sells and why it is different, so I
know within seconds whether to keep reading.

| Id | Criterion | Tag |
| --- | --------- | --- |
| US1-AC1 | The home page renders the H1 “Every Mouthful is Delightful!” and the supporting line naming premium Bangus and Seafood Products, quality, care and Filipino pride. | `e2e` |
| US1-AC2 | The primary hero CTA “Inquire Now” reaches the contact section; “Explore our products” reaches the Products section. | `e2e` |
| US1-AC3 | The page contains the five primary sections: Home, Products, Quality & Certifications, About, Contact, with working in-page navigation. | `e2e` |
| US1-AC4 | The hero contains large food photography with descriptive alt text, and the page has a visible Dagupan/Pangasinan location cue. | `manual` |
| US1-AC5 | The official Elisha Bay logo is rendered in the header and footer with alt text and explicit dimensions; no placeholder crest is presented as the brand mark. | `e2e` |

### US2 — Browse the seafood range

As a customer or reseller, I want to see the product range and ask about one product directly, so I
can start a relevant conversation.

| Id | Criterion | Tag |
| --- | --------- | --- |
| US2-AC1 | Products shows the actual range photograph and ten product cards from `src/data/products.ts` (Pinoy Adobo, Ba-Yo, Hawaiian Style, Portuguese Style, Fresh Basil Pesto, Tomato Sauce, Turmeric, Sun-Dried Tomatoes, Pesto Tuyo, Tuyo Delizioso), followed by an “And More Seafood Delights” full-range CTA. | `e2e` |
| US2-AC2 | No disclaimer block is rendered: the section carries no hero-composite, size, batch or packaging notice, and none is reintroduced. | `e2e` |
| US2-AC3 | Activating a product card scrolls to Contact, sets inquiry type to “Product inquiry”, and pre-fills the message with that product name. | `e2e` |
| US2-AC4 | Cards have a visible hover/focus state and remain operable by keyboard. | `manual` |
| US2-AC5 | Each product card displays the supplied category, description and its own real packshot; no invented size, price or ingredient is introduced. | `e2e` + `manual` |

### US3 — Verify quality and safety

As a wholesale or brand-discovery visitor, I want to see that quality is taken seriously, without
being shown claims the company cannot yet prove.

| Id | Criterion | Tag |
| --- | --------- | --- |
| US3-AC1 | The Quality section uses the heading “Committed to Quality and Safety”, the approved supporting sentence and neutral credential slots. | `e2e` |
| US3-AC2 | No FDA, US FDA, GMP or other official certification wordmark, seal or “certified/registered/approved” claim is displayed while `credentialsVerified` is false. | `e2e` + `manual` |
| US3-AC3 | Every credential slot is labelled “Verification pending”. | `e2e` |
| US3-AC4 | No official government logo, flag, or fabricated badge appears anywhere on the page. | `manual` |

### US4 — Make an inquiry

As any visitor, I want a simple, trustworthy way to contact Elisha Bay, so I can ask about products,
resale, distribution or partnership.

| Id | Criterion | Tag |
| --- | --------- | --- |
| US4-AC1 | A required name, required valid email, optional phone, required inquiry type and required message are labelled and validated with inline errors. | `e2e` |
| US4-AC2 | Invalid submission does not open any external channel and marks every invalid field with `aria-invalid` and an associated error. | `e2e` |
| US4-AC3 | Valid submission reveals an inquiry-status region with a single “Send by email” action (a `mailto:` handoff carrying the composed message) plus the copy-message fallback. The site opens nothing by itself and offers no Messenger link. | `e2e` |
| US4-AC4 | The form exposes a copy-message fallback, and the contact section and footer link to the confirmed Facebook, Instagram, email and phone channels only — no Messenger link. | `e2e` + `manual` |
| US4-AC5 | The confirmed phones (0919 270 1448 / 0917 511 0223), email (elisha_bay2017@yahoo.com) and @elishabayfoods Instagram are displayed and actionable; the street address remains unlisted. | `e2e` + `manual` |
| US4-AC6 | The email action is a `mailto:` to the confirmed address with subject `Elisha Bay inquiry — <type>` and a body carrying name, email, phone (when given), type and message, URL-encoded. No request leaves the site. | `e2e` |
| US4-AC7 | Invalid submission opens neither channel and shows no inquiry-status region, while still marking every invalid field with `aria-invalid`; the copy-message fallback remains available once the message is ready. | `e2e` |

### US5 — Use the site on any device and with assistive tech

As a visitor on a phone or with a keyboard/screen reader, I can read and operate every primary
journey.

| Id | Criterion | Tag |
| --- | --------- | --- |
| US5-AC1 | No horizontal overflow at 320, 375, 414, 768, 1024, 1440 or 1920px. | `e2e` |
| US5-AC2 | The mobile menu opens, traps focus, closes on Escape and returns focus to its trigger; mobile nav links close the menu and reach their section. | `e2e` |
| US5-AC3 | axe-core reports zero WCAG 2.1 A/AA violations at 1440px and 390px. | `e2e` |
| US5-AC4 | The skip link is the first Tab stop and moves focus to `main`. | `e2e` |
| US5-AC5 | With `prefers-reduced-motion: reduce`, content is visible and animations are not required to read it. | `e2e` |

### US6 — Discover and share the brand

As a visitor arriving from search or social, I get a correct title, preview image and structured
identity; as the business, I can be found for relevant terms.

| Id | Criterion | Tag |
| --- | --------- | ---- |
| US6-AC1 | The document title and meta description match the approved SEO copy and describe Elisha Bay, Dagupan bangus and seafood. | `e2e` |
| US6-AC2 | Open Graph/Twitter metadata, a 1200×630 share image, favicon, web manifest and brand icons are present and return 200. | `e2e` |
| US6-AC3 | Organization JSON-LD exists and names Elisha Bay, the tagline, Dagupan/Pangasinan, the confirmed phone/email and the official Facebook/Instagram pages. | `e2e` |
| US6-AC4 | Every content image has descriptive alt text and explicit dimensions; the hero is preloaded with a responsive source. | `e2e` + `manual` |

## 5. Invariants

| Id | Invariant | Enforced by | Proved by |
| -- | --------- | ----------- | --------- |
| I1 | No unverified business claim, certification, contact detail or history is presented as fact. | content review + config | US3-AC2..4, US4-AC5; human sign-off |
| I2 | Inquiry destinations are the confirmed Facebook, Instagram, email and phone channels; the form hands off to the visitor’s mail client only, and Messenger is not offered anywhere. | `src/data/site.ts` | US4-AC3/4/5/6; manual link check |
| I3 | Product names/descriptions and packshots come from the brand; no size, batch, packaging or price claim is printed, and the hero is not presented as a packshot. | `src/data/products.ts` + UI | US2-AC1/2/5 |
| I4 | The site remains lead generation only: no cart, checkout, payment or account flow. | scope rules | PR review; no such routes/state |
| I5 | Contact PII is not stored or transmitted by the site. The form composes the message and hands it to the visitor’s mail client on request. | no backend | code review + form test |

## 6. Interface surface

This is a static page, not an API. Its external contracts are:

- **Section anchors:** `#home`, `#products`, `#quality`, `#about`, `#contact`.
- **Product data:** `src/data/products.ts`; the UI must adapt to the array of ten products plus the full-range CTA rather than hard-coding a product count.
- **Site/contact data:** `src/data/site.ts`; phone/email/Instagram rows render from confirmed config, and `credentialsVerified` controls whether the verification note remains.
- **Inquiry handoff:** `mailto:elisha_bay2017@yahoo.com?subject=<encoded subject>&body=<encoded message>`, offered after validation. No Messenger/`m.me` deep link is exposed.
- **Build outputs:** `dist/` (ignored by git), plus public SEO/icon assets.

Any change to these shapes updates this section and the affected tests in the same change.

## 7. Non-goals

- Shopping cart, online payment, order tracking, stock counts or prices.
- A content management system or admin area.
- Inventing or displaying certifications before documentary approval.
- Publishing a street address before the client supplies it, or unverified certification claims.
- Server-side email delivery, CRM integration or a custom form backend in this phase. The email action is a `mailto:` the visitor sends from their own client; the site never transmits it.
- Blog, recipe library, testimonials or multilingual content before an approved issue.

## 8. Current known limits

- Product names, descriptions and individual packshots are supplied by the brand. Printed sizes,
  prices, batch details and final packaging copy are still pending.
- The hero is a composite of two supplied food photographs (cooked bangus and tuyo), not a packaged
  product shot. The product-card packshots and range photograph are actual.
- About copy is proposed, not client-approved history.
- Phone, email and Instagram are confirmed; the street address is still unknown.
- Certification wording is withheld; the verification-pending badges are intentional. The explanatory
  note and the product disclaimer were removed by the owner on 2026-11-17.
- `og:image` is relative until the production domain is known; canonical/absolute URLs are a
  deployment task.
- The repository is public on GitHub with Actions CI; the workflow keeps a human merge gate.

## 9. Changelog

| Version | Date | Change |
| ------- | ---- | ------ |
| 1.4 | 2026-11-16 | Replaced the concept hero with a composite of supplied cooked bangus and tuyo photography; moved the caption below the frame. |
| 1.3 | 2026-11-16 | Added the ten supplied product packshots, the three additional products, responsive image cards and full-range CTA. |
| 1.2 | 2026-11-16 | Added the seven supplied products/descriptions, actual range photograph, phone/email/Instagram contacts and the full-range enquiry card. |
| 1.1 | 2026-11-16 | Integrated the supplied official Elisha Bay logo, transparent variants, app icons and share image. |
| 1.0 | 2026-11-16 | Baseline site, Playwright/axe QA suite, PM → engineer → QA process. |
