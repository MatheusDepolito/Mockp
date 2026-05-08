# Real REST Patterns

> Status: Current project state

This guide documents REST as it exists today in the project. GraphQL remains the default frontend/backend contract for application screens.

Read with:

- [[DEVELOPMENT_PLAYBOOK]]
- [[../features/NEW_FEATURE_FLOW|New Feature Flow]]
- [[../debugging/BUGFIX_PLAYBOOK|Bugfix Playbook]]
- [[../agents/STOP_CONDITIONS|Stop Conditions]]
- [[FUTURE_TYPED_REST_OPENAPI]]

Repository examples: [[../examples/REST_ENDPOINT_EXAMPLE|REST Endpoint Example]], [[../examples/GRAPHQL_CHANGE_EXAMPLE|GraphQL Change Example]] (contract-first screens).

## Verified REST Surface

REST controllers exist under:

```text
apps/api/src/models/<domain>/rest/*.controller.ts
```

There is also a Stripe-specific controller:

```text
apps/api/src/models/stripe/stripe.controller.ts
```

Verified controller examples:

- `apps/api/src/models/users/rest/users.controller.ts`
- `apps/api/src/models/bookings/rest/bookings.controller.ts`
- `apps/api/src/models/garages/rest/garages.controller.ts`
- `apps/api/src/models/stripe/stripe.controller.ts`

## Route Naming

Most domain REST controllers use plural resource routes:

```text
@Controller('users')
@Controller('garages')
@Controller('bookings')
```

The Stripe controller uses:

```text
@Controller('stripe')
```

Stripe exposes a redirect-style route:

```text
GET /stripe/success?session_id=...
```

## DTOs and Entities

Domain REST DTOs live under:

```text
apps/api/src/models/<domain>/rest/dtos/*
```

Domain REST Swagger entities live under:

```text
apps/api/src/models/<domain>/rest/entity/*
```

Example patterns:

- `create.dto.ts`
- `update.dto.ts`
- `query.dto.ts`
- `*.entity.ts`

## Auth and Permissions

REST controllers may use:

- `@AllowAuthenticated()`
- `@GetUser()`
- `@ApiBearerAuth()`
- `checkRowLevelPermission(...)`

Example: `users.controller.ts` protects create/update/delete operations and checks row-level user permissions.

Not every read endpoint is protected. Agents must verify the current controller before assuming auth behavior.

## Error Handling

REST error handling uses NestJS exceptions where explicit errors exist.

Verified example:

- `StripeController` throws `BadRequestException` when `session_id` is missing.

> Needs verification
>
> Domain REST controllers mostly call Prisma directly. There is no clearly documented shared REST error-handling standard beyond NestJS defaults and local exceptions.

## Frontend REST Consumption

Verified frontend REST usage:

- `libs/ui/src/components/organisms/BookSlotPopup.tsx` calls `process.env.NEXT_PUBLIC_API_URL + '/stripe'`.

This means current frontend REST usage is tied to the Stripe checkout flow, not general app-screen data fetching.

GraphQL remains the default contract for application data.

## Swagger/OpenAPI Today

Swagger exists today:

- `@nestjs/swagger` is installed in `apps/api`.
- `apps/api/src/main.ts` creates a Swagger document with `SwaggerModule.createDocument`.
- Swagger UI is mounted at `/`.
- Bearer auth is configured in Swagger with `.addBearerAuth()`.

> Status: Current project state
>
> Swagger exists for API documentation, but typed REST/OpenAPI generation for frontend clients is not implemented.

## When REST Is Acceptable Today

Use REST only when it matches current project patterns:

- External provider flows such as Stripe checkout.
- Redirect-based flows.
- Webhook or callback-style endpoints.
- File/upload-style endpoints.
- HTTP-specific integration behavior that does not fit GraphQL well.

Use GraphQL for normal app-screen data.

## Creating a REST Route Safely

Before creating a REST endpoint:

1. Confirm GraphQL is not the better contract for the use case.
2. Find the closest existing REST controller in the same domain.
3. Reuse the route, DTO, Swagger decorator, auth, and permission style already present.
4. Keep route logic thin.
5. Avoid introducing a new REST architecture or client generation pattern.
6. Check whether frontend consumption needs env documentation updates.
7. Validate API and any frontend caller.

## Weak or Inconsistent Areas

> Needs verification

- Domain REST controllers often access `PrismaService` directly instead of using the same service layer as GraphQL.
- REST auth coverage differs by endpoint and must be checked per controller.
- There is no implemented typed REST client generation flow.
- REST is documented by Swagger, but the frontend does not currently consume generated OpenAPI types.

## What Not To Do

- Do not create REST endpoints for app-screen data when GraphQL already fits.
- Do not implement OpenAPI typed REST in this phase.
- Do not add frontend REST clients without checking current `NEXT_PUBLIC_API_URL` usage.
- Do not bypass auth/permission checks when mutating protected data.
- Do not treat generated Swagger docs as a frontend type contract today.
