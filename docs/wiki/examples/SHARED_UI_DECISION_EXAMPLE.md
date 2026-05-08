# Shared UI Decision Example

> Status: Current project state

Shows **four** outcomes using **real paths** (`apps/web/search`, **`libs/forms`**, **`libs/ui`**, Stripe booking popup).

Read [[../frontend/SHARED_UI_GUIDE|Shared UI Guide]], [[../frontend/COMPONENT_GUIDE|Component Guide]], [[../agents/STOP_CONDITIONS|Stop Conditions]].

## 1. Keep the Component Ultra-Local (`page.tsx`)

**Evidence:** `apps/web/src/app/search/page.tsx`

- Only imports providers/templates and renders JSX—no standalone component file needed when the composition is trivial.
- Keeps routing concerns inside the **`app`** tree.

✅ Stay local while the JSX is glue code only.

## 2. Extract to App-Local Components (hypothetical but pattern-aligned)

When a **`page.tsx` grows**, move sections into **`apps/web/src/app/search/_components`** (folder not shown in snapshot—follow existing app conventions).

✅ Prefer this when behavior is persona-specific **and not reused** elsewhere.

> **Needs verification:** whether this repo standardized on `_components` naming—inspect nearby routes before introducing new folders.

## 3. Move to **`libs/forms`**

**Evidence:** `FormProviderSearchGarage` wraps search page logic.

```1:10:apps/web/src/app/search/page.tsx
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

- Search schema + **`react-hook-form`** defaults live **`libs/forms/src/searchGarages`**.
- ✅ Promote repeatable **form state** + validation—not visual chrome—into **`libs/forms`**.

Similarly, booking slot schemas live under **`libs/forms/src/bookSlot`** feeding **`BookSlotPopup`**.

## 4. Keep / Place Visual UI in **`libs/ui`**

**Evidence:** Template **`SearchPage`** composes **`Map`**, **`ShowGarages`**, **`FilterSidebar`**, **`SearchPlaceBox`**.

Booking popup **`libs/ui/src/components/organisms/BookSlotPopup.tsx`**:

- Imports **`CreateBookingInput`**, **`SearchGaragesQuery`** types from codegen.
- Imports Stripe JS, **`toast`**, hooks for pricing—heavy **domain coupling**.

✅ **Accept** that **`libs/ui`** currently hosts **feature-level organisms/templates** referencing GraphQL types + payments. Treat edits as multi-app regressions risks.

❌ Still **avoid** falsely labeling these modules as purely “generic design system primitives.”

### When **not** to move into `libs/ui`

- Logic that should stay server-only or secrets-adjacent.
- Authorization decisions that belong solely in **`apps/api`**.
- Highly specialized admin-only dashboards unless another admin route already reuses the same JSX.

Escalations: [[../agents/STOP_CONDITIONS|Stop Conditions]] (shared UI leakage across personas).
