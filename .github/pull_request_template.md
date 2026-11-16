## What changed

One paragraph. The outcome, not a file list.

## Issue

Refs #N

The human owner merges after QA PASS. The issue is closed manually only after the post-merge check.

## Acceptance criteria

- [ ] US1-AC1 — PASS, proved by `<test file>::<test name>` or a named manual check
- [ ] US4-AC3 — PASS, proved by `tests/e2e/landing.spec.ts`

## How I proved it

```text
$ make verify
# paste the result here
```

The new test was observed failing before the change:

```text
# command, failing assertion, expected failure
```

## Manual checks

- [ ] Content guardrails reviewed (no invented certifications, contact details, history, prices or
      product facts)
- [ ] 390px, 768px and 1440px checked for clipping, overflow and focus
- [ ] Keyboard path checked
- [ ] Placeholder disclosures remain where assets are not approved

## Content approvals

- [ ] Any certification/contact/product/history change has the human owner’s approval
- [ ] No approved wording or asset is used in a different form

## Risk and rollback

- Risk:
- Rollback: revert this change; no data migration or backend state
