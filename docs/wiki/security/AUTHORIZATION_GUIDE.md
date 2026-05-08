# Authorization Guide

> Status: Current project state

This guide documents current backend authorization patterns. Use it before changing guards, role checks, row-level permissions, GraphQL resolver protection, or REST endpoint protection.

Read with:

- [[AUTH_SESSION_GUIDE]]
- [[ROLE_PERSONA_MATRIX]]
- [[../agents/STOP_CONDITIONS|Stop Conditions]]
- [[../graphql/CONTRACT_CHANGE_GUIDE|GraphQL Contract Change Guide]]
- [[../rest/REAL_REST_PATTERNS|Real REST Patterns]]

## Verified Authorization Files

Current authorization primitives live in:

- `apps/api/src/common/auth/auth.guard.ts`
- `apps/api/src/common/auth/auth.decorator.ts`
- `apps/api/src/common/auth/util.ts`
- `apps/api/src/common/types/index.ts`

Current backend roles are:

```ts
type Role = 'admin' | 'manager' | 'valet';
```

The same role union also exists in `libs/util/types.ts`.

## Guard Behavior

`AuthGuard`:

- Reads `Authorization` header.
- Expects a Bearer token.
- Verifies the token with Nest `JwtService`.
- Stores the decoded user on `req.user`.
- Looks up role membership by checking Prisma models:
  - `admin`
  - `manager`
  - `valet`
- Adds `roles` to `req.user`.
- Reads required roles from metadata key `roles`.
- Allows authenticated users when no roles are required.
- Allows role-protected operations when at least one user role matches.

## Decorators

`AllowAuthenticated(...roles)` combines:

- `SetMetadata('roles', roles)`
- `UseGuards(AuthGuard)`

Usage patterns:

```ts
@AllowAuthenticated()
```

Requires a valid authenticated user, with no specific role.

```ts
@AllowAuthenticated('admin')
```

Requires an authenticated user with the `admin` role.

```ts
@AllowAuthenticated('manager', 'admin')
```

Requires at least one listed role.

`GetUser()` reads `req.user` from GraphQL execution context.

## Row-Level Permission Helper

`checkRowLevelPermission(user, requestedUid, roles = ['admin'])`:

- Allows users with one of the allowed roles.
- Otherwise checks whether `user.uid` is included in the requested UID or UID list.
- Throws `ForbiddenException` when the UID check fails.
- Returns `false` when no requested UID is provided.

Important: the default privileged role is `admin`.

Use this helper when a user may only operate on their own record or on records owned by related users/managers.

## GraphQL Authorization

GraphQL resolvers live under:

```text
apps/api/src/models/<domain>/graphql/*.resolver.ts
```

Current patterns:

- Class-level role protection exists, for example admin resolvers.
- Method-level `@AllowAuthenticated()` protects authenticated operations.
- Method-level role checks protect role-specific queries/mutations.
- Row-level permission checks happen inside resolver methods before calling service updates/deletes or protected reads.

Examples verified in code:

- `BookingsResolver` uses `@AllowAuthenticated('admin')`, `@AllowAuthenticated('valet')`, and `@AllowAuthenticated('manager', 'admin')`.
- `AdminsResolver` uses class-level `@AllowAuthenticated('admin')`.
- `ManagersResolver`, `CustomersResolver`, and others call `checkRowLevelPermission`.

## REST Authorization

REST controllers live under:

```text
apps/api/src/models/<domain>/rest/*.controller.ts
```

Current patterns:

- REST endpoints may use `@AllowAuthenticated()`.
- Swagger bearer metadata may use `@ApiBearerAuth()`.
- Mutating endpoints often use `GetUser()` and `checkRowLevelPermission`.
- Public read endpoints exist in some controllers, so auth must be verified per endpoint.

Use [[../rest/REAL_REST_PATTERNS|Real REST Patterns]] before adding or changing REST endpoints.

## Where Authorization Should Live

Current project pattern:

- Authentication and role gate: `AuthGuard` through `@AllowAuthenticated`.
- Required roles: decorator metadata on resolver/controller class or method.
- Row-level checks: resolver/controller method before mutation/update/delete or protected read.
- Business operation: service method or Prisma call after authorization passes.

Do not hide permission changes inside unrelated UI or data mapping code.

## Agent Checklist

Before adding authorization logic:

- Search for the closest resolver/controller in the same domain.
- Check whether the operation is public, authenticated, or role-restricted.
- Check whether row-level ownership is required.
- Check whether `admin`, `manager`, or `valet` is already the right role.
- Check frontend app/persona with [[ROLE_PERSONA_MATRIX]].
- Validate both allowed and forbidden paths manually when possible.

## What Not To Do

- Do not bypass `@AllowAuthenticated` on protected operations.
- Do not add a new role string without updating role types and confirming business rules.
- Do not rely only on frontend hiding buttons for authorization.
- Do not skip row-level checks for user-owned or company-owned records.
- Do not change guard token parsing casually.
- Do not expose protected REST endpoints because Swagger shows them.

## Stop Conditions

Stop and ask for review before:

- Changing `AuthGuard`.
- Changing `AllowAuthenticated` or `GetUser`.
- Changing `checkRowLevelPermission`.
- Adding new role behavior.
- Changing which roles can access an existing resolver/controller.
- Bypassing row-level checks.
- Making protected data visible to another persona.
- Changing auth behavior to satisfy a frontend-only bug.

Use [[../agents/STOP_CONDITIONS|Stop Conditions]].

## Needs Verification

> Needs verification

- Customer is a Prisma/user persona but is not part of the backend `Role` union.
- REST auth coverage is not uniform and must be checked per controller.
- Some resolver read operations are public; confirm expected product behavior before changing them.
