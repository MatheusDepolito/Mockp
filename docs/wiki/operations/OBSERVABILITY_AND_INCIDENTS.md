# Observability and Incidents

> Status: Needs verification

No project-wide observability or incident readiness standard was confirmed from repository files.

This document records what observability tooling and processes were **not** found in-repo and lists related risks.

Read with:

- [[DEPLOYMENT_ARCHITECTURE]]
- [[RELEASE_READINESS]]
- [[ROLLBACK_STRATEGY]]
- [[../agents/STOP_CONDITIONS|Stop Conditions]]

## Verification Summary

Repository verification found no confirmed setup for:

- Sentry.
- Datadog.
- OpenTelemetry.
- Winston.
- Pino.
- Monitoring dashboards.
- Error tracking config.
- Health check endpoints.
- Incident runbooks.
- Frontend error boundary standard.

Some local `console.log` / `console.error` usage exists in seed scripts, auth guard error handling, and a few UI flows.

This is not a project-wide observability strategy.

## What Exists

> Status: Current project state

Verified examples:

- `apps/api/src/common/auth/auth.guard.ts` logs token validation errors with `console.error`.
- `apps/api/prisma/seed.ts` logs seed failures with `console.error`.
- `apps/api/prisma/seeds/users.ts` logs seeded admin credentials for local development.
- Some frontend/shared UI code logs client-side errors with `console.error`.
- Swagger exists at API root, but this is documentation, not observability.

## What Is Unknown

> Needs verification

- Production log destination.
- Error tracking provider.
- Metrics provider.
- Uptime monitoring.
- Alerting rules.
- Incident owner.
- On-call process.
- Runbooks for common failures.
- Health checks.
- Frontend error reporting.
- Privacy/security requirements for logs.

## What Agents Must Not Assume

- Do not assume logs are centralized.
- Do not assume `console.error` is monitored.
- Do not add Sentry/Datadog/OpenTelemetry without explicit request.
- Do not log secrets, tokens, passwords, or full provider payloads.
- Do not create incident process docs that imply operational ownership without confirmation.
- Do not treat Swagger or local terminal logs as production observability.

## Incident Readiness Stop Conditions

Stop before release when:

- A high-risk change has no monitoring or manual verification plan.
- Payment/auth/database behavior changed and no incident/rollback path is known.
- A change would require alerting, but no alerting system is confirmed.
- Debug logs would expose secrets or sensitive user data.

Use [[ROLLBACK_STRATEGY]] and [[RELEASE_READINESS]].

## Future Recommendation

> Status: Future recommendation

Once production deployment is defined, document:

- Structured logging approach.
- Error tracking provider.
- Metrics and dashboard strategy.
- Health check endpoints.
- Alerting rules.
- Incident severity levels.
- Incident response owner.
- Runbooks for auth, database, payment, and frontend outages.
- PII/secrets redaction rules.

Do not implement observability tooling in this phase.
