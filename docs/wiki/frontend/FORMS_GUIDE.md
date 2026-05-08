# Forms Guide

> Status: Current project state

Use this guide before creating or changing frontend forms.

Read with:

- [[COMPONENT_GUIDE]]
- [[SHARED_UI_GUIDE]]
- [[NETWORK_USAGE_GUIDE]]
- [[../graphql/CONTRACT_CHANGE_GUIDE|GraphQL Contract Change Guide]]
- [[../agents/STOP_CONDITIONS|Stop Conditions]]

## Verified Form Stack

`libs/forms` is the current shared forms package.

Verified dependencies:

- `react-hook-form`
- `zod`
- `@hookform/resolvers`

Verified patterns:

- Zod schemas.
- `z.infer` form types.
- `useForm*` hooks.
- `zodResolver`.
- `FormProvider` wrappers for multi-component forms.
- Adapters that convert form state to GraphQL variables.

## Verified Form Files

Examples:

- `libs/forms/src/schemas.ts`: shared login/register schemas.
- `libs/forms/src/login.tsx`: `useFormLogin`.
- `libs/forms/src/register.tsx`: `useFormRegister`.
- `libs/forms/src/createGarage.tsx`: create garage schema, hook, provider.
- `libs/forms/src/searchGarages.tsx`: search garage schema, defaults, provider.
- `libs/forms/src/adapters/searchFormAdapter.ts`: converts search form state to GraphQL variables.
- `libs/forms/src/bookSlot.tsx`, `createCompany.tsx`, `createSlots.ts`, `createUid.ts`, `createValet.ts`.

## Form Shape Pattern

Current pattern:

```ts
export const formSchemaSomething = z.object({
  // fields
});

export type FormTypeSomething = z.infer<typeof formSchemaSomething>;

export const useFormSomething = () =>
  useForm<FormTypeSomething>({
    resolver: zodResolver(formSchemaSomething),
  });
```

Provider pattern:

```tsx
export const FormProviderSomething = ({ children }) => {
  const methods = useFormSomething();
  return <FormProvider {...methods}>{children}</FormProvider>;
};
```

## Where Forms Are Wired

Apps may wrap shared templates with form providers.

Verified example:

- `apps/web/src/app/search/page.tsx` wraps `SearchPage` with `FormProviderSearchGarage`.

Shared UI components consume form state with:

- `useFormContext`
- `useWatch`
- `Controller`
- `useFieldArray`

## Submit, Loading, and Error Handling

Current UI patterns use Apollo mutation hooks in `libs/ui` templates/organisms:

- `useMutation(...)`
- mutation `loading`, `data`, `error`
- UI toast feedback through `libs/ui/src/components/molecules/Toast.tsx`

When adding a form:

- Keep schema and form type in `libs/forms` if reused or shared.
- Keep submit behavior close to the template/organism that owns the workflow.
- Use generated GraphQL input/types from `libs/network` when building mutation variables.
- Show loading state when mutation/query is in flight.
- Use existing toast/error patterns instead of inventing a notification system.

## Avoid Duplicating Validation

Before adding schema logic:

- Search `libs/forms/src`.
- Check existing generated GraphQL input shape.
- Check whether a schema already validates the same form.
- Reuse shared helpers only when the validation meaning is identical.

Do not duplicate validation in both UI component and form schema unless one is purely presentational.

## When a Helper Belongs in `libs/forms`

Use `libs/forms` for:

- Shared form schemas.
- Shared form types.
- Form providers.
- Form adapters that map form state to GraphQL variables.
- Form-specific validation helpers.

Do not put in `libs/forms`:

- UI components.
- Domain services.
- Network clients.
- Toast/notification behavior.
- App route logic.

## Needs Verification

> Needs verification

- Whether every form should be moved to `libs/forms` or only reused forms.
- Whether all app-specific forms should have providers.
- Whether submit/error UX should be standardized beyond current toast usage.
- Whether generated GraphQL input types should be used more directly in form types.

## Stop Conditions

Stop before:

- Changing a shared schema used by multiple apps/routes.
- Making a field required without checking backend/GraphQL inputs.
- Changing form payload shape without checking mutation consumers.
- Adding a new validation library.
- Moving UI into `libs/forms`.
- Implementing domain notifications for form outcomes.
