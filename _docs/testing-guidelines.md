# Testing Guidelines

Behaviour is defined in [product-spec.md](../product-spec.md); this document describes how we prove
it. The suite is deliberately small and runs against the real page.

## The gate

```bash
make lint     # strict TypeScript
make build    # production build + typecheck
make test     # Playwright journeys, responsive and axe checks
make verify   # all three, in that order
```

A change is not ready for QA until `make verify` passes. A passing suite is evidence, not permission
to merge.

## Local vs CI

- **Local:** Playwright uses the installed Google Chrome (`channel: 'chrome'`). No browser download
  is required if Chrome is present.
- **CI:** `npx playwright install --with-deps chromium` installs Playwright’s pinned browser; the
  config omits `channel` when `CI=true`.
- `webServer` starts Vite automatically. If a dev server is already running, Playwright reuses it
  locally; make sure it reflects the branch under test.
- Artifacts: traces and screenshots are written to `test-results/` on failure; HTML report goes to
  `playwright-report/`. Both are ignored by git and uploaded by CI on failure.

## What the suite covers

`tests/e2e/landing.spec.ts` owns:

| Area | Proves |
| ---- | ------ |
| Brand + sections | H1, five sections, four product cards, placeholder disclaimer, official Facebook link |
| Metadata/assets | title, description, OG image, JSON-LD, manifest, official logo, icon assets, image alt + dimensions |
| Content invariant | no “FDA Certified/Registered/Approved” claim; pending verification UI present |
| Products → inquiry | a product card sets type + message + topic; valid Messenger URL and status region |
| Form validation | empty form marks four fields invalid and never opens a channel |
| Mobile menu | open, Escape, focus return, link closes and reaches Contact |
| Responsive | no horizontal overflow at 320/375/414/768/1024/1440/1920 |
| Accessibility | axe WCAG 2.1 A/AA = 0 violations at 1440 and 390 |
| Skip link | first Tab stop; Enter focuses `main` |
| Reduced motion | content remains visible with `prefers-reduced-motion: reduce` |

The Messenger test stubs `window.open` and asserts the composed `m.me` URL. A real handoff to
Messenger is a manual QA check because it depends on an external service.

## Manual checks QA still owns

Automation cannot prove taste, claims or every keyboard path:

1. Read the quality, about, product and contact copy against `AGENTS.md`.
2. Confirm no official badges/logos or unverified “certified” language appears.
3. Confirm placeholders are disclosed and no generated packaging is presented as approved.
4. Keyboard-walk the page: nav, product cards, form, copy/open Messenger, footer.
5. Confirm the official logo appears in the header, footer and share image; no old custom crest
   remains. The transparent header logo should sit cleanly on cream, and the footer logo should use
   the cream badge.
6. Inspect 375px, 768px and 1440px for clipped CTAs, awkward wrapping and missing focus.
7. Compare the composition and identity against the design reference.
8. Open the real Facebook/Messenger links and confirm they resolve to Elisha Bay.

Any manual FAIL needs a screenshot or a precise reproduction in the verdict.

## Red first

For a behaviour change:

1. Add or update the test that should fail.
2. Run it and record the failure for the right reason.
3. Make the smallest change that turns it green.
4. Run `make verify`.

A test that has never failed proves nothing. Do not weaken an assertion, skip a test, or add a
`sleep` to make a flaky test pass.

## Writing tests

- Prefer accessible selectors: `getByRole`, `getByLabel`, visible text that is part of the contract.
- Set viewport explicitly for responsive claims.
- Disable smooth scrolling when a test needs a deterministic scroll.
- Stub external window openings; never make the suite depend on Messenger, Facebook or Google Fonts
  being reachable.
- Assert the user-visible outcome, not implementation details or CSS class names.
- Keep the suite independent: each test opens a fresh page and must pass alone.
- Update this document and `product-spec.md` when a suite or AC changes.

## What not to test

- Third-party library internals or Google Fonts.
- Exact animation timing.
- A real Messenger send (manual check).
- Decorative-only SVG paths.
- The wording of a log line that is not a contract.

## When a content claim is verified

If the client supplies certification documents and the human approves the exact wording:

1. Update `src/data/site.ts` (`credentials`, `credentialsVerified`).
2. Update `product-spec.md` US3 ACs and this document.
3. Replace or intentionally remove the “no FDA claim” test — never weaken it silently.
4. Add the approved wording/asset and re-run QA.

Until then, the withheld state is a product requirement, and the test protects it.
