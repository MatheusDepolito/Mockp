# Release Readiness

> Status: Current project state

This guide documents release/deployment readiness based on repository evidence. It does not define a deployment architecture.

Read with:

- [[CI_AND_NX_CLOUD]]
- [[PRE_COMMIT_CHECKLIST]]
- [[VALIDATION_CHECKLIST]]
- [[DEPLOYMENT_ARCHITECTURE]]
- [[ENVIRONMENT_MATRIX]]
- [[SECRETS_MANAGEMENT]]
- [[PRODUCTION_MIGRATION_FLOW]]
- [[ROLLBACK_STRATEGY]]
- [[OBSERVABILITY_AND_INCIDENTS]]
- [[../database/PRISMA_MIGRATION_SAFETY|Prisma Migration Safety]]
- [[../agents/STOP_CONDITIONS|Stop Conditions]]

## Verified Release Reality

Repository verification found no:

- Deployment guide.
- Release scripts.
- Dockerfiles.
- Vercel config.
- Serverless config.
- CI workflow config.
- Production migration workflow.
- Production env examples separate from local `.env.example` files.

The repo does contain:

- Local Docker Compose for PostgreSQL in `apps/api/docker-compose.yml`.
- Root validation scripts.
- Nx config with Nx Cloud ID.
- App build scripts.
- Prisma migration files and Prisma scripts.

For current deployment unknowns, use [[DEPLOYMENT_ARCHITECTURE]].
For environment and secret unknowns, use [[ENVIRONMENT_MATRIX]] and [[SECRETS_MANAGEMENT]].

## What Cannot Be Confirmed

> Needs verification

- Hosting provider.
- Production database provider.
- Production environment variable source.
- Whether migrations run manually or automatically.
- Whether frontend apps deploy together or separately.
- Whether API deploys separately from frontend apps.
- Whether CI gates release.
- Rollback process.
- Monitoring/observability.

## What Agents Must Not Assume

- Do not assume Vercel, AWS, Docker, or serverless deployment.
- Do not assume migrations run during deploy.
- Do not assume Nx Cloud equals CI.
- Do not assume all frontend apps deploy together.
- Do not assume production env vars match local examples.
- Do not create release scripts or deployment config without explicit request.

## Release Readiness Checklist

Before considering a change release-ready, confirm:

- Relevant validation commands pass.
- Manual QA is complete.
- GraphQL contracts and generated types are updated.
- REST behavior is documented if touched.
- Prisma migrations are reviewed if touched.
- Env docs and examples are updated if env vars changed.
- Docker/database docs are updated if local infra changed.
- Auth/session/role changes are documented and manually verified.
- Shared UI changes are checked across affected apps.
- `Needs verification` items are clearly reported.

## Migration Readiness

If a release includes Prisma migrations:

- Inspect migration SQL.
- Identify destructive operations.
- Identify required backfills.
- Confirm production data impact.
- Confirm rollback/forward-fix plan.
- Confirm who runs migrations.

Use [[../database/PRISMA_MIGRATION_SAFETY|Prisma Migration Safety]].
Use [[PRODUCTION_MIGRATION_FLOW]] before reasoning about production migration execution.

## Release Stop Conditions

Stop before release if:

- Deployment target is unknown.
- Production env vars are unknown.
- Migration/backfill plan is missing.
- CI status is unknown for a risky change.
- Manual QA was not possible for the affected flow.
- Auth/permission behavior changed without review.
- Shared UI changed without affected app validation.
- Payment/Stripe flow changed without provider-level verification.
- Production secrets, migration, rollback, or observability assumptions are not confirmed.

Use [[ROLLBACK_STRATEGY]] and [[OBSERVABILITY_AND_INCIDENTS]] for operational risk review.

## Future Recommendation

> Status: Future recommendation

Add dedicated deployment documentation later covering:

- Hosting architecture.
- Environments.
- Secrets management.
- CI checks.
- Migration strategy.
- Rollback process.
- Release checklist.
- Observability and incident response.

Do not implement deployment config in this phase.
