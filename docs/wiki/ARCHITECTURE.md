# Mockp Architecture & Project Guidelines

> Status: Current project state

This document is the **central reference** for the **Mockp** monorepo: architecture, technical patterns, and organization rules. It keeps **backend (NestJS)**, **frontend (Next.js/React)**, and **GraphQL contracts** aligned, and helps avoid ad-hoc refactors and broken contracts.

> **Note:** When something is not fully explicit in the repository, this document states it as **recommendation**, not as verified fact. Prefer the focused English guides in `docs/wiki` for operational detail (for example [[START_HERE]], [[graphql/CONTRACT_CHANGE_GUIDE]], [[rest/REAL_REST_PATTERNS]], [[database/PRISMA_MIGRATION_SAFETY]]).

---

## Project Overview

### Monorepo layout

- **Apps**
  - `apps/api`: NestJS API (GraphQL + REST).
  - `apps/web`: primary customer-facing Next.js app (App Router).
  - `apps/web-admin`, `apps/web-manager`, `apps/web-valet`: additional Next.js apps (panels or role-specific areas).
- **Libs**
  - `libs/network`: GraphQL/network layer (Apollo config, `fetchGraphQL`, codegen, generated types).
  - `libs/ui`: shared UI and product templates (Atomic Design: `atoms/`, `molecules/`, `organisms/`, `templates/`).
  - `libs/forms`: form providers and abstractions (for example `FormProviderSearchGarage`).
  - `libs/util`: shared utilities and types (for example `MenuItem`).
  - `libs/sample-lib`: sample library.
- **Orchestration / build**
  - Yarn workspaces + Nx (`nx.json`).
  - Nx runs `run-many` with caching for `build`, `lint`, and `tsc`. There is no per-project `project.json` in the current repository state.

### Layer responsibilities

- **Backend (`apps/api`)**
  - Exposes **GraphQL** as the main contract with the frontend and **REST** where HTTP-native behavior is needed.
  - Centralizes business rules, authorization, and data access (Prisma).
  - Publishes the generated GraphQL schema at `apps/api/src/schema.gql`.

- **Frontend (`apps/web*`)**
  - Owns UI/UX, page composition, and screen-level state.
  - Consumes the backend **primarily through GraphQL**.
  - May call REST for integrations or specific HTTP flows (for example Stripe-style `POST` routes when present).
  - Uses `libs/network` for typed GraphQL operations and `libs/ui` for shared UI.

- **Libs (`libs/*`)**
  - `libs/ui` mixes generic visual components with product templates that already embed GraphQL and screen rules.
  - **Recommendation:** keep new **generic** components free of domain rules; treat domain-heavy pieces as **feature UI** even if they live under `libs/ui`.
  - **`libs/network`** should remain the single source for GraphQL documents and generated types across apps.

### Default flow (screen → GraphQL → service → database)

1. **Route/page** under `apps/web/src/app/...` (or another web app).
2. **Template/component** in `libs/ui/...` or a local module component.
3. **Typed GraphQL operation** in `libs/network/src/gql/*.graphql` → generated in `libs/network/src/gql/generated.tsx`.
4. **Client / fetch**
   - Browser: `libs/network/src/config/apollo.tsx` (Apollo + auth header).
   - Server / NextAuth: `libs/network/src/fetch/index.ts` (`fetchGraphQL`).
5. **GraphQL resolver** in `apps/api/src/models/<domain>/graphql/*.resolver.ts`.
6. **Service** in `apps/api/src/models/<domain>/graphql/*.service.ts`.
7. **Data access** via injected `PrismaService` (`apps/api/src/common/prisma/prisma.service.ts`) → PostgreSQL.

### Alternative flow (when to use REST)

The backend also exposes REST in some domains (`rest/*.controller.ts`). Use REST when HTTP semantics or integrations fit better than GraphQL (webhooks, external callbacks, health checks, uploads/downloads, or other HTTP-specific endpoints).

Project rule:

> Use GraphQL for application screens and typical app data. Use REST for integrations, webhooks, files, redirects, and HTTP-specific endpoints.  
> Invest in typed REST generation only when a frontend actually consumes those endpoints.

Recommended REST path:

1. HTTP entry at `apps/api/src/models/<domain>/rest/*.controller.ts`.
2. Thin REST controller for auth/validation and delegation.
3. Domain service (ideally the same service GraphQL uses).
4. `PrismaService` → PostgreSQL.

When the frontend consumes internal REST, the **future** direction (not necessarily implemented) is:

1. REST DTOs/controllers in Nest (`@nestjs/swagger`).
2. OpenAPI emitted from the backend.
3. Generated TypeScript in `libs/network/src/rest/generated/schema.ts` (**Status: Future recommendation** — see [[rest/FUTURE_TYPED_REST_OPENAPI]]).
4. A typed REST helper in `libs/network`.
5. Frontends consume `libs/network` without hand-written REST types.

Operational detail: [[rest/DEVELOPMENT_PLAYBOOK]], current patterns: [[rest/REAL_REST_PATTERNS]].

---

## Backend Organization (NestJS) — `apps/api`

### Current layout

The backend is grouped by **domain/model** under `apps/api/src/models/*`. Each domain usually splits GraphQL and REST:

```
apps/api/src/models/<domain>/
  <domain>.module.ts
  graphql/
    *.resolver.ts
    *.service.ts
    dtos/
    entity/
  rest/
    *.controller.ts
```

Real example:

- `apps/api/src/models/bookings/` contains `graphql/`, `rest/`, and `bookings.module.ts`.

### Where logic belongs

- **Resolvers (`*.resolver.ts`)**
  - Keep them **thin**: parse args, apply auth/guards/decorators, delegate to services.
  - Small argument/`where` shaping is acceptable; avoid core business logic in the resolver.

- **REST controllers (`*.controller.ts`)**
  - Same “thin adapter” principle—no heavyweight rules in the HTTP layer.

- **Services (`*.service.ts`)**
  - Own **business rules** (plus domain helpers when that reads cleaner).
  - May coordinate Prisma transactions, enforce invariants, and orchestrate reads/writes.

- **Current caveat**
  - Some resolvers/controllers still query Prisma directly for trivial CRUD, counters, or `@ResolveField`.
  - For new work, keep orchestration and non-trivial rules in services; only keep Prisma usage in adapters when intentionally small or plan a gradual refactor as complexity grows.

- **Data access (Prisma)**
  - Prefer the injected extension of `PrismaClient` exposed as `PrismaService` (`apps/api/src/common/prisma/prisma.service.ts`).
  - Repository uses Prisma **7**: schema in `apps/api/prisma/schema.prisma`; datasource/migrate configuration in `apps/api/prisma.config.ts`; generated client under `apps/api/prisma/generated/*`.
  - Do **not** hand-edit generated Prisma artifacts; regenerate with `yarn workspace @mockp/api prisma:generate`.
  - Do **not** instantiate stray `PrismaClient` instances outside `PrismaService`.

### Authentication, authorization, security

Preserve existing primitives (see [[security/AUTHORIZATION_GUIDE]] for detail):

- `AllowAuthenticated(...roles)` in `apps/api/src/common/auth/auth.decorator.ts`.
- JWT guard wiring in `apps/api/src/common/auth/auth.guard.ts`.
- Row checks via `checkRowLevelPermission(...)` in `apps/api/src/common/auth/util.ts`.

Rules:

- Prefer declaring **roles** on resolvers/controllers with `@AllowAuthenticated(...)`.
- Execute **resource-level authorization** (`checkRowLevelPermission` or domain services) **before** mutating data.
- If patterns repeat across modules, elevate them into `common/auth` utilities or dedicated domain services rather than copying logic.

### DTOs, inputs, entities

Patterns:

- Typed args/inputs grouped per domain (for example `apps/api/src/models/bookings/graphql/dtos/*`).
- GraphQL entities per domain (`apps/api/src/models/bookings/graphql/entity/*`).
- Shared primitives in `apps/api/src/common/dtos/*`.
- `RestrictProperties` (`apps/api/src/common/dtos/common.input.ts`) keeps classes aligned with Prisma types.

Rules:

- GraphQL inputs (Create/Update/Filter) live next to the domain (`graphql/dtos`).
- Reuse common DTOs only when genuinely generic.
- Align entities/DTO shapes with `@prisma/client` models through `RestrictProperties` to minimize drift across DB ↔ code ↔ contract.

### Adding a backend domain/module

Recommended checklist aligned with existing code:

1. Create `apps/api/src/models/<domain>/`.
2. Add `<domain>.module.ts` wiring `Resolver`, `Service`, and `Controller` (if REST exists).
3. Populate `graphql/` with resolver, service, `dtos/`, and `entity/`.
4. Optionally add REST handlers under `rest/`.
5. Register the module inside `apps/api/src/app.module.ts`.

### Backend anti-patterns

- Heavy business logic in resolvers/controllers.
- Bypassing injected `PrismaService`.
- Duplicated validations/authorization—centralize (`common/auth` or domain services).
- Mixing **structural refactors** and **behavior changes** in one change set without a deliberate plan.

---

## Frontend Organization (Next.js/React) — `apps/web*`

### Current patterns

- Web apps use the **App Router** (`layout.tsx`, `page.tsx`, nested routes).
- Typical local alias (`@/*` → `apps/web/src/*` as defined in each app `tsconfig.json`).
- Composition example (`apps/web/src/app/layout.tsx`):
  - `ApolloProvider` from `@mockp/network/src/config/apollo`.
  - `SessionProvider`, `Header`, toast + layout primitives from `@mockp/ui/...`.
  - Shared structural types (`MenuItem`, etc.) from `@mockp/util`.

### Placement rules

- **`page.tsx`**
  - Treat as the assembly point: wire templates, localized providers, composition only.
  - Example: `apps/web/src/app/search/page.tsx` wraps `SearchPage` with `FormProviderSearchGarage`.

- **Reusable UI**
  - Lives in `libs/ui/src/components/...` following Atomic Design folders.
  - Page-level templates land in `libs/ui/src/components/templates/*` (for example `SearchPage`).

- **Screen state / behavior**
  - Prefer `libs/forms` when a form feature is genuinely reusable.
  - Otherwise keep hooks/components next to the route when behavior is app- or flow-specific.

### Local component vs shared `libs/ui`

Stay **local** when:

- The component is tied to a single flow.
- It depends on domain behavior for that route.
- It is still volatile and not reused elsewhere.

Promote to **`libs/ui`** when:

- Purely visual and reusable across apps/routes (buttons, primitives, layouts).
- You have **two concrete consumers** unless there is strong design-system intent.
- It does **not** embed bespoke GraphQL operations or authorization decisions (those belong in deliberate feature templates).

### Avoid oversized route files

- Keep `page.tsx` small—composition only.
- When screens grow:
  - factor reusable chunks into templates under `libs/ui`, **or**
  - colocate local components beside the route for one-off UX.

### Forms, filters, tables, dialogs, actions

Existing pattern:

- Form providers in `libs/forms` (for example `FormProviderSearchGarage`).

Guidance:

- Reusable validation + provider logic → `libs/forms/src/<feature>`.
- Presentation-only pieces → `libs/ui`.
- Networking → `libs/network` (documents, Apollo/`fetchGraphQL`), not ad-hoc `fetch` sprinkled through UI layers.

See also [[frontend/FORMS_GUIDE]], [[frontend/SHARED_UI_GUIDE]], [[frontend/COMPONENT_GUIDE]].

### Frontend anti-patterns

- Duplicate filter/transform logic across screens.
- Build “kitchen-sink” abstractions prematurely.
- Encode authorization/product rules in UI that should remain backend-driven.

---

## Frontend/Backend Communication Through GraphQL

### Where GraphQL lives

- Generated schema reference: `apps/api/src/schema.gql`
- Documents: `libs/network/src/gql/queries.graphql`
- Generated types + operation documents: `libs/network/src/gql/generated.tsx`
- Codegen configuration: `libs/network/codegen.ts` (schema path `../../apps/api/src/schema.gql`, output `libs/network/src/gql/generated.tsx`)

### Standard contract flow

UI → template/component → typed GraphQL hook or helper → query/mutation → resolver → service → Prisma/database.

Two primary execution paths today:

- **Browser Apollo** (`libs/network/src/config/apollo.tsx`): injects `authorization` using `/api/auth/token`.
- **Server `fetchGraphQL`** (`libs/network/src/fetch/index.ts`): executes `TypedDocumentNode` operations (for example NextAuth flows).

### Rules for stable contracts

- The frontend depends on the **published GraphQL schema**, not on backend implementation details.
  - Do **not** bake table names or implicit server-only rules into UI code paths.
- Favor **compatible** evolution (additive changes, deprecations) or staged migrations (add field → migrate clients → delete old field).
- When inputs change (`Create*Input`, filters, etc.), update every place constructing `variables`.
- When payloads change, update fragments/templates consuming those selections.
- Never “silent change” contracts:
  1. Update `queries.graphql` / fragments as needed.
  2. Regenerate `generated.tsx`.
  3. Update consumers across apps/libs.

### Practical checklist for field churn

- Search `libs/network/src/gql/queries.graphql` and usages of typed `*Document` exports across apps/libs before renaming/removing fields.
- Reuse fragments (for example `BookingFields`) to reduce churn.
- Prefer adding replacements before deleting old fields.

Operational detail: [[graphql/CONTRACT_CHANGE_GUIDE]], [[agents/STOP_CONDITIONS]].

---

## Shared UI and Libraries (`libs/*`)

### `libs/ui`

Folders:

- `libs/ui/src/components/atoms`
- `libs/ui/src/components/molecules`
- `libs/ui/src/components/organisms`
- `libs/ui/src/components/templates`

Guidelines:

- Generic shared components remain predictable, minimal side-effects, and free of privileged domain decisions inside the primitive itself.
- Templates may orchestrate atoms/molecules and accept data/handlers injected by callers.
- **Important:** many organisms/templates currently call Apollo hooks against `@mockp/network/src/gql/generated`; treat those files as shared **feature UI**, not as design-system primitives.

### `libs/network`

- `src/gql/*`: documents + codegen output (`generated.tsx`).
- `src/fetch/index.ts`: typed `fetchGraphQL`.
- `src/config/apollo.tsx` + `src/config/authOptions.ts`: Apollo + NextAuth bootstrap.

Rules:

- Centralize GraphQL documents inside `libs/network/src/gql/*.graphql`.
- Never hand-edit codegen output.
- Reuse Apollo or `fetchGraphQL` helpers instead of one-off `/graphql` fetches sprinkled through apps.

### `libs/forms` and `libs/util`

- `libs/forms`: schemas/providers for reusable flows.
- `libs/util`: non-UI helpers/types without tying to GraphQL.

### Imports and coupling

- Avoid cyclic dependencies (UI must not depend on app-local modules).
- Deep imports (`@mockp/ui/src/...`, `@mockp/network/src/...`) reflect today’s pragmatic pattern—stay consistent rather than introducing a second convention without a deliberate migration.

---

## Naming Patterns (Preserve Existing Style)

### Backend

- Modules: `<domain>.module.ts`
- GraphQL resolver/service filenames follow domain (`bookings.resolver.ts`, etc.)
- Inputs live under `dtos/` (`create-*.input.ts`, `*-args.ts`, etc.)
- Entities under `graphql/entity/*`
- REST controllers under `rest/*.controller.ts`
- Shared auth + prisma utilities under `apps/api/src/common/{auth,prisma}`

### Frontend

- Routes: `apps/<web>/src/app/<route>/page.tsx`
- Root layout per app at `apps/<web>/src/app/layout.tsx`
- Providers split between `libs/ui` (visual shell) and `libs/forms` (form context)
- GraphQL artifacts in `libs/network/src/gql/*`

---

## Refactoring Rules

- Prefer **incremental** refactors—small, reviewable changes.
- Do **not** mix large structural moves with opaque behavior changes unless coordinated.
- Do not churn UX without product intent.
- Before promoting code into shared libs (`libs/ui`, `libs/forms`, `libs/util`):
  - confirm reuse,
  - avoid premature abstraction.
- Before altering GraphQL:
  - map consumers under `libs/network` + apps,
  - evolve contracts compatibly when possible.
- Delete dead code only after confirming routing/navigation/import coverage—document residual risk.

---

## Validation Before Handoff

### Root scripts

Typical orchestration targets:

- `yarn tsc`
- `yarn lint`
- `yarn build`
- `yarn validate` (formats + runs the above checks)

Checklist:

- Run at least typecheck/lint/build for affected surfaces.
- Re-check `@mockp/*` import paths after moves.
- Regenerate/sync `libs/network/src/gql/generated.tsx` whenever the backend schema diverges.
- Re-test Next routes when App Router folders move.
- If failures pre-existed, document explicitly (do not silently ignore).

### Automated tests

**Current project state:** no `*.spec.ts`, `*.test.ts`, or Jest configs were verified baselines (`[[testing/TEST_STRATEGY|Test Strategy]]`).

> **Status:** Future recommendation  
> Introduce scripted tests deliberately (framework choice, CI wiring) before enforcing test gates.

[[testing/TESTING_GUIDE|Testing Guide]] is **Deprecated** — use [[testing/TEST_STRATEGY]], [[testing/MANUAL_QA_GUIDE]], and [[operations/VALIDATION_CHECKLIST]] instead.

---

## Guidance for Agents and Contributors

Before editing code:

- Map apps vs libs, backend domains (`models/*`), frontend routes (`src/app/*`), and GraphQL artifacts (`libs/network`).

Preserve established patterns:

- Backend modules with parallel `graphql/` + optional `rest/`.
- Frontend App Router + provider wiring in layouts.
- Central GraphQL documents in `libs/network/src/gql`.

Working style:

- Keep diffs scoped and reversible.
- Explain structural motivations (for example promotions into `libs/ui`).
- Avoid premature frameworks or abstractions.
- Update imports/exports whenever files move.

GraphQL hygiene:

- Never ship schema changes without updating documents and regenerating `generated.tsx`.

Close-out expectations:

- List touched files,
- validations executed (`yarn validate`, prisma steps, codegen, etc.),
- known risks (contract drift, unfinished migrations).

Link hubs: [[START_HERE]], [[CONTEXT_MAP]], [[agents/STOP_CONDITIONS]], [[agents/WIKI_REVIEW_CHECKLIST]].

