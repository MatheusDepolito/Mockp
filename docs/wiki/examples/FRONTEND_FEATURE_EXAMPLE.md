# Frontend Feature Example — Customer Search Route

> Status: Current project state

Mirrors **`apps/web`** garage search: App Router **`page.tsx`**, **`libs/forms`** provider, **`libs/ui`** template/map organisms, **`SearchGarages`** GraphQL.

Read [[../frontend/FRONTEND_FEATURE_FLOW|Frontend Feature Flow]], [[../frontend/WEB_APPS_GUIDE|Web Apps Guide]], [[../frontend/FORMS_GUIDE|Forms Guide]], [[../frontend/NETWORK_USAGE_GUIDE|Network Usage Guide]].

## Choose the Correct App

- This route lives under **`apps/web`** (`apps/web/src/app/search/page.tsx`).
- Other personas use **`apps/web-manager`** / **`apps/web-admin`** / **`apps/web-agent`** ([[../frontend/WEB_APPS_GUIDE|Web Apps Guide]], [[../security/ROLE_PERSONA_MATRIX|Role Persona Matrix]]). Do not copy `web` routes into another app without verifying persona impact.

## Route / Page Composition

Thin page-only assembly:

```1:9:apps/web/src/app/search/page.tsx
import { FormProviderSearchGarage } from '@mockp/forms/src/searchGarages';
import { SearchPage } from '@mockp/ui/src/components/templates/SearchPage';
export default function Page() {
  return (
    <FormProviderSearchGarage>
      <SearchPage />
    </FormProviderSearchGarage>
  );
}
```

- **`FormProviderSearchGarage`** encapsulates **`react-hook-form`** + schema for **`FormTypeSearchGarage`** (`libs/forms/src/searchGarages`).
- **`SearchPage`** template (`libs/ui/src/components/templates/SearchPage.tsx`) calls **`useFormContext`**, wires Mapbox map events to **`locationFilter`**, renders **`ShowGarages`**, **`FilterSidebar`**, etc.

## Local vs Shared Pieces

| Concern | Path | Reason |
| --- | --- | --- |
| Route entry | **`apps/web/src/app/search/page.tsx`** | App wiring only. |
| Form domain | **`libs/forms/src/searchGarages`** | Portable provider + validators. |
| Visual template | **`libs/ui/...`** | Shared UX that already depends on form + map stack. |

Deeper rationale: [[SHARED_UI_DECISION_EXAMPLE]].

## Network / GraphQL

- **`SearchGarages`** operation: **`libs/network/src/gql/queries.graphql`**.
- Consume generated types/hooks/documents via **`@mockp/network/src/gql/generated`** (source file **`generated.tsx`** behind package exports).
- After backend schema edits: regenerate per [[../graphql/CONTRACT_CHANGE_GUIDE|GraphQL Contract Change Guide]] (**`yarn workspace @mockp/network codegen`**).

## Booking Popup (Adjacent Pattern)

Booking UI (**`libs/ui/src/components/organisms/BookSlotPopup.tsx`**) builds a **`CreateBookingInput`** typed object from codegen but submits payment through **`fetch`** to Stripe helper **`createBookingSession`**—mixed **typed GraphQL input reuse + REST/Stripe**. When debugging booking creation, distinguish GraphQL (**`BookingsResolver.createBooking`**) from Stripe-return success path (**`stripe.controller`** calling **`BookingsService.create`**).

## Validation / QA

- Dev servers: **`yarn nx run @mockp/web:dev`** (see [[../setup/LOCAL_DEVELOPMENT|Local Development]]).
- Env: **`NEXT_PUBLIC_API_URL`**, Mapbox tokens, Stripe publishable keys as documented ([[../setup/ENVIRONMENT_VARIABLES|Environment Variables]]).
- Checklist cues: [[../testing/MANUAL_QA_GUIDE|Manual QA Guide]], [[../operations/VALIDATION_CHECKLIST|Validation Checklist]].

## Stop Conditions

Multiple apps impacted, **`libs/ui`** domain leakage, or GraphQL/schema drift without codegen → [[../agents/STOP_CONDITIONS|Stop Conditions]].
