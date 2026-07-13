# Environment Matrix

> Status: Current project state

This matrix summarizes known local environment information and marks production/staging information that is not confirmed from repository files.

Read with:

- [[../setup/ENVIRONMENT_VARIABLES|Environment Variables]]
- [[SECRETS_MANAGEMENT]]
- [[DEPLOYMENT_ARCHITECTURE]]
- [[DOCKER_AND_DATABASE]]

## App and Package Matrix

| App/package | Local port | Env file/source | Main env vars | Backend/API dependency | Database dependency | Status | Notes |
| --- | --- | --- | --- | --- | --- | --- | --- |
| `apps/api` / `@mockp/api` | `3000` | `apps/api/.env.example` | `PORT`, `DATABASE_URL`, `JWT_SECRET`, `STRIPE_SECRET_KEY`, `STRIPE_SUCCESS_URL`, `STRIPE_CANCEL_URL`, `BOOKINGS_REDIRECT_URL` | Provides GraphQL `/graphql`, REST, Swagger `/` | Uses PostgreSQL through Prisma `DATABASE_URL` | Status: Current project state | Local API listens on `PORT` or `3000`. |
| `apps/web` / `@mockp/web` | `3001` | `apps/web/.env.example` | `NEXTAUTH_URL`, `NEXTAUTH_SECRET`, `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`, `NEXT_PUBLIC_API_URL`, Mapbox, Stripe publishable key, Cloudinary vars | Uses `NEXT_PUBLIC_API_URL` for GraphQL and Stripe REST flow | No direct DB dependency | Status: Current project state | Main customer/general web app evidence from routes. |
| `apps/web-manager` / `@mockp/web-manager` | `3002` | `apps/web-manager/.env.example` | Same frontend env vars as `apps/web`, with app-specific `NEXTAUTH_URL` | Uses `NEXT_PUBLIC_API_URL` | No direct DB dependency | Status: Current project state | Manager app evidence from `/new-garage`, `/agents`, `/bookings`. |
| `apps/web-agent` / `@mockp/web-agent` | `3003` | `apps/web-agent/.env.example` | Same frontend env vars as `apps/web`, with app-specific `NEXTAUTH_URL` | Uses `NEXT_PUBLIC_API_URL` | No direct DB dependency | Status: Current project state | Valet app evidence from `/my-trips`. |
| `apps/web-admin` / `@mockp/web-admin` | `3004` | `apps/web-admin/.env.example` | Same frontend env vars as `apps/web`, with app-specific `NEXTAUTH_URL` | Uses `NEXT_PUBLIC_API_URL` | No direct DB dependency | Status: Current project state | Admin app evidence from `/manageAdmins`. |
| `libs/network` / `@mockp/network` | N/A | Consumes app env at runtime | `NEXT_PUBLIC_API_URL`, NextAuth/Google vars through `authOptions` | Provides Apollo, `fetchGraphQL`, codegen, NextAuth config | No direct DB dependency | Status: Current project state | Shared frontend network layer. |
| `libs/ui` / `@mockp/ui` | N/A | Consumes app env at runtime | `NEXT_PUBLIC_MAPBOX_TOKEN`, `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`, Cloudinary vars, `NEXT_PUBLIC_API_URL` in Stripe UI flow | Uses GraphQL docs/types and Stripe REST flow | No direct DB dependency | Status: Current project state | Shared UI and product templates. |
| `libs/forms` / `@mockp/forms` | N/A | None verified directly | N/A | Uses generated GraphQL types in some schemas/adapters | No direct DB dependency | Status: Current project state | Shared form schemas/providers/adapters. |
| `libs/util` / `@mockp/util` | N/A | Consumes app env in some hooks | Mapbox/Cloudinary public vars in hooks | No direct API dependency except external provider calls | No direct DB dependency | Status: Current project state | Shared utilities/hooks/types. |

## Known Local Database

Local database comes from `apps/api/docker-compose.yml`:

- Image: `postgres:18`
- Container: `mockp_db`
- Host port: `2000`
- Container port: `5432`
- Database: `mockp_db`
- User: `mockp`
- Password: `mockp`
- Volume: `db_data_mockp`

Local API database URL:

```env
DATABASE_URL="postgresql://mockp:mockp@localhost:2000/mockp_db?schema=public"
```

## Known Local URLs

- API/Swagger: `http://localhost:3000/`
- GraphQL: `http://localhost:3000/graphql`
- `apps/web`: `http://localhost:3001`
- `apps/web-manager`: `http://localhost:3002`
- `apps/web-agent`: `http://localhost:3003`
- `apps/web-admin`: `http://localhost:3004`

## Production and Staging

> Needs verification

No production or staging values were confirmed for:

- App URLs.
- API URL.
- Database URL.
- OAuth redirect URLs.
- Stripe redirect URLs.
- Cloudinary configuration.
- Mapbox token source.
- Secrets provider.
- Deployment platform.

Agents must not infer production/staging values from local examples.
