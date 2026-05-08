# Nx Development Playbook

> Status: Current project state

This document describes how Nx is used in Mockp today.

**Current repository state:** the root `nx` binary orchestrates targets (`build`, `lint`, `tsc`) and caching. No per-app/per-lib `project.json` files exist; targets are inferred from each package’s `package.json`.

## Verified Files

- `nx.json`
- `package.json` (root)
- `apps/*/package.json`
- `libs/*/package.json`

## Root Scripts

From root `package.json`:

- `yarn tsc` → `yarn nx run-many -t tsc`
- `yarn lint` → `yarn nx run-many -t lint`
- `yarn build` → `yarn nx run-many -t build`
- `yarn validate` → `yarn format:write && yarn tsc && yarn lint && yarn build`

## Verified `nx.json` Settings

Cached targets:

- `build`
- `lint`
- `tsc`

Configured relationships:

- `build`, `lint`, and `tsc` use `dependsOn` for dependency projects (`^build`, `^lint`, `^tsc`).
- `build` declares outputs such as `.next`, `build`, and `dist`.
- `defaultBase` is `main`.
- Nx Cloud is referenced via `nxCloudId`.

## How to Validate During Changes

- [ ] Prefer root scripts when validating after app/lib edits:
  - [ ] `yarn tsc`
  - [ ] `yarn lint`
  - [ ] `yarn build`
- [ ] For a narrowly scoped change you may run the affected package scripts first (`apps/api`, `apps/web`, etc.), then run root validation.
- [ ] Avoid adding `project.json` files or bespoke Nx targets without a clear reason.

## Future Recommendations (Not Implemented)

> Status: Future recommendation

- [ ] Consider `nx affected` workflows if incremental CI validation becomes important.
- [ ] Add explicit Nx projects only if inferred targets are insufficient.

## Operational Notes

- No test tooling was verified (`jest.config.*`, `*.spec.ts`, `*.test.ts`) for the baseline described in [[../testing/TEST_STRATEGY|Test Strategy]].
- Some libs may not expose `build`/`lint`/`tsc`; `run-many` behavior depends on what Nx infers.

For commands and uncertainties, prefer [[../operations/NX_COMMANDS|Nx Commands]] and [[../operations/VALIDATION_CHECKLIST|Validation Checklist]].
