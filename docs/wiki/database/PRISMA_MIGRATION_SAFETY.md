# Prisma Migration Safety Guide

Este guia define cuidados para alterações em `apps/api/prisma/schema.prisma` e migrations.

Leia junto com:
- [`DEVELOPMENT_PLAYBOOK.md`](./DEVELOPMENT_PLAYBOOK.md)
- [`../graphql/CONTRACT_CHANGE_GUIDE.md`](../graphql/CONTRACT_CHANGE_GUIDE.md)

---

## Estado real

- Prisma schema: `apps/api/prisma/schema.prisma`
- Prisma config: `apps/api/prisma.config.ts`
- Provider: PostgreSQL
- Migrations: `apps/api/prisma/migrations/*`
- Prisma client: gerado em `apps/api/prisma/generated/*` e usado via `PrismaService`
- Docker local: `apps/api/docker-compose.yml`
- Seed de desenvolvimento: `apps/api/prisma/seed.ts`
- Seeds por categoria: `apps/api/prisma/seeds/*`

No Prisma 7:

- O datasource do schema declara apenas o provider; a URL do banco fica em `prisma.config.ts`.
- `prisma generate` deve ser executado explicitamente depois de alterar schema ou instalar dependências.
- `migrate dev` não executa seed automaticamente; rode `yarn workspace @mockp/api prisma:seed` quando precisar dos dados iniciais.

---

## Classifique a migration

Antes de alterar:

- [ ] adição não destrutiva (campo nullable, índice, tabela nova)
- [ ] alteração compatível com backfill
- [ ] rename
- [ ] drop de campo/tabela
- [ ] alteração de enum
- [ ] alteração de relação/chave

---

## Estratégia segura por tipo

### Campo novo

Preferir:

1. [ ] adicionar nullable/default seguro
2. [ ] atualizar backend/GraphQL/frontend
3. [ ] preencher dados se necessário
4. [ ] tornar obrigatório depois, em outra etapa

### Rename

Evitar rename destrutivo direto.

Preferir:

1. [ ] criar campo novo
2. [ ] copiar/backfill dos dados
3. [ ] migrar backend/GraphQL/frontend
4. [ ] remover campo antigo em migration futura

### Drop

Só fazer quando:

- [ ] uso foi mapeado no backend
- [ ] uso foi mapeado no GraphQL
- [ ] uso foi mapeado no frontend/codegen
- [ ] dados podem ser perdidos com segurança
- [ ] risco foi documentado

### Enum

Antes de alterar:

- [ ] verificar uso em Prisma
- [ ] verificar `registerEnumType` no GraphQL
- [ ] verificar types gerados no frontend
- [ ] verificar valores persistidos no banco

---

## Checklist de revisão da migration SQL

- [ ] há `DROP COLUMN`?
- [ ] há `DROP TABLE`?
- [ ] há alteração de NOT NULL em coluna com dados existentes?
- [ ] há rename que Prisma tratou como drop+add?
- [ ] há alteração de enum com dados existentes?
- [ ] há índices necessários para consultas novas?

Se qualquer item acima for “sim”, pare e revise o plano.

---

## Relação com GraphQL/frontend

Quando o schema Prisma muda:

- [ ] revisar entities GraphQL
- [ ] revisar inputs/filters
- [ ] revisar resolvers/services
- [ ] rodar `yarn workspace @mockp/api prisma:generate`
- [ ] atualizar `apps/api/src/schema.gql`
- [ ] atualizar `libs/network/src/gql/queries.graphql` se necessário
- [ ] rodar codegen
- [ ] validar consumidores

---

## Stop conditions

Pare e peça revisão humana se:

- [ ] migration destrutiva
- [ ] dados de produção podem ser perdidos
- [ ] relação/chave estrangeira muda
- [ ] enum persistido muda
- [ ] alteração exige backfill
- [ ] schema Prisma e contrato GraphQL divergem

