# Pre-Commit Checklist

> Status: Current project state

Use this checklist before committing or handing work back for review.

Read with:

- [[VALIDATION_CHECKLIST]]
- [[NX_COMMANDS]]
- [[CI_AND_NX_CLOUD]]
- [[DEPLOYMENT_ARCHITECTURE]]
- [[ENVIRONMENT_MATRIX]]
- [[SECRETS_MANAGEMENT]]
- [[PRODUCTION_MIGRATION_FLOW]]
- [[ROLLBACK_STRATEGY]]
- [[OBSERVABILITY_AND_INCIDENTS]]
- [[../testing/TEST_STRATEGY|Test Strategy]]
- [[../testing/MANUAL_QA_GUIDE|Manual QA Guide]]
- [[../agents/STOP_CONDITIONS|Stop Conditions]]

## Verified Hook

The repository has a Husky pre-commit hook:

```text
.husky/pre-commit
```

It runs:

```powershell
yarn validate
```

`yarn validate` runs:

```powershell
yarn format:write && yarn tsc && yarn lint && yarn build
```

Important: this can modify files because `format:write` runs first.

## Review Changed Files

Before committing:

- Review `git status`.
- Review the diff.
- Separate unrelated changes.
- Confirm generated files are expected.
- Confirm no secrets or local `.env` files are included.
- Confirm no broad refactor is mixed into a feature or bugfix.

## Documentation Updates

Update docs when changing:

- Setup or local run flow.
- Environment variables.
- Docker/PostgreSQL.
- GraphQL contracts.
- REST patterns.
- Prisma schema/migrations/seed.
- Nx/scripts/validation commands.
- Auth/session/roles/permissions.
- Shared UI/forms/network patterns.
- Not-implemented areas such as audit, notifications, or i18n.

## Validation Commands

Choose the smallest reliable set from [[VALIDATION_CHECKLIST]].

Common root checks:

```powershell
yarn tsc
yarn lint
yarn build
```

Use `yarn validate` only when formatting changes are acceptable.

## Contract and Database Checks

If GraphQL changed:

- Check [[../graphql/CONTRACT_CHANGE_GUIDE|GraphQL Contract Change Guide]].
- Update operations when needed.
- Run codegen when needed.
- Validate frontend consumers.

If Prisma/database changed:

- Check [[../database/PRISMA_MIGRATION_SAFETY|Prisma Migration Safety]].
- Inspect migration SQL.
- Run `prisma:generate`.
- Run `prisma:status`.
- Validate affected API/GraphQL/frontend code.

## Frontend Shared Code Checks

If `libs/ui` changed:

- Check [[../frontend/SHARED_UI_GUIDE|Shared UI Guide]].
- Identify all affected apps.
- Validate affected app builds/lints.
- Manually QA shared visual behavior.

If `libs/forms` changed:

- Check [[../frontend/FORMS_GUIDE|Forms Guide]].
- Validate form consumers.
- QA valid/invalid submit paths.

If `libs/network` changed:

- Check [[../frontend/NETWORK_USAGE_GUIDE|Network Usage Guide]].
- Validate GraphQL/codegen/auth behavior.

## Auth, Env, and Infra Checks

If auth/session changed:

- Check [[../security/AUTHORIZATION_GUIDE|Authorization Guide]].
- Check [[../security/AUTH_SESSION_GUIDE|Auth Session Guide]].
- Manually QA login/session/protected paths.

If env vars changed:

- Update [[../setup/ENVIRONMENT_VARIABLES|Environment Variables]].
- Update [[ENVIRONMENT_MATRIX]] and [[SECRETS_MANAGEMENT]] when environment or secret assumptions change.
- Update `.env.example` files if needed.

If Docker/database infra changed:

- Update [[DOCKER_AND_DATABASE]].
- Check [[DEPLOYMENT_ARCHITECTURE]] and [[PRODUCTION_MIGRATION_FLOW]] before making production assumptions.
- Confirm Postgres version, ports, volume paths, and connection string.

If release/deployment risk changed:

- Update [[RELEASE_READINESS]].
- Check [[ROLLBACK_STRATEGY]].
- Check [[OBSERVABILITY_AND_INCIDENTS]].

## Final Review

Before final answer or commit:

- Commands run are listed.
- Manual QA is listed.
- Known `Needs verification` items are listed.
- Stop conditions were not bypassed.
- No unrelated refactor was included.
- No implementation was added for audit logging, notifications, or i18n unless explicitly requested.
