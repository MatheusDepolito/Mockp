# Shared UI Guide

> Status: Current project state

Use this guide before adding or changing anything in `libs/ui`.

Read with:

- [[COMPONENT_GUIDE]]
- [[WEB_APPS_GUIDE]]
- [[FORMS_GUIDE]]
- [[NETWORK_USAGE_GUIDE]]
- [[../security/ROLE_PERSONA_MATRIX|Role Persona Matrix]]
- [[../agents/STOP_CONDITIONS|Stop Conditions]]

Repository example: [[../examples/SHARED_UI_DECISION_EXAMPLE|Shared UI Decision Example]].

## Verified Shared Libraries

Current frontend shared libraries:

- `libs/ui`: UI components, templates, styling, maps, toasts, product UI.
- `libs/forms`: form schemas, hooks, providers, adapters.
- `libs/util`: shared types, hooks, constants, date/location utilities.
- `libs/network`: Apollo provider, GraphQL generated documents/types, `fetchGraphQL`, NextAuth config.

Apps currently import shared code through deep package paths such as:

```ts
import { Header } from '@mockp/ui/src/components/organisms/Header';
import { FormProviderSearchGarage } from '@mockp/forms/src/searchGarages';
import { ApolloProvider } from '@mockp/network/src/config/apollo';
import { MenuItem } from '@mockp/util/types';
```

## Barrel Exports

> Needs verification

No broad `libs/ui/src/index.ts` barrel export was verified.

Verified index files:

- `libs/forms/src/util/index.ts`
- `libs/network/src/fetch/index.ts`
- `libs/util/index.ts`

Do not invent a new barrel export strategy during feature work.

## What Belongs in `libs/ui`

Good candidates:

- Reusable presentational components.
- Layout primitives.
- Shared app shells or headers when intentionally common.
- Generic atoms/molecules such as buttons, containers, labels, badges, dialogs, loaders.
- Product templates reused by more than one app.
- Product UI that is explicitly shared and named by domain.

Current `libs/ui` also contains domain-aware organisms/templates. Keep that explicit when working with existing code.

## What Must Not Go Into `libs/ui`

Avoid adding:

- App-specific route logic.
- One-off page-only components.
- New domain services.
- Backend contract definitions.
- New GraphQL operations.
- New form schema ownership that belongs in `libs/forms`.
- New auth/session behavior that belongs in `libs/network` or security docs.
- Components that only make sense for one role/persona unless the current pattern clearly shares them.

## Identify Domain-Specific UI

A component is domain-specific when it:

- Mentions booking, garage, valet, admin, manager, customer, slot, company, verification, or Stripe behavior.
- Imports GraphQL generated types/documents.
- Calls Apollo hooks.
- Reads or changes form context tied to a domain schema.
- Uses session/role/persona checks.
- Builds API variables or mutation payloads.

Domain-specific UI can exist in `libs/ui` today, especially under organisms/templates, but it must not be treated as generic design-system UI.

## Keep Components App-Local When

- Only one route uses it.
- Only one app/persona owns it.
- Requirements are uncertain.
- It depends on route-specific state.
- It would introduce a shared dependency on domain-specific GraphQL types.
- Moving it would force broad import churn.

## Create Shared Abstractions When

- At least two apps/routes need the same behavior.
- Duplication is stable and meaningful.
- Props can be made explicit and small.
- The abstraction does not hide permissions or business rules.
- Consumers can be validated.

Do not share just because code looks similar once.

## Updating Imports and Exports

Current pattern uses direct imports from source paths. When moving or exporting:

- Search all imports before changing a path.
- Avoid changing public import paths during unrelated work.
- Do not add a new barrel export pattern without a repo-wide decision.
- Validate every affected app when a shared import path changes.

## Risks of Shared UI Changes

Changing `libs/ui` can affect:

- `apps/web`
- `apps/web-admin`
- `apps/web-manager`
- `apps/web-valet`

It can also affect form behavior through `libs/forms`, network behavior through `libs/network`, and shared utilities through `libs/util`.

## Stop Conditions

Stop before:

- Moving a component into `libs/ui` when it contains business/domain logic.
- Sharing a component that depends on one role/persona.
- Sharing a component that depends directly on a specific GraphQL data shape.
- Changing shared UI used by multiple frontend apps without validating consumers.
- Changing visual behavior when expected UX is unclear.
- Introducing a new export/import convention.

Use [[../agents/STOP_CONDITIONS|Stop Conditions]].

## Future Recommendation

> Status: Future recommendation

If shared UI grows, consider:

- Explicit public exports.
- Separate generic design-system components from product templates.
- Documented component ownership.
- Storybook or visual examples.

Do not implement these recommendations in this phase.
