# AGENTS.md

Read this first, then only the documents your task needs. This repository is a
**single-page marketing and lead-generation site** for Elisha Bay Dagupan Bangus and Seafoods.
It is not an e-commerce store. Do not add a cart, checkout, payment flow, or a backend without an
approved issue.

**Current mode:** local git repository with a human merge/deploy gate. When a remote is added,
switch to branch + pull request + CI; the QA gate stays the same.

## Commands

| Command         | Does                                                            |
| --------------- | --------------------------------------------------------------- |
| `make install`  | Install dependencies.                                           |
| `make dev`      | Start Vite locally (default `http://localhost:5173`).           |
| `make build`    | Type-check and build the production site into `dist/`.          |
| `make lint`     | Strict TypeScript check; the current lint gate.                 |
| `make test`     | Playwright journeys, responsive checks and axe accessibility.   |
| `make verify`   | **The pre-merge gate:** lint + build + test.                    |
| `make preview`  | Preview the built site locally.                                 |

`make verify` must pass before a change is handed to QA. A target that is broken should be fixed,
not bypassed.

## Reading map

| Read | When |
| ---- | ---- |
| [`product-spec.md`](product-spec.md) | Always. Behaviour and acceptance criteria live here. |
| [`_docs/process.md`](_docs/process.md) | Always. PM → engineer → QA loop and permissions. |
| [`_docs/handoff.md`](_docs/handoff.md) | First, when picking up work you did not start. |
| [`_docs/task-template.md`](_docs/task-template.md) | When grooming or filing an issue. |
| [`_docs/testing-guidelines.md`](_docs/testing-guidelines.md) | When adding or changing tests. |
| [`_docs/design-system.md`](_docs/design-system.md) | When changing UI, copy, tokens or components. |
| [`_docs/backlog.md`](_docs/backlog.md) | When choosing the next task. |
| [`_docs/team/`](_docs/team/) | When running as PM, software engineer or QA. |
| [`_docs/ai-usage-report.md`](_docs/ai-usage-report.md) | Append an entry when you finish a task. |

## Repo map

```text
src/
  components/       page sections, nav, footer, form, decorations
  data/             site config and placeholder product data
  hooks/            scroll, reveal and scroll-spy hooks
  index.css         design tokens, shared component styles, motion rules
  App.tsx           page composition
public/             favicons, icons, manifest, OG image and optimized imagery
tests/e2e/          Playwright QA suite
docs/               generated preview images
_docs/              process, roles, spec support, testing, handoff, backlog
.github/            CI, issue template and PR template
```

## Rules

1. **Never invent business facts.** Do not add certifications, awards, addresses, phone numbers,
   emails, product sizes, ingredients, prices, or company-history claims without a human-confirmed
   source. Use the placeholders in `src/data/site.ts` and `src/data/products.ts`.
2. **Certification claims stay withheld until approved.** The Quality section must not display FDA,
   US FDA, GMP or other official marks/claims until the client supplies documentation. Keep the
   neutral “Verification pending” treatment and its note until a human confirms the exact wording.
3. **Products and packaging are placeholders.** Keep the disclaimer visible. Do not present
   generated packaging as authentic Elisha Bay packaging.
4. **No e-commerce.** No cart, checkout, payment gateway, inventory or account system in this phase.
5. **The inquiry channel is the official Facebook/Messenger page.** Do not invent an email, phone,
   WhatsApp number, or alternative form backend. The form must keep its Messenger handoff and copy
   fallback.
6. **The agent that writes code does not decide whether it is correct.** QA runs in a fresh context
   with the issue, acceptance criteria and running site. The engineer never approves its own work.
7. **One issue, one branch.** Branch from current `main`; do not mix unrelated changes. New ideas
   become issues.
8. **Failing test first.** Every behaviour change ships a test that fails without it, or a documented
   manual proof when the claim cannot be automated. Run `make verify`.
9. **Humans own irreversible actions.** Agents do not merge to `main`, deploy, change DNS, or publish
   claims. The human owner approves content and merges.
10. **Preserve the design system.** Use the existing tokens and components. Script type is for
    statements only; navigation, labels and paragraphs use Poppins/Inter. Keep WCAG AA, visible
    focus, reduced motion and mobile-first layouts.

## Content guardrails

These are product requirements, not suggestions:

- Product names, imagery and packaging in the current build are **illustrative placeholders**.
- The About paragraph is **proposed copy**, not verified history.
- Phone, email and street address are **unknown**; do not fill them in.
- “Quality You Can Trust” and “A Taste of the Philippines” are brand lines, not certifications.
- The official Elisha Bay logo is supplied. Use the transparent assets in `public/logo/`; on dark
  surfaces use the cream badge treatment. Do not recolor, crop or replace it with the old custom
  crest without the owner’s approval.
- Any change to the above needs a human decision. If an issue asks for a claim without a source,
  stop and escalate to the human owner.

## The loop in one paragraph

The PM grooms an issue with checkable acceptance criteria from [`product-spec.md`](product-spec.md).
The software engineer implements it on a branch from `main`, writes the failing test first and runs
`make verify`. A fresh QA session verifies every AC against the running site, runs the suite and
posts PASS or FAIL. On PASS the **human owner** reviews and merges; on FAIL the engineer gets a
bounded second cycle. QA re-checks `main` after the merge and the issue closes only then. Details,
permissions and the verdict format: [`_docs/process.md`](_docs/process.md).

## Definition of done

- [ ] Every AC in the issue has an automated test or a named manual proof
- [ ] `make verify` passes locally
- [ ] No new invented business claims, contact details or certification marks
- [ ] Keyboard, reduced-motion and responsive behaviour checked for UI changes
- [ ] No console errors, failed asset requests or horizontal overflow at 320–1920px
- [ ] `_docs/handoff.md` and `_docs/ai-usage-report.md` updated when the state or decisions change
- [ ] QA has posted PASS; the human owner has not been bypassed
