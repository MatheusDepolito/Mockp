# Validation Example — Commands by Scenario

> Status: Current project state

All commands quoted from **`package.json`** scripts verified at repo root and **`apps/api/package.json`**; per-target **`nx`** availability is **Needs verification** if your workspace lacks inferred targets—confirm with [[../operations/NX_COMMANDS|Nx Commands]].

Companion: [[../operations/VALIDATION_CHECKLIST|Validation Checklist]], [[../operations/PRE_COMMIT_CHECKLIST|Pre-Commit Checklist]].

## Global Baseline

| Command | Source | Typical use |
| --- | --- | --- |
| **`yarn validate`** | Root `scripts.validate` (`format:write`, `tsc`, `lint`, `build`) | Final gate before handing work back |
| **`yarn tsc`** | Root `yarn nx run-many -t tsc` | Types across workspaces |
| **`yarn lint`** | Root `yarn nx run-many -t lint` | ESLint sweep |
| **`yarn build`** | Root `yarn nx run-many -t build` | Production builds |

## Backend-Only Changes (`apps/api`)

| Step | Command | Notes |
| --- | --- | --- |
| Prisma client sync | **`yarn workspace @mockp/api prisma:generate`** | Also triggered by **`@mockp/api` `tsc`** / **`build`** scripts via `prisma:generate` prefix |
| Types | **`yarn nx run @mockp/api:tsc`** | Runs `yarn prisma:generate && tsc --noEmit` (per **`apps/api/package.json`**) |
| Lint | **`yarn nx run @mockp/api:lint`** | ESLint autofix configured |
| Build | **`yarn nx run @mockp/api:build`** | Runs `yarn prisma:generate && nest build` |

> **Needs verification:** destructive migration commands (**`yarn workspace @mockp/api prisma:migrate`** etc.) belong to humans following [[../database/PRISMA_MIGRATION_SAFETY|Prisma Migration Safety]]. Agents avoid running without explicit approval.

## Frontend-Only Changes (example `@mockp/web`)

| Command | Typical use |
| --- | --- |
| **`yarn nx run @mockp/web:tsc`** | If target exists (`Needs verification`) |
| **`yarn nx run @mockp/web:lint`** | App lint |
| **`yarn nx run @mockp/web:build`** | `next build` |

Repeat pattern for **`@mockp/web-admin`**, **`@mockp/web-manager`**, **`@mockp/web-valet`** **only after** verifying each package exposes those targets (**see `apps/*/package.json` + Nx inference**).

## GraphQL Contract Change

| Step | Command |
| --- | --- |
| Regenerate client types/documents | **`yarn workspace @mockp/network codegen`** |
| Repo-wide sanity | **`yarn validate`** afterward |

Codegen config includes **`watch: true`** (**`libs/network/codegen.ts`**) → **Needs verification** for CI/automation equivalents.

## Prisma / Database Schema Change

| Step | Command | Guardrails |
| --- | --- | --- |
| Preview / apply migrations (human-owned) | **`yarn workspace @mockp/api prisma:migrate`** | Run only under human direction ([[../database/PRISMA_MIGRATION_SAFETY|Prisma Migration Safety]]) |
| Regenerate client | **`yarn workspace @mockp/api prisma:generate`** | Required post-schema edits |
| API compile | **`yarn nx run @mockp/api:tsc`** | Catches mismatched typings |

Agents do **not** run migrations as part of doc examples.

## Shared UI / **`libs/forms` / `libs/ui`**

- Touching packages consumed by multiple apps ⇒ prefer **`yarn validate`** once local smoke tests pass (`yarn nx run @mockp/web:dev`, etc.).
- If only **`libs/ui`** edits: **`yarn nx run @mockp/ui:tsc`** (Needs verification depending on inferred targets).

## Docs-Only Updates (`docs/wiki/**`)

| Command | When |
| --- | --- |
| None strictly required | Markdown-only edits |
| Optional | **`yarn validate`** before major release trains to ensure no accidental stray TS edits |

Markdown lint tooling is **not** confirmed—**Needs verification**.

## Quick Matrix

| Change shape | Minimal command set |
| --- | --- |
| Resolver/service only | `yarn nx run @mockp/api:tsc` (+ `lint`/`build` if sizable) |
| Next page only | `@mockp/web` targets + manual smoke |
| GraphQL doc change | **`yarn workspace @mockp/network codegen`** + impacted app builds |
| Mixed monorepo | **`yarn validate` |
