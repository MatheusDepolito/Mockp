# Backend Development Playbook (NestJS) — `apps/api`

> Status: Current project state

Operational checklist for backend work. Canonical architecture: [[../ARCHITECTURE|Architecture]] and [[../START_HERE|Start Here]]. Authorization details: [[../security/AUTHORIZATION_GUIDE|Authorization Guide]].

Repository examples: [[../examples/BACKEND_FEATURE_EXAMPLE]], [[../examples/GRAPHQL_CHANGE_EXAMPLE]], [[../examples/REST_ENDPOINT_EXAMPLE]], [[../examples/VALIDATION_EXAMPLE]].

**Observed layout:** `apps/api/src/models/<domain>/{graphql,rest}`.

---

## Before Implementing

- [ ] Identify target domain under `apps/api/src/models/<domain>`.
- [ ] Find an analogous resolver/service/DTO set in another domain to mimic structure.
- [ ] List impacted files before editing.
- [ ] Classify the task: bugfix vs feature vs refactor vs contract change.

---

## Where Work Belongs

- [ ] **Resolver** (`graphql/*.resolver.ts`): authenticate, shape args, delegate.
- [ ] **Service** (`graphql/*.service.ts`): domain rules and orchestration live here.
- [ ] **Inputs/args** (`graphql/dtos/*`): GraphQL-facing DTO types.
- [ ] **Entities** (`graphql/entity/*`): GraphQL object types.
- [ ] **REST controller** (`rest/*.controller.ts`): HTTP adapter layer over services.
- [ ] **Persistence**: always through injected `PrismaService` (`apps/api/src/common/prisma/prisma.service.ts`).

---

## Entities, Prisma Types, and `RestrictProperties`

Mockp uses `RestrictProperties` to align class fields with Prisma model types.

### Helper Location

- `apps/api/src/common/dtos/common.input.ts` exports `RestrictProperties<T, U>`.

### GraphQL Entity Pattern

Entities are `@ObjectType()` classes that `implements RestrictProperties<ThisClass, PrismaModel>`.

Verified examples:

- `apps/api/src/models/admins/graphql/entity/admin.entity.ts`
- `apps/api/src/models/bookings/graphql/entity/booking.entity.ts`

Rules (must):

- [ ] Mirror Prisma field naming in GraphQL entities whenever they represent the same model.
- [ ] Mark nullable DB fields with `@Field({ nullable: true })` when the contract should expose them.
- [ ] Register `$Enums.*` through `registerEnumType` when enums cross the GraphQL boundary.

### REST Entity Pattern

REST entities also implement `RestrictProperties` and usually add `class-validator` decorators where appropriate.

Example reference: `apps/api/src/models/bookings/rest/entity/booking.entity.ts`.

Rules (must):

- [ ] Validation decorators belong on REST DTO/entity classes (`@IsOptional`, `@IsString`, etc.).
- [ ] Derive Swagger DTO layers from those entities using `@nestjs/swagger` helpers.

---

## Designing DTO Layers (GraphQL vs REST)

### GraphQL inputs/args/filters

Patterns:

- Inputs and args live beside the domain under `graphql/dtos/*`.
- Use `@nestjs/graphql` helpers such as `PickType`, `PartialType`, `ArgsType`, `InputType`.

Verified examples:

- `CreateAdminInput` in `apps/api/src/models/admins/graphql/dtos/create-admin.input.ts` (`extends PickType(Admin, ['uid'], InputType)`).
- Filtering helpers such as `AdminWhereInputStrict` aligning with Prisma filters.

Mandatory checklist:

- [ ] Prefer `PickType(Entity, [...], InputType)` for creates.
- [ ] Prefer `PartialType(StrictInput)` patterns for partial updates (+ explicit ids when necessary).
- [ ] Compose `Where*InputStrict` structs implementing `RestrictProperties<..., Prisma.<Model>WhereInput>` followed by partial wrappers.
- [ ] Reuse shared filter primitives (`StringFilter`, `DateTimeFilter`, etc.) from `common.input.ts`.

#### Starter Templates

GraphQL entity:

```ts
import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';
import { RestrictProperties } from 'src/common/dtos/common.input';
import { $Enums, MyModel as MyModelType } from '@prisma/client';

registerEnumType($Enums.MyEnum, { name: 'MyEnum' });

@ObjectType()
export class MyModel implements RestrictProperties<MyModel, MyModelType> {
  id: number;
  createdAt: Date;
  updatedAt: Date;

  @Field({ nullable: true })
  optionalField?: string;

  @Field(() => $Enums.MyEnum)
  status: $Enums.MyEnum;
}
```

Create input derived from entity:

```ts
import { InputType, PickType } from '@nestjs/graphql';
import { MyModel } from '../entity/my-model.entity';

@InputType()
export class CreateMyModelInput extends PickType(
  MyModel,
  ['fieldA', 'fieldB'] as const,
  InputType,
) {}
```

Where input (Strict + Partial):

```ts
import { InputType, PartialType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import {
  IntFilter,
  RestrictProperties,
  StringFilter,
} from 'src/common/dtos/common.input';

@InputType()
export class MyModelWhereInputStrict
  implements RestrictProperties<MyModelWhereInputStrict, Prisma.MyModelWhereInput>
{
  id: IntFilter;
  name: StringFilter;

  AND: MyModelWhereInput[];
  OR: MyModelWhereInput[];
  NOT: MyModelWhereInput[];
}

@InputType()
export class MyModelWhereInput extends PartialType(MyModelWhereInputStrict) {}
```

### REST DTO layering

- REST DTOs reside under `rest/dtos/*`.
- Compose them via `OmitType`/`PickType` from REST entities (`@nestjs/swagger`).

Example trace: `CreateBooking` derives from booking REST entity omitting auditing fields (`apps/api/src/models/bookings/rest/dtos/create.dto.ts`).

Rules (must):

- [ ] Anchor REST DTOs to REST entities to avoid drift.
- [ ] Separate `Create*`, `Update*`, paginated queries when pagination exists.

REST entity scaffold:

```ts
import { MyModel as MyModelType } from '@prisma/client';
import { RestrictProperties } from 'src/common/dtos/common.input';
import { IsOptional, IsString } from 'class-validator';

export class MyModelEntity implements RestrictProperties<MyModelEntity, MyModelType> {
  id: number;
  createdAt: Date;
  updatedAt: Date;

  @IsOptional()
  @IsString()
  optionalField?: string;
}
```

Create DTO scaffold:

```ts
import { OmitType } from '@nestjs/swagger';
import { MyModelEntity } from '../entity/my-model.entity';

export class CreateMyModelDto extends OmitType(MyModelEntity, [
  'id',
  'createdAt',
  'updatedAt',
]) {}
```

---

## Mandatory Quality Checklist

- [ ] **Thin resolvers/controllers**—no sprawling business logic.
- [ ] **Services own orchestration** (or dedicated helpers colocated with the domain).
- [ ] **Always inject `PrismaService`**; never spin up ad-hoc Prisma clients.
- [ ] **Authorization**:
  - [ ] Declare `@AllowAuthenticated(...)` where appropriate (`apps/api/src/common/auth/auth.decorator.ts`).
  - [ ] Apply `checkRowLevelPermission` (`apps/api/src/common/auth/util.ts`) before mutating user-owned resources.
- [ ] When GraphQL and REST expose the same behavior, **reuse the same service** to prevent divergence.

**Reality note:** some existing resolvers/controllers still query Prisma directly for simple CRUD, counts, or `@ResolveField` hooks. You do not need to refactor everything immediately—just avoid growing resolver/controller complexity when the rule belongs in a service.

### Stop Triggers

- [ ] Role/guard/row-level changes → read [[../security/AUTHORIZATION_GUIDE|Authorization Guide]] first.
- [ ] Prisma schema changes → follow [[../database/PRISMA_MIGRATION_SAFETY|Prisma Migration Safety]].
- [ ] GraphQL contract changes → follow [[../graphql/CONTRACT_CHANGE_GUIDE|GraphQL Contract Change Guide]].

---

## Practical REST Flow

> Example reference: `apps/api/src/models/bookings/rest/bookings.controller.ts`.

### When to Add REST

- [ ] Webhooks / provider callbacks
- [ ] Integrations that demand plain HTTP endpoints
- [ ] Large file streaming if GraphQL is awkward
- [ ] Health/status style routes

Project rule (repeat):

> GraphQL for screens; REST for integrations, webhooks, files, redirects, or HTTP-native behavior.

### Implementation Checklist

1. **Pick domain folder** `apps/api/src/models/<domain>/rest/`.
2. **Author controller** with Nest routing decorators and narrow responsibilities.
3. **Align DTO/entity files** with existing domain conventions.
4. **Apply auth + Swagger metadata** (`@ApiBearerAuth`, tags, response DTOs).
5. **Share services** with GraphQL wherever business rules overlap (ideal state even if legacy code still hits Prisma in controllers).
6. **Register controller** inside `<domain>.module.ts`.
7. **If the browser calls the route**, plan consumption through `libs/network` per [[../rest/REAL_REST_PATTERNS|Real REST Patterns]] / future OpenAPI guide.

### Anti-Patterns

- [ ] Duplicating domain logic between REST and GraphQL entrypoints.
- [ ] “Fat” controllers that persist, validate, and orchestrate everything inline.
- [ ] Creating REST routes for ordinary screen queries without a strong reason.

---

## GraphQL Changes

- [ ] Any schema/type/input change must consider `libs/network/src/gql/queries.graphql` + consumers.
- [ ] Avoid leaking persistence joins into the contract.
- [ ] Prefer additive changes before destructive ones.

---

## Database / Prisma Touchpoints

- [ ] Model edits require `apps/api/prisma/schema.prisma` + migrations + `prisma.config.ts` updates when URLs/config shift.
- [ ] After schema changes or installs: `yarn workspace @mockp/api prisma:generate`.
- [ ] Always use `PrismaService`; do not spawn stray `PrismaClient` instances.
- [ ] Review SQL for data loss risk.

---

## Before You Finish

From repo root:

- [ ] `yarn tsc`
- [ ] `yarn lint`
- [ ] `yarn build`

If contracts moved:

- [ ] Re-read generated schema + `libs/network` consumers.

---

## Wrap-Up Template

- **Summary**:
- **Files touched**:
- **Patterns followed**:
- **Validations run**:
- **Known risks**:
- **Next steps**:
