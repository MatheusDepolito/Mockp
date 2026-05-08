# Bugfix Playbook

> Status: Current project state

Use this guide when fixing a bug. The goal is to reproduce the issue, isolate the failing layer, make the smallest safe fix, and validate that no related behavior regressed.

Read first:

- [[../START_HERE|Start Here]]
- [[../ARCHITECTURE|Architecture]]
- [[../agents/STOP_CONDITIONS|Stop Conditions]]
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
- [[../operations/PRE_COMMIT_CHECKLIST|Pre-Commit Checklist]]

Repository examples: [[../examples/BUGFIX_EXAMPLE|Bugfix Example]], [[../examples/VALIDATION_EXAMPLE|Validation Example]], [[../examples/GRAPHQL_CHANGE_EXAMPLE|GraphQL Change Example]] where relevant.

## 1. Reproduce the Bug

Before editing:

- Capture the exact error, route, command, request, or user flow.
- Identify the expected behavior.
- Identify the actual behavior.
- Note the app, port, account/persona, and environment used.
- Check whether the issue still occurs after restarting affected dev servers when env vars changed.

If expected behavior is unclear, stop and ask for review.

## 2. Identify the Affected Layer

Classify the bug before changing files:

- Backend: NestJS resolver, controller, service, DTO, guard, Prisma query.
- Frontend: specific Next.js app, route, component, form, hook, or shared UI.
- GraphQL: schema, generated types, operation document, Apollo/fetch usage.
- REST: controller endpoint, redirect flow, provider integration.
- Database: Prisma schema, migration, seed, generated client, local Postgres.
- Auth: NextAuth config, JWT secret, session shape, guards, permissions.
- Env: `.env`, `.env.example`, `NEXT_PUBLIC_*`, provider secrets.
- Docker: Postgres container, volume, port mapping, compose file.

Use [[../frontend/WEB_APPS_GUIDE|Web Apps Guide]] for frontend app selection.

## 3. Find Similar Existing Patterns

Before writing a fix:

- Search for the same behavior in nearby modules.
- Read the closest working implementation.
- Compare DTOs, GraphQL args, resolver/service behavior, and frontend operation usage.
- Check whether generated files are stale rather than source code wrong.

Do not introduce a new abstraction during bugfix unless the bug cannot be fixed without it.

## 4. Make the Smallest Safe Fix

Rules:

- Fix the failing behavior only.
- Keep unrelated formatting and refactoring out of the change.
- Preserve public contracts unless the contract is the bug.
- Preserve existing business rules unless the bug requires changing them.
- Keep compatibility with existing data unless explicitly instructed otherwise.

Do not rewrite unrelated code.

## 5. Layer-Specific Checks

### Backend

- Check the service method, resolver/controller wrapper, DTO validation, guard behavior, and Prisma query.
- Validate with API-specific typecheck/lint/build commands.

### Frontend

- Confirm the affected app and persona.
- Check route, component, form, hook, and shared libs.
- Restart the app after env changes.
- Use [[../frontend/COMPONENT_GUIDE|Component Guide]], [[../frontend/SHARED_UI_GUIDE|Shared UI Guide]], [[../frontend/FORMS_GUIDE|Forms Guide]], and [[../frontend/NETWORK_USAGE_GUIDE|Network Usage Guide]] for UI/form/network bugs.

### GraphQL

- Check generated types against `apps/api/src/schema.gql`.
- Regenerate code if schema or documents changed.
- Verify every consumer of changed fields.
- Use [[../graphql/CONTRACT_CHANGE_GUIDE|GraphQL Contract Change Guide]] when the bug touches schema, operations, generated types, or resolver contracts.

### REST

- Confirm the endpoint fits current project REST usage.
- Avoid creating new REST patterns during bugfix.
- Use [[../rest/REAL_REST_PATTERNS|Real REST Patterns]] for current REST behavior.
- Treat [[../rest/FUTURE_TYPED_REST_OPENAPI|Future Typed REST OpenAPI]] as future guidance only.

### Database and Docker

- Check `DATABASE_URL`, Postgres container status, migrations, seed, and generated Prisma client.
- Avoid destructive migration changes during bugfix.
- Use [[../database/PRISMA_MIGRATION_SAFETY|Prisma Migration Safety]] for schema or migration bugs.

### Auth and Env

- Check `NEXTAUTH_URL`, `NEXTAUTH_SECRET`, Google OAuth vars, `JWT_SECRET`, and `NEXT_PUBLIC_API_URL`.
- If changing env requirements, update [[../setup/ENVIRONMENT_VARIABLES|Environment Variables]].
- Use [[../security/AUTHORIZATION_GUIDE|Authorization Guide]] for guard/role/row-level permission bugs.
- Use [[../security/AUTH_SESSION_GUIDE|Auth Session Guide]] for NextAuth/session/JWT bugs.
- Use [[../security/ROLE_PERSONA_MATRIX|Role Persona Matrix]] when the bug depends on app/persona ownership.

### Cross-Cutting Not-Implemented Areas

- Use [[../security/AUDIT_LOGGING_GUIDE|Audit Logging Guide]] if the bug report mentions audit trails.
- Use [[../notifications/NOTIFICATIONS_GUIDE|Notifications Guide]] if the bug report mentions email/SMS/push/domain notifications.
- Use [[../i18n/I18N_GUIDE|i18n Guide]] if the bug report mentions multi-language behavior.
- Stop and ask for review before implementing any of these areas.

## 6. Tests and Validation

Use [[../operations/VALIDATION_CHECKLIST|Validation Checklist]].
Use [[../testing/TEST_STRATEGY|Test Strategy]] and [[../testing/MANUAL_QA_GUIDE|Manual QA Guide]] when automated tests are missing or insufficient.

When possible:

- Add or adjust a focused test near the failing behavior.
- If no test framework exists for the area, document manual verification.
- Run the smallest validation set that covers touched code.
- Broaden validation when shared libs or contracts changed.

## 7. No Regression Check

Before finalizing:

- Re-run the reproduction flow.
- Verify the nearest happy path still works.
- Verify auth/permission behavior if the bug touched user identity.
- Verify database state if the bug touched mutations, seed, or migrations.
- Verify affected frontend app only unless shared code changed.

## 8. Final Bugfix Note

Report:

- Root cause.
- Files/layers changed.
- Validation commands run.
- Manual flow verified.
- Whether CI/release risk remains.
- Any remaining `Needs verification` item.

## Do Not

- Do not rewrite unrelated code.
- Do not refactor broadly during a bugfix.
- Do not change business rules unless the bug requires it.
- Do not alter contracts without checking consumers.
- Do not fix unclear expected behavior by guessing.

If expected behavior is unclear, stop and ask for review.
