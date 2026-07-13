# Environment Variables

> Status: Current project state

This document lists environment variables found in real `.env.example` files and real code usage.

Read with:

- [[LOCAL_DEVELOPMENT]]
- [[../operations/DOCKER_AND_DATABASE|Docker and Database]]
- [[../operations/ENVIRONMENT_MATRIX|Environment Matrix]]
- [[../operations/SECRETS_MANAGEMENT|Secrets Management]]

Do not commit real `.env` files or real secrets.

For environment/app mapping, see [[../operations/ENVIRONMENT_MATRIX|Environment Matrix]].
For secret handling and stop conditions, see [[../operations/SECRETS_MANAGEMENT|Secrets Management]].

## API: `apps/api`

Source files:

- `apps/api/.env.example`
- `apps/api/src/main.ts`
- `apps/api/src/app.module.ts`
- `apps/api/prisma.config.ts`
- `apps/api/src/common/prisma/prisma.service.ts`
- `apps/api/src/models/stripe/stripe.service.ts`
- `apps/api/src/models/stripe/stripe.controller.ts`

Variables:

```env
PORT=3000
DATABASE_URL="postgresql://mockp:mockp@localhost:2000/mockp_db?schema=public"
JWT_SECRET="change-me"
STRIPE_SECRET_KEY="sk_test_change_me"
STRIPE_SUCCESS_URL="http://localhost:3000/booking-success"
STRIPE_CANCEL_URL="http://localhost:3000/booking-failed"
BOOKINGS_REDIRECT_URL="http://localhost:3000/bookings"
```

Notes:

- `PORT` controls the NestJS HTTP server port.
- `DATABASE_URL` is used by Prisma 7 through `apps/api/prisma.config.ts` and by `PrismaService`.
- `JWT_SECRET` is used by `JwtModule`.
- Stripe variables are server-side and must not be exposed with `NEXT_PUBLIC_`.

## Main Web App: `apps/web`

Source files:

- `apps/web/.env.example`
- `libs/network/src/config/authOptions.ts`
- `libs/network/src/fetch/index.ts`
- `libs/network/src/config/apollo.tsx`
- `libs/ui/src/components/organisms/BookSlotPopup.tsx`
- `libs/ui` and `libs/util` Mapbox/Cloudinary hooks

Variables:

```env
NEXTAUTH_URL="http://localhost:3001"
NEXTAUTH_SECRET="change-me"
GOOGLE_CLIENT_ID="change-me"
GOOGLE_CLIENT_SECRET="change-me"
NEXT_PUBLIC_API_URL="http://localhost:3000"
NEXT_PUBLIC_MAPBOX_TOKEN="change-me"
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_test_change_me"
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME="change-me"
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET="change-me"
```

## Admin Web App: `apps/web-admin`

Source file:

- `apps/web-admin/.env.example`

Variables:

```env
NEXTAUTH_URL="http://localhost:3004"
NEXTAUTH_SECRET="change-me"
GOOGLE_CLIENT_ID="change-me"
GOOGLE_CLIENT_SECRET="change-me"
NEXT_PUBLIC_API_URL="http://localhost:3000"
NEXT_PUBLIC_MAPBOX_TOKEN="change-me"
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_test_change_me"
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME="change-me"
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET="change-me"
```

## Manager Web App: `apps/web-manager`

Source file:

- `apps/web-manager/.env.example`

Variables:

```env
NEXTAUTH_URL="http://localhost:3002"
NEXTAUTH_SECRET="change-me"
GOOGLE_CLIENT_ID="change-me"
GOOGLE_CLIENT_SECRET="change-me"
NEXT_PUBLIC_API_URL="http://localhost:3000"
NEXT_PUBLIC_MAPBOX_TOKEN="change-me"
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_test_change_me"
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME="change-me"
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET="change-me"
```

## Agent Web App: `apps/web-agent`

Source file:

- `apps/web-agent/.env.example`

Variables:

```env
NEXTAUTH_URL="http://localhost:3003"
NEXTAUTH_SECRET="change-me"
GOOGLE_CLIENT_ID="change-me"
GOOGLE_CLIENT_SECRET="change-me"
NEXT_PUBLIC_API_URL="http://localhost:3000"
NEXT_PUBLIC_MAPBOX_TOKEN="change-me"
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_test_change_me"
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME="change-me"
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET="change-me"
```

## Database Variables

Used by:

- `apps/api/prisma.config.ts`
- `apps/api/src/common/prisma/prisma.service.ts`
- `apps/api/prisma/seed.ts`

```env
DATABASE_URL="postgresql://mockp:mockp@localhost:2000/mockp_db?schema=public"
```

The local Docker database uses:

- Database: `mockp_db`
- User: `mockp`
- Password: `mockp`
- Host port: `2000`
- Container port: `5432`

## Auth Variables

Backend:

```env
JWT_SECRET="change-me"
```

Frontend/NextAuth:

```env
NEXTAUTH_URL="http://localhost:<app-port>"
NEXTAUTH_SECRET="change-me"
GOOGLE_CLIENT_ID="change-me"
GOOGLE_CLIENT_SECRET="change-me"
```

Google OAuth redirect URIs must match each app:

```text
http://localhost:3001/api/auth/callback/google
http://localhost:3002/api/auth/callback/google
http://localhost:3003/api/auth/callback/google
http://localhost:3004/api/auth/callback/google
```

## GraphQL and Network Variables

Used by `libs/network`:

```env
NEXT_PUBLIC_API_URL="http://localhost:3000"
```

Runtime endpoints built from it:

- `http://localhost:3000/graphql`
- `http://localhost:3000/stripe` for the existing Stripe REST flow

## Third-Party Frontend Variables

Mapbox:

```env
NEXT_PUBLIC_MAPBOX_TOKEN="change-me"
```

Cloudinary:

```env
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME="change-me"
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET="change-me"
```

Stripe browser key:

```env
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_test_change_me"
```

## Needs Verification

> Status: Needs verification

- Which apps truly need every frontend env var should be verified per app route usage.
- Production URLs for Stripe redirects and `NEXTAUTH_URL` are not documented in this phase.
- Google OAuth client setup belongs to provider configuration outside the repo.
