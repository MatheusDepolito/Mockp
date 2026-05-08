# Notifications Guide

> Status: Not implemented

Backend or domain notification delivery is not a confirmed project standard (toasts are separate; see below).

This guide separates existing UI feedback/toasts from domain notifications. Do not implement backend/domain notifications without an architectural decision.

Read with:

- [[../frontend/WEB_APPS_GUIDE|Web Apps Guide]]
- [[../security/ROLE_PERSONA_MATRIX|Role Persona Matrix]]
- [[../agents/STOP_CONDITIONS|Stop Conditions]]

## Current UI Feedback

> Status: Current project state

The project has UI toast feedback through `react-toastify`.

Verified files:

- `libs/ui/src/components/molecules/Toast.tsx`
- `apps/web/src/app/layout.tsx`
- `apps/web-admin/src/app/layout.tsx`
- `apps/web-manager/src/app/layout.tsx`
- `apps/web-valet/src/app/layout.tsx`

Verified package:

- `react-toastify` in `libs/ui/package.json`

Examples of UI feedback usage exist in shared UI components such as booking, garage, valet, and slot flows.

## Domain Notifications

> Status: Not implemented

No backend/domain notification standard was verified for:

- Email.
- SMS.
- Push notifications.
- In-app notification center.
- Notification database tables.
- Notification delivery jobs.
- Queues/workers.
- Provider integrations for notifications.
- Retry/failure handling.

UI toasts are not domain notifications. A toast only gives immediate interface feedback to the current browser session.

## What Not To Implement Ad Hoc

Do not add ad-hoc:

- Email sending.
- SMS sending.
- Push notification providers.
- Notification tables.
- Background workers.
- Notification event buses.
- Cross-app notification assumptions.

Do not treat `toast()` as a business notification system.

## Stop Condition

If a feature requires domain notifications, stop and ask for an architectural decision before implementation.

Examples:

- Notify a customer when booking status changes.
- Notify a manager when a valet is assigned.
- Notify a valet about a new trip.
- Send payment or booking emails.

## Future Recommendation

> Status: Future recommendation

If notifications become required, decide:

- Notification channels.
- Triggering domain events.
- Delivery provider.
- Persistence model.
- Retry strategy.
- User preferences.
- Security/permission rules for reading notifications.
- Test strategy.

Document the chosen standard before implementing more than one notification use case.

## Needs Verification

> Needs verification

- Whether existing product requirements expect email/SMS/push.
- Whether Stripe or external providers already send any user-facing messages outside the app.
- Whether UI toast usage should be standardized by severity/type later.
