# Prisma Relation Example — Booking Graph

> Status: Current project state

Demonstrates **real relational modeling** pulled from **`apps/api/prisma/schema.prisma`**. Steps describe **workflow only** — **do not** run migrations unless a human-approved change request exists.

Align with [[../database/PRISMA_MIGRATION_SAFETY|Prisma Migration Safety]], [[../database/DEVELOPMENT_PLAYBOOK|Database Development Playbook]], [[BACKEND_FEATURE_EXAMPLE]].

## Models and Relations (verified excerpt)

```
174:231:apps/api/prisma/schema.prisma
model Booking {
  id        Int      @id @default(autoincrement())
  // ...
  slotId Int
  Slot   Slot @relation(fields: [slotId], references: [id])

  customerId String
  Customer   Customer @relation(fields: [customerId], references: [uid])

  ValetAssignment ValetAssignment?
  BookingTimeline BookingTimeline[]

  @@index([startTime, endTime])
}

model Slot {
  // ...
  garageId Int
  Garage   Garage    @relation(fields: [garageId], references: [id])
  Bookings Booking[]
}

model Garage {
  // ...
  companyId Int
  Company Company @relation(fields: [companyId], references: [id])
  Slots   Slot[]
}
```

Interpretation helpers:

- **`Booking.slotId` → `Slot`** mandatory many-to-one.
- **`Booking.customerId` → `Customer.uid`** aligns auth customer records.
- **`ValetAssignment`** uses **`bookingId` @id** ⇒ 1:0..1 pairing.
- **`BookingTimeline`** carries audit-like history keyed by **`bookingId`**.

Additional related models (**`Company`**, **`Manager`**, **`Valet`**) exist earlier in schema—consult full file before cross-domain edits.

## File Locations & Tooling

- Schema: **`apps/api/prisma/schema.prisma`**
- Datasource + migrate URL wiring: **`apps/api/prisma.config.ts`** (Prisma 7).
- Generated client output: `./generated/client` beneath `apps/api/prisma` (see `generator` block).
- Regenerate CLI: **`yarn workspace @mockp/api prisma:generate`** (wired into **`@mockp/api` `build`/`tsc`** scripts).

> **Needs verification:** every machine must run generate after pulls touching schema—even if migrations unchanged.

## Migration Flow (conceptual — do not execute here)

1. Capture requirement + design SQL impact.
2. Update **`schema.prisma`**, run **`yarn workspace @mockp/api prisma:migrate`** (human environment only).
3. Inspect generated SQL for destructive statements (drops, cascades).
4. Regenerate client (command above).
5. Update **`BookingsService`**, GraphQL entities/inputs/resolvers, REST DTOs, and codegen documents as applicable.

Agents must halt on destructive/backfill-heavy steps—see [[../agents/STOP_CONDITIONS|Stop Conditions]].

## Backend / Contract Impact Touchpoints

- GraphQL **`Booking`** entity + inputs (`apps/api/src/models/bookings/graphql/**`).
- Timelines (**`booking-timelines`**) coupling shown in resolver examples (**`booking-timelines.resolver.ts`**).
- REST **`bookings`** controller may diverge—verify both surfaces if DB columns move.

## Destructive Change Stop Highlights

Dropping enums/relations tied to **`BookingStatus` timelines**, rewriting **`@@index`** used for availability queries, or batch-altering Stripe metadata expectations all require stakeholder review ahead of tooling.
