# Prisma Migration Safety

> Status: Current project state

Use this guide before changing `apps/api/prisma/schema.prisma`, migrations, generated Prisma client behavior, or database-dependent backend/GraphQL code.

Read with:

- [[DEVELOPMENT_PLAYBOOK]]
- [[../operations/DOCKER_AND_DATABASE|Docker and Database]]
- [[../graphql/CONTRACT_CHANGE_GUIDE|GraphQL Contract Change Guide]]
- [[../operations/VALIDATION_CHECKLIST|Validation Checklist]]
- [[../agents/STOP_CONDITIONS|Stop Conditions]]

Repository example: [[../examples/PRISMA_RELATION_EXAMPLE|Prisma Relation Example]].

## Verified Prisma and PostgreSQL Setup

Verified repository facts:

- Prisma packages: `prisma` `7`, `@prisma/client` `7`, `@prisma/adapter-pg`.
- Prisma schema: `apps/api/prisma/schema.prisma`.
- Prisma config: `apps/api/prisma.config.ts`.
- Schema path in config: `prisma/schema.prisma`.
- Migrations path in config: `prisma/migrations`.
- Seed command in config: `ts-node prisma/seed.ts`.
- Generated client output: `apps/api/prisma/generated/client`.
- Generated client import wrapper: `apps/api/src/common/prisma/client.ts`.
- Runtime Prisma service: `apps/api/src/common/prisma/prisma.service.ts`.
- Runtime adapter: `PrismaPg` from `@prisma/adapter-pg`.
- Local PostgreSQL image: `postgres:18`.
- Local Docker compose file: `apps/api/docker-compose.yml`.
- Local database URL: `postgresql://mockp:mockp@localhost:2000/mockp_db?schema=public`.

In Prisma 7, the schema datasource declares only:

```prisma
datasource db {
  provider = "postgresql"
}
```

The database URL is configured in `prisma.config.ts`, not in `schema.prisma`.

## Verified Commands

From repository root:

```powershell
yarn workspace @mockp/api prisma:generate
yarn workspace @mockp/api prisma:migrate
yarn workspace @mockp/api prisma:status
yarn workspace @mockp/api prisma:seed
```

API `build` and `tsc` scripts run `prisma:generate` first.

## Before Editing the Schema

Classify the change:

- New model.
- New relation.
- Field alteration.
- New enum.
- New index or unique constraint.
- Rename.
- Drop.
- Relation cardinality change.
- Required backfill.

If the change can affect existing data, stop and ask for review before creating a migration.

## Add a Model

1. Add the model to `apps/api/prisma/schema.prisma`.
2. Prefer safe defaults and nullable fields for data that cannot be populated immediately.
3. Add indexes/unique constraints only when required by real queries or invariants.
4. Create a local migration with `prisma:migrate`.
5. Inspect the generated migration SQL before proceeding.
6. Run `prisma:generate`.
7. Update backend Prisma usage.
8. Update GraphQL entities/inputs/resolvers if the model is exposed to frontend.
9. Update frontend GraphQL operations and codegen if needed.

## Add a Relation

1. Confirm relation ownership and cardinality.
2. Add relation fields and scalar foreign key fields where Prisma requires them.
3. Decide optional vs required relation carefully.
4. Avoid making a required relation on existing rows unless a backfill is planned.
5. Inspect migration SQL for foreign key and constraint behavior.
6. Update backend includes/selects and GraphQL `@ResolveField` behavior if exposed.

Stop if relation cardinality is unclear.

## Alter a Field

Safe patterns:

- Add nullable field first.
- Add a default only when it is a true domain default.
- Backfill before making a field required.
- Use a multi-step migration for renames.

Risky patterns:

- Changing nullable to required with existing rows.
- Changing type with existing data.
- Renaming fields without explicit migration/backfill plan.
- Dropping fields before consumers are removed.

## Add Enum, Index, or Unique Constraint

Enum:

- Check persisted values.
- Check GraphQL enum exposure.
- Check frontend generated types.

Index:

- Add when needed for query performance or constraints.
- Verify it matches actual query patterns.

Unique constraint:

- Check existing data for duplicates before enforcing uniqueness.
- Stop if production data may violate the constraint.

## Create and Inspect Migration

Create local migration:

```powershell
yarn workspace @mockp/api prisma:migrate
```

Then inspect the new SQL file under:

```text
apps/api/prisma/migrations/<timestamp_name>/migration.sql
```

Look for:

- `DROP COLUMN`
- `DROP TABLE`
- `ALTER COLUMN ... SET NOT NULL`
- `DROP CONSTRAINT`
- enum changes
- relation/foreign key changes
- Prisma treating rename as drop/add

If any appear, stop and review the migration plan.

## Run Locally and Seed

Start local Postgres from `apps/api`:

```powershell
docker compose up -d
```

Run migration/generate/seed from repository root:

```powershell
yarn workspace @mockp/api prisma:migrate
yarn workspace @mockp/api prisma:generate
yarn workspace @mockp/api prisma:seed
```

Seed orchestration:

- Main seed file: `apps/api/prisma/seed.ts`
- Category seeds: `apps/api/prisma/seeds/*`
- Current user seed: `apps/api/prisma/seeds/users.ts`

## Validate Generated Prisma Client

Run:

```powershell
yarn workspace @mockp/api prisma:generate
yarn workspace @mockp/api tsc
```

Check:

- Imports resolve through `src/common/prisma/client`.
- Backend services compile.
- GraphQL DTOs/entities compile.
- No application code imports directly from old generated paths unless intentionally local to Prisma scripts.

## Check Affected Backend, GraphQL, and Frontend Code

When schema changes:

- Update `PrismaService` consumers if model/field names changed.
- Update GraphQL entities in `apps/api/src/models/<domain>/graphql/entity/*`.
- Update inputs/args in `apps/api/src/models/<domain>/graphql/dtos/*`.
- Update resolvers/services.
- Regenerate `apps/api/src/schema.gql` by running/building the API as needed.
- Update `libs/network/src/gql/queries.graphql` when frontend data changes.
- Run GraphQL codegen.
- Validate affected apps.

## Strong Stop Conditions

Stop before:

- Destructive changes.
- Required backfills.
- Production data impact.
- Dropping columns or tables.
- Changing relation cardinality.
- Renaming fields without a migration plan.
- Rewriting migration history.
- Changing Prisma config paths.
- Changing generated client output path.
- Changing PostgreSQL version or Docker volume path.

Use [[../agents/STOP_CONDITIONS|Stop Conditions]].

## Needs Verification

> Needs verification

- Production database provider and migration deployment process.
- Production backfill process.
- Whether migration SQL review is enforced in CI.
- Whether generated GraphQL schema should be regenerated by a dedicated command.

