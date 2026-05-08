# Frontend Development Playbook (Next.js/React) — `apps/web*`

> Status: Current project state

Operational checklist for **frontend** work. Supporting references: [[../ARCHITECTURE|Architecture]], [[../START_HERE|Start Here]], [[COMPONENT_GUIDE|Component Guide]], [[FRONTEND_FEATURE_FLOW|Frontend Feature Flow]], [[WEB_APPS_GUIDE|Web Apps Guide]], [[SHARED_UI_GUIDE|Shared UI Guide]], [[FORMS_GUIDE|Forms Guide]], [[NETWORK_USAGE_GUIDE|Network Usage Guide]].

### Verified Baseline

- Routes live under App Router folders such as `apps/web/src/app/*`.
- `libs/ui` holds shared UI spanning `atoms/`, `molecules/`, `organisms/`, `templates/`.
- Forms live under `libs/forms/*`.
- GraphQL artifacts: `libs/network/src/gql/queries.graphql` + `libs/network/src/gql/generated.tsx`.

---

## Before Implementing

- [ ] Decide which surface changes (`apps/web`, `apps/web-admin`, `apps/web-manager`, `apps/web-valet`).
- [ ] Locate affected routes in `src/app/<route>/`.
- [ ] Reuse templates/components inside `libs/ui/src/components/**` when possible before inventing replacements.
- [ ] Classify the work (bugfix, feature, refactor, contract sync).

---

## Where Code Belongs

- [ ] Route assembly (`page.tsx`): composition only—stay small.
- [ ] Shared UI/feature templates: `libs/ui/src/components/*`.
- [ ] Portable form schemas/providers/adapters: `libs/forms`.
- [ ] Documents, codegen output, Apollo/NextAuth config: `libs/network`—avoid ad-hoc `fetch` sprinkled through UI layers.

---

## Sharing Types With the Backend

Mockp aligns backend and frontend via **GraphQL contracts + codegen**, not direct Nest/Prisma imports.

Flow:

1. Backend exposes/persists schema at `apps/api/src/schema.gql`.
2. `libs/network/codegen.ts` generates `libs/network/src/gql/generated.tsx`.
3. Apps consume typed documents/`TypedDocumentNode` exports (examples: login flows, auth-provider queries).

Rules (must):

- [ ] **Never** import backend TypeScript sources into frontend packages.
- [ ] Prefer `queries.graphql` edits + regenerated `generated.tsx`.

---

## API Calls — GraphQL and REST

### GraphQL

Two supported paths verified today:

- **Browser Apollo**: `libs/network/src/config/apollo.tsx` wired through app layouts with auth header plumbing.
- **Server/fetch helpers**: `fetchGraphQL` in `libs/network/src/fetch/index.ts` for server contexts (including NextAuth).

Rules (must):

- [ ] Centralize GraphQL through `libs/network`.

### REST (when HTTP-native behavior is unavoidable)

REST controllers reside under `apps/api/src/models/<domain>/rest/*.controller.ts`.

Project rule:

> Use GraphQL for application screens/data. Reserve REST for integrations, webhooks, files, redirects, Stripe-style flows, and other HTTP-centric endpoints.

Should:

- [ ] Centralize outbound REST helpers in `libs/network` similar to `fetchGraphQL`, if REST usage spreads (see [[../rest/REAL_REST_PATTERNS|Real REST Patterns]] vs [[../rest/FUTURE_TYPED_REST_OPENAPI|Future Typed REST OpenAPI]]).

---

## Atomic Design in `libs/ui`

Folders today: `atoms`, `molecules`, `organisms`, `templates`.

Reality check:

- [ ] Several organisms/templates embed GraphQL hooks, NextAuth coupling, or product rules—they behave like shared feature modules, **not** pure design-system atoms.

For promotion rules read [[COMPONENT_GUIDE]]:

- **Atom**: dumb visual primitive.
- **Molecule**: composes atoms; lightweight UI-only logic acceptable.
- **Organism**: large sections (navigation bars, dashboards).
- **Template**: reusable page scaffolding fed by callers.

Boundary rule (must):

- [ ] If a component mixes domain authorization rules or GraphQL-heavy behavior, avoid marketing it as a generic atom/molecule; keep it localized or deliberately feature-oriented.

---

## Mandatory Checklist

- [ ] Search `libs/ui` before creating clones.
- [ ] Keep route files slim (providers + templates).
- [ ] Preserve observable UX when refactoring routing or providers.
- [ ] Update imports if files move (`@mockp/network`, `@mockp/ui/src/...` patterns persist today).

---

## Known Integrations

- Apollo bootstrap: `libs/network/src/config/apollo.tsx`.
- NextAuth options: `libs/network/src/config/authOptions.ts`.

Rules:

- [ ] Avoid duplicating those configs per app unless there’s a deliberate fork.

---

## Before You Finish

From repo root:

- [ ] `yarn tsc`
- [ ] `yarn lint`
- [ ] `yarn build`

GraphQL touched?

- [ ] Regenerate/sync `libs/network/src/gql/*`.

---

## Wrap-Up Template

- **Summary**:
- **Files touched**:
- **Patterns followed**:
- **Validations run**:
- **Known risks**:
- **Next steps**:
