# Backend Feature Example — Bookings Domain

> Status: Current project state

Concrete pattern taken from **`apps/api/src/models/bookings`** (NestJS GraphQL + related services). Use it as the template for similar domain work; compare with the target module before copying—other domains may diverge.

See also [[../backend/DEVELOPMENT_PLAYBOOK|Backend Development Playbook]], [[../features/NEW_FEATURE_FLOW|New Feature Flow]], [[../agents/STOP_CONDITIONS|Stop Conditions]].

## Where the Domain Lives

- Folder: `apps/api/src/models/bookings/`
- Typical contents (verified layout):
  - `bookings.module.ts` — wires resolver, services, controllers.
  - `graphql/` — resolver, service, entities, dtos (`create-booking.input.ts`, `where.args.ts`, …).
  - `rest/` — REST controller when HTTP-style CRUD exists (`bookings.controller.ts`).
- Same registration style as other **`models/<domain>`** modules from `apps/api/src/app.module.ts`.

## Resolver Entry Point

**File:** `apps/api/src/models/bookings/graphql/bookings.resolver.ts`

Pattern:

- Resolver class `@Resolver(() => Booking)`.
- Injects **`BookingsService`** and **`PrismaService`**.
- Operations use `@AllowAuthenticated()` or `@AllowAuthenticated('admin' | 'manager' | 'valet')`.
- **`createBooking`** calls **`checkRowLevelPermission(user, args.customerId)`** then **`bookingsService.create(args)`**.
- List queries constrain Prisma **`where`** (customer/valet/admin variants); some narrowing uses **`this.prisma`** directly in the resolver before delegating **`findAll`**.

## Service (“Use Case”)

**File:** `apps/api/src/models/bookings/graphql/bookings.service.ts`

- Contains **`create`**, **`findAll`**, and related persistence.
- **`create`** orchestrates **`Customer`** existence/nesting, **`passcode`** generation (`generateSixDigitNumber`), slot selection (**`getFreeSlot`**), inserts **`Booking`**, assignment records, etc.—read fully before altering rules.

Prefer new business logic here—not in resolver/controller adapters.

## DTO / Input / Entity

- **`CreateBookingInput`**: `apps/api/src/models/bookings/graphql/dtos/create-booking.input.ts`.
- **`Booking`** GraphQL entity: `graphql/entity/booking.entity.ts`.
- Listing/filter args: `graphql/dtos/find.args.ts`, **`BookingWhereInput`** patterns in `graphql/dtos/where.args.ts`.
- REST parallel: `rest/dtos/create.dto.ts` feeding **`BookingsRESTController`** (**`apps/api/src/models/bookings/rest/bookings.controller.ts`**) — today this path talks to **`PrismaService`** directly; GraphQL stays on **`BookingsService`**.

## Data Access

- **`PrismaService`** only (`apps/api/src/common/prisma/prisma.service.ts`).
- Resolver may call **`this.prisma`** for simple scoping; primary writes go through **`BookingsService`** for mutations.

## Authorization Pattern

Representative **`createBooking`** excerpt:

```33:41:apps/api/src/models/bookings/graphql/bookings.resolver.ts
  @AllowAuthenticated()
  @Mutation(() => Booking)
  createBooking(
    @Args('createBookingInput') args: CreateBookingInput,
    @GetUser() user: GetUserType,
  ) {
    checkRowLevelPermission(user, args.customerId);
    return this.bookingsService.create(args);
  }
```

Details: [[../security/AUTHORIZATION_GUIDE|Authorization Guide]].

## Validation Commands

See [[../operations/VALIDATION_CHECKLIST|Validation Checklist]]:

- `yarn nx run @mockp/api:tsc`
- `yarn nx run @mockp/api:lint`
- `yarn nx run @mockp/api:build` (**`build`** script runs **`prisma:generate`**).
- Repo-wide: **`yarn validate`** (root `package.json`).

> **Needs verification:** whether codegen must run (**`yarn workspace @mockp/network codegen`**) depends on **`schema.gql`** / **`libs/network`** edits only.

## Stop Conditions

- Role/guard/row-access changes → [[../agents/STOP_CONDITIONS|Stop Conditions]], [[../security/AUTHORIZATION_GUIDE|Authorization Guide]].
- Prisma / destructive migration risk → [[../database/PRISMA_MIGRATION_SAFETY|Prisma Migration Safety]], [[PRISMA_RELATION_EXAMPLE]].
