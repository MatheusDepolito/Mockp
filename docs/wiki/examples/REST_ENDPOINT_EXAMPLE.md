# REST Endpoint Example — Stripe + Users

> Status: Current project state

Mockp prefers **GraphQL for screens**. REST appears for **Stripe checkout**, legacy-style **CRUD controllers**, and integrations. Patterns **differ** across modules today—capture that explicitly.

Read [[../rest/REAL_REST_PATTERNS|Real REST Patterns]], [[../backend/DEVELOPMENT_PLAYBOOK|Backend Development Playbook]], [[../agents/STOP_CONDITIONS|Stop Conditions]].

## Where Controllers Live

- Typical domain REST: **`apps/api/src/models/<domain>/rest/<domain>.controller.ts`** (`users`, `bookings`, `garages`, …).
- Stripe is a **standalone module**: **`apps/api/src/models/stripe/stripe.controller.ts`** (mounted at **`@Controller('stripe')`**, not nested under `rest/`).

## Example A — Stripe (integration + Booking service reuse)

```15:49:apps/api/src/models/stripe/stripe.controller.ts
@Controller('stripe')
export class StripeController {
  constructor(
    private readonly stripeService: StripeService,
    private readonly bookingsService: BookingsService,
  ) {}

  @Post()
  create(@Body() createStripeDto: CreateStripeDto) {
    return this.stripeService.createStripeSession(createStripeDto);
  }

  @Get('success')
  async handleStripeSuccess(
    @Query('session_id') sessionId: string,
    @Res() res: Response,
  ) {
    // ...
    const newBooking = await this.bookingsService.create(bookingInput);
    res.redirect(process.env.BOOKINGS_REDIRECT_URL);
  }
}
```

Observations grounded in repo:

1. **`POST /stripe`** — no **`@AllowAuthenticated`** / Swagger bearer decorators on this snippet (different from hardened REST modules). Treat as **`Needs verification`** whenever you tighten security—you must confirm external Stripe redirect flows still work.
2. Controller **delegates persistence** after external payment success to **`BookingsService`** (preferred reuse versus duplicating booking logic).

DTO: **`dto/create-stripe-session.dto.ts`**.

Frontend usage: **`createBookingSession`** helper inside **`libs/ui/src/components/organisms/BookSlotPopup.tsx`** posts to Stripe session endpoints relative to **`NEXT_PUBLIC_API_URL`** (read that helper for exact paths and payloads).

## Example B — Users REST (Swagger-documented CRUD)

**File:** `apps/api/src/models/users/rest/users.controller.ts`

Patterns:

```27:76:apps/api/src/models/users/rest/users.controller.ts
@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly prisma: PrismaService) {}

  @AllowAuthenticated()
  @ApiBearerAuth()
  @ApiCreatedResponse({ type: UserEntity })
  @Post()
  create(@Body() createUserDto: CreateUser, @GetUser() user: GetUserType) {
    checkRowLevelPermission(user, createUserDto.uid);
    return this.prisma.user.create({ data: createUserDto });
  }

  @ApiOkResponse({ type: UserEntity })
  @ApiBearerAuth()
  @AllowAuthenticated()
  @Patch(':uid')
  async update(/* ... */) {
    const userInfo = await this.prisma.user.findUnique({ where: { uid } });
    checkRowLevelPermission(user, userInfo.uid);
    return this.prisma.user.update({
      where: { uid },
      data: updateUserDto,
    });
  }
}
```

Contrasts versus GraphQL-heavy domains:

- Controller talks to **`PrismaService` directly**, not via a standalone **`UsersService`** (pattern inconsistency versus bookings GraphQL).

## Naming & Routes

- Stripe base path **`/stripe`**, verbs **`POST`**, **`GET success`** redirect.
- Users base path **`/users`**, parameterized **`PATCH :uid`**.
- Swagger tags via **`@ApiTags`**, responses via **`ApiOkResponse` / `ApiCreatedResponse`**.

## Why REST Instead of GraphQL Here

Stripe requires external HTTP redirects + Checkout session IDs that do not fit the primary **`/graphql`** screen contract cleanly. Booking creation after payment nonetheless reuses **`BookingsService`** to keep parity with authenticated GraphQL creation rules.

When considering new REST endpoints, ask: **Is this HTTP/integration-native?** If not, evolve GraphQL per [[GRAPHQL_CHANGE_EXAMPLE]] instead.

## Stop Conditions

Introducing REST for ordinary CRUDalready modeled in GraphQL, or weakening auth on monetized endpoints, requires explicit review ([[../agents/STOP_CONDITIONS|Stop Conditions]]).
