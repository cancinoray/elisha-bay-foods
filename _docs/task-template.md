# Task template

Use this for every groomed issue. Keep it short enough to read in one sitting.

## Goal

One or two sentences on what should be true when this is done. Write the outcome, not a list of
steps.

## Acceptance criteria

- [ ] US1-AC1 — a checkable outcome (`e2e`)
- [ ] US4-AC3 — include the awkward cases: empty, invalid, blocked, missing asset (`e2e` / `manual`)

Every AC must name an id from [product-spec.md](../product-spec.md) and a proof. If a criterion
cannot be checked by a test or a named manual step, it is not ready.

## Out of scope

- Adjacent work that does not belong in this issue, with a follow-up issue if it matters
- A tempting improvement that would widen the diff

## Constraints

- Files/directories the change should stay inside
- Libraries to use or avoid
- Design-system rules that apply
- Content guardrails: certifications, contact details, company history, product facts, official
  assets
- The exact proof command (`make verify` plus any manual check)

## Human checkpoints

List anything the human owner must approve before implementation or merge:

- [ ] Certification wording/documents
- [ ] Contact details
- [ ] About / company-history copy
- [ ] Product names, ingredients, sizes, prices or packaging
- [ ] Logo or approved photography

## Notes

Links to the design reference, related issues, or evidence. Do not paste secrets or personal data.
