# Product Specification — Elisha Bay Official Website

> A premium Filipino seafood brand landing page that builds trust and turns discovery into an
> inquiry.

Status: **live baseline** · Version: 1.0 · Owner: human owner · Last updated: 2026-11-16

This is the source of truth for behaviour. Code follows this document; when they disagree, one of
them is a bug. Acceptance criteria here are what QA judges.

## 1. Problem

Elisha Bay Dagupan Bangus and Seafoods has a strong local and export business but no owned digital
home. Customers, resellers and distributors discover the brand through social posts and word of
mouth, then have no single place that explains the products, the quality posture, the story and how
to make contact.

The site removes that gap. It is a **brand and lead-generation page**, not a store. Success is a
visitor understanding the brand and choosing to inquire through the official Facebook/Messenger
channel.

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

### US2 — Browse the seafood range

As a customer or reseller, I want to see the product range and ask about one product directly, so I
can start a relevant conversation.

| Id | Criterion | Tag |
| --- | --------- | --- |
| US2-AC1 | Products renders exactly four cards from `src/data/products.ts`, each with an image, name and Inquire affordance. | `e2e` |
| US2-AC2 | The product placeholder disclaimer is visible beneath the grid: names, packaging and photography are placeholders pending official assets. | `e2e` |
| US2-AC3 | Activating a product card scrolls to Contact, sets inquiry type to “Product inquiry”, and pre-fills the message with that product name. | `e2e` |
| US2-AC4 | Cards have a visible hover/focus state and remain operable by keyboard. | `manual` |

### US3 — Verify quality and safety

As a wholesale or brand-discovery visitor, I want to see that quality is taken seriously, without
being shown claims the company cannot yet prove.

| Id | Criterion | Tag |
| --- | --------- | --- |
| US3-AC1 | The Quality section uses the heading “Committed to Quality and Safety”, the approved supporting sentence and neutral credential slots. | `e2e` |
| US3-AC2 | No FDA, US FDA, GMP or other official certification wordmark, seal or “certified/registered/approved” claim is displayed while `credentialsVerified` is false. | `e2e` + `manual` |
| US3-AC3 | Every credential slot is labelled “Verification pending” and the note explains that details are withheld until documents are confirmed. | `e2e` |
| US3-AC4 | No official government logo, flag, or fabricated badge appears anywhere on the page. | `manual` |

### US4 — Make an inquiry

As any visitor, I want a simple, trustworthy way to contact Elisha Bay, so I can ask about products,
resale, distribution or partnership.

| Id | Criterion | Tag |
| --- | --------- | --- |
| US4-AC1 | A required name, required valid email, optional phone, required inquiry type and required message are labelled and validated with inline errors. | `e2e` |
| US4-AC2 | Invalid submission does not open any external channel and marks every invalid field with `aria-invalid` and an associated error. | `e2e` |
| US4-AC3 | Valid submission opens the official Messenger URL with the inquiry pre-filled (name, email, type, message) and shows an inquiry-status region with a reopen link. | `e2e` |
| US4-AC4 | The form exposes a copy-message fallback, and the contact section links only to the official Facebook page and Messenger endpoint. | `e2e` + `manual` |
| US4-AC5 | Phone/email/address remain unlisted until confirmed; the contact section says contact details are pending. | `e2e` + `manual` |

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
| US6-AC3 | Organization JSON-LD exists and names Elisha Bay, the tagline, Dagupan/Pangasinan and the official Facebook page. | `e2e` |
| US6-AC4 | Every content image has descriptive alt text and explicit dimensions; the hero is preloaded with a responsive source. | `e2e` + `manual` |

## 5. Invariants

| Id | Invariant | Enforced by | Proved by |
| -- | --------- | ----------- | --------- |
| I1 | No unverified business claim, certification, contact detail or history is presented as fact. | content review + config | US3-AC2..4, US4-AC5; human sign-off |
| I2 | The only inquiry destinations are the official Facebook page and Messenger endpoint. | `src/data/site.ts` | US4-AC3/4; manual link check |
| I3 | Product names, packaging and photography are disclosed as placeholders until replaced. | `src/data/products.ts` + UI | US2-AC2 |
| I4 | The site remains lead generation only: no cart, checkout, payment or account flow. | scope rules | PR review; no such routes/state |
| I5 | Contact PII is not stored by the site. The form hands a composed message to Messenger. | no backend | code review + form test |

## 6. Interface surface

This is a static page, not an API. Its external contracts are:

- **Section anchors:** `#home`, `#products`, `#quality`, `#about`, `#contact`.
- **Product data:** `src/data/products.ts`; the UI must adapt to a changed array rather than
  hard-coding four cards.
- **Site/contact data:** `src/data/site.ts`; phone/email rows appear only when configured, and
  `credentialsVerified` controls whether the verification note remains.
- **Inquiry handoff:** `https://m.me/elishabayfoods?text=<encoded message>`.
- **Build outputs:** `dist/` (ignored by git), plus public SEO/icon assets.

Any change to these shapes updates this section and the affected tests in the same change.

## 7. Non-goals

- Shopping cart, online payment, order tracking, stock counts or prices.
- A content management system or admin area.
- Inventing or displaying certifications before documentary approval.
- Publishing phone, email or a street address before the client supplies it.
- Email delivery, CRM integration or a custom form backend in this phase.
- Blog, recipe library, testimonials or multilingual content before an approved issue.

## 8. Current known limits

- Product names, packaging and photography are placeholders.
- The logo/crest is a designed placeholder pending the official asset.
- About copy is proposed, not client-approved history.
- Phone, email and street address are unknown.
- Certification wording is withheld; the verification-pending UI is intentional.
- `og:image` is relative until the production domain is known; canonical/absolute URLs are a
  deployment task.
- There is no remote repository yet; the current workflow is local git with a human merge gate.

## 9. Changelog

| Version | Date | Change |
| ------- | ---- | ------ |
| 1.0 | 2026-11-16 | Baseline site, Playwright/axe QA suite, PM → engineer → QA process. |
