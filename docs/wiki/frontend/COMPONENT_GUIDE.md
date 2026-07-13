# Frontend Component Guide

> Status: Current project state

Use this guide before creating, extracting, or changing frontend components. It documents the component organization currently visible in the repository.

Read with:

- [[DEVELOPMENT_PLAYBOOK]]
- [[WEB_APPS_GUIDE]]
- [[SHARED_UI_GUIDE]]
- [[FORMS_GUIDE]]
- [[NETWORK_USAGE_GUIDE]]
- [[FRONTEND_FEATURE_FLOW]]
- [[../agents/STOP_CONDITIONS|Stop Conditions]]

## Verified Structure

Frontend apps use Next.js App Router:

```text
apps/web/src/app/*
apps/web-admin/src/app/*
apps/web-manager/src/app/*
apps/web-agent/src/app/*
```

Verified app-local files are mostly:

- `layout.tsx`
- `page.tsx`
- `api/auth/[...nextauth]/route.ts`
- `api/auth/token/route.ts`

No broad app-local component folders were verified in the current apps. Current routes mostly compose shared components/templates from `libs/ui`.

Shared UI lives under:

```text
libs/ui/src/components
```

Verified categories:

- `atoms`
- `molecules`
- `organisms`
- `organisms/admin`
- `organisms/map`
- `organisms/search`
- `templates`

This is an Atomic Design-like structure, but the current project also contains product/domain UI inside organisms and templates.

## Naming Patterns

Verified component file naming:

- PascalCase for component files: `Button.tsx`, `Header.tsx`, `LoginForm.tsx`, `CreateGarage.tsx`.
- Route files follow Next.js App Router naming: `page.tsx`, `layout.tsx`, `route.ts`.
- Domain-specific components use domain names: `GarageCard`, `ValetTripCard`, `ManageAdmins`, `BookSlotPopup`.
- Role/persona gates use names like `IsAdmin`, `IsManager`, `IsValet`, `IsLoggedIn`.

Use PascalCase for new component files.

## Existing Component Patterns

Verified examples:

- Layouts: `Container`, `Header`, `AuthLayout`, app `layout.tsx` files.
- Cards: `GarageCard`, `CustomerBookingCard`, `ValetCard`, `AdminCard`, `ManageBookingCard`.
- Dialogs: `Dialog`, `CreateManySlotsDialog`, `BookSlotPopup`.
- Filters/search: `FilterSidebar`, `ShowGarages`, `SearchPage`.
- Tables/lists: list-style components such as `ListGarages`, `ListValets`, `ListCustomerBookings`, `ListGarageBookings`.
- Actions: `AssignValetButton`, `CheckInOutButtons`, admin create/remove buttons.
- Maps: `Map`, `StaticMapSimple`, `StaticMapDirections`, `SearchPlacesBox`, `MapMarker`.

## Local vs Shared Component Decision

Keep a component local when:

- It is used by one route or one app.
- It depends on a specific persona/app.
- It encodes domain workflow rules.
- Its props are still unstable.
- It directly mirrors one page's GraphQL data shape.
- The feature is still being discovered.

Use `libs/ui` when:

- The component is reused across apps/routes.
- It has a clear props API.
- It does not depend on app-local imports.
- It is a reusable visual building block.
- It is an established product template intentionally shared by apps.

Use [[SHARED_UI_GUIDE]] before adding to `libs/ui`.

## When to Extract a Component

Extract from a large file when:

- A section has a clear name and responsibility.
- It can be tested or reasoned about separately.
- It has a stable props boundary.
- It reduces local complexity without changing behavior.
- It does not force unrelated refactors.

Do not extract during a bugfix unless it is needed to make the fix safe.

## Domain Logic vs Presentation

Presentational components should receive data and callbacks through props.

Domain-specific UI may live in organisms/templates when current project patterns already do this, but do not pretend those components are generic.

Red flags for a supposedly generic component:

- Imports GraphQL generated documents/types.
- Calls `useQuery` or `useMutation`.
- Reads `useSession`.
- Checks role/persona behavior.
- Knows booking, garage, valet, admin, manager, or customer rules.
- Builds GraphQL variables.

If any red flag exists, keep the name/domain placement explicit.

## Before Creating a Component

Check:

- Which app/persona owns the behavior with [[WEB_APPS_GUIDE]].
- Whether a similar component exists in `libs/ui/src/components`.
- Whether the component is presentation-only or domain-specific.
- Whether a form helper belongs in `libs/forms`.
- Whether GraphQL/network behavior should use generated operations.
- Whether changing shared UI affects multiple apps.

## Avoid Broad UI Refactors

Do not:

- Reorganize component folders during feature work.
- Rename shared components without checking all imports.
- Move app-specific behavior into shared UI.
- Change styling conventions across unrelated components.
- Replace current Apollo/form/toast patterns with new libraries.

## Stop Conditions

Stop before:

- Moving a component to shared UI when it contains business/domain logic.
- Changing a shared component used by multiple apps without validating consumers.
- Reworking Atomic Design boundaries.
- Introducing a new UI library.
- Changing visual behavior when expected UX is unclear.
- Refactoring components broadly during a bugfix.

Use [[../agents/STOP_CONDITIONS|Stop Conditions]].

## Needs Verification

> Needs verification

- Whether the team wants more app-local component folders in future.
- Whether all current organisms/templates should remain in `libs/ui`.
- Whether there is a formal design-system API beyond the current folder names.

