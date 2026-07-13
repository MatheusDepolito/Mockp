# Auth Session Guide

> Status: Current project state

This guide documents authentication and session behavior as proven by the repository.

Read with:

- [[AUTHORIZATION_GUIDE]]
- [[ROLE_PERSONA_MATRIX]]
- [[../setup/ENVIRONMENT_VARIABLES|Environment Variables]]
- [[../agents/STOP_CONDITIONS|Stop Conditions]]

## Verified Frontend Auth Stack

The frontend apps use NextAuth through shared config:

- Shared config: `libs/network/src/config/authOptions.ts`
- Type augmentation: `libs/network/next-auth.d.ts`
- App type imports:
  - `apps/web/types.d.ts`
  - `apps/web-admin/types.d.ts`
  - `apps/web-manager/types.d.ts`
  - `apps/web-agent/types.d.ts`
- App route handlers:
  - `apps/web/src/app/api/auth/[...nextauth]/route.ts`
  - `apps/web-admin/src/app/api/auth/[...nextauth]/route.ts`
  - `apps/web-manager/src/app/api/auth/[...nextauth]/route.ts`
  - `apps/web-agent/src/app/api/auth/[...nextauth]/route.ts`
- Session provider wrapper: `libs/ui/src/components/molecules/SessionProvider.tsx`

Each app route handler imports `authOptions` and passes it to `NextAuth`.

## Providers

`authOptions` configures:

- Google provider.
- Credentials provider.

Google provider uses:

```env
GOOGLE_CLIENT_ID
GOOGLE_CLIENT_SECRET
```

Credentials provider calls the backend GraphQL `Login` operation through `fetchGraphQL`.

## Session Strategy

Current session config:

- Strategy: `jwt`
- Max age: one day
- Custom JWT encode/decode using `jsonwebtoken`
- Algorithm: `HS256`

The custom JWT payload stores:

- `uid`
- standard token fields such as name/email/picture when present
- `exp`

## Session User Shape

`libs/network/next-auth.d.ts` augments `Session.user`:

```ts
user?: Omit<DefaultUser, 'id'> & { uid: string };
```

The session callback sets:

- `uid`
- `email`
- `name`
- `image`

Frontend components read `session.data?.user?.uid`, for example in shared UI header/user components.

## Backend Auth Expectations

The backend expects a Bearer token:

```text
Authorization: Bearer <token>
```

`AuthGuard` verifies the token and expects a decoded `uid`.

Frontend GraphQL fetch helper supports an optional token:

```ts
fetchGraphQL({ document, variables, token })
```

When provided, it sends:

```text
Authorization: Bearer <token>
```

## Token Access Routes

Each frontend app also has an app route that returns the `next-auth.session-token` cookie:

```text
src/app/api/auth/token/route.ts
```

> Needs verification
>
> The exact runtime call sites and security expectations for these token routes should be verified before changing them.

## API Login Flow

Credentials login flow:

1. Frontend credentials provider receives email/password.
2. It calls GraphQL `LoginDocument`.
3. Backend `UsersResolver.login` calls `UsersService.login`.
4. Backend validates credentials and signs a JWT containing `uid`.
5. NextAuth returns a session user with `uid`.

Google sign-in flow:

1. NextAuth receives Google account/user.
2. `signIn` callback checks `getAuthProvider`.
3. If the user does not exist, it calls `registerWithProvider`.
4. Session callback exposes `uid`.

## Monorepo Type Caveat

All frontend apps import:

```ts
import '@mockp/network/next-auth';
```

This keeps the shared `Session.user.uid` augmentation visible to the app TypeScript project.

Do not remove these imports casually.

## Validation After Auth Changes

Use:

- [[../operations/VALIDATION_CHECKLIST|Validation Checklist]]
- [[../operations/NX_COMMANDS|Nx Commands]]

Validate:

- API typecheck/build when backend auth changes.
- Affected frontend app typecheck/lint/build when NextAuth/session code changes.
- Manual credentials login.
- Manual Google login when provider behavior changes.
- A protected GraphQL request with Bearer token.
- A forbidden path for the wrong user/role when authorization changes.

## What Agents Must Not Change Casually

- JWT encode/decode behavior.
- `Session.user.uid` shape.
- NextAuth provider config.
- Token cookie route behavior.
- `fetchGraphQL` authorization header behavior.
- `JWT_SECRET`, `NEXTAUTH_SECRET`, or Google env semantics.
- Type augmentation imports in app `types.d.ts` files.

## Needs Verification

> Needs verification

- Whether every frontend request that needs backend authorization obtains and passes the token consistently.
- Whether `NEXTAUTH_SECRET` and backend `JWT_SECRET` are intentionally aligned or separate in each environment.
- Whether `pages.signIn: '/signIn'` matches current app routes, since apps visibly use `/login` routes.
