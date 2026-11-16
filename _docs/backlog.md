# Backlog

The local queue until a remote tracker exists. The PM keeps this ordered and moves items into
groomed issues. An item is **Ready** only when it has a goal, checkable ACs, out-of-scope and
constraints (see [task-template.md](task-template.md)).

## Content intake (human-owned)

These block any honest launch. They are not “just copy”; they are the facts the site may publish.

| Id | Priority | State | Owner | Item | Notes / ACs |
| -- | -------- | ----- | ----- | ---- | ----------- |
| EB-001 | P0 | partial | Human | Confirm printed sizes, batch details and final packaging copy | Names/descriptions, logo, packshots and a range photo are supplied; size/copy approval remains |
| EB-002 | P0 | open | Human | Approve or rewrite the About paragraph | Current copy is proposed; see US1/US3 content rules |
| EB-003 | P0 | open | Human | Confirm certification wording and supply documents | Unblocks US3-AC1..4; do not change `credentialsVerified` before this |
| EB-004 | P0 | partial | Human | Supply the official street address | Phone, email, Facebook and Instagram are supplied and wired |
| EB-005 | P0 | open | Human | Confirm the live domain and hosting; make canonical/OG URLs absolute | Unblocks production SEO |
| EB-008 | P2 | done (branch) | Engineer | Build a hero from the supplied bangus and tuyo photographs | A dedicated reshoot is optional; the trade-show display is not used as the hero |
| EB-006 | P1 | open | Human + PM | Complete an independent QA baseline of the current site | Run the QA role against `product-spec.md`; record the verdict |
| EB-007 | P1 | open | Human | Create a remote repository, protect `main`, require CI, add the human merge gate | Process already documents the mode |

## Engineering tasks (blocked or ready)

| Id | Priority | State | Owner | Item | ACs | Blocked by |
| -- | -------- | ----- | ----- | ---- | --- | ---------- |
| EB-101 | P1 | done (branch) | Engineer + QA | Add ten supplied packshots to the product cards; update disclaimers | US2-AC1..5 | EB-001 size/copy only |
| EB-102 | P1 | blocked | Engineer + QA | Publish approved certification wording/badges and update the withhold test | US3-AC1..4 | EB-003 |
| EB-103 | P1 | done (branch) | Engineer + QA | Add phone/email/Instagram channels; keep street address withheld | US4-AC4/5 | EB-004 address only |
| EB-104 | P1 | blocked | Engineer + QA | Set absolute canonical/OG/Twitter URLs for the live domain | US6-AC1..3 | EB-005 |
| EB-105 | P2 | ready | PM | Groom an issue for a real inquiry notification/CRM backend **or** document that Messenger remains the only channel | TBD | — |
| EB-106 | P2 | ready | PM | Consider self-hosted fonts / performance budget after real photography lands | US6-AC4 | — |

## Explicit non-goals

- Shopping cart, payment, checkout, accounts, inventory or order tracking.
- Invented certifications, contact details, prices, sizes or history.
- A CMS, recipe blog, testimonials or multilingual content without an approved issue.
- Deploying from an agent or merging without the human owner.

## Definition of ready

- [ ] Goal is one or two sentences
- [ ] Every AC is checkable and maps to `product-spec.md`
- [ ] Out-of-scope is written
- [ ] Constraints and the proof command are named
- [ ] Human checkpoints are listed where facts/claims are involved
- [ ] A human has confirmed the item may be worked on
