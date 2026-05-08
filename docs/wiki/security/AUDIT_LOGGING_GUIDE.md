# Audit Logging Guide

> Status: Not implemented

Audit logging is not currently established as a project-wide backend, database, or product standard in Mockp.

Read with:

- [[AUTHORIZATION_GUIDE]]
- [[ROLE_PERSONA_MATRIX]]
- [[../agents/STOP_CONDITIONS|Stop Conditions]]

## Current State

No project-wide audit logging pattern was verified for:

- Audit tables.
- Audit services.
- Audit decorators/interceptors.
- Event history for sensitive mutations.
- Actor/action/resource audit records.
- Retention or compliance policy.

Agents must not create ad-hoc audit tables, services, decorators, or log statements and call them a standard.

## When Audit Logging May Be Required

Audit logging may be required for features that change or expose sensitive behavior, such as:

- Admin permission changes.
- Role/persona changes.
- Booking lifecycle changes.
- Payment or Stripe-related actions.
- Manager/company/garage ownership changes.
- User account changes.
- Security-sensitive reads or writes.

This does not mean audit logging exists today.

## Stop Condition

If a feature requires audit logging, stop and ask for an architectural decision before implementation.

Do not implement audit logging as part of another feature unless explicitly requested.

## Questions Before Implementing Later

Before audit logging becomes a project standard, the team must decide:

- Which actions require audit records?
- Who is the actor?
- What is the resource identifier?
- What before/after data is stored?
- Are sensitive fields redacted?
- Is audit logging synchronous or asynchronous?
- Is it database-based, queue-based, or external?
- How long are audit records retained?
- Who can read audit records?
- How are audit logs validated in tests?

## Future Recommendation

> Status: Future recommendation

If implemented later, prefer a reviewed cross-cutting design:

- Central audit service.
- Consistent event shape.
- Explicit actor/resource/action fields.
- Redaction policy.
- Transaction-aware writes for critical mutations.
- Documentation before adoption.

Do not implement this future recommendation in the current phase.
