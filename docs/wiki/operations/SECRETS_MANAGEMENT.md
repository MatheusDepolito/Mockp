# Secrets Management

> Status: Needs verification

Formal production secrets management was not confirmed from repository files.

This document records local conventions and verification gaps around secrets handling.

Read with:

- [[ENVIRONMENT_MATRIX]]
- [[../setup/ENVIRONMENT_VARIABLES|Environment Variables]]
- [[DEPLOYMENT_ARCHITECTURE]]
- [[../security/AUTH_SESSION_GUIDE|Auth Session Guide]]
- [[../agents/STOP_CONDITIONS|Stop Conditions]]

## Current Local Pattern

The repo uses `.env.example` files to document required local variables.

Verified examples:

- `apps/api/.env.example`
- `apps/web/.env.example`
- `apps/web-admin/.env.example`
- `apps/web-manager/.env.example`
- `apps/web-agent/.env.example`

Local `.env` files are intentionally ignored and must not be committed.

## Secret Categories

Server-side secrets:

- `DATABASE_URL`
- `JWT_SECRET`
- `STRIPE_SECRET_KEY`
- `NEXTAUTH_SECRET`
- `GOOGLE_CLIENT_SECRET`

Provider/client identifiers:

- `GOOGLE_CLIENT_ID`

Public frontend variables:

- `NEXT_PUBLIC_API_URL`
- `NEXT_PUBLIC_MAPBOX_TOKEN`
- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
- `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME`
- `NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET`

Important: `NEXT_PUBLIC_*` variables are exposed to browser bundles. Never move server-only secrets into `NEXT_PUBLIC_*`.

## What Must Never Be Committed

- Real `.env` files.
- Real database URLs.
- Real JWT/NextAuth secrets.
- Real Stripe secret keys.
- Real Google client secrets.
- Private keys, tokens, certificates, or provider credentials.
- Production/staging secret values in docs.

## When Env Vars Change

Update:

- `.env.example` for the affected app.
- [[../setup/ENVIRONMENT_VARIABLES|Environment Variables]].
- [[ENVIRONMENT_MATRIX]].
- Any setup/run docs affected by the variable.

If the variable affects deployment, also update [[RELEASE_READINESS]] and [[DEPLOYMENT_ARCHITECTURE]] once the deployment platform is known.

## Stop Conditions

Stop before:

- Adding a new secret.
- Changing `DATABASE_URL` semantics.
- Changing `JWT_SECRET` or `NEXTAUTH_SECRET` behavior.
- Changing Stripe, Google, Cloudinary, or Mapbox secrets.
- Exposing a server-only secret as `NEXT_PUBLIC_*`.
- Changing `.env.example` without updating docs.
- Assuming production secret storage.

Use [[../agents/STOP_CONDITIONS|Stop Conditions]].

## Needs Verification

> Needs verification

- Production secrets provider.
- Whether `JWT_SECRET` and `NEXTAUTH_SECRET` are intentionally shared or separate per environment.
- Secret rotation process.
- Who can access secrets.
- Whether local examples match future staging/production requirements.

## Future Recommendation

> Status: Future recommendation

Once deployment is decided, document:

- Secrets provider.
- Environment separation.
- Rotation policy.
- Emergency revocation process.
- Required secrets per app.
- Public vs server-only variable review checklist.
