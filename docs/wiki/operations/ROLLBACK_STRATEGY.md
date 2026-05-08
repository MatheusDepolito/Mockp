# Rollback Strategy

> Status: Needs verification

No confirmed rollback strategy exists in the repository.

Read with:

- [[RELEASE_READINESS]]
- [[PRODUCTION_MIGRATION_FLOW]]
- [[DEPLOYMENT_ARCHITECTURE]]
- [[OBSERVABILITY_AND_INCIDENTS]]
- [[../database/PRISMA_MIGRATION_SAFETY|Prisma Migration Safety]]
- [[../agents/STOP_CONDITIONS|Stop Conditions]]

## Application Rollback Unknowns

> Needs verification

The repo does not confirm:

- Deployment provider.
- Artifact/versioning strategy.
- Release promotion process.
- Whether previous app versions can be redeployed.
- Whether frontend apps and API roll back together.
- Whether database migrations are tied to app deployment.

Do not assume application rollback is available.

## Database Rollback Limitations

Database rollback is high risk when migrations are destructive.

Rolling back application code does not undo:

- Dropped tables.
- Dropped columns.
- Deleted rows.
- Destructive enum changes.
- Data transformations.
- Relation/cardinality changes.

Prisma migration history should not be rewritten after a migration is applied to shared or production environments.

## Prisma Migration Rollback Risks

Stop before:

- Creating a migration that depends on manual rollback.
- Dropping data without backup/restore plan.
- Renaming fields as drop/add without a compatibility phase.
- Releasing app code that requires a migration with no forward/backward compatibility plan.

Use [[PRODUCTION_MIGRATION_FLOW]].

## Feature Flag or Config Rollback

> Needs verification

No feature flag system or runtime config rollback pattern was verified.

Do not assume risky changes can be disabled after deploy unless a real mechanism exists.

## Stop Conditions

Stop before release when:

- Rollback path is unknown for a risky change.
- Database changes are irreversible.
- App and DB versions are tightly coupled with no compatibility window.
- Payment/auth/permission behavior changes without rollback plan.
- Shared UI/network changes affect multiple apps and cannot be quickly reverted.

## Future Recommendation

> Status: Future recommendation

Once deployment is known, document:

- How to identify current deployed version.
- How to redeploy previous app version.
- Whether database changes are backward compatible.
- Forward-fix vs rollback decision criteria.
- Emergency owner/contact.
- Validation after rollback.

Do not implement rollback infrastructure in this phase.
