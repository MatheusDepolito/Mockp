# Backend Authorization Guide

Este guia cobre autenticação/autorização no backend NestJS do Mockp.

Arquivos reais:

- `apps/api/src/common/auth/auth.decorator.ts`
- `apps/api/src/common/auth/auth.guard.ts`
- `apps/api/src/common/auth/util.ts`
- `apps/api/src/common/types/index.ts`

---

## Padrão atual

O projeto usa:

- `@AllowAuthenticated(...roles)` para proteger resolvers/controllers.
- `AuthGuard` para validar JWT e carregar roles.
- `GetUser` para injetar o usuário autenticado em GraphQL.
- `checkRowLevelPermission(...)` para validar acesso por recurso/uid.

Roles reais carregadas hoje:

- `admin`
- `manager`
- `valet`

Ponto de atenção:

- `customer` existe como model no Prisma, mas não aparece como role carregada em `AuthGuard` no estado atual.

---

## Como aplicar autorização em uma operação

### 1. Definir se precisa autenticação

- [ ] operação pública: não usar `@AllowAuthenticated`
- [ ] operação autenticada: usar `@AllowAuthenticated()`
- [ ] operação por role: usar `@AllowAuthenticated('admin')`, `@AllowAuthenticated('manager')`, etc.

### 2. Definir se precisa row-level permission

Use `checkRowLevelPermission` quando:

- [ ] o usuário só pode acessar recurso dele
- [ ] manager/valet/admin tem escopo limitado
- [ ] o recurso tem `uid`, `customerId`, `managerId`, `valetId` ou relação com empresa/garagem

### 3. Buscar o recurso antes de alterar

Para update/delete:

- [ ] buscar recurso pelo id/chave
- [ ] validar permissão com base no owner/relacionamento
- [ ] só depois executar alteração

---

## Exemplo de fluxo seguro

```ts
@AllowAuthenticated()
@Mutation(() => Booking)
async updateBooking(
  @Args('updateBookingInput') args: UpdateBookingInput,
  @GetUser() user: GetUserType,
) {
  const booking = await this.prisma.booking.findUnique({
    where: { id: args.id },
  });

  checkRowLevelPermission(user, booking.customerId);

  return this.bookingsService.update(args);
}
```

---

## Stop conditions

Pare e revise antes de continuar se:

- [ ] a mudança altera roles aceitas por uma query/mutation/controller
- [ ] a mudança troca recurso de dono (`customerId`, `managerId`, `companyId`, etc.)
- [ ] a mudança cria rota pública para dados sensíveis
- [ ] a mudança cria endpoint REST autenticado e não há `@ApiBearerAuth()`
- [ ] a mudança mexe em `AuthGuard`
- [ ] a mudança adiciona role nova ao sistema
- [ ] não está claro se manager/valet/admin pode acessar o recurso

---

## O que evitar

- [ ] duplicar lógica de autorização em vários resolvers/controllers
- [ ] confiar apenas no filtro vindo do frontend para restringir dados
- [ ] alterar permissões junto com refatoração grande
- [ ] retornar dados sensíveis antes de validar role/owner

---

## Checklist antes de finalizar

- [ ] `@AllowAuthenticated(...)` está correto?
- [ ] `checkRowLevelPermission(...)` é necessário?
- [ ] O recurso foi buscado antes de update/delete?
- [ ] A role exigida bate com regra de negócio?
- [ ] GraphQL/REST têm comportamento equivalente quando expõem a mesma ação?
- [ ] Risco de acesso indevido foi documentado?

