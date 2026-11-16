# AI Usage Report

A session-by-session record of what AI produced and what a human or independent check verified.
Append, newest first. Do not record “done” unless the evidence is named.

## 2026-11-16 — Baseline site + QA harness + agent workflow

**Scope:** Build the Elisha Bay landing page from the supplied reference, optimize the assets, wire
the Messenger inquiry flow, add the PM/engineer/QA process, and create an independent test suite.

**What AI produced**

- Full responsive landing page: nav, hero, products, quality, about, contact/inquiry, footer.
- Brand tokens, typography, decorative system, logo/favicon, OG image, PWA icons and manifest.
- Configurable placeholder site/product data with explicit content guardrails.
- Messenger inquiry handoff with validation, copy fallback and status feedback.
- Playwright suite: 11 tests covering product prefill, validation, handoff, menu, responsive
  breakpoints, axe A/AA, skip link, reduced motion, metadata and claim withholding.
- Agent framework: `AGENTS.md`, `product-spec.md`, process, PM/SE/QA roles, task/PR templates,
  backlog, testing/design docs, Makefile and CI.

**Builder verification**

- `make verify` passed at the time of writing: strict TypeScript, production build, **11/11**
  Playwright tests, axe WCAG A/AA = 0 at 1440px and 390px.
- No browser console errors or failed asset requests in the production preview.
- Responsive checks at 320/375/414/768/1024/1440/1920; no horizontal overflow.
- Production assets (favicon, icons, manifest, OG image, robots, grain SVG) returned 200.

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
