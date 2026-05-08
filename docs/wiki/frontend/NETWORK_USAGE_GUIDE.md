# Network Usage Guide

> Status: Current project state

Use this guide before changing frontend GraphQL, REST, Apollo, `fetchGraphQL`, or auth-related network behavior.

Read with:

- [[../graphql/CONTRACT_CHANGE_GUIDE|GraphQL Contract Change Guide]]
- [[../rest/REAL_REST_PATTERNS|Real REST Patterns]]
- [[../rest/FUTURE_TYPED_REST_OPENAPI|Future Typed REST OpenAPI]]
- [[../security/AUTH_SESSION_GUIDE|Auth Session Guide]]
- [[../setup/ENVIRONMENT_VARIABLES|Environment Variables]]
- [[../agents/STOP_CONDITIONS|Stop Conditions]]

## Verified Network Package

`libs/network` contains:

- `src/config/apollo.tsx`
- `src/config/authOptions.ts`
- `src/fetch/index.ts`
- `src/gql/queries.graphql`
- `src/gql/generated.tsx`
- `codegen.ts`
- `next-auth.d.ts`

## GraphQL-First Usage

GraphQL is the primary frontend/backend contract for app-screen data.

Current flow:

```text
apps/api/src/schema.gql
  -> libs/network/src/gql/queries.graphql
  -> libs/network/src/gql/generated.tsx
  -> Apollo hooks or fetchGraphQL consumers
```

Do not manually duplicate backend types in frontend code when generated GraphQL types already exist.

## Generated GraphQL Documents and Types

Source operations:

```text
libs/network/src/gql/queries.graphql
```

Generated output:

```text
libs/network/src/gql/generated.tsx
```

Codegen command:

```powershell
yarn workspace @mockp/network codegen
```

> Needs verification
>
> `libs/network/codegen.ts` has `watch: true`, so confirm whether the command exits before using it as one-shot validation.

## Apollo Usage

`ApolloProvider` lives in:

```text
libs/network/src/config/apollo.tsx
```

It uses:

- `NEXT_PUBLIC_API_URL + '/graphql'`
- `HttpLink`
- `InMemoryCache`
- an auth link that fetches `/api/auth/token`
- `Authorization: Bearer <token>` when a token exists

Frontend app layouts wrap app content with `ApolloProvider`.

Components in `libs/ui` commonly use:

- `useQuery`
- `useLazyQuery`
- `useMutation`
- generated `*Document` values from `@mockp/network/src/gql/generated`

## `fetchGraphQL`

`fetchGraphQL` lives in:

```text
libs/network/src/fetch/index.ts
```

It:

- Accepts a `TypedDocumentNode`.
- Prints the GraphQL document.
- Posts to `NEXT_PUBLIC_API_URL + '/graphql'`.
- Sends an optional Bearer token.
- Returns `{ data }` or `{ error }`.

Current use includes auth-related flows in `authOptions`.

## Auth and Session

NextAuth config lives in:

```text
libs/network/src/config/authOptions.ts
```

Session typing lives in:

```text
libs/network/next-auth.d.ts
```

Read [[../security/AUTH_SESSION_GUIDE|Auth Session Guide]] before changing:

- token behavior
- `Session.user.uid`
- auth provider logic
- `/api/auth/token`
- GraphQL auth headers

## REST Usage

Current verified frontend REST usage:

- Stripe checkout flow calls `NEXT_PUBLIC_API_URL + '/stripe'` from shared UI.

Use REST only when it matches current patterns documented in [[../rest/REAL_REST_PATTERNS|Real REST Patterns]].

> Status: Future recommendation
>
> Typed REST/OpenAPI is documented in [[../rest/FUTURE_TYPED_REST_OPENAPI|Future Typed REST OpenAPI]], but it is not implemented.

## Environment Variables

Primary frontend API URL:

```env
NEXT_PUBLIC_API_URL="http://localhost:3000"
```

Used for:

- GraphQL endpoint: `/graphql`
- current Stripe REST endpoint: `/stripe`

See [[../setup/ENVIRONMENT_VARIABLES|Environment Variables]].

## What Agents Must Not Do

- Do not create manual duplicate TypeScript types for GraphQL results.
- Do not edit `generated.tsx` manually.
- Do not add REST for app-screen data when GraphQL fits.
- Do not bypass `ApolloProvider` with unrelated clients.
- Do not change auth token propagation without checking session/auth guides.
- Do not introduce a new network library without architectural review.
- Do not implement OpenAPI typed REST in this phase.

## Stop Conditions

Stop before:

- Changing generated GraphQL output paths.
- Changing Apollo auth header behavior.
- Changing `NEXT_PUBLIC_API_URL` semantics.
- Adding a new REST client pattern.
- Replacing GraphQL with REST for a screen.
- Touching NextAuth token/session behavior.

Use [[../agents/STOP_CONDITIONS|Stop Conditions]].
