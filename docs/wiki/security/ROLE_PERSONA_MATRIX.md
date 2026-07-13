# Role Persona Matrix

> Status: Current project state

This guide maps known roles, personas, and frontend apps using repository evidence. It intentionally avoids overclaiming product meaning.

Read with:

- [[AUTHORIZATION_GUIDE]]
- [[AUTH_SESSION_GUIDE]]
- [[../frontend/WEB_APPS_GUIDE|Web Apps Guide]]
- [[../agents/STOP_CONDITIONS|Stop Conditions]]

## Verified Backend Roles

Backend role union:

```ts
type Role = 'admin' | 'brokerageManager' | 'agent';
```

Verified role sources:

- `apps/api/src/common/types/index.ts`
- `libs/util/types.ts`
- `apps/api/src/common/auth/auth.guard.ts`

`AuthGuard` derives roles by checking whether the authenticated user has related records in:

- `Admin`
- `BrokerageManager`
- `Agent`

## Verified User-Related Models

The Prisma schema includes user/persona-related models:

- `User`
- `Admin`
- `BrokerageManager`
- `Agent`
- `Customer`
- `Credentials`
- `AuthProvider`

> Needs verification
>
> `Customer` exists as a model/persona but is not part of the current backend `Role` union.

## Frontend App Matrix

| App | Path | Port | Evidence | Likely persona |
| --- | --- | --- | --- | --- |
| `web` | `apps/web` | `3001` | routes include `/search`, `/bookings`, `/professional`, `/login`, `/register` | General/customer-facing user |
| `web-admin` | `apps/web-admin` | `3004` | routes include `/manageAdmins`, `/verifications`, `/login`, `/register` | Admin |
| `web-manager` | `apps/web-manager` | `3002` | routes include `/new-garage`, `/agents`, `/bookings` | Manager |
| `web-agent` | `apps/web-agent` | `3003` | routes include `/my-properties`, `/new-property`, `/my-trips`, `/inquiries`, `/properties/[id]/edit`, `/login`, `/register` | Agent |

These app/persona mappings are inferred from route names and app names.

## Role to App Evidence

### `admin`

Evidence:

- Backend role exists.
- Admin Prisma model exists.
- `apps/web-admin` exists.
- `web-admin` routes `/manageAdmins` and `/verifications` exist.
- Backend resolvers/controllers protect admin operations with `@AllowAuthenticated('admin')`.

Likely app:

- `apps/web-admin`

### `brokerageManager`

Evidence:

- Backend role exists.
- BrokerageManager Prisma model exists.
- `apps/web-manager` exists.
- Manager routes include `/new-garage`, `/agents`, and `/bookings`.
- Backend resolvers protect brokerage manager operations with `@AllowAuthenticated('brokerageManager')` and `@AllowAuthenticated('brokerageManager', 'admin')`.

Likely app:

- `apps/web-manager`

### `agent`

Evidence:

- Backend role exists.
- Agent Prisma model exists.
- `apps/web-agent` exists.
- Agent routes include `/my-properties`, `/new-property`, `/my-trips`, `/inquiries`, and `/properties/[id]/edit`.
- Backend resolvers protect agent operations with `@AllowAuthenticated('agent')`.

Likely app:

- `apps/web-agent`

### Customer/general user

Evidence:

- Customer Prisma model exists.
- `apps/web` routes include search, bookings, and professional onboarding paths.
- Customer-specific GraphQL resolver/model exists.

Likely app:

- `apps/web`

> Needs verification
>
> Customer behavior is modeled but not represented as an `AuthGuard` role. Confirm product expectations before adding customer-specific role checks.

## Agent Rules

- Confirm the affected app/persona before touching multiple frontend apps.
- Do not add a new role without explicit human confirmation.
- Do not assume customer is an auth role just because a `Customer` model exists.
- Do not move behavior between apps without confirming ownership.
- Check backend authorization before trusting frontend app boundaries.

## Stop Conditions

Stop before:

- Adding a role.
- Changing app/persona ownership.
- Making one app access another persona's data.
- Adding customer role behavior.
- Changing brokerageManager/admin/agent permissions.
- Touching multiple apps for one feature without confirmation.

Use [[../agents/STOP_CONDITIONS|Stop Conditions]].

## Needs Verification

> Needs verification

- Exact product definitions for customer, admin, brokerageManager, and agent.
- Whether users can hold multiple roles intentionally.
- Whether admin can act across every brokerageManager/company boundary.
- Whether customer should become a first-class backend role.
