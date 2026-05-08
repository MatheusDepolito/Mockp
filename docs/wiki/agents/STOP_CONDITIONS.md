# Stop Conditions

> Status: Current project state

This guide lists situations where an agent must pause and ask for human review before continuing. These conditions are meant to prevent accidental architecture changes, data loss, contract breaks, or undocumented standards.

Read with:

- [[../START_HERE|Start Here]]
- [[../features/NEW_FEATURE_FLOW|New Feature Flow]]
- [[../debugging/BUGFIX_PLAYBOOK|Bugfix Playbook]]
- [[../operations/VALIDATION_CHECKLIST|Validation Checklist]]
- [[../operations/NX_COMMANDS|Nx Commands]]
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
- [[../operations/CI_AND_NX_CLOUD|CI and Nx Cloud]]
- [[../operations/PRE_COMMIT_CHECKLIST|Pre-Commit Checklist]]
- [[../operations/RELEASE_READINESS|Release Readiness]]
- [[../operations/DEPLOYMENT_ARCHITECTURE|Deployment Architecture]]
- [[../operations/ENVIRONMENT_MATRIX|Environment Matrix]]
- [[../operations/SECRETS_MANAGEMENT|Secrets Management]]
- [[../operations/PRODUCTION_MIGRATION_FLOW|Production Migration Flow]]
- [[../operations/ROLLBACK_STRATEGY|Rollback Strategy]]
- [[../operations/OBSERVABILITY_AND_INCIDENTS|Observability and Incidents]]
- [[agents/WIKI_REVIEW_CHECKLIST|Wiki Review Checklist]]

## Database and Migrations

Stop before:

- Destructive migrations.
- Dropping columns, tables, enum values, or relations.
- Rewriting migration history.
- Production data changes.
- Backfills without a reviewed plan.
- Changing seed behavior that affects expected local login or baseline data.
- Changing Prisma generator output paths or datasource strategy.

Use:

- [[../database/DEVELOPMENT_PLAYBOOK]]
- [[../database/PRISMA_MIGRATION_SAFETY]]
- [[../operations/DOCKER_AND_DATABASE]]

## GraphQL Contracts

Stop before:

- Removing or renaming fields, queries, mutations, args, or object types.
- Changing field meaning or nullability.
- Changing resolver authorization behavior.
- Updating schema without checking frontend operations.
- Editing generated GraphQL output directly.

Use:

- [[../graphql/DEVELOPMENT_PLAYBOOK]]
- [[../graphql/CONTRACT_CHANGE_GUIDE]]

## REST Endpoints

Stop before:

- Creating a new REST endpoint without a clear fit to current project patterns.
- Adding REST as an alternative to an existing GraphQL app-screen contract.
- Introducing OpenAPI typed REST generation.
- Changing redirect/webhook/provider behavior without confirming external requirements.

> Status: Future recommendation
>
> Typed OpenAPI REST is not implemented yet. It should be planned in a later REST-specific phase.

Use:

- [[../rest/REAL_REST_PATTERNS]]
- [[../rest/FUTURE_TYPED_REST_OPENAPI]]

## Auth, Permissions, Roles, and Sessions

Stop before:

- Changing guards, decorators, role checks, or row-level permission logic.
- Changing `NextAuth` session/JWT shape.
- Changing `JWT_SECRET` behavior.
- Adding a new role/persona.
- Making protected data visible to another persona.
- Changing Google OAuth assumptions or callback behavior.

Use:

- [[../security/AUTHORIZATION_GUIDE]]
- [[../security/AUTH_SESSION_GUIDE]]
- [[../security/ROLE_PERSONA_MATRIX]]
- [[../setup/ENVIRONMENT_VARIABLES]]

## Multiple Frontend Apps

Stop before:

- Touching more than one frontend app without confirming the affected persona/app.
- Moving a flow between `apps/web`, `apps/web-admin`, `apps/web-manager`, and `apps/web-valet`.
- Changing app ports or `NEXTAUTH_URL` assumptions.
- Sharing behavior across apps without checking whether it contains domain logic.

Use:

- [[../frontend/WEB_APPS_GUIDE]]
- [[../frontend/FRONTEND_FEATURE_FLOW]]

## Shared UI

Stop before:

- Moving components into `libs/ui` when they contain domain-specific behavior.
- Making a product-specific template look like a generic component.
- Introducing shared state or side effects into generic UI.
- Changing shared components used by multiple apps without validating consumers.

Use:

- [[../frontend/COMPONENT_GUIDE]]
- [[../frontend/SHARED_UI_GUIDE]]
- [[../frontend/FORMS_GUIDE]]
- [[../frontend/NETWORK_USAGE_GUIDE]]

## Audit Logging, Notifications, and i18n

> Status: Not implemented

Audit logging, notifications, and i18n are not implemented as real project standards today.

Stop before:

- Implementing audit logging.
- Adding notification delivery behavior.
- Introducing translation frameworks, locale routing, or message catalogs.
- Adding placeholder architecture for these areas without explicit request.

These topics need dedicated future guides before agents treat them as standards.

Use:

- [[../security/AUDIT_LOGGING_GUIDE]]
- [[../notifications/NOTIFICATIONS_GUIDE]]
- [[../i18n/I18N_GUIDE]]

## Environment Variables

Stop before:

- Adding, renaming, or deleting env vars without updating [[../setup/ENVIRONMENT_VARIABLES|Environment Variables]].
- Moving a server-only secret into a `NEXT_PUBLIC_*` variable.
- Changing `DATABASE_URL`, `NEXT_PUBLIC_API_URL`, `NEXTAUTH_URL`, auth secrets, provider secrets, or Stripe/Cloudinary/Mapbox assumptions.
- Changing `.env.example` without checking code usage.

## Docker and PostgreSQL

Stop before:

- Changing the Postgres image version.
- Changing volume mount paths.
- Changing exposed ports.
- Changing database name/user/password.
- Adding Dockerfiles or app containerization patterns.
- Deleting volumes unless the user confirms local data can be lost.

Use:

- [[../operations/DOCKER_AND_DATABASE]]

## Validation Failures

Stop before finalizing when:

- Typecheck, lint, build, Prisma, GraphQL codegen, or manual verification fails.
- The failure is not clearly caused by the current change.
- Fixing validation requires broad refactoring.
- Generated files or lockfiles change unexpectedly.
- A command is uncertain and cannot be safely interpreted.

Use:

- [[../operations/VALIDATION_CHECKLIST]]
- [[../operations/NX_COMMANDS]]
- [[../testing/TEST_STRATEGY]]
- [[../testing/MANUAL_QA_GUIDE]]

## CI and Release Readiness

Stop before release or final handoff when:

- CI behavior is assumed but not verified.
- Nx Cloud is treated as CI without evidence.
- A risky change has no manual QA.
- Release/deployment target is unknown.
- Migration, env, auth, payment, or shared UI release risk is unresolved.
- Production secrets management is assumed but not verified.
- Rollback or observability behavior is required but not confirmed.

Use:

- [[../operations/CI_AND_NX_CLOUD]]
- [[../operations/PRE_COMMIT_CHECKLIST]]
- [[../operations/RELEASE_READINESS]]
- [[../operations/DEPLOYMENT_ARCHITECTURE]]
- [[../operations/ENVIRONMENT_MATRIX]]
- [[../operations/SECRETS_MANAGEMENT]]
- [[../operations/PRODUCTION_MIGRATION_FLOW]]
- [[../operations/ROLLBACK_STRATEGY]]
- [[../operations/OBSERVABILITY_AND_INCIDENTS]]

## Business Rules

Stop when:

- Expected behavior is unclear.
- The fix would change pricing, booking, garage visibility, valet assignment, admin authority, or customer access rules.
- Existing code and documentation disagree on required behavior.
- Two frontend apps could reasonably own the same workflow.

## Tests Contradict Expected Implementation

Stop when:

- Existing tests or validation behavior contradict the requested implementation.
- Manual behavior contradicts the intended code path.
- A test appears outdated but the product rule is unclear.

Report the contradiction and ask for review instead of forcing the implementation through.
