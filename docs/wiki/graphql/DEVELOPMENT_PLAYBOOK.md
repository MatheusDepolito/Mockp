# GraphQL Development Playbook (Contracts + Codegen)

> Status: Current project state

Operational checklist for **GraphQL** contract and **codegen** work. Canonical deep-dive: [[CONTRACT_CHANGE_GUIDE|GraphQL Contract Change Guide]].

Also aligned with [[../ARCHITECTURE|Architecture]], [[../START_HERE|Start Here]], [[../agents/STOP_CONDITIONS|Stop Conditions]].

### Verified Paths

- Generated schema reference: `apps/api/src/schema.gql`
- Operations/fragments: `libs/network/src/gql/queries.graphql`
- Generated types/documents: `libs/network/src/gql/generated.tsx`
- Codegen config: `libs/network/codegen.ts` (schema path `../../apps/api/src/schema.gql`)
- Command: `yarn workspace @mockp/network codegen` (runs `graphql-codegen --config codegen.ts`)

---

## Before You Change Anything

- [ ] If you change schema, inputs, outputs, queries, or mutations, read [[CONTRACT_CHANGE_GUIDE]] first.
- [ ] Classify the change:
  - [ ] Backend schema/runtime only
  - [ ] Frontend operations only
  - [ ] Both
- [ ] Map frontend consumers:
  - [ ] `libs/network/src/gql/queries.graphql`
  - [ ] Imports of typed `*Document` values across apps/libs

---

## Types Shared With the Frontend

Mockp shares frontend types through **GraphQL + codegen**:

- **Schema**: `apps/api/src/schema.gql`
- **Operations**: `libs/network/src/gql/queries.graphql`
- **Consumption**: `libs/network/src/gql/generated.tsx` (single generated surface)

Rules (must):

- [ ] Do **not** hand-edit `generated.tsx`.
- [ ] Apps/libs import types and documents from `generated.tsx`.
- [ ] Do **not** re-model backend Prisma/domain types manually in frontend code.

**Needs verification:**

- [ ] `codegen.ts` may use `watch: true`; CI/automation needs a deterministic non-watch invocation if codegen becomes a gated step.

---

## Required Checklist (Must)

- [ ] Do **not** remove/rename GraphQL fields without consumer mapping and a compatibility plan.
- [ ] Avoid leaking internal persistence details through the schema.
- [ ] Keep naming consistent across types, inputs, payloads, and `queries.graphql` operations.
- [ ] Every schema update should:
  - [ ] Refresh operations/fragments when needed.
  - [ ] Regenerate `generated.tsx`.
  - [ ] Update downstream consumers.

---

## Compatible Evolution (Should)

- [ ] Prefer adding fields, deprecating thoughtfully, migrating clients, removing only after the migration window closes.

---

## Anti-Patterns

- [ ] Silent schema edits that break many screens at once.
- [ ] Duplicate queries/mutations outside `libs/network/src/gql/queries.graphql`.
- [ ] Editing `generated.tsx`.

---

## Before You Finish

- [ ] Sanity-check `apps/api/src/schema.gql` when regenerated.
- [ ] Review fragments and documents in `libs/network/src/gql/queries.graphql`.
- [ ] Confirm `generated.tsx` compiles cleanly with consumers.

From repo root:

- [ ] `yarn tsc`
- [ ] `yarn lint`
- [ ] `yarn build`

---

## Wrap-Up Template

- **Summary**:
- **Schema changed?**:
- **Operations/fragments changed?**:
- **Consumers updated?**:
- **Validations run**:
- **Known risks**:
