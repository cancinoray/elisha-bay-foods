# Handoff

Everything a new session, agent or reviewer needs to continue without reading the conversation that
produced the repo. Read this first if you did not build the current state.

Last updated: 2026-11-16 · Status: **live baseline, content pending**

## 1. Status snapshot

| | |
| --- | --- |
| Phase | Baseline complete: landing page, inquiry flow, QA suite, agent process |
| Code | Vite + React 19 + TypeScript + Tailwind v4; all sections in `src/` |
| Ship | `make build` → `dist/`; hosting/domain not configured yet |
| Gate | `make verify` (typecheck + build + 14 Playwright/axe tests) |
| Repo | local git on `main`, bootstrap commits complete, **no remote yet** |
| In flight | `feat/logo-integration` (logo) then `feat/real-products-contacts` (products/contacts), both awaiting human review/merge |
| Tracker | no remote/issue tracker yet; `_docs/backlog.md` is the local queue |
| Blocking on you | individual product packshots/sizes, a real hero shoot, About approval, certification documents, street address, domain |
| Next action | commission the hero/product photography and collect the remaining packshots and street address; the logo, product names/descriptions and contact channels are integrated |

## 2. What we are building and why it has this shape

A premium Filipino seafood brand landing page for Elisha Bay Dagupan Bangus and Seafoods. The site
must make the product range feel appetizing, establish trust without inventing certifications, tell
a Filipino brand story and turn interest into an inquiry through the official Facebook/Messenger
channel.

It is **not** an online store. No cart, checkout, payment, inventory or account system. The
behaviour and acceptance criteria are in [product-spec.md](../product-spec.md). The working rules
are in [AGENTS.md](../AGENTS.md).

## 3. Decision log

| # | Decision | Rejected alternative | Why |
| - | -------- | -------------------- | --- |
| D1 | Vite + React + TypeScript + Tailwind v4 | Next.js, plain HTML | The site is a single static landing page; Vite is the simplest build with strong typing and component reuse. |
| D2 | Inquiry via official Messenger handoff | Backend email form, invented email/phone | No confirmed business email or backend; Messenger is the real public channel and keeps the site lead-gen only. |
| D3 | Certifications withheld with neutral “Verification pending” slots | Display claimed FDA/US FDA badges | The handoff requires documentary confirmation; fabricating trust marks is unacceptable. |
| D4 | Concept hero/About photography with visible disclosure; product cards now use the actual range photo and supplied signs | Present generated packaging as real Elisha Bay assets | Official assets arrived later; honesty remains the rule, and individual packshots are still pending. |
| D5 | Human merge/deploy gate | Agent merges or deploys | The repo has no protected remote yet and production is irreversible; a human owns release. |
| D6 | Kaushan + Poppins + Inter | Single generic sans or a stock template | Preserves the warm Filipino editorial identity; script is restricted to statements. |
| D7 | Official supplied logo used directly (transparent variants for web) | Keep the earlier custom crest | The brand owner supplied the real mark; it is the identity, not a placeholder. |
| D8 | Product names/descriptions taken from the brand’s range signs; range photo used as the real product visual | Continue with generated jar cards | The supplied lineup is actual; keeping generated packaging under real product names would misrepresent the range. |
| D9 | Phone/email/Instagram added to config and contact UI | Keep the “contact details pending” state | The owner supplied the channels; the site should make contact easy. Street address remains withheld. |

## 4. Where everything lives

| Concern | File |
| ------- | ---- |
| Behaviour, ACs, invariants, non-goals | [product-spec.md](../product-spec.md) |
| Agent entry point, rules, commands, DoD | [AGENTS.md](../AGENTS.md) |
| PM → engineer → QA process and permissions | [_docs/process.md](process.md) |
| Role prompts | [_docs/team/](team/) · [.agents/agents/](../.agents/agents/) |
| Task and PR templates | [_docs/task-template.md](task-template.md) · [.github/](../.github/) |
| Test suite and browser config | [tests/e2e/](../tests/e2e/) · [playwright.config.ts](../playwright.config.ts) |
| Test policy and manual QA checks | [_docs/testing-guidelines.md](testing-guidelines.md) |
| Tokens, components, responsive/a11y rules | [_docs/design-system.md](design-system.md) · [src/index.css](../src/index.css) |
| Brand, official links, contact config, credentials | [src/data/site.ts](../src/data/site.ts) |
| Placeholder product data and disclaimer | [src/data/products.ts](../src/data/products.ts) |
| CI (typecheck, build, Playwright) | [.github/workflows/ci.yml](../.github/workflows/ci.yml) |
| Current queue | [_docs/backlog.md](backlog.md) |
| Session-by-session AI record | [_docs/ai-usage-report.md](ai-usage-report.md) |
| Design reference | [a_clean_modern_appetizing_landing_page_website_m.png](../a_clean_modern_appetizing_landing_page_website_m.png) |

## 5. How work happens

One paragraph: PM grooms an issue with checkable ACs; engineer branches from main, adds a failing
test first and runs `make verify`; fresh QA runs the suite and the manual content checks, then posts
PASS/FAIL; the human owner merges and deploys; QA re-checks main. See [process.md](process.md).

## 6. Open questions

| Id | Question | Owner | Status |
| -- | -------- | ----- | ------ |
| O1 | What individual packshots, sizes and final packaging copy are approved? | Human / Elisha Bay | open; names/descriptions and a real range photo are supplied |
| O2 | Which certifications can be displayed, and with what exact wording/documents? | Human / Elisha Bay | open |
| O3 | What is the official street address? | Human / Elisha Bay | open; phones, email, Facebook/Instagram are supplied |
| O4 | Is the About paragraph approved as written? | Human | open |
| O5 | What is the production domain, and where will the site be hosted? | Human | open |
| O7 | Who will shoot the real hero still-life and individual product packshots? | Human | open |
| O6 | Should the form later deliver to email/CRM as well as Messenger? | Human | open |

## 7. Traps and lessons

- **Do not fill in missing facts.** The quality, about and contact sections are honest placeholders;
  editing them to look complete without approval is a product defect.
- **The “no FDA claim” test is intentional.** If certification documents arrive, update the spec,
  config and test together — do not silently weaken the assertion.
- **The hero is still concept photography; the range photo is actual.** Do not describe the hero as
  a packshot or reuse it as an individual product image. The products disclaimer states this.
- **The product range photo is a trade-show display.** It is cropped/colour-graded and the visible
  third-party leaflets are excluded. Do not add certification marks from that scene.
- **Product descriptions come from the range signs.** Do not add sizes, prices or ingredients that
  are not in the supplied source; individual packshots remain pending.
- **The Messenger URL is the only channel.** Do not add an email/phone/WhatsApp link without a
  confirmed source. The form opens Messenger with a pre-filled message; there is no backend.
- **`window.open` is stubbed in tests.** A real Messenger handoff is a manual QA check; the popup and
  login flow cannot be fully covered by the suite.
- **Playwright uses installed Chrome locally and pinned Chromium in CI.** Do not assume a local
  Chromium download exists. CI installs it.
- **`reuseExistingServer` is true locally.** A stale dev server can make tests lie; restart it or run
  `CI=true` if a run looks suspicious.
- **`og:image` is relative until the domain is known.** Deployment must make canonical/OG URLs
  absolute.
- **The product section is eight cards: seven products + the full-range enquiry card.** Adding or
  removing a product is a content decision that needs approved data and an updated spec; the grid
  is not an e-commerce catalogue.
- **The logo is official now.** Use the transparent variants in `public/logo/`; on dark surfaces place
  it on the cream badge used in the footer. Do not recolor, crop or replace it with the earlier
  custom crest. The raw source is preserved in `assets/brand/`.

## 8. Next action

Open the next content issue for **photography and remaining facts**: a styled hero shoot, individual
product packshots/sizes, About approval, certification documents, the street address and the
production domain. The logo, product names/descriptions and phone/email/Instagram are integrated;
do not fill the remaining gaps with guesses. If a purely technical task is preferred first, set up the remote
and branch protection with the human owner; the workflow is already documented for that mode.
