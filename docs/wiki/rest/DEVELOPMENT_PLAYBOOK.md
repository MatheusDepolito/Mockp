# REST Development Playbook

> Status: Current project state

How to add **REST** endpoints in Mockp, and how **typed OpenAPI** might work **in the future**.

- **What exists today:** see [[REAL_REST_PATTERNS|Real REST Patterns]].
- **Typed OpenAPI client generation:** [[FUTURE_TYPED_REST_OPENAPI|Future Typed REST OpenAPI]] (**Status: Future recommendation** — not implemented).

Companion docs: [[../ARCHITECTURE|Architecture]], [[../backend/DEVELOPMENT_PLAYBOOK|Backend Development Playbook]], [[../frontend/DEVELOPMENT_PLAYBOOK|Frontend Development Playbook]].

## Project Rule

> Use GraphQL for application screens and typical app data. Use REST for integrations, webhooks, files, redirects, and other HTTP-specific endpoints.  
> Only invest in generated REST clients when a frontend actually consumes the endpoint.

---

## When REST Fits

Use REST when HTTP semantics matter more than GraphQL flexibility:

- [ ] Webhooks and third-party callbacks (for example Stripe-like flows)
- [ ] Redirect-based flows with specific status codes
- [ ] Large uploads/downloads/streaming that do not map cleanly to GraphQL
- [ ] Health/status probes
- [ ] Integrations requiring raw HTTP endpoints
- [ ] Scenarios where CDN/HTTP caching dominates the design

Avoid REST for standard screen data if GraphQL already models it well.

---

## When to Generate Typed REST Contracts

Do **not** auto-generate typed clients for every controller.

Generate types when:

- [ ] A Next.js app/lib calls the REST route directly
- [ ] Payload mismatches would be costly or security-sensitive
- [ ] DTOs are stable enough to version
- [ ] Multiple consumers reuse the same endpoint surface

Example referenced in prior notes: `POST /stripe` consumed from `libs/ui` (verify current code before relying on path names).

---

## Future Source-of-Truth Pipeline (Not Implemented)

> Status: Future recommendation

Intended flow:

```txt
Nest REST controllers/DTOs
    ↓
Swagger/OpenAPI emitted from Nest
    ↓
openapi.json artifact
    ↓
openapi-typescript (or similar)
    ↓
libs/network/src/rest/generated/schema.ts
    ↓
Centralized fetchREST helper
    ↓
Apps import generated types instead of hand-written interfaces
```

Rules when adopted:

- [ ] Backend DTO classes remain canonical.
- [ ] Generated TypeScript is treated as contract output, not hand-edited.

---

## Step-by-Step — Create or Change a REST Endpoint

### 1. Controller + service

- [ ] Locate the domain folder `apps/api/src/models/<domain>/rest/`.
- [ ] Implement `*.controller.ts` with thin handlers.
- [ ] Apply auth/decorators consistent with GraphQL (`@AllowAuthenticated`, row-level checks via `checkRowLevelPermission`—see [[../security/AUTHORIZATION_GUIDE|Authorization Guide]]).
- [ ] Prefer reusing the GraphQL domain service for business rules.

### 2. DTOs + Swagger decorators

- [ ] Place DTO variants under `rest/dtos/*` when the domain already uses that layout.
- [ ] Derive DTOs from REST entities with `OmitType` / `PickType` (`@nestjs/swagger`) to avoid drift.
- [ ] Decorate controllers with `@ApiTags`, `@ApiBearerAuth()`, `ApiOkResponse`, etc., so OpenAPI output matches reality.

### 3. Produce OpenAPI snapshot (future tooling)

> Status: Future recommendation

- [ ] Provide a deterministic script to emit `openapi.json` without a manual server babysitting step.
- [ ] Reuse the same Swagger bootstrap as `apps/api/src/main.ts`.

### 4. Generate frontend types (future)

> Status: Future recommendation

- [ ] Use `openapi-typescript` (or equivalent) writing into `libs/network/src/rest/generated/schema.ts`.
- [ ] Add cohesive directory layout such as `libs/network/src/rest/{fetchREST.ts,endpoints/*.ts}`.

### 5. Centralize clients in `libs/network`

- [ ] Create a small wrapper (for example `fetchREST`) that mirrors `fetchGraphQL` responsibilities: base URL (`NEXT_PUBLIC_API_URL`), headers/auth, error normalization.

### 6. Update frontend consumers

- [ ] Replace ad-hoc component-level `fetch` with the shared helper.
- [ ] Do not maintain parallel hand-written interfaces if generated types exist.

### 7. Validate

- [ ] `yarn tsc`, `yarn lint`, `yarn build`
- [ ] Confirm OpenAPI artifact + generated TS files are in sync when that pipeline exists.

---

## Example Script Block (Illustrative Only)

> Status: Future recommendation — not present in the repository today.

```json
{
  "scripts": {
    "codegen:gql": "yarn workspace @mockp/network codegen",
    "codegen:rest:openapi": "tsx apps/api/scripts/generate-openapi.ts",
    "codegen:rest:types": "openapi-typescript apps/api/openapi.json -o libs/network/src/rest/generated/schema.ts",
    "codegen:rest": "yarn codegen:rest:openapi && yarn codegen:rest:types",
    "codegen": "yarn codegen:gql && yarn codegen:rest"
  }
}
```

---

## Anti-Patterns

- [ ] Using REST to bypass a GraphQL contract that should evolve in place.
- [ ] Duplicating business rules between REST controllers and GraphQL resolvers instead of services.
- [ ] Hand-writing DTO types in the frontend when OpenAPI generation is available.
- [ ] Generating clients for controllers no consumer calls.
- [ ] Shipping incomplete Swagger metadata while assuming generated clients are trustworthy.

---

## Wrap-Up Template

- **Endpoint added/updated**:
- **Reason REST is appropriate**:
- **OpenAPI updated?** *(when applicable)*
- **Generated types present?** *(when applicable)*
- **Frontend helper location**:
- **Validations run**:
- **Known risks**:
