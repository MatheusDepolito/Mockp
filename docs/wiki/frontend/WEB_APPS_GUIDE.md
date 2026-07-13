# Web Apps Guide

> Status: Current project state

Mockp has multiple Next.js apps under `apps/*`. Use this guide before editing frontend code so changes land in the right app/persona.

Read with:

- [[../START_HERE|Start Here]]
- [[DEVELOPMENT_PLAYBOOK]]
- [[COMPONENT_GUIDE]]
- [[FRONTEND_FEATURE_FLOW]]
- [[SHARED_UI_GUIDE]]
- [[FORMS_GUIDE]]
- [[NETWORK_USAGE_GUIDE]]
- [[../setup/ENVIRONMENT_VARIABLES|Environment Variables]]
- [[../security/ROLE_PERSONA_MATRIX|Role Persona Matrix]]
- [[../security/AUTH_SESSION_GUIDE|Auth Session Guide]]
- [[../testing/MANUAL_QA_GUIDE|Manual QA Guide]]
- [[../testing/TEST_STRATEGY|Test Strategy]]
- [[../agents/STOP_CONDITIONS|Stop Conditions]]

## Shared Frontend Packages

Verified workspace packages:

- `libs/network`: GraphQL operations, generated GraphQL types, Apollo config, `fetchGraphQL`, NextAuth options.
- `libs/ui`: shared UI components/templates and product UI dependencies such as Mapbox, Stripe browser SDK, toast UI.
- `libs/forms`: shared form providers/schemas based on `react-hook-form` and `zod`.
- `libs/util`: shared utilities and hooks, including Mapbox/Cloudinary-related hooks.

Use shared packages only when the behavior is genuinely reusable. Do not move domain-specific UI into `libs/ui` just to avoid duplication.

## `apps/web`

> Status: Current project state

- Workspace: `@mockp/web`
- Path: `apps/web`
- Dev port: `3001`
- Dev command: `yarn nx run @mockp/web:dev`
- Env example: `apps/web/.env.example`
- Routes found:
  - `/`
  - `/login`
  - `/register`
  - `/search`
  - `/bookings`
  - `/booking-failed`
  - `/professional`
  - `/professional/solo-agent`
  - `/professional/brokerage-manager`
  - `/professional/linked-agent`
- Direct workspace dependencies include `@mockp/network`, `@mockp/ui`, and `@mockp/sample-lib`.

Likely purpose based on route evidence:

- Customer-facing or general user app for login/register, searching, bookings, and booking failure flow.

When to edit:

- Search and booking user flows.
- Main user login/register flows.
- Customer-facing pages.

Stop and confirm when:

- The requested change mentions admin, manager, or valet responsibilities.
- The same behavior may belong to another app.

## `apps/web-admin`

> Status: Current project state

- Workspace: `@mockp/web-admin`
- Path: `apps/web-admin`
- Dev port: `3004`
- Dev command: `yarn nx run @mockp/web-admin:dev`
- Env example: `apps/web-admin/.env.example`
- Routes found:
  - `/`
  - `/login`
  - `/register`
  - `/manageAdmins`
  - `/verifications`

Likely purpose based on route evidence:

- Admin-oriented app, including admin management.

When to edit:

- Admin login/register flow.
- Admin management screens.

Stop and confirm when:

- The change affects broader operations, permissions, roles, or non-admin apps.
- The business meaning of an admin action is unclear.

## `apps/web-manager`

> Status: Current project state

- Workspace: `@mockp/web-manager`
- Path: `apps/web-manager`
- Dev port: `3002`
- Dev command: `yarn nx run @mockp/web-manager:dev`
- Env example: `apps/web-manager/.env.example`
- Routes found:
  - `/`
  - `/login`
  - `/register`
  - `/new-garage`
  - `/agents`
  - `/bookings`

Likely purpose based on route evidence:

- Manager-oriented app for garage registration/management, agents, and bookings.

When to edit:

- Garage creation or management flows.
- Manager booking views.
- Valet management from the manager perspective.

Stop and confirm when:

- The requested flow could belong to admin, valet, or customer-facing app instead.
- The change affects garage visibility across apps.

## `apps/web-agent`

> Status: Current project state

- Workspace: `@mockp/web-agent`
- Path: `apps/web-agent`
- Dev port: `3003`
- Dev command: `yarn nx run @mockp/web-agent:dev`
- Env example: `apps/web-agent/.env.example`
- Routes found:
  - `/`
  - `/login`
  - `/register`
  - `/my-properties`
  - `/new-property`
  - `/my-trips`
  - `/inquiries`
  - `/properties/[id]/edit`

Likely purpose based on route evidence:

- Agent-oriented app for login/register, property management, inquiries, and trip-related work.

When to edit:

- Agent login/register flow.
- Agent property CRUD and listing flows.
- Agent inquiry and trip views.

Stop and confirm when:

- The requested behavior could affect manager-controlled assignments or customer bookings.
- The expected agent workflow is not clear from current routes.

## Cross-App Changes

Before touching more than one app:

- Confirm the same persona or flow really spans multiple apps.
- Check [[../security/ROLE_PERSONA_MATRIX|Role Persona Matrix]] for current role/app evidence.
- Check [[../security/AUTH_SESSION_GUIDE|Auth Session Guide]] before changing session behavior.
- Check [[FRONTEND_FEATURE_FLOW]] before implementing frontend-heavy behavior.
- Check [[SHARED_UI_GUIDE]] before moving anything into `libs/ui`.
- Check [[FORMS_GUIDE]] before adding form schemas/providers.
- Check [[NETWORK_USAGE_GUIDE]] before changing GraphQL, REST, Apollo, or token behavior.
- Check whether the change belongs in a shared package instead.
- Check whether moving code to shared UI would introduce domain-specific logic.
- Confirm env var differences across app ports.
- Validate each affected app.
- Use [[../testing/MANUAL_QA_GUIDE|Manual QA Guide]] for app/persona-specific manual checks.

## Cross-Cutting Areas

- Audit logging is not a frontend app standard; see [[../security/AUDIT_LOGGING_GUIDE|Audit Logging Guide]].
- Domain notifications are not implemented as a backend standard; see [[../notifications/NOTIFICATIONS_GUIDE|Notifications Guide]].
- i18n is not implemented as a confirmed project standard; see [[../i18n/I18N_GUIDE|i18n Guide]].

## Needs Verification

> Needs verification

- Exact product ownership and persona boundaries for each app should be confirmed with the product owner.
- Whether all frontend apps actively use the same auth/network/shared UI stack needs per-route verification.
- The admin/manager/valet business permissions must be verified in backend auth rules before changing protected flows.
