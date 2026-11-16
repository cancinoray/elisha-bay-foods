# Handoff

Everything a new session, agent or reviewer needs to continue without reading the conversation that
produced the repo. Read this first if you did not build the current state.

Last updated: 2026-11-16 · Status: **remote live on GitHub, content pending**

## 1. Status snapshot

| | |
| --- | --- |
| Phase | Baseline complete and merged to `main`: landing page, inquiry flow, QA suite, agent process |
| Code | Vite + React 19 + TypeScript + Tailwind v4; all sections in `src/` |
| Ship | `make build` → `dist/`; the production image (`Dockerfile`) serves it with nginx on `$PORT` |
| Deploy | Railway via GitHub — `railway.json` + `Dockerfile` are ready; **no Railway service or domain exists yet** |
| Gate | `make verify` locally, plus GitHub Actions `ci` on every push to `main` and every PR |
| Repo | [cancinoray/elisha-bay-foods](https://github.com/cancinoray/elisha-bay-foods) — **public**; `main` at `8f74f35`, CI green |
| Mode | remote in place: feature work uses branch + PR + CI; the human merge gate is unchanged |
| In flight | `feat/logo-integration` → `feat/real-products-contacts` → `feat/product-card-images` were merged into `main` by fast-forward; the branches remain for history, no open PR |
| Tracker | GitHub repo + Actions CI; `_docs/backlog.md` is still the queue — no issues filed on GitHub yet |
| Blocking on you | printed sizes/final packaging copy, About approval, certification documents, street address, domain |
| Next action | record a retroactive QA PASS for the merge, then enable branch protection; content work still waits on printed sizes/final packaging copy and the remaining facts |

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
| D2 | Inquiry via official Messenger handoff | Backend email form, invented contact data | No backend in this phase; Messenger remains the handoff. Email/phone are now displayed as alternative confirmed channels. |
| D3 | Certifications withheld with neutral “Verification pending” slots | Display claimed FDA/US FDA badges | The handoff requires documentary confirmation; fabricating trust marks is unacceptable. |
| D4 | Hero composite from two supplied food photographs; About remains concept; product cards use supplied packshots | Present generated packaging as real Elisha Bay assets | Official assets arrived later; the hero and cards are actual, and the About image is disclosed. |
| D5 | Human merge/deploy gate | Agent merges or deploys | The repo has no protected remote yet and production is irreversible; a human owns release. |
| D6 | Kaushan + Poppins + Inter | Single generic sans or a stock template | Preserves the warm Filipino editorial identity; script is restricted to statements. |
| D7 | Official supplied logo used directly (transparent variants for web) | Keep the earlier custom crest | The brand owner supplied the real mark; it is the identity, not a placeholder. |
| D8 | Product names/descriptions taken from the brand’s range signs; supplied packshots used on cards | Continue with generated jar cards | The supplied assets are actual; generated packaging under real names would misrepresent the range. |
| D9 | Phone/email/Instagram added to config and contact UI | Keep the “contact details pending” state | The owner supplied the channels; the site should make contact easy. Street address remains withheld. |
| D10 | Ten supplied packshots used directly on the product cards, with the range photo as section opener | Crop jars from the range photo | The owner supplied individual packshots; cropping the lineup produced low-resolution, cluttered tiles. |
| D11 | Orchestrator authorized a direct fast-forward merge of the three feature branches into `main` | Hold `main` until a fresh QA session posts PASS | The human owner (orchestrator) explicitly authorized it; the merge decision is theirs, not the agent's. **No fresh QA session has posted PASS** — green CI is engineering evidence only. Record the QA PASS retroactively. |
| D12 | Railway deploys a Docker image (nginx serving `dist/`) instead of a Node/Nixpacks `serve` process | Nixpacks with `npx serve -s dist`, or a Node server | Railway has no first-class static-site product; the nginx image gives cache headers, gzip, a healthcheck and a fixed runtime with no production Node process or extra dependency. |

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
| Production image and Railway config | [Dockerfile](../Dockerfile) · [railway.json](../railway.json) · [.dockerignore](../.dockerignore) · [deploy/nginx/default.conf.template](../deploy/nginx/default.conf.template) |
| Hosting runbook | [README.md](../README.md#deploying-to-railway) |
| Current queue | [_docs/backlog.md](backlog.md) |
| Session-by-session AI record | [_docs/ai-usage-report.md](ai-usage-report.md) |
| Design reference | [a_clean_modern_appetizing_landing_page_website_m.png](../a_clean_modern_appetizing_landing_page_website_m.png) |

## 5. How work happens

One paragraph: PM grooms an issue with checkable ACs; engineer branches from main, adds a failing
test first and runs `make verify`; fresh QA runs the suite and the manual content checks, then posts
PASS/FAIL; the human owner merges and deploys; QA re-checks main. With the remote in place, the merge
is a PR squash/merge with CI attached, and the QA verdict belongs on that PR. See [process.md](process.md).

## 6. Open questions

| Id | Question | Owner | Status |
| -- | -------- | ----- | ------ |
| O1 | What printed sizes, batch details and final packaging copy are approved? | Human / Elisha Bay | open; names/descriptions and packshots are supplied |
| O2 | Which certifications can be displayed, and with what exact wording/documents? | Human / Elisha Bay | open |
| O3 | What is the official street address? | Human / Elisha Bay | open; phones, email, Facebook/Instagram are supplied |
| O4 | Is the About paragraph approved as written? | Human | open |
| O5 | What is the production domain, and where will the site be hosted? | Human | hosting decided (Railway); **domain still open**, so canonical/`og:` URLs stay relative |
| O7 | Is a dedicated art-directed hero photograph still desired? | Human | optional; the current hero is a supplied-photo composite |
| O6 | Should the form later deliver to email/CRM as well as Messenger? | Human | open |
| O8 | Who runs the retroactive QA PASS for the 2026-11-16 merge, and against which commit? | Human | open; recommended before any deploy |

## 7. Traps and lessons

- **Do not fill in missing facts.** The quality, about and contact sections are honest placeholders;
  editing them to look complete without approval is a product defect.
- **The “no FDA claim” test is intentional.** If certification documents arrive, update the spec,
  config and test together — do not silently weaken the assertion.
- **The hero is a composite of supplied food photographs; the range and cards are actual.** Do not
  describe the hero as a packshot or reuse it as an individual product image. The products
  disclaimer states this.
- **The product range photo is a trade-show display.** It is cropped/colour-graded and the visible
  third-party leaflets are excluded. Do not add certification marks from that scene.
- **Product descriptions come from the range signs; packshots are supplied.** Do not add sizes,
  prices or ingredients that are not in the supplied source. The card photos are real packshots on
  the factory/display green background; do not remove or fake the labels.
- **The range photo shows seven of the ten products.** The cards show all ten; the range image is
  contextual, not a complete catalogue count.
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
- **The product section is ten image cards plus a full-range CTA strip.** Adding or removing a
  product is a content decision that needs approved data and an updated spec; the grid is not an
  e-commerce catalogue.
- **The logo is official now.** Use the transparent variants in `public/logo/`; on dark surfaces place
  it on the cream badge used in the footer. Do not recolor, crop or replace it with the earlier
  custom crest. The raw source is preserved in `assets/brand/`.
- **The GitHub repository is public.** Every tracked file — supplied brand assets, docs, this
  handoff, the AI usage report — is world-readable and has been since 2026-11-16. Do not commit
  credentials, private client material, unapproved claims or internal-only notes. Run a secret scan
  before adding anything that looks sensitive.
- **`main` currently has no PR review trail.** The 2026-11-16 merge was a direct fast-forward, so the
  commits on `main` were never reviewed in a PR and no CI run is attached to a PR. Branch protection
  is not enabled yet; until it is, "pushed" does not mean "reviewed".
- **Deployment is a container, not a Node server.** Railway runs the `Dockerfile` and injects `PORT`;
  nginx must keep listening on `${PORT}`. Do not add a `start` script expecting `npm start` to serve
  the site — there is no production Node process. Local parity: `make docker-build && make docker-run`.
- **`ci` and the Railway build are independent.** A red `ci` run does not stop Railway from deploying
  the same commit. Check the Actions run before trusting a deploy.

## 8. Next action

1. **Close the QA gap:** run a fresh-context QA session against `725c378` (the suite plus the manual
   content checks in [testing-guidelines.md](testing-guidelines.md)) and record PASS/FAIL here and in
   [ai-usage-report.md](ai-usage-report.md). This is owed, not optional.
2. **Turn on branch protection** on `main` (require the `ci` check and a PR) so the documented gate is
   enforced by the remote rather than by convention.
3. **Connect Railway** (one-time dashboard work): New Project → Deploy from GitHub repo →
   `cancinoray/elisha-bay-foods`; Railway builds the `Dockerfile`, then generate a domain. See the
   runbook in [README.md](../README.md#deploying-to-railway).
4. **Make the share URLs absolute** once the public URL exists (`og:image`, `og:url`, canonical), with
   a test for the rewritten document head — social previews stay broken while they are relative.
5. Then return to content: printed sizes and final packaging copy, About approval, certification
   documents, street address and the production domain. The logo, ten products, packshots, combined
   hero and phone/email/Instagram are integrated. Do not fill the remaining gaps with guesses.
