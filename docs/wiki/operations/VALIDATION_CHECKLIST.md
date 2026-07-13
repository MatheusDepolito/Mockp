# Validation Checklist

> Status: Current project state

Use this checklist to validate changes before handing work back. Prefer the smallest reliable validation set for the files touched, and broaden validation when shared code, contracts, database schema, or app boundaries changed.

Read with:

- [[../setup/LOCAL_DEVELOPMENT|Local Development]]
- [[../operations/DOCKER_AND_DATABASE|Docker and Database]]
- [[NX_COMMANDS]]
- [[../security/AUTHORIZATION_GUIDE|Authorization Guide]]
- [[../security/AUTH_SESSION_GUIDE|Auth Session Guide]]
- [[../security/ROLE_PERSONA_MATRIX|Role Persona Matrix]]
- [[../frontend/FRONTEND_FEATURE_FLOW|Frontend Feature Flow]]
- [[../frontend/COMPONENT_GUIDE|Component Guide]]
- [[../frontend/SHARED_UI_GUIDE|Shared UI Guide]]
- [[../frontend/FORMS_GUIDE|Forms Guide]]
- [[../frontend/NETWORK_USAGE_GUIDE|Network Usage Guide]]
- [[../testing/TEST_STRATEGY|Test Strategy]]
- [[../testing/MANUAL_QA_GUIDE|Manual QA Guide]]
- [[CI_AND_NX_CLOUD]]
- [[PRE_COMMIT_CHECKLIST]]
- [[RELEASE_READINESS]]
- [[DEPLOYMENT_ARCHITECTURE]]
- [[ENVIRONMENT_MATRIX]]
- [[SECRETS_MANAGEMENT]]
- [[PRODUCTION_MIGRATION_FLOW]]
- [[ROLLBACK_STRATEGY]]
- [[OBSERVABILITY_AND_INCIDENTS]]
- [[../agents/STOP_CONDITIONS|Stop Conditions]]
- [[../agents/WIKI_REVIEW_CHECKLIST|Wiki Review Checklist]]
- [[../examples/VALIDATION_EXAMPLE|Validation Example]]

## Install and Dependency Checks

From the repository root:

```powershell
yarn install
```

Use this when:

- `package.json` changed.
- `yarn.lock` changed.
- A workspace dependency was added/removed.
- Yarn reports a lockfile/workspace mismatch.

## Testing Reality

Use [[../testing/TEST_STRATEGY|Test Strategy]].

> Needs verification
>
> No active test framework, test scripts, coverage scripts, or test files were verified. When tests are missing, validation must rely on typecheck, lint, build, targeted tool checks, and [[../testing/MANUAL_QA_GUIDE|Manual QA Guide]].

## Root Validation Commands

Root scripts verified in `package.json`:

```powershell
yarn tsc
yarn lint
yarn build
```

Full root validation:

```powershell
yarn validate
```

Important: `yarn validate` runs `format:write`, which can modify files. Use it only when formatting changes are acceptable.

Format checks:

```powershell
yarn format:check
yarn format:write
```

## Nx Project Validation

Use Nx when validating one project:

```powershell
yarn nx run @mockp/api:tsc
yarn nx run @mockp/api:lint
yarn nx run @mockp/api:build
```

Frontend app examples:

```powershell
yarn nx run @mockp/web:lint
yarn nx run @mockp/web:tsc
yarn nx run @mockp/web:build
```

> Needs verification
>
> `@mockp/web-admin`, `@mockp/web-manager`, and `@mockp/web-agent` package scripts currently define `lint` and `build`, but not `tsc`. Verify the Nx target exists before running `yarn nx run <project>:tsc` for those apps.

See [[NX_COMMANDS]] for the current command map and missing/uncertain targets.

## Backend Validation

API scripts verified in `apps/api/package.json`:

```powershell
yarn workspace @mockp/api prisma:generate
yarn workspace @mockp/api prisma:status
yarn workspace @mockp/api tsc
yarn workspace @mockp/api lint
yarn workspace @mockp/api build
```

Use API validation when touching:

- `apps/api/src`
- Prisma schema/config/seed
- NestJS modules, services, resolvers, controllers, DTOs, guards
- Auth or permissions
- Stripe REST flow

For auth/authorization changes, also use [[../security/AUTHORIZATION_GUIDE|Authorization Guide]] and [[../security/AUTH_SESSION_GUIDE|Auth Session Guide]].

## Frontend Validation

Main web app scripts verified in `apps/web/package.json`:

```powershell
yarn workspace @mockp/web tsc
yarn workspace @mockp/web lint
yarn workspace @mockp/web build
```

Other frontend app scripts verified in package files:

```powershell
yarn workspace @mockp/web-admin lint
yarn workspace @mockp/web-admin build
yarn workspace @mockp/web-manager lint
yarn workspace @mockp/web-manager build
yarn workspace @mockp/web-agent lint
yarn workspace @mockp/web-agent build
```

Use frontend validation when touching:

- `apps/web`
- `apps/web-admin`
- `apps/web-manager`
- `apps/web-agent`
- `libs/ui`
- `libs/forms`
- `libs/util`
- `libs/network`

Use frontend-specific guides:

- [[../frontend/FRONTEND_FEATURE_FLOW]]
- [[../frontend/COMPONENT_GUIDE]]
- [[../frontend/SHARED_UI_GUIDE]]
- [[../frontend/FORMS_GUIDE]]
- [[../frontend/NETWORK_USAGE_GUIDE]]

## Prisma Validation

Prisma scripts verified in `apps/api/package.json`:

```powershell
yarn workspace @mockp/api prisma:generate
yarn workspace @mockp/api prisma:status
yarn workspace @mockp/api prisma:migrate
yarn workspace @mockp/api prisma:seed
```

Use:

- `prisma:generate` after schema changes or when generated client is missing.
- `prisma:status` before/after migration work.
- `prisma:migrate` for local development migrations.
- `prisma:seed` after resetting local data or changing seed behavior.

Stop before destructive migrations or production data/backfill decisions.

Use [[../database/PRISMA_MIGRATION_SAFETY|Prisma Migration Safety]] before changing migrations.

## GraphQL Codegen

GraphQL codegen script verified in `libs/network/package.json`:

```powershell
yarn workspace @mockp/network codegen
```

Codegen config verified in `libs/network/codegen.ts`:

- Schema source: `apps/api/src/schema.gql`
- Documents: `libs/network/src/**/*.graphql`
- Output: `libs/network/src/gql/generated.tsx`
- Config currently has `watch: true`.

> Needs verification
>
> Because codegen is configured with `watch: true`, confirm whether this command exits in the current environment before using it as a one-shot validation step.

Run codegen when:

- `apps/api/src/schema.gql` changes.
- GraphQL resolver types change the generated schema.
- `libs/network/src/**/*.graphql` changes.
- Frontend generated GraphQL types are stale.

Use [[../graphql/CONTRACT_CHANGE_GUIDE|GraphQL Contract Change Guide]] before changing contracts.

## REST Validation

Use [[../rest/REAL_REST_PATTERNS|Real REST Patterns]] for current REST endpoints.

> Status: Future recommendation
>
> Typed OpenAPI REST validation is documented in [[../rest/FUTURE_TYPED_REST_OPENAPI|Future Typed REST OpenAPI]], but it is not implemented in the current project.

## Docker and Database Checks

From `apps/api`:

```powershell
docker compose up -d
docker ps --filter "name=mockp_db"
docker compose down
```

Local database facts:

- Image: `postgres:18`
- Container: `mockp_db`
- Host port: `2000`
- Database: `mockp_db`
- User/password: `mockp` / `mockp`
- Volume: `db_data_mockp`

Use [[DOCKER_AND_DATABASE]] for reset steps.

## Manual Verification Checklist

Use this after automated checks:

- Confirm the correct app/persona was tested.
- Confirm env vars are loaded by the running process.
- Confirm backend is reachable at `http://localhost:3000`.
- Confirm GraphQL is reachable at `http://localhost:3000/graphql`.
- Confirm Swagger is reachable at `http://localhost:3000/`.
- Confirm the affected frontend route works on its expected port.
- Confirm login/session behavior if auth was touched.
- Confirm the role/persona and app mapping with [[../security/ROLE_PERSONA_MATRIX|Role Persona Matrix]] when authorization or app access changed.
- Confirm create/update/delete flows if mutations were touched.
- Confirm no unrelated app was changed unless shared code was touched.

Use [[../testing/MANUAL_QA_GUIDE|Manual QA Guide]] for app/persona-specific QA.

## Cross-Cutting Not-Implemented Areas

Use these guides before validating changes that mention the topic:

- [[../security/AUDIT_LOGGING_GUIDE]]
- [[../notifications/NOTIFICATIONS_GUIDE]]
- [[../i18n/I18N_GUIDE]]

These are not implemented as project standards. Validation cannot pass by inventing ad-hoc implementations without architectural approval.

## When Validation Fails

Stop and report when:

- A command fails and the cause is not clearly related to the change.
- Fixing the failure requires a broader refactor.
- Generated files or lockfiles change unexpectedly.
- Tests contradict the expected behavior.
- The current documentation and current code disagree in a way that affects implementation.

Use [[../agents/STOP_CONDITIONS|Stop Conditions]].

## Pre-Commit and Release Readiness

Before committing or final handoff:

- Use [[PRE_COMMIT_CHECKLIST]].
- Use [[CI_AND_NX_CLOUD]] to avoid assuming hidden CI behavior.
- Use [[RELEASE_READINESS]] for deployment/release risk notes.
- Use [[DEPLOYMENT_ARCHITECTURE]], [[ENVIRONMENT_MATRIX]], [[SECRETS_MANAGEMENT]], [[PRODUCTION_MIGRATION_FLOW]], [[ROLLBACK_STRATEGY]], and [[OBSERVABILITY_AND_INCIDENTS]] when changes affect production assumptions.
