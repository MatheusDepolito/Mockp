# Bugfix Example — Repository-Aligned Flow

> Status: Current project state

Generic workflow grounded in Mockp layering (Nest **`models/<domain>`**, Next App Router **`apps/<web>/src/app`**, **`libs/network`**, **`libs/ui`**). Adapt details to each ticket—no hypothetical bug invented here.

Companion guides: [[../debugging/BUGFIX_PLAYBOOK|Bugfix Playbook]], [[../operations/VALIDATION_CHECKLIST|Validation Checklist]], [[../agents/STOP_CONDITIONS|Stop Conditions]].

## 1. Tie the Bug to a Layer

| Symptoms | Likely first stop |
| --- | --- |
| HTTP 401/403, **`checkRowLevelPermission`** failure, JWT errors | Resolver/controller (`@AllowAuthenticated`, `AuthGuard`), [[../security/AUTH_SESSION_GUIDE|Auth Session Guide]] |
| Wrong GraphQL payload / missing selections | Resolver + **`libs/network/src/gql`** + regenerated **`generated.tsx`** |
| Data integrity / missing rows | **`BookingsService`**, **`PrismaService`**, migrations |
| Stripe redirect / unpaid booking | **`stripe.controller.ts`**, `StripeService`, env vars (**`BOOKINGS_REDIRECT_URL`**, secrets) |
| UI-only rendering | Component under **`apps/*/src/app`** vs **`libs/ui`**, Apollo cache/refetch |

## 2. Reproduce with Minimal Surface

Example pattern (booking timeline UI):

1. Log in as **manager** persona (requires manager role per resolver guard).
2. Open garage booking management UI that renders **`CheckInOutButton`** (`libs/ui/src/components/organisms/CheckInOutButtons.tsx`).
3. Trigger **`CreateBookingTimelineDocument`** mutation; watch network tab for **`/graphql`** response + **`BookingsForGarage`** refetch.

If reproduction needs prod-only data, stop—see [[../agents/STOP_CONDITIONS|Stop Conditions]].

## 3. Inspect Similar Code Before Editing

- Search for existing fixes: e.g. **`checkRowLevelPermission(`** near your domain.
- Compare neighboring resolvers (`bookings`, `booking-timelines`) for consistent guard usage.
- For UI bugs, search component directory (`libs/ui/src/components/organisms/**`) for sibling patterns.

## 4. Make the Smallest Safe Change

Example safety practices derived from repo patterns:

- Prefer adjusting **`BookingsService`** logic over duplicating Prisma calls in both REST + GraphQL unless intentionally scoped.
- When fixing GraphQL selection issues, update **`queries.graphql`**, rerun **`yarn workspace @mockp/network codegen`**, update TypeScript imports—never hand-edit **`generated.tsx`**.
- For Stripe flows, avoid “fixing” by bypassing **`BookingsService.create`**—that centralizes passcode + slot validation.

## 5. Validate

Layer-specific commands (see [[VALIDATION_EXAMPLE]]):

- Backend-only: **`yarn nx run @mockp/api:tsc`** + **`lint`** + **`build`**.
- Frontend-only: **`yarn nx run @mockp/web:*`** targets as available.
- Contract change: add **`yarn workspace @mockp/network codegen`**.

Finish with **`yarn validate`** when touching multiple packages.

## 6. Avoid Scope Creep

Do **not** combine bugfix with:

- broad UI redesign,
- Prisma schema changes unrelated to root cause,
- new REST endpoints “just to test”.

If the fix reveals deeper architectural debt, document follow-up work instead of expanding the same PR.

## Stop Conditions

Unclear business rule, cross-persona behavior change, or destructive DB fix → pause per [[../agents/STOP_CONDITIONS|Stop Conditions]].
