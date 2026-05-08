# GraphQL Change Example — `createBookingTimeline` Mutation

> Status: Current project state

Uses an **existing** mutation end-to-end: backend resolver → published schema artifact → **`libs/network`** operation → **`useMutation`** in UI.

Read [[../graphql/CONTRACT_CHANGE_GUIDE|GraphQL Contract Change Guide]], [[../graphql/DEVELOPMENT_PLAYBOOK|GraphQL Development Playbook]], [[../agents/STOP_CONDITIONS|Stop Conditions]].

## Backend Surface

**Resolver:** `apps/api/src/models/booking-timelines/graphql/booking-timelines.resolver.ts`

```22:60:apps/api/src/models/booking-timelines/graphql/booking-timelines.resolver.ts
  @AllowAuthenticated('admin', 'manager')
  @Mutation(() => BookingTimeline)
  async createBookingTimeline(
    @Args('createBookingTimelineInput')
    { bookingId, status }: CreateBookingTimelineInput,
    @GetUser() user: GetUserType,
  ) {
    const booking = await this.prisma.booking.findUnique({
      where: { id: bookingId },
      select: {
        Slot: {
          select: {
            Garage: {
              select: {
                Company: {
                  select: { Managers: { select: { uid: true } } },
                },
              },
            },
          },
        },
      },
    });
    checkRowLevelPermission(
      user,
      booking.Slot.Garage.Company.Managers.map((manager) => manager.uid),
    );

    const [updatedBooking, bookingTimeline] = await this.prisma.$transaction([
      this.prisma.booking.update({
        data: { status: status },
        where: { id: bookingId },
      }),
      this.prisma.bookingTimeline.create({
        data: { bookingId, managerId: user.uid, status },
      }),
    ]);
    return bookingTimeline;
  }
```

- **Input DTO:** `CreateBookingTimelineInput` in `graphql/dtos/create-booking-timeline.input.ts`.
- **GraphQL entity:** `graphql/entity/booking-timeline.entity.ts`.
- When you add/change fields here, Nest regenerates **`apps/api/src/schema.gql`** (do not hand-edit).

## Schema Artifact

After backend changes, **`apps/api/src/schema.gql`** must reflect the resolver contract. Compare diffs before merging.

## Frontend Document

**Operation file:** `libs/network/src/gql/queries.graphql`

```264:276:libs/network/src/gql/queries.graphql
mutation createBookingTimeline(
  $createBookingTimelineInput: CreateBookingTimelineInput!
) {
  createBookingTimeline(
    createBookingTimelineInput: $createBookingTimelineInput
  ) {
    bookingId
    id
    managerId
    status
    timestamp
  }
}
```

## Codegen Output

- Config: `libs/network/codegen.ts`  
  - **`schema: '../../apps/api/src/schema.gql'`**  
  - **`documents: './src/**/*.graphql'`**  
  - **`generates: './src/gql/generated.tsx'`**  
  - **`watch: true`** (local dev convenience).

Command: **`yarn workspace @mockp/network codegen`** (from repo root).

Exports used in UI (example): **`CreateBookingTimelineDocument`**, **`BookingStatus`**, **`namedOperations`** (`libs/ui/src/components/organisms/CheckInOutButtons.tsx`).

## Frontend Consumer

```1:34:libs/ui/src/components/organisms/CheckInOutButtons.tsx
import {
  BookingStatus,
  CreateBookingTimelineDocument,
  namedOperations,
} from '@mockp/network/src/gql/generated';
import { useMutation } from '@apollo/client';
// ...
const [checkIn, { data, loading }] = useMutation(
  CreateBookingTimelineDocument,
);
return (
  <Button
    loading={loading}
    onClick={() => {
      checkIn({
        variables: {
          createBookingTimelineInput: {
            bookingId,
            status,
          },
        },
        awaitRefetchQueries: true,
        refetchQueries: [namedOperations.Query.BookingsForGarage],
      });
    }}
```

Pattern: typed document node + Apollo **`useMutation`** + explicit **`refetchQueries`**.

## Caveats

- **`watch: true`** in codegen can be awkward in CI—**Status: Needs verification** for the exact non-watch command your automation should use.
- Any field added/removed requires updating **resolver**, **schema output**, **queries.graphql**, regenerated **`generated.tsx`**, and every consumer (`*Document`, fragments, `namedOperations` usages).

## Validation Checklist Snapshot

- **`yarn workspace @mockp/api build`** (validates Nest + Prisma client generation path).
- **`yarn workspace @mockp/network codegen`** when operations/schema changed.
- Root **`yarn validate`** before handoff.

See [[../operations/VALIDATION_CHECKLIST|Validation Checklist]].

## Stop Conditions

Breaking renames, unauthorized data exposure, skipping consumer updates → [[../agents/STOP_CONDITIONS|Stop Conditions]].
