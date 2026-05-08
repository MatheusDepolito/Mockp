# START HERE — Mockp Technical Wiki

Este é o ponto de entrada da wiki técnica do Mockp.

## Como usar esta wiki

- **Antes de implementar qualquer mudança**, leia:
  - [`ARCHITECTURE.md`](./ARCHITECTURE.md)
  - Playbooks (checklists) por área:
    - Backend: [`backend/DEVELOPMENT_PLAYBOOK.md`](./backend/DEVELOPMENT_PLAYBOOK.md)
    - Frontend: [`frontend/DEVELOPMENT_PLAYBOOK.md`](./frontend/DEVELOPMENT_PLAYBOOK.md)
    - GraphQL: [`graphql/DEVELOPMENT_PLAYBOOK.md`](./graphql/DEVELOPMENT_PLAYBOOK.md)
    - REST/OpenAPI: [`rest/DEVELOPMENT_PLAYBOOK.md`](./rest/DEVELOPMENT_PLAYBOOK.md)
    - Database/Prisma: [`database/DEVELOPMENT_PLAYBOOK.md`](./database/DEVELOPMENT_PLAYBOOK.md)
    - Nx: [`nx/DEVELOPMENT_PLAYBOOK.md`](./nx/DEVELOPMENT_PLAYBOOK.md)
    - Testing: [`testing/TESTING_GUIDE.md`](./testing/TESTING_GUIDE.md)

## Guias específicos

- Mudanças de contrato GraphQL: [`graphql/CONTRACT_CHANGE_GUIDE.md`](./graphql/CONTRACT_CHANGE_GUIDE.md)
- Autorização/permissões backend: [`backend/AUTHORIZATION_GUIDE.md`](./backend/AUTHORIZATION_GUIDE.md)
- Componentes frontend/shared UI: [`frontend/COMPONENT_GUIDE.md`](./frontend/COMPONENT_GUIDE.md)
- Segurança de migrations Prisma: [`database/PRISMA_MIGRATION_SAFETY.md`](./database/PRISMA_MIGRATION_SAFETY.md)

## Mapa rápido do monorepo (real)

- **Apps**
  - `apps/api`: NestJS (GraphQL + REST), Prisma, schema GraphQL em `apps/api/src/schema.gql`
  - `apps/web`: Next.js App Router (cliente)
  - `apps/web-admin`, `apps/web-manager`, `apps/web-valet`: apps Next.js adicionais
- **Libs**
  - `libs/network`: GraphQL operations + codegen + Apollo + `fetchGraphQL`
  - `libs/ui`: UI compartilhada e componentes/templates de produto (Atomic Design: atoms/molecules/organisms/templates)
  - `libs/forms`: providers/schemas de formulários
  - `libs/util`: utilitários e tipos compartilhados
- **Infra local**
  - `apps/api/docker-compose.yml`: sobe apenas PostgreSQL local (`mockp_db`) na porta `2000:5432`
- **Orquestração**
  - `nx.json` define cache/targets padrão; os targets vêm dos scripts dos `package.json` dos apps/libs

## Regras de ouro (resumo)

- **Contrato principal**: o frontend depende do backend **via GraphQL** (schema + operations), não de detalhes internos.
- **REST**: use para integrações, webhooks, arquivos, redirects e endpoints HTTP específicos. Gere contrato REST tipado só quando o frontend realmente consumir o endpoint.
- **Backend**: resolver/controller finos; regra de negócio no service; dados via `PrismaService`.
- **Frontend**: page monta; templates/UI em `libs/ui`; forms em `libs/forms`; GraphQL em `libs/network`.
- **Single Source of Truth**: a documentação oficial vive em `docs/wiki`.

