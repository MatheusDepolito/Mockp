# Nx Commands

> Status: Current project state

This guide documents how Nx and workspace scripts are currently used in the repository.

Read with:

- [[VALIDATION_CHECKLIST]]
- [[CI_AND_NX_CLOUD]]
- [[PRE_COMMIT_CHECKLIST]]
- [[../setup/LOCAL_DEVELOPMENT|Local Development]]
- [[../features/NEW_FEATURE_FLOW|New Feature Flow]]
- [[../debugging/BUGFIX_PLAYBOOK|Bugfix Playbook]]

## Verified Nx Setup

Verified repository facts:

- Nx version in root `package.json`: `20.4.0`.
- Nx config file: `nx.json`.
- Root workspaces: `apps/*`, `libs/*`.
- No `project.json` files were found.
- No root `workspace.json` project configuration was found.
- Targets come from workspace package scripts.
- `nx.json` has target defaults for `build`, `lint`, and `tsc`.
- `nx.json` has `defaultBase: "main"`.
- `nx.json` has an `nxCloudId`.

## Root Scripts

Root scripts in `package.json`:

```powershell
yarn tsc
yarn lint
yarn build
yarn validate
yarn format:check
yarn format:write
```

Mappings:

- `yarn tsc` -> `yarn nx run-many -t tsc`
- `yarn lint` -> `yarn nx run-many -t lint`
- `yarn build` -> `yarn nx run-many -t build`
- `yarn validate` -> `yarn format:write && yarn tsc && yarn lint && yarn build`

Important: `yarn validate` can modify files because it runs `format:write`.

## App and Workspace Scripts

API scripts verified in `apps/api/package.json`:

```powershell
yarn nx run @mockp/api:dev
yarn nx run @mockp/api:tsc
yarn nx run @mockp/api:lint
yarn nx run @mockp/api:build
```

API package also has Prisma scripts:

```powershell
yarn workspace @mockp/api prisma:generate
yarn workspace @mockp/api prisma:migrate
yarn workspace @mockp/api prisma:status
yarn workspace @mockp/api prisma:seed
```

Main web scripts verified in `apps/web/package.json`:

```powershell
yarn nx run @mockp/web:dev
yarn nx run @mockp/web:tsc
yarn nx run @mockp/web:lint
yarn nx run @mockp/web:build
```

Other frontend app scripts verified in package files:

```powershell
yarn nx run @mockp/web-admin:dev
yarn nx run @mockp/web-admin:lint
yarn nx run @mockp/web-admin:build

yarn nx run @mockp/web-manager:dev
yarn nx run @mockp/web-manager:lint
yarn nx run @mockp/web-manager:build

yarn nx run @mockp/web-valet:dev
yarn nx run @mockp/web-valet:lint
yarn nx run @mockp/web-valet:build
```

GraphQL network codegen:

```powershell
yarn workspace @mockp/network codegen
```

## Choosing Commands by Changed Files

Use this selection rule:

- Root package or shared config changed: run root `yarn tsc`, `yarn lint`, and likely `yarn build`.
- `apps/api` changed: run API `tsc`, `lint`, `build`.
- Prisma changed: run `prisma:generate`, `prisma:status`, and inspect migration SQL if migration changed.
- GraphQL schema/operations changed: run API validation and network codegen.
- `apps/web` changed: run `@mockp/web` `tsc`, `lint`, `build` as needed.
- `apps/web-admin`, `apps/web-manager`, or `apps/web-valet` changed: run that app's `lint` and `build`.
- Shared frontend libs changed: validate every app that consumes the changed package when practical.

Use [[VALIDATION_CHECKLIST]] for the full checklist.

## Affected Commands

> Needs verification

`nx.json` has `defaultBase: "main"`, so Nx affected commands should be possible in principle, but this guide did not verify current affected behavior.

Do not rely on `nx affected` as the only validation until verified in the current branch/environment.

See [[CI_AND_NX_CLOUD]] before assuming affected commands are used by CI.

Potential commands to verify later:

```powershell
yarn nx affected -t lint
yarn nx affected -t tsc
yarn nx affected -t build
```

## Missing or Uncertain Targets

> Needs verification

- `@mockp/web-admin`, `@mockp/web-manager`, and `@mockp/web-valet` do not define `tsc` scripts in their package files.
- No test scripts were verified in the app package files.
- `libs/ui` defines Next-style `dev`, `build`, `start`, and `lint`, but not `tsc`.
- `libs/forms` and `libs/util` do not define validation scripts in package files.
- `@mockp/network` defines `codegen`, but not `lint`, `build`, or `tsc`.

## Agent Rules

- Prefer project-scoped Nx commands for focused changes.
- Use root commands when shared packages, contracts, or workspace config changed.
- Do not assume a target exists just because another app has it.
- Do not run `yarn validate` unless formatting changes are acceptable.
- If a command fails because a target is missing, document it as `Needs verification` instead of inventing a target.
- Use [[../testing/TEST_STRATEGY|Test Strategy]] and [[../testing/MANUAL_QA_GUIDE|Manual QA Guide]] when no test target exists.
