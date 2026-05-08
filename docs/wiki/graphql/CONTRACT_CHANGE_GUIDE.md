# GraphQL Contract Change Guide

Este guia deve ser usado sempre que uma mudança alterar o contrato GraphQL entre `apps/api` e os apps/frontend.

Leia junto com:
- [`DEVELOPMENT_PLAYBOOK.md`](./DEVELOPMENT_PLAYBOOK.md)
- [`../backend/DEVELOPMENT_PLAYBOOK.md`](../backend/DEVELOPMENT_PLAYBOOK.md)
- [`../frontend/DEVELOPMENT_PLAYBOOK.md`](../frontend/DEVELOPMENT_PLAYBOOK.md)

---

## Fonte de verdade

No Mockp, o contrato GraphQL segue este fluxo:

```txt
apps/api/src/models/<domain>/graphql/*
        ↓
apps/api/src/schema.gql
        ↓
libs/network/src/gql/queries.graphql
        ↓
libs/network/src/gql/generated.tsx
        ↓
apps/web* e libs/ui/libs/forms consomem types/documents gerados
```

Regras:

- [ ] O frontend não deve importar tipos diretamente de `apps/api`.
- [ ] O frontend deve usar documents/types gerados em `libs/network/src/gql/generated.tsx`.
- [ ] `generated.tsx` não deve ser editado manualmente.

---

## Quando usar este guia

Use este guia quando:

- [ ] adicionar query/mutation nova
- [ ] alterar input (`Create*Input`, `Update*Input`, filters, args)
- [ ] alterar output/entity GraphQL
- [ ] renomear/remover campo
- [ ] alterar enum
- [ ] alterar relação exposta via `@ResolveField`
- [ ] alterar `libs/network/src/gql/queries.graphql`

---

## Fluxo seguro para adicionar operação nova

1. **Backend: model/entity/input**
   - [ ] adicionar/ajustar entity em `apps/api/src/models/<domain>/graphql/entity/*`
   - [ ] adicionar/ajustar input/args em `apps/api/src/models/<domain>/graphql/dtos/*`
   - [ ] usar `RestrictProperties` quando a classe precisa refletir tipo Prisma

2. **Backend: resolver/service**
   - [ ] adicionar método no service se houver regra de negócio
   - [ ] adicionar query/mutation no resolver
   - [ ] aplicar `@AllowAuthenticated(...)` quando necessário
   - [ ] aplicar `checkRowLevelPermission(...)` quando for recurso de usuário/domínio

3. **Schema**
   - [ ] garantir que `apps/api/src/schema.gql` reflete a alteração

4. **Frontend contract**
   - [ ] adicionar query/mutation/fragment em `libs/network/src/gql/queries.graphql`
   - [ ] rodar codegen
   - [ ] consumir o `*Document` gerado no frontend/lib

5. **Validação**
   - [ ] `yarn tsc`
   - [ ] `yarn lint`
   - [ ] `yarn build`

---

## Fluxo seguro para alterar campo existente

Preferência:

1. [ ] Adicionar campo novo mantendo o antigo.
2. [ ] Atualizar `queries.graphql` e consumidores para usar o novo campo.
3. [ ] Rodar codegen.
4. [ ] Validar frontend.
5. [ ] Remover campo antigo apenas em uma etapa posterior, quando não houver consumidores.

Evite:

- [ ] renomear campo diretamente
- [ ] remover campo sem buscar uso em `queries.graphql` e `generated.tsx`
- [ ] mudar nullable/non-null sem mapear impacto

---

## Checklist de consumidores

Antes de finalizar uma mudança de contrato:

- [ ] Buscar campo/operação em `libs/network/src/gql/queries.graphql`
- [ ] Buscar `*Document` gerado no código
- [ ] Buscar fragments que usam o campo
- [ ] Verificar forms/providers que montam variables em `libs/forms`
- [ ] Verificar UI que acessa `data.<operation>` em `libs/ui`

---

## Stop conditions

Pare e revise antes de continuar se:

- [ ] a alteração remove ou renomeia campo usado no frontend
- [ ] a alteração muda permissões de query/mutation
- [ ] a alteração muda input usado por formulário
- [ ] a alteração muda enum exposto no frontend
- [ ] a query retorna listas grandes ou relações aninhadas sem paginação
- [ ] há `@ResolveField` novo com risco de N+1
- [ ] não está claro se o campo pertence ao contrato público ou detalhe interno do backend

---

## Exemplo real de referência

Referências úteis no estado atual:

- Entity GraphQL: `apps/api/src/models/bookings/graphql/entity/booking.entity.ts`
- Resolver GraphQL: `apps/api/src/models/bookings/graphql/bookings.resolver.ts`
- Service: `apps/api/src/models/bookings/graphql/bookings.service.ts`
- Operations: `libs/network/src/gql/queries.graphql`
- Generated: `libs/network/src/gql/generated.tsx`

