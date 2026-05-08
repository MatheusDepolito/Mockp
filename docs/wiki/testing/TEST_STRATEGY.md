# Test Strategy

> Status: Current project state

This guide documents the testing reality currently visible in the repository. Do not invent or assume a test framework that is not configured.

Read with:

- [[MANUAL_QA_GUIDE]]
- [[../operations/VALIDATION_CHECKLIST|Validation Checklist]]
- [[../operations/NX_COMMANDS|Nx Commands]]
- [[../operations/CI_AND_NX_CLOUD|CI and Nx Cloud]]
- [[../agents/STOP_CONDITIONS|Stop Conditions]]

## Verified Testing Reality

Repository verification found:

- No `*.spec.ts`, `*.test.ts`, `*.spec.tsx`, or `*.test.tsx` files.
- No Jest config files.
- No Vitest config files.
- No Playwright config files.
- No Cypress config files.
- No root `test` script.
- No app/package `test` scripts in verified package files.
- No coverage scripts.

Current validation is based on:

- TypeScript typecheck.
- Lint.
- Build.
- Prisma generate/status when database is involved.
- GraphQL codegen when contracts/operations are involved.
- Manual QA.

## Existing Test Frameworks

> Needs verification

No active test framework was verified from config, scripts, or test files.

`@nestjs/testing` is present in `apps/api` dev dependencies, but no backend test scripts or test files were verified.

## What Agents Should Do Today

When changing business logic:

- Prefer adding or updating a focused test only if a test framework already exists for the affected package.
- If no test framework exists, do not introduce one casually as part of a feature/bugfix.
- Validate with typecheck, lint, build, and manual QA.
- Document the missing automated test as residual risk.
- Use [[MANUAL_QA_GUIDE]] to cover the user flow.

## When Automated Tests Are Needed But Missing

Stop or ask for review when:

- The change affects payments, booking lifecycle, auth, permissions, migrations, or cross-app shared behavior.
- The expected behavior is hard to verify manually.
- The change requires a new testing framework to be meaningful.
- Existing validation cannot cover the risk.

Use [[../agents/STOP_CONDITIONS|Stop Conditions]].

## Suggested Test Types If Added Later

> Status: Future recommendation

If the team chooses to introduce tests later, consider:

- Backend unit tests for services and authorization helpers.
- Backend integration tests for GraphQL resolver flows.
- Frontend component tests for complex shared UI.
- E2E tests for login, booking, manager garage flow, admin verification, and valet trips.
- Migration safety tests or checks for destructive SQL.

Do not implement these frameworks in this phase.

## Current Validation Baseline

Use:

- [[../operations/VALIDATION_CHECKLIST]]
- [[MANUAL_QA_GUIDE]]
- [[../operations/PRE_COMMIT_CHECKLIST]]

Minimum expectation depends on touched files:

- API logic: API typecheck/lint/build and manual API/GraphQL verification.
- Frontend route/UI: affected app lint/build and manual browser QA.
- Shared frontend libs: validate all affected consuming apps when practical.
- GraphQL contract: API validation plus codegen and frontend consumer checks.
- Prisma schema: Prisma safety flow and backend validation.

## Needs Verification

> Needs verification

- Whether the team wants to adopt a specific unit/integration/e2e framework.
- Whether CI will enforce tests after a framework is introduced.
- Whether coverage thresholds are expected.
- Whether existing business-critical flows should receive tests before future releases.
