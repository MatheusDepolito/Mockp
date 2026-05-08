# Wiki Review Checklist

> Status: Current project state

Use this checklist when adding or updating documentation under `docs/wiki`, or after materially changing workflows, tooling, contracts, or infrastructure assumptions. It keeps navigation, language, labels, and stop conditions coherent for humans and AI agents.

## Before You Merge Wiki Changes

- [ ] New or renamed guides are linked from [[../START_HERE|Start Here]] *or* [[../CONTEXT_MAP|Context Map]] (prefer both for major guides).
- [ ] Each new doc has explicit **scope** at the top: what exists today versus what needs verification versus future recommendations (`Status` labels).
- [ ] The doc uses **`Status`** labels consistently (see below).
- [ ] Obsidian wiki links (`[[path/to/DOC]]`) resolve to existing files relative to `docs/wiki`.
- [ ] Body text is **English**, except deliberate legacy stubs that point to replacements.
- [ ] Long procedural steps are **not duplicated** elsewhere: keep detail in one guide and link summaries from hubs.
- [ ] If an area raises implementation risk (migrations, auth, GraphQL, REST, secrets, Docker, CI, deployments), confirm [[STOP_CONDITIONS|Stop Conditions]] still mentions it or links the right specialist guide.

## Commands, Scripts, and Validation

When root `package.json` scripts, Nx defaults, codegen, Husky hooks, Prisma workflows, or Docker Compose change materially:

- [ ] [[../operations/NX_COMMANDS|Nx Commands]] matches actual targets and scripts where applicable.
- [ ] [[../operations/VALIDATION_CHECKLIST|Validation Checklist]] reflects the commands agents should rely on.

## Environment and Secrets

When adding, renaming, or changing meaning of env vars:

- [ ] [[../setup/ENVIRONMENT_VARIABLES|Environment Variables]] lists them with server vs public clarification.
- [ ] [[../operations/ENVIRONMENT_MATRIX|Environment Matrix]] reflects app/port/file mapping changes.
- [ ] [[../operations/SECRETS_MANAGEMENT|Secrets Management]] mentions new secret categories or verification gaps.

## Docker, Postgres, Local Database

When `apps/api/docker-compose.yml`, Postgres image, ports, volumes, or local DB workflow change:

- [ ] [[../operations/DOCKER_AND_DATABASE|Docker and Database]] documents the verified setup.
- [ ] [[../database/PRISMA_MIGRATION_SAFETY|Prisma Migration Safety]] stays aligned with Prisma version and config files.
- [ ] [[../setup/LOCAL_DEVELOPMENT|Local Development]] entry path still works end-to-end.

## GraphQL and Codegen

When schema paths, codegen config, generated output paths, or contract workflow steps change:

- [ ] [[../graphql/CONTRACT_CHANGE_GUIDE|GraphQL Contract Change Guide]] is accurate.
- [ ] [[../graphql/DEVELOPMENT_PLAYBOOK|GraphQL Development Playbook]] checklists remain valid where they mirror that flow.

## REST

When controllers, Swagger/OpenAPI posture, or “what exists today vs future typed REST” shifts:

- [ ] [[../rest/REAL_REST_PATTERNS|Real REST Patterns]] reflects verified patterns.
- [ ] Future-only OpenAPI workflows stay confined to [[../rest/FUTURE_TYPED_REST_OPENAPI|Future Typed REST OpenAPI]] and are labeled as not implemented unless the repo actually adds them.

## Prisma

When `schema.prisma`, `prisma.config.ts`, migration commands, seeds, or client generation paths change:

- [ ] [[../database/PRISMA_MIGRATION_SAFETY|Prisma Migration Safety]] matches repo reality.
- [ ] [[../database/DEVELOPMENT_PLAYBOOK|Database Development Playbook]] prerequisites (paths, Postgres local) remain correct.

## Optional Self-Audit Against Hubs

- [ ] Hub entry points still answer where to start for setup, features, bugs, GraphQL, REST, Prisma, frontend shared UI, validation, stop conditions, and **repository examples** ([[../START_HERE|Start Here]], [[../CONTEXT_MAP|Context Map]] → **Examples**).
- [ ] Any new procedural example doc under **`examples/`** is grounded in real paths and linked from hubs or affected guides.

## Examples Area (`examples/`)

- [ ] New examples use **`Status: Current project state`** or mark uncertain steps **`Needs verification`**.
- [ ] Link new files from [[../CONTEXT_MAP|Context Map]] and at least [[../START_HERE|Start Here]] or the relevant playbook.

---

## Canonical `Status` Lines

Use exactly one primary line near the top of each guide unless a second status block clearly applies to a subsection only:

| Label | Meaning |
| --- | --- |
| `Status: Current project state` | Verified from the repo; describe limitations as `Needs verification` inline |
| `Status: Needs verification` | Claim cannot be confirmed from the repo alone; state what is unknown |
| `Status: Future recommendation` | Not implemented behavior the team might adopt later |
| `Status: Not implemented` | Capability or standard does not exist as a project pattern today |
| `Status: Deprecated` | Superseded; link to the replacement doc |

Normalize verbose variants:

- Prefer `Status: Not implemented` with a sentence below explaining nuance instead of merging explanation into the status line.
- Prefer `Status: Needs verification` on its own line, then bullets for unknowns below.
