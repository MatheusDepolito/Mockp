# Start Here

> Status: Current project state

This wiki is the shared technical context for Mockp. It is meant to help humans and AI agents understand the repository, follow existing patterns, and avoid changing architecture or contracts by accident.

The wiki is versioned in Git under `docs/wiki`. Treat it as the source of truth for project guidance, but always verify the current code before implementing.

## Visão do produto (português)

- [[PRODUCT_OVERVIEW_PT|Mockp — visão do produto (PT)]]
- [[PRODUCT_OVERVIEW_IMOBILIARIO_PT|Mockp como produto imobiliário — visão (PT)]]
- [[DOMAIN_GLOSSARY_IMOBILIARIO_PT|Glossário de domínio imobiliário (PT)]]

## Recommended Reading Order

1. [[START_HERE]] - this entry point.
2. [[CONTEXT_MAP]] - the navigation map for the wiki.
3. [[ARCHITECTURE]] - the current architecture and layer responsibilities.
4. [[setup/LOCAL_DEVELOPMENT|Local Development]] - how to run the project locally.
5. [[setup/ENVIRONMENT_VARIABLES|Environment Variables]] - required env vars by app/package.
6. The operational flow for your task:
   - [[features/NEW_FEATURE_FLOW|New Feature Flow]]
   - [[debugging/BUGFIX_PLAYBOOK|Bugfix Playbook]]
   - [[operations/VALIDATION_CHECKLIST|Validation Checklist]]
   - [[agents/STOP_CONDITIONS|Stop Conditions]]
   - [[agents/WIKI_REVIEW_CHECKLIST|Wiki Review Checklist]]
7. Repository examples (real patterns):
   - [[examples/BACKEND_FEATURE_EXAMPLE|Backend Feature Example]]
   - [[examples/FRONTEND_FEATURE_EXAMPLE|Frontend Feature Example]]
   - [[examples/GRAPHQL_CHANGE_EXAMPLE|GraphQL Change Example]]
   - [[examples/REST_ENDPOINT_EXAMPLE|REST Endpoint Example]]
   - [[examples/PRISMA_RELATION_EXAMPLE|Prisma Relation Example]]
   - [[examples/BUGFIX_EXAMPLE|Bugfix Example]]
   - [[examples/SHARED_UI_DECISION_EXAMPLE|Shared UI Decision Example]]
   - [[examples/VALIDATION_EXAMPLE|Validation Example]]
8. The area-specific playbook for your task:
   - [[backend/DEVELOPMENT_PLAYBOOK|Backend NestJS]]
   - [[security/AUTHORIZATION_GUIDE|Authorization Guide]]
   - [[security/AUTH_SESSION_GUIDE|Auth Session Guide]]
   - [[security/ROLE_PERSONA_MATRIX|Role Persona Matrix]]
   - [[frontend/DEVELOPMENT_PLAYBOOK|Frontend Next.js]]
   - [[frontend/FRONTEND_FEATURE_FLOW|Frontend Feature Flow]]
   - [[frontend/WEB_APPS_GUIDE|Web Apps Guide]]
   - [[frontend/COMPONENT_GUIDE|Component Guide]]
   - [[frontend/SHARED_UI_GUIDE|Shared UI Guide]]
   - [[frontend/FORMS_GUIDE|Forms Guide]]
   - [[frontend/NETWORK_USAGE_GUIDE|Network Usage Guide]]
   - [[graphql/DEVELOPMENT_PLAYBOOK|GraphQL]]
   - [[graphql/CONTRACT_CHANGE_GUIDE|GraphQL Contract Change Guide]]
   - [[rest/DEVELOPMENT_PLAYBOOK|REST]]
   - [[rest/REAL_REST_PATTERNS|Real REST Patterns]]
   - [[rest/FUTURE_TYPED_REST_OPENAPI|Future Typed REST OpenAPI]]
   - [[database/DEVELOPMENT_PLAYBOOK|Database and Prisma]]
   - [[database/PRISMA_MIGRATION_SAFETY|Prisma Migration Safety]]
   - [[nx/DEVELOPMENT_PLAYBOOK|Nx and scripts]]
   - [[operations/NX_COMMANDS|Nx Commands]]
   - [[testing/TEST_STRATEGY|Test Strategy]]
   - [[testing/MANUAL_QA_GUIDE|Manual QA Guide]]
   - [[operations/CI_AND_NX_CLOUD|CI and Nx Cloud]]
   - [[operations/PRE_COMMIT_CHECKLIST|Pre-Commit Checklist]]
   - [[operations/RELEASE_READINESS|Release Readiness]]
   - [[operations/DEPLOYMENT_ARCHITECTURE|Deployment Architecture]]
   - [[operations/ENVIRONMENT_MATRIX|Environment Matrix]]
   - [[operations/SECRETS_MANAGEMENT|Secrets Management]]
   - [[operations/PRODUCTION_MIGRATION_FLOW|Production Migration Flow]]
   - [[operations/ROLLBACK_STRATEGY|Rollback Strategy]]
   - [[operations/OBSERVABILITY_AND_INCIDENTS|Observability and Incidents]]

## Where To Go

- Setup and local environment:
  - [[setup/LOCAL_DEVELOPMENT]]
  - [[setup/ENVIRONMENT_VARIABLES]]
  - [[operations/DOCKER_AND_DATABASE]]
- Repository examples (verified code paths):
  - [[examples/BACKEND_FEATURE_EXAMPLE]]
  - [[examples/FRONTEND_FEATURE_EXAMPLE]]
  - [[examples/GRAPHQL_CHANGE_EXAMPLE]]
  - [[examples/REST_ENDPOINT_EXAMPLE]]
  - [[examples/PRISMA_RELATION_EXAMPLE]]
  - [[examples/BUGFIX_EXAMPLE]]
  - [[examples/SHARED_UI_DECISION_EXAMPLE]]
  - [[examples/VALIDATION_EXAMPLE]]
  - [[CONTEXT_MAP]] → **Examples** section
- Operational flows:
  - [[features/NEW_FEATURE_FLOW]]
  - [[debugging/BUGFIX_PLAYBOOK]]
  - [[operations/VALIDATION_CHECKLIST]]
  - [[agents/STOP_CONDITIONS]]
  - [[agents/WIKI_REVIEW_CHECKLIST]]
- Architecture:
  - [[ARCHITECTURE]]
- Backend implementation:
  - [[backend/DEVELOPMENT_PLAYBOOK]]
- Security and auth:
  - [[security/AUTHORIZATION_GUIDE]]
  - [[security/AUTH_SESSION_GUIDE]]
  - [[security/ROLE_PERSONA_MATRIX]]
  - [[security/AUDIT_LOGGING_GUIDE]]
- Frontend and shared UI:
  - [[frontend/DEVELOPMENT_PLAYBOOK]]
  - [[frontend/FRONTEND_FEATURE_FLOW]]
  - [[frontend/WEB_APPS_GUIDE]]
  - [[frontend/COMPONENT_GUIDE]]
  - [[frontend/SHARED_UI_GUIDE]]
  - [[frontend/FORMS_GUIDE]]
  - [[frontend/NETWORK_USAGE_GUIDE]]
- GraphQL contract:
  - [[graphql/DEVELOPMENT_PLAYBOOK]]
  - [[graphql/CONTRACT_CHANGE_GUIDE]]
- REST:
  - [[rest/DEVELOPMENT_PLAYBOOK]]
  - [[rest/REAL_REST_PATTERNS]]
  - [[rest/FUTURE_TYPED_REST_OPENAPI]]
- Database and migrations:
  - [[database/DEVELOPMENT_PLAYBOOK]]
  - [[database/PRISMA_MIGRATION_SAFETY]]
- Nx and validation:
  - [[nx/DEVELOPMENT_PLAYBOOK]]
  - [[operations/NX_COMMANDS]]
  - [[testing/TEST_STRATEGY]]
  - [[testing/MANUAL_QA_GUIDE]]
  - [[operations/VALIDATION_CHECKLIST]]
  - [[operations/CI_AND_NX_CLOUD]]
  - [[operations/PRE_COMMIT_CHECKLIST]]
  - [[operations/RELEASE_READINESS]]
  - [[operations/DEPLOYMENT_ARCHITECTURE]]
  - [[operations/ENVIRONMENT_MATRIX]]
  - [[operations/SECRETS_MANAGEMENT]]
  - [[operations/PRODUCTION_MIGRATION_FLOW]]
  - [[operations/ROLLBACK_STRATEGY]]
  - [[operations/OBSERVABILITY_AND_INCIDENTS]]
- Not implemented cross-cutting areas:
  - [[security/AUDIT_LOGGING_GUIDE]]
  - [[notifications/NOTIFICATIONS_GUIDE]]
  - [[i18n/I18N_GUIDE]]

## Future Guides

> Status: Future recommendation

Suggested runbooks not yet written:

- `operations/PRODUCTION_DEPLOYMENT_RUNBOOK.md`
- `operations/INCIDENT_RUNBOOKS.md`

For keeping the wiki consistent after edits, see [[agents/WIKI_REVIEW_CHECKLIST|Wiki Review Checklist]].

## Agent Rules

- Verify the current code before implementing. Documentation may lag behind code.
- Do not treat future recommendations as implemented behavior.
- Keep current-state documentation and future recommendations clearly labeled:
  - `Status: Current project state`
  - `Status: Future recommendation`
  - `Status: Not implemented`
  - `Status: Needs verification`
  - `Status: Deprecated`
- Use GraphQL as the primary contract for application screens.
- Use REST for integrations, webhooks, files, redirects, Stripe-like flows, or HTTP-specific endpoints.
- Stop and ask for human review when a change requires audit logging, notifications, i18n, destructive migrations, new authorization rules, or a new architectural pattern.

## Quick Monorepo Map

- `apps/api`: NestJS API with GraphQL, REST, Prisma, PostgreSQL, Swagger.
- `apps/web`: main customer-facing Next.js app on port `3001`.
- `apps/web-manager`: manager Next.js app on port `3002`.
- `apps/web-agent`: agent Next.js app on port `3003`.
- `apps/web-admin`: admin Next.js app on port `3004`.
- `libs/network`: GraphQL documents, generated types, Apollo config, `fetchGraphQL`, NextAuth config.
- `libs/ui`: shared UI components and templates.
- `libs/forms`: form providers and schemas.
- `libs/util`: shared utilities and hooks.

## Setup First

If you are starting from a fresh clone or a new machine, start here:

1. [[setup/LOCAL_DEVELOPMENT]]
2. [[setup/ENVIRONMENT_VARIABLES]]
3. [[operations/DOCKER_AND_DATABASE]]

