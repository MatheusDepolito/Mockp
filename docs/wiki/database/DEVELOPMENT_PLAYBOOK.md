# Database Development Playbook (Postgres + Prisma)

Este documento é um checklist operacional para mudanças de **banco de dados** via Prisma, seguindo:
- [`docs/wiki/ARCHITECTURE.md`](../ARCHITECTURE.md)
- [`docs/wiki/START_HERE.md`](../START_HERE.md)
- [`PRISMA_MIGRATION_SAFETY.md`](./PRISMA_MIGRATION_SAFETY.md)

> Padrões reais do projeto:
> - Prisma schema: `apps/api/prisma/schema.prisma`
> - Prisma CLI config: `apps/api/prisma.config.ts`
> - Migrations: `apps/api/prisma/migrations/*`
> - Prisma client gerado: `apps/api/prisma/generated/*` (não versionado; gerar explicitamente)
> - Prisma client é usado via `PrismaService`: `apps/api/src/common/prisma/prisma.service.ts`
> - Banco configurado no Prisma: PostgreSQL (`provider = "postgresql"`)
> - Docker Compose local: `apps/api/docker-compose.yml`

---

## Antes de mudar o banco

- [ ] Ler [`PRISMA_MIGRATION_SAFETY.md`](./PRISMA_MIGRATION_SAFETY.md) antes de qualquer migration não trivial.
- [ ] Identificar o motivo:
  - [ ] bugfix (dados/modelo incorreto)
  - [ ] feature (novo modelo/campo)
  - [ ] refatoração (renomear, normalizar, etc.)
- [ ] Mapear impacto no contrato:
  - [ ] GraphQL types/inputs/resolvers/services
  - [ ] frontend (operations/codegen/consumidores)
- [ ] Mapear impacto em dados existentes:
  - [ ] há dados em produção? há necessidade de migração cuidadosa?
- [ ] Verificar ambiente local:
  - [ ] Postgres local sobe via `apps/api/docker-compose.yml`
  - [ ] porta local mapeada: `2000:5432`
  - [ ] database/user/password default no compose: `mockp_db` / `mockp` / `mockp`

---

## Checklist obrigatório (MUST)

- [ ] Alterações devem ser feitas no `apps/api/prisma/schema.prisma`.
- [ ] Configuração de URL/migrations deve ficar em `apps/api/prisma.config.ts` (Prisma 7 não usa `url` no datasource do schema).
- [ ] Criar/atualizar migrations em `apps/api/prisma/migrations/*` (evitar mudanças “sem histórico”).
- [ ] Revisar migrations SQL quando a mudança for sensível (drop/rename/data migration).
- [ ] Garantir que o backend usa o Prisma via `PrismaService` (não bypass).
- [ ] Rodar `yarn workspace @mockp/api prisma:generate` depois de instalar dependências ou alterar schema.
- [ ] Se alterar modelo usado por GraphQL, revisar entities/inputs/filters e `apps/api/src/schema.gql`.

---

## Docker/PostgreSQL local

Estado real:

- [ ] Existe `apps/api/docker-compose.yml`.
- [ ] Ele sobe apenas o serviço `db` com imagem `postgres:17`.
- [ ] Não há `Dockerfile` encontrado no repositório no estado atual.
- [ ] Não há compose de produção documentado no estado atual.

Comando usual (a partir de `apps/api`):

```sh
docker compose up -d
```

Ponto de atenção:
- [ ] O compose é infraestrutura local para PostgreSQL; não documente como estratégia de deploy/produção sem decisão explícita.

---

## Seeds e testes de dados

Estado real:

- [ ] Existe seed de desenvolvimento em `apps/api/prisma/seed.ts`.
- [ ] Seeds por categoria ficam em `apps/api/prisma/seeds/*` (ex.: `apps/api/prisma/seeds/users.ts`).
- [ ] O comando de seed é `yarn workspace @mockp/api prisma:seed`.
- [ ] Não foi encontrada infraestrutura de testes automatizados para banco no estado atual.

Recomendação:
- [ ] Se seeds forem adicionadas, documentar comando, escopo (dev/test) e se podem rodar em produção.
- [ ] No Prisma 7, seeds não rodam automaticamente em `migrate dev`; se existir seed, rodar `prisma db seed` explicitamente.

---

## Evolução segura (SHOULD)

- [ ] Preferir migrações compatíveis quando possível:
  - [ ] adicionar colunas nullable antes de torná-las obrigatórias
  - [ ] introduzir novo campo + backfill + migrar consumidores + remover antigo depois
- [ ] Evitar renomear/remover campo sem mapear:
  - [ ] uso no backend (services/resolvers)
  - [ ] uso no GraphQL schema/operations

---

## Anti-padrões (AVOID)

- [ ] Alterar schema sem migration.
- [ ] Migration destrutiva sem plano (drop table/column) ou sem confirmar uso.
- [ ] Backfill ad-hoc no runtime do app sem necessidade.

---

## Validação antes de finalizar

- [ ] Garantir consistência entre:
  - [ ] Prisma schema (`apps/api/prisma/schema.prisma`)
  - [ ] Prisma config (`apps/api/prisma.config.ts`)
  - [ ] Prisma client usado no backend
  - [ ] GraphQL schema/inputs/outputs
- [ ] Rodar no root:
  - [ ] `yarn tsc`
  - [ ] `yarn lint`
  - [ ] `yarn build`

---

## Checklist de encerramento

- **Resumo**:
- **Schema Prisma mudou?**:
- **Migrations criadas/alteradas?**:
- **Impacto no GraphQL/Frontend mapeado?**:
- **Validações executadas**:
- **Riscos conhecidos**:

