# Deployment Architecture

> Status: Needs verification

No deployment architecture was confirmed from repository files.

This document records what is known and unknown about deployment. Do not infer a production platform from framework defaults or starter README text.

Read with:

- [[RELEASE_READINESS]]
- [[CI_AND_NX_CLOUD]]
- [[ENVIRONMENT_MATRIX]]
- [[SECRETS_MANAGEMENT]]
- [[PRODUCTION_MIGRATION_FLOW]]
- [[ROLLBACK_STRATEGY]]
- [[OBSERVABILITY_AND_INCIDENTS]]

## Verification Summary

Verified repository search found:

- No Dockerfiles.
- One local compose file: `apps/api/docker-compose.yml`.
- No `docker-compose.yaml` files.
- No root compose file.
- No `vercel.json`.
- No `serverless.*` config.
- No GitHub Actions workflows.
- No GitLab CI config.
- No deployment scripts.
- No release scripts.
- No deployment-specific docs beyond generic framework README text.

The root README documents local run commands and mentions Docker as a technology, but it does not define production deployment architecture.

Some generated starter READMEs mention Vercel or NestJS deployment resources. Treat those as framework starter text, not confirmed Mockp deployment architecture.

## What Is Known

- The repo is a Yarn/Nx monorepo.
- The backend app is `apps/api`.
- Frontend apps are `apps/web`, `apps/web-admin`, `apps/web-manager`, and `apps/web-agent`.
- Local PostgreSQL runs through `apps/api/docker-compose.yml`.
- Nx Cloud has an ID in `nx.json`, but Nx Cloud is not CI by itself.
- Root scripts can typecheck, lint, build, and validate locally.

## What Is Not Known

> Needs verification

- Production hosting provider.
- Whether frontend apps deploy separately or together.
- Whether the API deploys as a server, container, serverless function, or other runtime.
- Production database provider.
- Secrets provider.
- Domain names.
- Environment names beyond local development.
- Release approval process.
- Migration execution process.
- Rollback process.
- Observability and incident process.

## What Agents Must Not Assume

- Do not assume Vercel.
- Do not assume AWS/serverless.
- Do not assume Docker deployment.
- Do not assume all apps are deployed.
- Do not assume CI exists.
- Do not assume migrations run automatically.
- Do not assume local `.env.example` values are valid for production.
- Do not create deployment config unless explicitly requested.

## Questions Requiring Human Decision

- What platform hosts `apps/api`?
- What platform hosts each frontend app?
- Are `web`, `web-admin`, `web-manager`, and `web-agent` separate deployables?
- What environments exist: development, staging, production?
- Where are secrets stored?
- How are migrations run?
- Who approves releases?
- What is the rollback path?
- What monitoring/error tracking is required?

## Future Recommendation

> Status: Future recommendation

Once deployment is defined, this document should include:

- Platform diagram.
- App-to-platform mapping.
- Runtime versions.
- Build commands.
- Deploy commands.
- Environment variable source.
- Database provider.
- Migration strategy.
- Rollback strategy.
- Observability and incident links.

Do not implement deployment architecture in this phase.
