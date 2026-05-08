# Backend Development Playbook (NestJS) — `apps/api`

Este documento é um checklist operacional para implementar mudanças no **backend** seguindo os padrões descritos em:
- [`docs/wiki/ARCHITECTURE.md`](../ARCHITECTURE.md)
- [`docs/wiki/START_HERE.md`](../START_HERE.md)
- [`AUTHORIZATION_GUIDE.md`](./AUTHORIZATION_GUIDE.md)

> Padrão real do projeto: `apps/api/src/models/<domain>/{graphql,rest}`.

---

## Antes de implementar

- [ ] Identificar o domínio (`apps/api/src/models/<domain>`).
- [ ] Procurar operação parecida em outro domínio (resolver/service/dtos).
- [ ] Mapear arquivos que serão alterados antes de editar.
- [ ] Classificar mudança:
  - [ ] bugfix
  - [ ] feature
  - [ ] refatoração
  - [ ] ajuste de contrato GraphQL

---

## Onde colocar a mudança (decisão rápida)

- [ ] **Resolver** (`graphql/*.resolver.ts`): auth + args + delega.
- [ ] **Service** (`graphql/*.service.ts`): regra de negócio + orquestração.
- [ ] **DTO/Input/Args** (`graphql/dtos/*`): contrato GraphQL do domínio.
- [ ] **Entity** (`graphql/entity/*`): types GraphQL do domínio.
- [ ] **Controller REST** (`rest/*.controller.ts`): endpoint REST fino chamando o service.
- [ ] **Prisma**: acesso via `PrismaService` (`apps/api/src/common/prisma/prisma.service.ts`).

---

## Entities + Prisma types + `RestrictProperties` (padrão do projeto)

O projeto usa o helper `RestrictProperties` para **forçar alinhamento** entre:
- a classe (Entity/DTO/Input) e
- o tipo do Prisma (`@prisma/client`).

### Onde está o helper (real)

- `apps/api/src/common/dtos/common.input.ts`:
  - `export type RestrictProperties<T, U> = ...`

### Padrão para Entities GraphQL (exemplos reais)

- GraphQL entities são `@ObjectType()` e normalmente fazem:
  - `implements RestrictProperties<ThisClass, PrismaModelType>`

Exemplos no repo:
- `apps/api/src/models/admins/graphql/entity/admin.entity.ts`
  - `export class Admin implements RestrictProperties<Admin, AdminType>`
- `apps/api/src/models/bookings/graphql/entity/booking.entity.ts`
  - `export class Booking implements RestrictProperties<Booking, BookingType>`

Regras (MUST):
- [ ] Entity GraphQL deve refletir o shape do Prisma model **com o mesmo naming de campos**.
- [ ] Campos opcionais no Prisma devem ser expostos como `@Field({ nullable: true })` quando fizer sentido no contrato.
- [ ] Enums do Prisma usados no GraphQL devem ser registrados via `registerEnumType` (ex.: `$Enums.BookingStatus`).

### Padrão para Entities REST (exemplos reais)

- REST entities são classes usadas para Swagger/DTOs e também fazem:
  - `implements RestrictProperties<ThisClass, PrismaModelType>`
  - validação com `class-validator` quando aplicável

Exemplo no repo:
- `apps/api/src/models/bookings/rest/entity/booking.entity.ts`

Regras (MUST):
- [ ] Validadores (`class-validator`) devem ficar na Entity/DTO REST (ex.: `@IsOptional()`, `@IsString()`, etc.).
- [ ] DTOs REST devem ser derivados via `OmitType/PickType` a partir da Entity (ver seção abaixo).

---

## Como criar DTOs no backend (GraphQL vs REST)

### DTOs GraphQL (inputs/args/filters)

Padrões reais:
- Inputs e args ficam em `apps/api/src/models/<domain>/graphql/dtos/*`.
- Usam utilitários do `@nestjs/graphql` como `PickType`, `PartialType`, `ArgsType`, `InputType`.

Exemplos no repo:
- `CreateAdminInput` em `apps/api/src/models/admins/graphql/dtos/create-admin.input.ts`
  - `extends PickType(Admin, ['uid'], InputType)`
- `AdminWhereInputStrict` em `apps/api/src/models/admins/graphql/dtos/where.args.ts`
  - `implements RestrictProperties<..., Prisma.AdminWhereInput>`
  - e `AdminWhereInput extends PartialType(AdminWhereInputStrict)`

Checklist (MUST):
- [ ] Para `Create*Input`, preferir `PickType(Entity, [...], InputType)`.
- [ ] Para `Update*Input`, preferir `PartialType(StrictInput)` + incluir `id`/chave quando necessário.
- [ ] Para filtros `Where*Input`, seguir padrão `Strict implements RestrictProperties<..., Prisma.<Model>WhereInput>` + `PartialType`.
- [ ] Reutilizar filtros comuns do `common.input.ts` (`StringFilter`, `DateTimeFilter`, etc.) ao invés de recriar.

#### Templates (copiar e adaptar)

Entity GraphQL (Prisma model → GraphQL):

```ts
import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';
import { RestrictProperties } from 'src/common/dtos/common.input';
import { $Enums, MyModel as MyModelType } from '@prisma/client';

// Se houver enum:
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

Create Input (derivado da Entity):

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

Where Input (Strict + Partial):

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

### DTOs REST (body/query/params)

Padrões reais:
- REST DTOs ficam em `apps/api/src/models/<domain>/rest/dtos/*`.
- Derivam de `*Entity` usando `OmitType` / `PickType` do `@nestjs/swagger`.

Exemplo no repo:
- `CreateBooking` em `apps/api/src/models/bookings/rest/dtos/create.dto.ts`
  - `extends OmitType(BookingEntity, ['createdAt','updatedAt','id'])`

Checklist (MUST):
- [ ] Derivar DTOs REST a partir da Entity REST (evita drift).
- [ ] Separar `Create*`, `Update*`, `QueryDto` (quando houver paginação/ordenção).

#### Templates (copiar e adaptar)

Entity REST (Prisma model → REST/Swagger DTO base):

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

Create DTO REST (derivado da Entity):

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

## Checklist obrigatório (MUST)

- [ ] **Resolver/Controller finos**:
  - [ ] sem regra de negócio grande
  - [ ] sem duplicar queries complexas
- [ ] **Regra de negócio no service** (ou funções auxiliares do domínio quando necessário).
- [ ] **Acesso a dados via `PrismaService` injetado** (não criar client por fora).
- [ ] **Permissões/roles**:
  - [ ] usar `@AllowAuthenticated(...)` (`apps/api/src/common/auth/auth.decorator.ts`)
  - [ ] revisar impactos de row-level permission (`checkRowLevelPermission` em `apps/api/src/common/auth/util.ts`)
- [ ] Se houver REST + GraphQL para o mesmo caso:
  - [ ] preferir que ambos chamem o **mesmo service** quando houver regra de negócio compartilhada (evitar divergência)

Ponto de atenção real:
- [ ] O código atual tem resolvers/controllers que usam `PrismaService` diretamente para CRUD simples, contadores e `ResolveField`. Não é preciso refatorar tudo antes de implementar; apenas não aumentar complexidade no controller/resolver quando a regra pertencer ao service.

Stop conditions:
- [ ] Se a mudança alterar roles, guards ou row-level permission, leia [`AUTHORIZATION_GUIDE.md`](./AUTHORIZATION_GUIDE.md) antes de editar.
- [ ] Se a mudança alterar schema Prisma, leia [`../database/PRISMA_MIGRATION_SAFETY.md`](../database/PRISMA_MIGRATION_SAFETY.md).
- [ ] Se a mudança alterar contrato GraphQL, leia [`../graphql/CONTRACT_CHANGE_GUIDE.md`](../graphql/CONTRACT_CHANGE_GUIDE.md).

---

## Fluxo prático para criar/alterar REST (passo a passo)

> Estrutura real do projeto (exemplo): `apps/api/src/models/bookings/rest/bookings.controller.ts`.

### Quando criar REST (SHOULD)

- [ ] Webhooks (ex.: Stripe)
- [ ] Callbacks/integrações que exigem endpoint HTTP
- [ ] Upload/download/streaming (quando GraphQL não for adequado)
- [ ] Endpoints públicos simples (health/status) e/ou caching HTTP

Regra do projeto:

> Use GraphQL para dados da aplicação e telas. Use REST para integrações, webhooks, arquivos, redirects e endpoints HTTP específicos.  
> Só gere contratos REST tipados quando o frontend realmente consumir esses endpoints.

### Passo a passo (MUST)

1) **Escolher o domínio**
- [ ] criar/usar `apps/api/src/models/<domain>/rest/`

2) **Criar/alterar o controller**
- [ ] criar `<domain>.controller.ts` em `rest/`
- [ ] manter controller fino: `@Controller(...)` + handlers + delegação

3) **DTOs e entidade REST (Swagger)**
- [ ] seguir o padrão do domínio (ex.: `rest/dtos/*.dto.ts` e `rest/entity/*.entity.ts`, quando existirem)
- [ ] manter DTOs REST separados de inputs GraphQL quando fizer sentido (contratos diferentes)

4) **Autenticação/Permissões**
- [ ] aplicar `@AllowAuthenticated(...)` quando necessário
- [ ] usar `checkRowLevelPermission(...)` quando a operação for por recurso
- [ ] documentar auth no Swagger quando aplicável (ex.: `@ApiBearerAuth()`)

5) **Compartilhar regra de negócio com GraphQL**
- [ ] preferir que REST e GraphQL chamem o **mesmo service do domínio**
  - recomendação: evitar controller/resolver acessando o Prisma diretamente para a “regra principal”
  - observação: controllers REST existentes ainda usam `PrismaService` diretamente em alguns CRUDs; trate isso como estado atual, não como padrão ideal para lógica nova complexa

6) **Registrar no module**
- [ ] confirmar que `<domain>.module.ts` inclui o controller em `controllers: [...]`

7) **Se o frontend consumir o endpoint**
- [ ] seguir o playbook de REST tipado: [`../rest/DEVELOPMENT_PLAYBOOK.md`](../rest/DEVELOPMENT_PLAYBOOK.md)

### Anti-padrões (AVOID)

- [ ] Duplicar a mesma regra de negócio em `rest/controller` e `graphql/resolver`.
- [ ] Controller “gordo” (montando regra, validando invariantes complexas, e persistindo tudo ali).
- [ ] Criar REST por conveniência quando a API principal do app é GraphQL (use REST com motivo claro).

---

## GraphQL no backend (quando mexer)

- [ ] Se mudar schema/types/inputs:
  - [ ] mapear impacto em `libs/network/src/gql/queries.graphql`
  - [ ] garantir que o frontend conseguirá migrar sem quebra desnecessária
- [ ] Evitar expor detalhes internos (tabelas/joins) no contrato.
- [ ] Preferir evolução compatível (adicionar campo em vez de remover/renomear).

---

## Database/Prisma (quando mexer)

- [ ] Alterações de modelo devem refletir em:
  - [ ] `apps/api/prisma/schema.prisma`
  - [ ] `apps/api/prisma.config.ts` quando envolver datasource/migrations
  - [ ] migrations em `apps/api/prisma/migrations/*`
- [ ] Depois de alterar schema ou instalar dependências, rodar `yarn workspace @mockp/api prisma:generate` antes de `tsc`/`build`.
- [ ] Usar o Prisma via `PrismaService`; não instanciar outro `PrismaClient` fora de `apps/api/src/common/prisma`.
- [ ] Evitar “mudança silenciosa” de dados:
  - [ ] revisar migration SQL quando necessário
  - [ ] confirmar compatibilidade com dados existentes

---

## Validação antes de finalizar

No root:
- [ ] `yarn tsc`
- [ ] `yarn lint`
- [ ] `yarn build`

Quando a mudança impactar contrato:
- [ ] revisar schema/operations e consumidores (`libs/network` + apps)

---

## Checklist de encerramento (resposta do agente/dev)

- **Resumo**:
- **Arquivos alterados**:
- **Padrões seguidos**:
- **Validações executadas**:
- **Riscos conhecidos**:
- **Próximos passos**:

