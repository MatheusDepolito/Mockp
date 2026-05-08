# Docker and Database

> Status: Current project state

This document describes the real Docker and PostgreSQL setup currently present in the repository.

This is a local development database setup. Production database hosting, migration execution, and rollback behavior are not confirmed; see [[./DEPLOYMENT_ARCHITECTURE|Deployment Architecture]], [[./PRODUCTION_MIGRATION_FLOW|Production Migration Flow]], and [[./ROLLBACK_STRATEGY|Rollback Strategy]].

Read with:

- [[../setup/LOCAL_DEVELOPMENT|Local Development]]
- [[../setup/ENVIRONMENT_VARIABLES|Environment Variables]]
- [[../database/DEVELOPMENT_PLAYBOOK|Database Development Playbook]]
- [[./DEPLOYMENT_ARCHITECTURE|Deployment Architecture]]
- [[./PRODUCTION_MIGRATION_FLOW|Production Migration Flow]]
- [[./ROLLBACK_STRATEGY|Rollback Strategy]]

## Verified Files

The repository currently contains:

- `apps/api/docker-compose.yml`

The repository currently does not contain:

- Dockerfiles
- Root-level compose files
- Other app-specific compose files
- `docker-compose.yaml` files

## Compose Service

Source: `apps/api/docker-compose.yml`

```yaml
services:
  db:
    container_name: mockp_db
    image: postgres:18
    restart: always
    ports:
      - 2000:5432
    environment:
      POSTGRES_USER: mockp
      POSTGRES_DB: mockp_db
      POSTGRES_PASSWORD: mockp
    volumes:
      - db_data_mockp:/var/lib/postgresql
volumes:
  db_data_mockp:
```

## PostgreSQL Version

> Status: Current project state

The local database image is:

```text
postgres:18
```

Avoid documenting this project as Postgres 17 or `postgres:latest`; the compose file is explicitly pinned to Postgres 18.

## Ports

- Host: `localhost:2000`
- Container: `5432`

External database tools such as DBeaver should connect to:

- Host: `localhost`
- Port: `2000`
- Database: `mockp_db`
- User: `mockp`
- Password: `mockp`

## Volume

The named Docker volume is:

```text
db_data_mockp
```

It is mounted at:

```text
/var/lib/postgresql
```

This mount path is intentional for the current Postgres 18 setup.

## Start and Stop

Run commands from `apps/api`:

```powershell
docker compose up -d
docker compose down
```

Reset the local database only when local data can be deleted:

```powershell
docker compose down -v
docker compose up -d
```

After resetting the volume, rerun migrations and seed:

```powershell
yarn workspace @mockp/api prisma:migrate
yarn workspace @mockp/api prisma:seed
```

## Prisma Connection

Prisma 7 uses:

- `apps/api/prisma.config.ts` for CLI datasource configuration.
- `apps/api/src/common/prisma/prisma.service.ts` for runtime connection.
- `@prisma/adapter-pg` for PostgreSQL adapter wiring.
- `DATABASE_URL` from `apps/api/.env`.

Local connection string:

```env
DATABASE_URL="postgresql://mockp:mockp@localhost:2000/mockp_db?schema=public"
```

The Prisma schema intentionally does not define a datasource URL directly because Prisma 7 reads datasource configuration from `prisma.config.ts`.

## Prisma Commands

From the repository root:

```powershell
yarn workspace @mockp/api prisma:generate
yarn workspace @mockp/api prisma:migrate
yarn workspace @mockp/api prisma:status
yarn workspace @mockp/api prisma:seed
```

From `apps/api`, the package scripts can also be run directly:

```powershell
yarn prisma:generate
yarn prisma:migrate
yarn prisma:status
yarn prisma:seed
```

## Common Failure Points

### Volume created with a different Postgres layout

If the container restarts or fails after a Postgres version change, the local named volume may be incompatible.

If the local data is disposable:

```powershell
docker compose down -v
docker compose up -d
```

### Wrong host port in `DATABASE_URL`

Use port `2000`, not `5432`, from the host:

```env
DATABASE_URL="postgresql://mockp:mockp@localhost:2000/mockp_db?schema=public"
```

### Missing Prisma client

Run:

```powershell
yarn workspace @mockp/api prisma:generate
```

The generated client is ignored by Git at:

```text
apps/api/prisma/generated
```

## Not Implemented

> Status: Not implemented

- There is no application containerization pattern in this repository yet.
- There are no Dockerfiles for the API or Next.js apps.
- There is no production database provisioning guide in this phase.
- There is no documented backup/restore process in this phase.

## Needs Verification

> Status: Needs verification

- Production PostgreSQL provider and connection pooling strategy.
- Whether serverless deployment will use direct Prisma connections, pooling, or another adapter strategy.
