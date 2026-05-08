# Frontend Feature Flow

> Status: Current project state

Use this flow for frontend-only or frontend-heavy work.

Read first:

- [[WEB_APPS_GUIDE]]
- [[COMPONENT_GUIDE]]
- [[SHARED_UI_GUIDE]]
- [[FORMS_GUIDE]]
- [[NETWORK_USAGE_GUIDE]]
- [[../security/ROLE_PERSONA_MATRIX|Role Persona Matrix]]
- [[../security/AUTH_SESSION_GUIDE|Auth Session Guide]]
- [[../operations/VALIDATION_CHECKLIST|Validation Checklist]]

Examples: [[../examples/FRONTEND_FEATURE_EXAMPLE|Frontend Feature Example]], [[../examples/SHARED_UI_DECISION_EXAMPLE|Shared UI Decision Example]], [[../examples/VALIDATION_EXAMPLE|Validation Example]].

## 1. Identify the Correct App

Before editing, identify the affected app:

- `apps/web`
- `apps/web-admin`
- `apps/web-manager`
- `apps/web-valet`

Use [[WEB_APPS_GUIDE]] and [[../security/ROLE_PERSONA_MATRIX|Role Persona Matrix]].

Stop if the requested persona/app is unclear.

## 2. Map the Existing Route

Check:

- Existing route folders under `apps/<app>/src/app`.
- `layout.tsx` provider setup.
- Existing `page.tsx` composition.
- Shared templates imported from `libs/ui`.
- Whether the route already has form providers.
- Whether the route depends on auth/session or role gates.

Keep `page.tsx` focused on route composition.

## 3. Find Existing Component Patterns

Before creating a component:

- Search `libs/ui/src/components`.
- Check nearby atoms/molecules/organisms/templates.
- Check domain-specific components for similar behavior.
- Check if existing forms in `libs/forms` fit the new flow.
- Check if existing GraphQL operations in `libs/network/src/gql/queries.graphql` already provide the data.

Do not invent a new frontend architecture.

## 4. Decide Local Component vs Shared UI

Keep local when:

- One app/route owns the behavior.
- The component depends on one persona.
- Requirements are unclear.
- It mirrors a route-specific workflow.

Use shared UI when:

- It is already reused or clearly reusable.
- It has a stable props boundary.
- It does not hide business rules.
- Consumers can be validated.

Use [[SHARED_UI_GUIDE]] before adding to `libs/ui`.

## 5. Add Forms Safely

Use [[FORMS_GUIDE]].

Steps:

1. Search for an existing form schema/hook/provider.
2. Add or update a Zod schema in `libs/forms` only when shared or consistent with current patterns.
3. Export `FormType*` with `z.infer`.
4. Use `useForm*` with `zodResolver`.
5. Use `FormProvider` when multiple child components need form context.
6. Convert form data to generated GraphQL variables through a clear adapter when needed.

Do not duplicate validation logic across components.

## 6. Consume Network Safely

Use [[NETWORK_USAGE_GUIDE]].

Rules:

- Use generated GraphQL documents/types.
- Add operations to `libs/network/src/gql/queries.graphql` when new data is needed.
- Run codegen after GraphQL operation/schema changes.
- Use Apollo hooks inside client components/templates when matching current patterns.
- Use REST only for current REST patterns such as Stripe-like HTTP-specific flows.

Do not create manual duplicated GraphQL result types.

## 7. Check Permissions and Session

Use:

- [[../security/AUTH_SESSION_GUIDE|Auth Session Guide]]
- [[../security/AUTHORIZATION_GUIDE|Authorization Guide]]
- [[../security/ROLE_PERSONA_MATRIX|Role Persona Matrix]]

Check:

- Does the UI need login?
- Does the UI need an app/persona gate?
- Does the backend operation require a Bearer token?
- Does the mutation require role or row-level permission checks?
- Does hiding UI create a false sense of security?

Frontend checks do not replace backend authorization.

## 8. Validate

Use [[../operations/VALIDATION_CHECKLIST|Validation Checklist]].

Choose commands based on touched files:

- App route/layout changed: validate that app.
- `libs/ui` changed: validate affected apps.
- `libs/forms` changed: validate forms consumers.
- `libs/network` changed: run codegen if operations changed and validate consumers.
- Auth/session touched: validate login/session behavior manually.

## 9. Avoid Cross-App Changes Without Confirmation

Stop before:

- Touching multiple apps for one feature without confirming persona ownership.
- Moving app-specific UI into `libs/ui`.
- Changing shared UI used by multiple apps without validation.
- Changing session/network behavior for all apps.
- Introducing audit logging, domain notifications, or i18n.

Use [[../agents/STOP_CONDITIONS|Stop Conditions]].

## Final Handoff

Report:

- App/routes touched.
- Shared libs touched.
- GraphQL/REST operations touched.
- Forms/schemas touched.
- Validation run.
- Manual flows checked.
- Remaining `Needs verification` items.
