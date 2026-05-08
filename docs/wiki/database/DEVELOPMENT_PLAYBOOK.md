# Database Development Playbook (Postgres + Prisma)

> Status: Current project state

Operational checklist for **database** changes via Prisma. Deep safety notes: [[PRISMA_MIGRATION_SAFETY|Prisma Migration Safety]]. Docker/local DB details: [[../operations/DOCKER_AND_DATABASE|Docker and Database]].

Aligned with [[../ARCHITECTURE|Architecture]] and [[../START_HERE|Start Here]].

### Verified Paths

- Prisma schema: `apps/api/prisma/schema.prisma`
- CLI config (`DATABASE_URL`, migrate config): `apps/api/prisma.config.ts`
- Migrations directory: `apps/api/prisma/migrations/*`
- Generated client output: `apps/api/prisma/generated/*` (regenerate explicitly; normally gitignored artifacts)
- Access path: inject `PrismaService` (`apps/api/src/common/prisma/prisma.service.ts`)
- Local PostgreSQL Compose: `apps/api/docker-compose.yml` (see Docker guide for pinned image/port)

Database provider string in schema: PostgreSQL (`provider = "postgresql"`).

---

## Before Touching the Database

- [ ] Read [[PRISMA_MIGRATION_SAFETY]] before non-trivial migrations.
- [ ] Decide why you are changing the model:
  - [ ] Bugfix vs feature vs refactor
- [ ] Map contract impact:
  - [ ] GraphQL entities/inputs/services/resolvers
  - [ ] Frontend operations/codegen/clients (`libs/network`)
- [ ] Map data impact:
  - [ ] Do existing environments hold data needing backfills?
- [ ] Local prerequisites:
  - [ ] Postgres through `docker compose` under `apps/api`
  - [ ] Typical host mapping `2000:5432`
  - [ ] Default credentials from Compose (`mockp_db` / `mockp` / `mockp`)

---

## Mandatory Checklist

- [ ] Change models in `apps/api/prisma/schema.prisma`.
- [ ] Keep datasource URL and migration tooling in `prisma.config.ts` (Prisma 7 does **not** place `url` on the datasource block inside `schema.prisma`).
- [ ] Maintain migration history (`apps/api/prisma/migrations/*`); avoid “schema-only” edits without migrations for shared environments.
- [ ] Inspect generated SQL whenever the migration could drop/rename/default sensitive columns.
- [ ] Backend must keep using injected `PrismaService` rather than bespoke `PrismaClient` constructors.
- [ ] Run `yarn workspace @mockp/api prisma:generate` whenever schema or toolchain expectations shift.
- [ ] Whenever Graph-facing models shift, reconcile entities/inputs and regenerate `apps/api/src/schema.gql`.

---

## Local Docker PostgreSQL Snapshot

Facts worth repeating (see Docker guide for full detail):

- [ ] Compose file targets local dev only—not a production blueprint by itself.

From `apps/api`:

```powershell
docker compose up -d
```

---

## Seeds and Fixtures

Verified:

- [ ] Seed entry: `apps/api/prisma/seed.ts`
- [ ] Categorical seeds live under `apps/api/prisma/seeds/*` (for example users).
- [ ] Command: `yarn workspace @mockp/api prisma:seed`
- [ ] Automated DB test harness not verified (`[[../testing/TEST_STRATEGY|Test Strategy]]`).

Suggestions:

- [ ] Document whenever new seeds alter login expectations or shared fixtures.
- [ ] Prisma migrations do **not** automatically invoke seeds—run seeding explicitly after migrations when needed (`prisma db seed`).

---

## Safe Evolution

- [ ] Prefer multi-step migrations: nullable columns → backfill → tighten constraints.
- [ ] Avoid rename/remove churn without validating backend GraphQL surfaces and frontend operations.

---

## Anti-Patterns

- [ ] Editing schema without migrations for shared databases.
- [ ] Destructive SQL without stakeholder review.
- [ ] Runtime backfills sprinkled through hot paths unless justified.

---

## Before You Finish

- [ ] `schema.prisma`, `prisma.config.ts`, services, GraphQL artifacts stay aligned conceptually.

From repo root:

- [ ] `yarn tsc`
- [ ] `yarn lint`
- [ ] `yarn build`

---

## Wrap-Up Template

- **Summary**:
- **Prisma schema changed?**:
- **Migrations created/updated?**:
- **GraphQL/frontend fallout mapped?**:
- **Validations run**:
- **Known risks**:
