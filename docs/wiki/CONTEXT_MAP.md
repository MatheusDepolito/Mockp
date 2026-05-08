# Context Map

> Status: Current project state

This file is the central navigation map for the Mockp wiki. Use it as the Obsidian graph entry point after [[START_HERE]].

## Getting Started

- [[START_HERE]]
- [[agents/WIKI_REVIEW_CHECKLIST]]
- [[features/NEW_FEATURE_FLOW]]
- [[debugging/BUGFIX_PLAYBOOK]]
- [[setup/LOCAL_DEVELOPMENT]]
- [[setup/ENVIRONMENT_VARIABLES]]
- [[operations/VALIDATION_CHECKLIST]]
- [[agents/STOP_CONDITIONS]]

## Architecture

- [[ARCHITECTURE]]

## Examples (repository-based)

- [[examples/BACKEND_FEATURE_EXAMPLE]]
- [[examples/FRONTEND_FEATURE_EXAMPLE]]
- [[examples/GRAPHQL_CHANGE_EXAMPLE]]
- [[examples/REST_ENDPOINT_EXAMPLE]]
- [[examples/PRISMA_RELATION_EXAMPLE]]
- [[examples/BUGFIX_EXAMPLE]]
- [[examples/SHARED_UI_DECISION_EXAMPLE]]
- [[examples/VALIDATION_EXAMPLE]]

## Setup and Local Environment

- [[setup/LOCAL_DEVELOPMENT]]
- [[setup/ENVIRONMENT_VARIABLES]]
- [[operations/DOCKER_AND_DATABASE]]

## Operational Flows

- [[features/NEW_FEATURE_FLOW]]
- [[debugging/BUGFIX_PLAYBOOK]]
- [[operations/VALIDATION_CHECKLIST]]
- [[agents/STOP_CONDITIONS]]

## Backend

- [[backend/DEVELOPMENT_PLAYBOOK]]
- Deprecated stub: `backend/AUTHORIZATION_GUIDE` → use [[security/AUTHORIZATION_GUIDE]]

## Security, Auth, and Personas

- [[security/AUTHORIZATION_GUIDE]]
- [[security/AUTH_SESSION_GUIDE]]
- [[security/ROLE_PERSONA_MATRIX]]
- [[security/AUDIT_LOGGING_GUIDE]]

## Frontend

- [[frontend/DEVELOPMENT_PLAYBOOK]]
- [[frontend/FRONTEND_FEATURE_FLOW]]
- [[frontend/WEB_APPS_GUIDE]]
- [[frontend/COMPONENT_GUIDE]]
- [[frontend/SHARED_UI_GUIDE]]
- [[frontend/FORMS_GUIDE]]
- [[frontend/NETWORK_USAGE_GUIDE]]

## GraphQL

- [[graphql/DEVELOPMENT_PLAYBOOK]]
- [[graphql/CONTRACT_CHANGE_GUIDE]]

## REST

- [[rest/DEVELOPMENT_PLAYBOOK]]
- [[rest/REAL_REST_PATTERNS]]
- [[rest/FUTURE_TYPED_REST_OPENAPI]]

## Database, Prisma, and PostgreSQL

- [[database/DEVELOPMENT_PLAYBOOK]]
- [[database/PRISMA_MIGRATION_SAFETY]]
- [[operations/DOCKER_AND_DATABASE]]

## Docker

- [[operations/DOCKER_AND_DATABASE]]

## Nx and Scripts

- [[nx/DEVELOPMENT_PLAYBOOK]]
- [[operations/NX_COMMANDS]]

## Shared UI

- [[frontend/COMPONENT_GUIDE]]
- [[frontend/SHARED_UI_GUIDE]]
- [[frontend/FORMS_GUIDE]]
- [[frontend/NETWORK_USAGE_GUIDE]]
- [[frontend/DEVELOPMENT_PLAYBOOK]]

## Validation and Testing

- [[testing/TEST_STRATEGY]]
- [[testing/MANUAL_QA_GUIDE]]
- Deprecated stub: `testing/TESTING_GUIDE` → use [[testing/TEST_STRATEGY]]
- [[operations/VALIDATION_CHECKLIST]]
- [[operations/CI_AND_NX_CLOUD]]
- [[operations/PRE_COMMIT_CHECKLIST]]
- [[operations/RELEASE_READINESS]]

## CI and Release Readiness

- [[operations/CI_AND_NX_CLOUD]]
- [[operations/PRE_COMMIT_CHECKLIST]]
- [[operations/RELEASE_READINESS]]
- [[operations/DEPLOYMENT_ARCHITECTURE]]
- [[operations/ENVIRONMENT_MATRIX]]
- [[operations/SECRETS_MANAGEMENT]]
- [[operations/PRODUCTION_MIGRATION_FLOW]]
- [[operations/ROLLBACK_STRATEGY]]
- [[operations/OBSERVABILITY_AND_INCIDENTS]]
- [[operations/NX_COMMANDS]]

## Deployment, Environments, and Incidents

- [[operations/DEPLOYMENT_ARCHITECTURE]]
- [[operations/ENVIRONMENT_MATRIX]]
- [[operations/SECRETS_MANAGEMENT]]
- [[operations/PRODUCTION_MIGRATION_FLOW]]
- [[operations/ROLLBACK_STRATEGY]]
- [[operations/OBSERVABILITY_AND_INCIDENTS]]

## Agents and Stop Conditions

- [[agents/STOP_CONDITIONS]]
- [[agents/WIKI_REVIEW_CHECKLIST]]

Use the section links above for CI, deployment, testing, and observability context. Stop conditions often depend on:

- [[graphql/CONTRACT_CHANGE_GUIDE]] and [[rest/REAL_REST_PATTERNS]] (and [[rest/FUTURE_TYPED_REST_OPENAPI]] for typed OpenAPI planning only)
- [[database/PRISMA_MIGRATION_SAFETY]] and [[operations/DOCKER_AND_DATABASE]]
- [[security/AUTHORIZATION_GUIDE]], [[security/AUTH_SESSION_GUIDE]], [[security/ROLE_PERSONA_MATRIX]]
- Cross-cutting topics **not implemented** as standards today: [[security/AUDIT_LOGGING_GUIDE]], [[notifications/NOTIFICATIONS_GUIDE]], [[i18n/I18N_GUIDE]]
- Frontend boundaries: [[frontend/COMPONENT_GUIDE]], [[frontend/SHARED_UI_GUIDE]]

## Not Implemented (Cross-Cutting Standards)

> **Status: Not implemented**

The following areas lack confirmed project-wide implementations. Read before inventing patterns:

- [[security/AUDIT_LOGGING_GUIDE]]
- [[notifications/NOTIFICATIONS_GUIDE]]
- [[i18n/I18N_GUIDE]]

## Future Guides (Not Written)

> **Status: Future recommendation**

- `operations/PRODUCTION_DEPLOYMENT_RUNBOOK.md`
- `operations/INCIDENT_RUNBOOKS.md`
