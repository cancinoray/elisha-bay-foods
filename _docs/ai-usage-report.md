# AI Usage Report

A session-by-session record of what AI produced and what a human or independent check verified.
Append, newest first. Do not record “done” unless the evidence is named.

## 2026-11-17 — Email-only inquiry handoff (Messenger removed)

**Branch:** `feat/inquiry-email-handoff`

**Scope:** Owner reports that “Send on Messenger” asks visitors to log in to Messenger even when they
are already signed into Facebook, and asked for Messenger to be removed from the form, the contact
section and the footer. This supersedes the two-channel version of the same branch.

**Behaviour change**

- A valid submission reveals the inquiry-status region with one action — **Send by email** (`mailto:`
  to the confirmed address) — plus the copy-message fallback. Nothing opens by itself.
- The email subject is `Elisha Bay inquiry — <type>`; the body carries name, email, phone (when
  given), type and the message, percent-encoded with `encodeURIComponent`.
- Messenger is gone everywhere: the form action, the contact-section row, the footer icon,
  `site.social.messenger` and `buildMessengerUrl`. `m.me` no longer appears in the shipped HTML.
- Because both remaining paths are plain links, `window.open` and the popup-blocked state are
  deleted rather than kept.

**What AI produced**

- `src/data/site.ts`: `buildMailtoUrl(subject, message)`; Messenger URL and builder removed.
- `src/components/InquiryForm.tsx`, `ContactSection.tsx`, `Footer.tsx`: Messenger removed, email is
  the primary action.
- `product-spec.md`: US4-AC3 and US4-AC4 rewritten, I2/I5 and the interface contract updated;
  `AGENTS.md` rule 5 now records the owner decision and why.
- `tests/e2e/landing.spec.ts`: a new test asserts no `m.me` link and no “Messenger” mention anywhere
  in the page; the product-card journey asserts the email handoff only.
- README, testing guidelines, process examples, handoff and backlog updated so no document still
  claims Messenger is the channel.

**Builder verification**

- The new test was red against the two-channel build and green after the removal.
- `make verify` — typecheck, build and **16/16** tests pass on this branch (cut from `main`, so it
  does not include the nav or hero branches).
- Screenshots at 390 and 1440 of the ready state; one primary action plus copy, wrapping cleanly.

**Independent QA**

- None; builder evidence only.

**Human verification required**

- Confirm `elisha_bay2017@yahoo.com` is the inbox that should receive inquiries and that someone
  monitors it. A `mailto:` has no spam protection: the address is public, so noise is expected.
- Confirm removing Messenger from the contact section and footer is acceptable — Facebook and
  Instagram remain as social routes.

## 2026-11-17 — PM: inquiry delivery beyond Messenger (EB-105)

**Role:** PM (no code written)

**Scope:** Owner asked whether there is another way to send an inquiry besides Messenger, and said
Messenger-only “is not good”. Groomed as issue
[#5](https://github.com/cancinoray/elisha-bay-foods/issues/5); backlog EB-105 moved from *ready* to
*groomed, needs human decision*.

**What the PM produced**

- Four options with cost, privacy impact and what the owner must supply: email `mailto:` handoff (A),
  managed form endpoint (B), a small Railway API (C), chat-app deep links (D).
- A recommendation to ship A first: no backend, no new dependency, no PII leaving the visitor's
  machine, and it is the only option that fits invariant I5 without a spec change.
- Draft ACs for A (US4-AC6, US4-AC7) plus the unchanged US4-AC3/AC4 and the I5/§7 wording update.
- Backlog row and handoff O6 updated to point at the issue.

**Evidence**

- Nothing implemented or tested; this is a decision document. The issue is blocked on the owner
  choosing a destination.

**Human decision required**

- Pick A, B, C or D. B and C need a privacy/consent approval because inquiry PII would leave the
  visitor's machine; A needs confirmation that the published email inbox is monitored.

## 2026-11-17 — Smaller hero photograph on phones

**Branch:** `fix/hero-image-mobile-size`

**Scope:** Owner request — “make the image in the hero page smaller when the device is small”. The
photograph ran the full shell width on phones (337px of a 390px viewport).

**What AI produced**

- Hero photo wrapper: `w-[78%]` below `640px`, back to `w-full` with the previous `32rem` cap from
  `sm` up. Measured width went **337 → 261px at 390** and **265 → 208px at 320**; 768 and 1440 are
  unchanged (500 / 488px).
- Hero `sizes` and the LCP preload `imagesizes` in `index.html` both moved to `72vw` on phones, so
  the browser does not download a candidate wider than it paints. The two must stay in sync.
- Hero caption stacks under the photograph below `sm`; at 78% width the script line and the
  “Pangasinan” badge no longer fit side by side without wrapping awkwardly.
- Design-system responsive rule updated to describe the inset instead of “the image remains the
  dominant element” at every width.

**Builder verification**

- New test observed failing first: `hero photograph too wide at 320px — Expected <= 0.78, Received
  0.822`; the 390px case measured 0.845.
- `make verify` — typecheck, build and **18/18** tests pass.
- Screenshots at 320 / 390 / 768 / 1440 checked; no horizontal overflow, caption not clipped,
  desktop frame unchanged.

**Independent QA**

- None; builder evidence only.

**Human verification required**

- Confirm the smaller frame still feels like the hero on a real phone, and that the stacked caption
  reads well.

## 2026-11-17 — Fix: About Us never highlighted in the nav

**Branch:** `fix/nav-scrollspy-order`

**Scope:** Bug report — “when I click the About Us nav it's not highlighting”. The link scrolled to
the right section but `aria-current="location"` landed on “Quality & Certifications”.

**Root cause**

`useScrollSpy` walked the `ids` array and kept the **last** section whose top was above the scroll
marker. That is only correct when the array is in document order. The nav lists About Us before
Quality & Certifications, but `App.tsx` renders Quality before About, so while viewing About the loop
assigned `about` and then overwrote it with `quality` — About was unreachable, Quality lit up
instead. Confirmed by a probe against the running page: after clicking About Us, the only
`aria-current` in the primary nav was on “Quality & Certifications”.

**What AI produced**

- A regression test that clicks each nav link and asserts the clicked link is the **only** active
  one — red on About before the fix.
- `useScrollSpy` now selects the section with the greatest top at or above the marker (nearest
  section above the scroll position), so the result follows document order regardless of how the nav
  is ordered. Measured with `getBoundingClientRect().top + scrollY` instead of `offsetTop`, which is
  relative to the nearest positioned ancestor.

**Builder verification**

- New test observed failing first: `expect.poll(... aria-current).toBe('location')` on the About Us
  link timed out, with `aria-current` on the Quality link.
- `make verify` — typecheck, build and **17/17** tests pass (14 existing + 3 new nav tests).

**Independent QA**

- None; builder evidence only.

**Human verification required**

- Confirm the highlight follows the section in view on a real device, desktop and the mobile panel.

## 2026-11-16 — Railway deploy config (nginx container)

**Branch:** `chore/railway-deploy` (merged to `main` as `8f74f35` by rebase merge)

**Scope:** Make the repo deployable on Railway over a GitHub connection. No application code, copy
or assets changed — the site still ships as the same Vite build.

**What AI produced**

- `Dockerfile`: two stages, `npm ci` + `npm run build` on `node:22-alpine`, then `nginx:1.27-alpine`
  serving `dist/` and listening on `$PORT` (default 8080) with a `HEALTHCHECK`.
- `deploy/nginx/default.conf.template`: envsubst-processed `listen ${PORT}`, gzip, security headers,
  `expires`-based caching (hashed assets 1y, imagery 7d, HTML revalidate), `/healthz`, SPA fallback.
- `railway.json`: pins the Dockerfile builder, `/healthz` healthcheck and restart policy.
- `.dockerignore`: keeps docs, tests, raw brand assets and local tooling out of the build context.
- `make docker-build` / `make docker-run` for local parity with what Railway runs.
- README runbook (“Deploying to Railway”) and handoff status/decision/trap updates (D12).

**Builder verification**

- `make verify` — typecheck, build and **14/14** Playwright tests passed.
- `docker build` succeeded; container smoke-tested on `PORT=9191`:
  - `/healthz` → `200 text/plain "ok"`
  - `/` → `200`, `Cache-Control: no-cache`, `Content-Encoding: gzip`, `X-Content-Type-Options`,
    `X-Frame-Options`, `Referrer-Policy`, `Permissions-Policy` all present
  - `/assets/index-*.js` → `Cache-Control: max-age=31536000`
  - `/images/*.webp` → `Cache-Control: max-age=604800`
  - missing asset → `404`; unknown deep path → `200` serving the page (intended fallback)
- Browser check against the container (installed Chrome): title and `h1` correct, **15/15** images
  loaded after scrolling, no console errors, no failed requests, no horizontal overflow at 1440px or
  390px.

**Independent QA**

- **None yet.** The branch is open for review; no fresh-context QA session has verified the deploy
  config. The evidence above is builder evidence, not a QA PASS.

**Human verification required**

- Connect Railway to the GitHub repo and generate the domain (**agent must not deploy** — rule 9).
- Confirm the deploy starts and `/healthz` responds on the Railway URL.
- Decide the production domain; then make `og:image` / `og:url` / canonical absolute with a test
  (O5), otherwise social previews stay broken.

## 2026-11-16 — Public GitHub remote and first merge to `main`

**Branch:** `main` (direct commits, no branch)

**Scope:** Publish the repository, wire `origin`, push the stacked feature history, merge it to
`main` on the owner's explicit instruction, and correct the state docs that still described a
local-only repo.

**What AI produced**

- Ran `git init` (reinitialized an existing repo — no effect) and confirmed there was nothing to
  commit and no configured remote; reported both instead of inventing a destination.
- Scanned all 123 tracked files for secret patterns (`ghp_`/`gho_`/`sk-`/`AKIA`/private-key/`.env`)
  before making anything public — no secrets found.
- `gh repo create cancinoray/elisha-bay-foods --public --source=. --remote=origin`; pushed `main`
  and `feat/product-card-images` with upstream tracking.
- Fast-forwarded `main` `c602471 → 725c378` (all three stacked branches came in together) and
  pushed it.
- Rewrote the stale state sections of `_docs/handoff.md` (remote, merged branches, CI, new decision
  D11, public-repo trap, revised next actions), updated the mode line in `AGENTS.md`, and added
  this entry.

**Builder verification**

- GitHub Actions `ci` on `main`: green twice — run
  [43897379086](https://github.com/cancinoray/elisha-bay-foods/actions/runs/43897379086) on the
  bootstrap history and run
  [43899055268](https://github.com/cancinoray/elisha-bay-foods/actions/runs/43899055268) on the
  merge, both with typecheck, build and all 14 Playwright/axe tests passing.
- `git status` clean, `main` and `origin/main` aligned at `725c378`.

**Independent QA**

- **None.** The merge to `main` was authorized directly by the human owner/orchestrator, which
  bypasses the documented "QA posts PASS, then the human merges" sequence (AGENTS.md rule 9 and the
  handoff loop). This is recorded as decision D11 in the handoff. No fresh-context QA session has
  verified the ACs against `725c378`; CI green is engineering evidence, not a QA PASS.

**Human verification required**

- Authorize (or run) the retroactive QA pass against `725c378` and post the verdict.
- Enable branch protection on `main` so the gate is enforced by the remote.
- Note that the repo is public: supplied brand assets, docs and this report are world-readable.

## 2026-11-16 — Combined bangus + tuyo hero

**Branch:** `feat/product-card-images` (stacked on the product/contact branch; merged into `main`
by fast-forward on 2026-11-16 — see the entry above)

**Scope:** Replace the concept hero still-life with a composite of the two supplied food photographs,
keeping the product cards and page content intact.

**What AI produced**

- A 1200×1440 hero composite: cooked bangus on a wooden board as the main image, with a circular
  tuyo-in-oil detail at bottom-left, cream/gold ring and soft shadow.
- The baked-in bottle label and Elisha Bay logo in the cooked-dish source were cropped out. Both
  source photographs were colour-graded, gently sharpened and vignetted.
- The hero caption was moved below the arch so it no longer overlaps the circular detail.
- Updated hero preload, image srcSet, alt text, dimensions and QA assertions.
- Product disclaimer now says the hero is a composite of supplied food photography, not concept or
  packshot photography.

**Builder verification**

- `make verify` — typecheck, build and **14/14** Playwright tests passed.
- axe WCAG A/AA: 0 violations at 1440px and 390px.
- Hero checked at 1280, 1440 and 390 widths; caption below image, no overlap or overflow.

**Independent QA**

- Not yet run as a separate fresh-context session. This entry is engineering evidence, not a QA PASS.

**Human verification required**

- Approve the crop, the circular inset and the recipe/dish as representative of Elisha Bay.
- Confirm that no bottle or third-party mark remains visible (the source’s bottle label and baked-in
  logo were cropped out).
- A dedicated art-directed hero shoot is optional; the current hero uses only supplied photographs.

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
