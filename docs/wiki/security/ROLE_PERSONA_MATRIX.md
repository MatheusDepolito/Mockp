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
type Role = 'admin' | 'manager' | 'valet';
```

Verified role sources:

- `apps/api/src/common/types/index.ts`
- `libs/util/types.ts`
- `apps/api/src/common/auth/auth.guard.ts`

`AuthGuard` derives roles by checking whether the authenticated user has related records in:

- `Admin`
- `Manager`
- `Valet`

## Verified User-Related Models

The Prisma schema includes user/persona-related models:

- `User`
- `Admin`
- `Manager`
- `Valet`
- `Customer`
- `Credentials`
- `AuthProvider`

> Needs verification
>
> `Customer` exists as a model/persona but is not part of the current backend `Role` union.

## Frontend App Matrix

| App | Path | Port | Evidence | Likely persona |
| --- | --- | --- | --- | --- |
| `web` | `apps/web` | `3001` | routes include `/search`, `/bookings`, `/login`, `/register` | General/customer-facing user |
| `web-admin` | `apps/web-admin` | `3004` | routes include `/manageAdmins`, `/login`, `/register` | Admin |
| `web-manager` | `apps/web-manager` | `3002` | routes include `/new-garage`, `/valets`, `/bookings` | Manager |
| `web-valet` | `apps/web-valet` | `3003` | routes include `/my-trips`, `/login`, `/register` | Valet |

These app/persona mappings are inferred from route names and app names.

## Role to App Evidence

### `admin`

Evidence:

- Backend role exists.
- Admin Prisma model exists.
- `apps/web-admin` exists.
- `web-admin` route `/manageAdmins` exists.
- Backend resolvers/controllers protect admin operations with `@AllowAuthenticated('admin')`.

Likely app:

- `apps/web-admin`

### `manager`

Evidence:

- Backend role exists.
- Manager Prisma model exists.
- `apps/web-manager` exists.
- Manager routes include `/new-garage`, `/valets`, and `/bookings`.
- Backend resolvers protect manager operations with `@AllowAuthenticated('manager')` and `@AllowAuthenticated('manager', 'admin')`.

Likely app:

- `apps/web-manager`

### `valet`

Evidence:

- Backend role exists.
- Valet Prisma model exists.
- `apps/web-valet` exists.
- Valet route `/my-trips` exists.
- Backend resolvers protect valet operations with `@AllowAuthenticated('valet')`.

Likely app:

- `apps/web-valet`

### Customer/general user

Evidence:

- Customer Prisma model exists.
- `apps/web` routes include search and bookings.
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
- Changing manager/admin/valet permissions.
- Touching multiple apps for one feature without confirmation.

Use [[../agents/STOP_CONDITIONS|Stop Conditions]].

## Needs Verification

> Needs verification

- Exact product definitions for customer, admin, manager, and valet.
- Whether users can hold multiple roles intentionally.
- Whether admin can act across every manager/company boundary.
- Whether customer should become a first-class backend role.
