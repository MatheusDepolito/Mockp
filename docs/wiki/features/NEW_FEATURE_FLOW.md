# New Feature Flow

> Status: Current project state

Use this guide when implementing a new feature. The goal is to make changes that fit the current Mockp architecture without mixing feature work with broad refactoring.

Read first:

- [[../START_HERE|Start Here]]
- [[../ARCHITECTURE|Architecture]]
- [[../CONTEXT_MAP|Context Map]]
- [[../agents/STOP_CONDITIONS|Stop Conditions]]
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
- [[../operations/PRE_COMMIT_CHECKLIST|Pre-Commit Checklist]]

Examples grounded in repo code paths: [[../examples/BACKEND_FEATURE_EXAMPLE|Backend Feature Example]], [[../examples/FRONTEND_FEATURE_EXAMPLE|Frontend Feature Example]], [[../examples/GRAPHQL_CHANGE_EXAMPLE|GraphQL]], [[../examples/REST_ENDPOINT_EXAMPLE|REST]], [[../examples/PRISMA_RELATION_EXAMPLE|Prisma]], [[../examples/SHARED_UI_DECISION_EXAMPLE|Shared UI]], [[../examples/VALIDATION_EXAMPLE|Validation]]. See [[../CONTEXT_MAP|Context Map]] → **Examples**.

## 1. Understand the Request

Before editing, write down:

- The user-facing behavior being added.
- The affected persona or app, if known.
- Whether the change is backend-only, frontend-only, or end-to-end.
- The expected validation path.
- Any data, auth, billing, or external integration risk.

If the affected persona/app is unclear, stop and ask for confirmation.

## 2. Identify Impacted Layers

Check which layers are involved:

- Backend: NestJS module, resolver, controller, service, DTO, guard.
- Frontend: one of `apps/web`, `apps/web-admin`, `apps/web-manager`, `apps/web-valet`.
- GraphQL: schema, resolver, operations, generated frontend types.
- REST: only if the use case matches current REST-style project patterns.
- Database: Prisma schema, migration, seed, generated client.
- Shared UI: `libs/ui`, `libs/forms`, `libs/util`, `libs/network`.
- Permissions: auth guards, roles, row-level checks, session behavior.
- Audit logging, notifications, and i18n: not implemented as project standards; consult stop conditions before touching them.
- Validation: form schemas, DTO validation, typecheck, lint, build, manual checks.

Use [[../frontend/WEB_APPS_GUIDE|Web Apps Guide]] and [[../frontend/FRONTEND_FEATURE_FLOW|Frontend Feature Flow]] before touching frontend apps.

## 3. Map Files Before Editing

Before changing files:

- Search for existing modules, components, operations, DTOs, services, and hooks that solve similar problems.
- Read the nearest current implementation.
- Identify all consumers of a contract before changing it.
- Map generated files and avoid editing generated output directly.

Do not invent a new pattern when an existing pattern is already present.

## 4. Decide the Change Shape

### Backend-only

Use this when the feature is internal to API behavior or data handling and does not require UI changes.

Check:

- Existing NestJS module boundaries.
- Service-level business rules.
- Resolver/controller patterns.
- DTO and validation patterns.
- Authorization and permission checks.
- Current role/persona rules in [[../security/ROLE_PERSONA_MATRIX|Role Persona Matrix]].

### Frontend-only

Use this when the feature only changes UI or client behavior without backend contract changes.

Check:

- Correct app/persona.
- Existing route and layout structure.
- Existing shared UI components.
- Local app-specific components before moving anything into shared UI.

### End-to-end

Use this when UI, backend, contracts, and possibly database all change.

Do the work in this order:

1. Confirm affected persona/app.
2. Map data and permission requirements.
3. Plan database changes, if any.
4. Update backend contract.
5. Update frontend operation/client usage.
6. Validate end-to-end manually.

## 5. Database Changes

Use [[../database/DEVELOPMENT_PLAYBOOK|Database Development Playbook]] and [[../database/PRISMA_MIGRATION_SAFETY|Prisma Migration Safety]].

Required checks:

- Is a schema change actually required?
- Is the migration destructive?
- Does existing data need a backfill?
- Does seed data need to change?
- Has `prisma:generate` been run after schema changes?

Stop before destructive migrations, production data changes, or unclear backfills. See [[../agents/STOP_CONDITIONS|Stop Conditions]].

## 6. GraphQL Changes

Use GraphQL as the primary frontend/backend contract for application screens.

Use:

- [[../graphql/DEVELOPMENT_PLAYBOOK|GraphQL Development Playbook]]
- [[../graphql/CONTRACT_CHANGE_GUIDE|GraphQL Contract Change Guide]]

Required checks:

- Identify all frontend operations that consume the field/type.
- Update `.graphql` documents when frontend data needs change.
- Regenerate frontend GraphQL types when operations/schema change.
- Avoid changing existing field meanings without checking consumers.

Do not alter GraphQL contracts without checking frontend consumers.

## 7. REST Changes

> Status: Current project state

REST exists in the project for HTTP-specific flows such as Stripe checkout redirects.

Use [[../rest/REAL_REST_PATTERNS|Real REST Patterns]] before adding or changing REST routes.

Use REST only when it fits current project patterns:

- Webhooks.
- External provider callbacks.
- File/upload style endpoints.
- Redirect-based flows.
- HTTP-specific integration endpoints.

> Status: Future recommendation
>
> Typed OpenAPI REST is a future recommendation documented in [[../rest/FUTURE_TYPED_REST_OPENAPI|Future Typed REST OpenAPI]]. It is not implemented in the current project.

Do not implement OpenAPI as part of this feature flow unless explicitly requested.

## 8. Frontend and Shared UI

Use [[../frontend/WEB_APPS_GUIDE|Web Apps Guide]], [[../frontend/COMPONENT_GUIDE|Component Guide]], [[../frontend/SHARED_UI_GUIDE|Shared UI Guide]], [[../frontend/FORMS_GUIDE|Forms Guide]], and [[../frontend/NETWORK_USAGE_GUIDE|Network Usage Guide]].

Rules:

- Edit the app that matches the affected persona.
- Keep domain-specific UI in the app or product-specific template.
- Use `libs/ui` for reusable presentation components and established shared templates.
- Use `libs/forms` for shared form providers/schemas when the pattern already fits.
- Use `libs/network` for GraphQL operations and network behavior.
- Use `libs/util` for shared hooks/utilities.

Do not move domain-specific UI into shared UI just because two files look similar.

## 9. Validation

Use [[../operations/VALIDATION_CHECKLIST|Validation Checklist]].
Use [[../testing/TEST_STRATEGY|Test Strategy]] and [[../testing/MANUAL_QA_GUIDE|Manual QA Guide]] when automated coverage is missing.

At minimum, pick the smallest command set that covers touched code:

- Typecheck touched projects.
- Lint touched projects.
- Build touched apps/libs when contracts or shared code changed.
- Run Prisma generate/migration checks for database changes.
- Run GraphQL codegen when schema or operation documents changed.
- Manually verify the affected flow.

## 10. Document Risks

Before finalizing, summarize:

- Files/layers changed.
- Contracts changed.
- Database changes.
- Validation commands run.
- Manual flows verified.
- Release or pre-commit readiness concerns.
- Remaining `Needs verification` items.

## Do Not

- Do not mix feature work with broad refactoring.
- Do not invent architecture.
- Do not change business rules unless the feature requires it.
- Do not move domain-specific UI into shared UI.
- Do not alter GraphQL or REST contracts without checking consumers.
- Do not implement audit logging, notifications, or i18n unless explicitly requested and after consulting [[../agents/STOP_CONDITIONS|Stop Conditions]], [[../security/AUDIT_LOGGING_GUIDE|Audit Logging Guide]], [[../notifications/NOTIFICATIONS_GUIDE|Notifications Guide]], and [[../i18n/I18N_GUIDE|i18n Guide]].
