# Local Development

> Status: Current project state

This runbook documents the real local setup flow for the current repository. Use it before running agents against code changes.

Read with:

- [[START_HERE]]
- [[ENVIRONMENT_VARIABLES]]
- [[../operations/DOCKER_AND_DATABASE|Docker and Database]]
- [[../nx/DEVELOPMENT_PLAYBOOK|Nx Development Playbook]]

## Prerequisites

- Node.js compatible with the current workspace. The repo was validated locally with Node `22.x`.
- Yarn via Corepack. The current local Yarn version used during setup was `4.12.0`.
- Docker Desktop or Docker Engine with Compose v2.
- PostgreSQL is not required directly on the host; local Postgres runs through Docker Compose.

## Package Manager

> Status: Current project state

The monorepo uses Yarn workspaces:

- Root package: `package.json`
- Workspaces: `apps/*`, `libs/*`
- Nx orchestration: `nx.json`

Install dependencies from the repository root:

```powershell
yarn install
```

## Prepare Environment Files

Copy each example file to a local `.env` file and fill secrets as needed:

```powershell
Copy-Item apps/api/.env.example apps/api/.env
Copy-Item apps/web/.env.example apps/web/.env
Copy-Item apps/web-admin/.env.example apps/web-admin/.env
Copy-Item apps/web-manager/.env.example apps/web-manager/.env
Copy-Item apps/web-agent/.env.example apps/web-agent/.env
```

See [[ENVIRONMENT_VARIABLES]] for each variable and its source.

Do not commit `.env` files.

## Start Docker and PostgreSQL

From `apps/api`:

```powershell
docker compose up -d
```

This starts Postgres `18` with:

- Host port: `2000`
- Container port: `5432`
- Database: `mockp_db`
- User: `mockp`
- Password: `mockp`

See [[../operations/DOCKER_AND_DATABASE|Docker and Database]].

## Prepare Prisma

From the repository root, with `DATABASE_URL` available in `apps/api/.env`:

```powershell
yarn workspace @mockp/api prisma:generate
yarn workspace @mockp/api prisma:migrate
yarn workspace @mockp/api prisma:seed
```

What these commands do:

- `prisma:generate`: generates the Prisma 7 client into `apps/api/prisma/generated`.
- `prisma:migrate`: applies development migrations.
- `prisma:seed`: creates local seed data, including the development admin user.

Seeded development login:

```text
Email: admin@mockp.dev
Password: admin123
```

## Run the Backend

From the repository root:

```powershell
yarn nx run @mockp/api:dev
```

Backend URLs:

- API base and Swagger UI: `http://localhost:3000/`
- GraphQL: `http://localhost:3000/graphql`

## Run Frontend Apps

Run each app from the repository root in a separate terminal:

```powershell
yarn nx run @mockp/web:dev
yarn nx run @mockp/web-manager:dev
yarn nx run @mockp/web-agent:dev
yarn nx run @mockp/web-admin:dev
```

Ports:

- `@mockp/web`: `http://localhost:3001`
- `@mockp/web-manager`: `http://localhost:3002`
- `@mockp/web-agent`: `http://localhost:3003`
- `@mockp/web-admin`: `http://localhost:3004`

## Common Failure Points

### Frontend calls `/graphql` on itself

Check the frontend `.env` file:

```env
NEXT_PUBLIC_API_URL="http://localhost:3000"
```

Restart the frontend dev server after changing `NEXT_PUBLIC_*` variables.

### Prisma cannot reach Postgres

Check that Docker is running:

```powershell
docker ps --filter "name=mockp_db"
```

Check the API database URL:

```env
DATABASE_URL="postgresql://mockp:mockp@localhost:2000/mockp_db?schema=public"
```

### Postgres volume problems

The current compose file uses Postgres 18 and mounts the volume at `/var/lib/postgresql`, not `/var/lib/postgresql/data`.

If the local database can be deleted, reset it from `apps/api`:

```powershell
docker compose down -v
docker compose up -d
```

Then rerun migrations and seed.

### NextAuth Google debug or OAuth issues

Check:

- `NEXTAUTH_URL`
- `NEXTAUTH_SECRET`
- `GOOGLE_CLIENT_ID`
- `GOOGLE_CLIENT_SECRET`
- Authorized Google redirect URI for the app port

## Validation Commands

From the repository root:

```powershell
yarn tsc
yarn lint
yarn build
```

For API-only validation:

```powershell
yarn nx run @mockp/api:tsc
yarn nx run @mockp/api:lint
yarn nx run @mockp/api:build
```

For web lint validation:

```powershell
yarn nx run @mockp/web:lint
yarn nx run @mockp/web-manager:lint
yarn nx run @mockp/web-agent:lint
yarn nx run @mockp/web-admin:lint
```

## Needs Verification

> Status: Needs verification

- Production deployment flow is not documented in this phase.
- CI behavior should be documented later after reviewing actual CI files.
- Automated tests are not available in the current project state; see [[../testing/TEST_STRATEGY|Test Strategy]] (deprecated stub: [[../testing/TESTING_GUIDE|Testing Guide]]).
