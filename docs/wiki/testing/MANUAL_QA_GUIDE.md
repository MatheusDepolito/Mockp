# Manual QA Guide

> Status: Current project state

Use this guide when automated tests are missing, sparse, or insufficient for the risk of a change.

Read with:

- [[TEST_STRATEGY]]
- [[../frontend/WEB_APPS_GUIDE|Web Apps Guide]]
- [[../security/ROLE_PERSONA_MATRIX|Role Persona Matrix]]
- [[../operations/VALIDATION_CHECKLIST|Validation Checklist]]
- [[../agents/STOP_CONDITIONS|Stop Conditions]]

## Choose the Correct App and Persona

Before manual QA:

- Identify the affected app.
- Identify the likely persona.
- Confirm the route and port.
- Confirm required env vars.
- Confirm backend and database are running when needed.

Use [[../frontend/WEB_APPS_GUIDE|Web Apps Guide]].

## Core Manual QA Checklist

For each affected flow:

- Verify happy path.
- Verify error path.
- Verify loading state.
- Verify empty state.
- Verify form validation.
- Verify permissions and visibility.
- Verify GraphQL/network calls in the browser/dev server logs when relevant.
- Verify REST flow if touched.
- Verify database effects if mutations or migrations were touched.
- Verify no unrelated app changed unless shared code changed.

## Auth and Session

When auth/session is involved:

- Verify login.
- Verify session user data is available where needed.
- Verify protected UI is hidden or blocked as expected.
- Verify backend authorization still enforces access.
- Verify logout/session expiration behavior when relevant.

Use [[../security/AUTH_SESSION_GUIDE|Auth Session Guide]] and [[../security/AUTHORIZATION_GUIDE|Authorization Guide]].

## Forms

When forms are involved:

- Submit valid data.
- Submit invalid data.
- Check required fields.
- Check min/max validation where present.
- Check loading state during submit.
- Check success feedback.
- Check error feedback.
- Confirm payload shape matches GraphQL/REST contract.

Use [[../frontend/FORMS_GUIDE|Forms Guide]].

## GraphQL and Network

When GraphQL is involved:

- Confirm the operation is present in `libs/network/src/gql/queries.graphql`.
- Confirm generated types are updated if needed.
- Confirm the UI uses generated documents/types.
- Confirm authenticated operations send a Bearer token.
- Confirm errors are surfaced or handled.

Use [[../frontend/NETWORK_USAGE_GUIDE|Network Usage Guide]] and [[../graphql/CONTRACT_CHANGE_GUIDE|GraphQL Contract Change Guide]].

## REST

When REST is involved:

- Confirm the endpoint matches existing REST patterns.
- Confirm `NEXT_PUBLIC_API_URL` is correct.
- Confirm auth/permissions if the endpoint is protected.
- Confirm redirect/provider behavior if the flow uses redirects.

Use [[../rest/REAL_REST_PATTERNS|Real REST Patterns]].

## Database Changes

When database changes are involved:

- Confirm local Postgres is running.
- Confirm migrations apply locally.
- Confirm Prisma client is regenerated.
- Confirm seed still works when relevant.
- Confirm changed data is visible through backend/GraphQL/frontend paths.

Use [[../database/PRISMA_MIGRATION_SAFETY|Prisma Migration Safety]].

## App-Specific QA Placeholders

### `apps/web`

Routes verified from repo include `/`, `/login`, `/register`, `/search`, `/inquiries`, and `/booking-failed`.

QA placeholders:

- Login/register.
- Search properties.
- Inquiry list.
- Booking failure/Stripe failure path.

> Needs verification
>
> Exact customer-facing acceptance criteria and payment success flow.

### `apps/web-admin`

Routes verified from repo include `/`, `/login`, `/register`, and `/manageAdmins`.

QA placeholders:

- Admin login/register.
- Admin home.
- Manage admins.

> Needs verification
>
> Exact admin permission boundaries and verification workflows.

### `apps/web-manager`

Routes verified from repo include `/`, `/login`, `/register`, `/new-property`, `/agents`, and `/inquiries`.

QA placeholders:

- Manager login/register.
- Create property.
- Manage agents.
- View inquiries.

> Needs verification
>
> Exact manager/brokerage ownership rules and property visibility behavior.

### `apps/web-agent`

Routes verified from repo include `/`, `/login`, `/register`, `/my-properties`, `/new-property`, `/my-trips`, `/inquiries`, and `/properties/[id]/edit`.

QA placeholders:

- Agent login/register.
- Agent home.
- My properties and property edit.
- New property.
- Inquiries.
- My trips.

> Needs verification
>
> Exact agent assignment and trip state transitions.

## Multi-App QA

Validate multiple apps only when:

- Shared UI changed.
- `libs/forms` changed.
- `libs/network` changed.
- Auth/session behavior changed.
- A feature intentionally spans personas.

Stop if the affected persona/app is unclear.
