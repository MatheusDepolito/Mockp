# Production Migration Flow

> Status: Needs verification. No production migration flow was confirmed from repository files.

This guide separates the verified local Prisma flow from unknown production migration behavior.

Read with:

- [[../database/PRISMA_MIGRATION_SAFETY|Prisma Migration Safety]]
- [[DOCKER_AND_DATABASE]]
- [[RELEASE_READINESS]]
- [[ROLLBACK_STRATEGY]]
- [[DEPLOYMENT_ARCHITECTURE]]
- [[../agents/STOP_CONDITIONS|Stop Conditions]]

## Verified Local Migration Flow

Local Prisma setup:

- Prisma schema: `apps/api/prisma/schema.prisma`
- Prisma config: `apps/api/prisma.config.ts`
- Migrations path: `apps/api/prisma/migrations`
- Seed command: `ts-node prisma/seed.ts`
- Local database: PostgreSQL 18 through `apps/api/docker-compose.yml`
- Prisma adapter: `@prisma/adapter-pg`

Verified local scripts:

```powershell
yarn workspace @mockp/api prisma:generate
yarn workspace @mockp/api prisma:migrate
yarn workspace @mockp/api prisma:status
yarn workspace @mockp/api prisma:seed
```

## Unknown Production Flow

> Needs verification

No repository evidence confirms:

- Production database provider.
- Production migration command.
- Who runs migrations.
- Whether migrations run before, during, or after app deploy.
- Whether migrations are automated by CI/CD.
- Backup process.
- Backfill process.
- Rollback process.
- Maintenance window process.

Do not prescribe production migration commands until the platform and process are confirmed.

## Required Human Decisions

Before production migrations:

- Which database hosts production?
- Who has migration permissions?
- How are backups created and verified?
- Are migrations run manually or in CI/CD?
- How are destructive migrations reviewed?
- How are backfills planned and monitored?
- What is the rollback or forward-fix process?
- How is downtime handled?

## Destructive Migration Stop Conditions

Stop before:

- Dropping columns.
- Dropping tables.
- Changing relation cardinality.
- Renaming fields without a migration plan.
- Making nullable fields required with existing data.
- Changing enum values with persisted data.
- Adding unique constraints without checking duplicates.
- Running migrations against production without backup confirmation.

Use [[../database/PRISMA_MIGRATION_SAFETY|Prisma Migration Safety]].

## Backfill Requirements

If a migration requires data backfill:

- Document the source data.
- Document the target fields.
- Estimate volume.
- Decide online/offline execution.
- Decide retry behavior.
- Decide verification queries.
- Decide rollback/forward-fix strategy.

Do not implement production backfills ad hoc.

## Rollback Concerns

Database rollback is not the same as application rollback.

Prisma migrations may include irreversible operations. If a migration loses data, rolling back application code will not restore that data.

Use [[ROLLBACK_STRATEGY]] before release.

## Future Recommendation

> Status: Future recommendation

Define a production migration runbook with:

- Backup verification.
- Migration approval checklist.
- Migration execution owner.
- Dry-run process.
- Backfill process.
- Monitoring checklist.
- Rollback/forward-fix decision tree.
