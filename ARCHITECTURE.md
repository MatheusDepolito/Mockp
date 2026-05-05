# Mockp Architecture & Project Guidelines

Este documento é a **referência central** do monorepo **Mockp** para arquitetura, padrões técnicos e regras de organização.  
Objetivo: manter consistência entre **backend (NestJS)**, **frontend (Next.js/React)** e **contratos GraphQL**, evitando refatorações desorganizadas e quebra de contratos.

> Nota: quando algum ponto não estiver 100% explícito no repositório, este documento descreve como **recomendação**, não como fato.

---

## Visão geral do projeto

### Estrutura do monorepo

- **Apps** (aplicações):
  - `apps/api`: API NestJS (GraphQL + REST).
  - `apps/web`: Web “cliente” (Next.js App Router).
  - `apps/web-admin`, `apps/web-manager`, `apps/web-valet`: apps Next.js adicionais (painéis/áreas).
- **Libs** (pacotes compartilhados):
  - `libs/network`: camada de rede/GraphQL (Apollo client config, fetch util, codegen, tipos gerados).
  - `libs/ui`: design system / UI compartilhada (Atomic Design: `atoms/`, `molecules/`, `organisms/`, `templates/`).
  - `libs/forms`: providers/abstrações de formulários (ex.: `FormProviderSearchGarage`).
  - `libs/util`: utilitários e tipos compartilhados (ex.: `MenuItem`).
  - `libs/sample-lib`: lib de exemplo.
- **Orquestração/Build**:
  - Yarn workspaces (monorepo) + Nx (`nx.json`).

### Responsabilidades por camada

- **Backend (`apps/api`)**:
  - Expõe **GraphQL** (principal contrato com o frontend) e endpoints **REST** quando aplicável.
  - Centraliza regras de negócio, autorização e acesso a dados (Prisma).
  - Publica o schema GraphQL gerado em `apps/api/src/schema.gql`.

- **Frontend (`apps/web*`)**:
  - Implementa UI/UX, composição de páginas/rotas e estado de tela.
  - Consome o backend **somente via GraphQL** (contrato).
  - Usa `libs/network` para operações GraphQL tipadas e `libs/ui` para UI compartilhada.

- **Libs (`libs/*`)**:
  - **Shared UI** deve ser reutilizável e desacoplada de regra de negócio.
  - **Network** deve ser a “fonte” de operações GraphQL (documents) e tipos gerados, para reduzir divergência entre apps.

### Fluxo geral (tela → GraphQL → service → banco)

Fluxo esperado e recomendado:

1. **UI (route/page)** em `apps/web/src/app/...`
2. **Template/Component** em `libs/ui/...` (ou componente local do módulo)
3. **Operação GraphQL tipada** (document) em `libs/network/src/gql/*.graphql` → gerado em `libs/network/src/gql/generated.tsx`
4. **Client/fetch**:
   - Client-side: `libs/network/src/config/apollo.tsx` (Apollo Client + auth header)
   - Server-side/NextAuth: `libs/network/src/fetch/index.ts` (`fetchGraphQL`)
5. **Resolver GraphQL** em `apps/api/src/models/<dominio>/graphql/*.resolver.ts`
6. **Service** em `apps/api/src/models/<dominio>/graphql/*.service.ts`
7. **Acesso a dados** via `PrismaService` (`apps/api/src/common/prisma/prisma.service.ts`) → banco (PostgreSQL)

---

## Organização do backend (NestJS) — `apps/api`

### Padrão atual encontrado no projeto

O backend está organizado por **domínio/modelo** em `apps/api/src/models/*`, e cada domínio costuma separar interfaces GraphQL e REST:

```
apps/api/src/models/<domain>/
  <domain>.module.ts
  graphql/
    *.resolver.ts
    *.service.ts
    dtos/
    entity/
  rest/
    *.controller.ts
```

Exemplo real:
- `apps/api/src/models/bookings/` com `graphql/`, `rest/` e `bookings.module.ts`.

### Onde fica cada tipo de lógica

- **Resolvers (`*.resolver.ts`)**:
  - Devem ser “finos”: receber args, aplicar autorização/guards/decorators, delegar para service.
  - É aceitável fazer **pequenas composições** de filtros/args quando necessário (ex.: enriquecer `where`), mas evitar “core business logic” aqui.

- **Controllers REST (`*.controller.ts`)**:
  - Mesmo princípio: “fino”, sem regra de negócio relevante.

- **Services (`*.service.ts`)**:
  - **Regra de negócio** vive aqui (ou em funções auxiliares do domínio quando fizer sentido).
  - Podem compor transações Prisma, validar invariantes do domínio e orquestrar escrita/leitura.

- **Acesso a dados (Prisma)**:
  - Uso do Prisma está centralizado via `PrismaService`:
    - `apps/api/src/common/prisma/prisma.service.ts` (extende `PrismaClient`).
  - Evitar acesso ao banco “por fora” (ex.: criar `new PrismaClient()` em qualquer outro lugar).

### Autenticação, permissões e segurança

Padrões existentes e que devem ser preservados:

- **Decorators/Guard**:
  - `AllowAuthenticated(...roles)` em `apps/api/src/common/auth/auth.decorator.ts`
  - Guard em `apps/api/src/common/auth/auth.guard.ts`
- **Row-level permission**:
  - `checkRowLevelPermission(...)` em `apps/api/src/common/auth/util.ts`

Regras:
- Preferir declarar **roles** no resolver/controller com `@AllowAuthenticated(...)`.
- Para autorização por recurso (row-level), centralizar em util/service (ex.: `checkRowLevelPermission`) e **chamar antes** da ação.
- Evitar lógica de permissão duplicada em múltiplos lugares; se um padrão se repetir, mover para util do `common/auth` ou para o service do domínio.

### DTOs / Inputs / Entities

Padrão observado:
- Args/inputs tipados e organizados por domínio (ex.: `apps/api/src/models/bookings/graphql/dtos/*`).
- Entities GraphQL por domínio (ex.: `apps/api/src/models/bookings/graphql/entity/*`).
- DTOs comuns em `apps/api/src/common/dtos/*`.

Regras:
- **Inputs GraphQL** (Create/Update/Filter) devem ficar próximos do domínio (em `graphql/dtos`).
- Reutilizar DTOs comuns apenas quando forem realmente genéricos.

### Como criar um novo módulo/domínio no backend

Checklist recomendado (alinhado ao padrão atual):

1. Criar `apps/api/src/models/<domain>/`
2. Criar `<domain>.module.ts` registrando `Resolver`, `Service` e `Controller` (se existir REST).
3. Implementar `graphql/`:
   - `*.resolver.ts`
   - `*.service.ts`
   - `dtos/` (args/inputs)
   - `entity/` (types GraphQL)
4. (Opcional) Implementar `rest/` com controller.
5. Registrar o module no `AppModule` (ver `apps/api/src/app.module.ts`).

### O que evitar no backend

- **Regra de negócio grande** em resolver/controller.
- **Acesso direto ao Prisma** fora do `PrismaService` injetado.
- **Duplicação de validações/autorizações**: preferir util comum (`common/auth`) ou service do domínio.
- **Misturar mudanças estruturais com regras** (refatoração e mudança de comportamento na mesma PR).

---

## Organização do frontend (Next.js/React) — `apps/web*`

### Padrão atual encontrado

- Os apps web usam o **App Router**:
  - Ex.: `apps/web/src/app/layout.tsx`, `apps/web/src/app/page.tsx`, rotas em `apps/web/src/app/<route>/page.tsx`.
- Existe alias TS para código local do app:
  - `@/*` → `apps/web/src/*` (ver `apps/web/tsconfig.json`).
- Integrações e shared packages:
  - `apps/web/src/app/layout.tsx` compõe providers e UI:
    - `ApolloProvider` em `@mockp/network/src/config/apollo`
    - `SessionProvider`, `Header`, `ToastContainer`, `Container` em `@mockp/ui/...`
    - Tipos como `MenuItem` em `@mockp/util/types`

### Onde deve ficar o quê (regra prática)

- **Rota/página (page.tsx)**:
  - Deve ser o “ponto de montagem”: selecionar template/página e providers locais.
  - Exemplo real: `apps/web/src/app/search/page.tsx` envolve `SearchPage` com `FormProviderSearchGarage`.

- **UI reutilizável**:
  - Vai para `libs/ui/src/components/...` (Atomic Design).
  - Templates prontos de página devem ficar em `libs/ui/src/components/templates/*` (como já existe: `SearchPage`).

- **Estado e regras de tela**:
  - Preferir concentrar em:
    - providers em `libs/forms` (quando for uma “feature” de formulário reutilizável), ou
    - hooks/componentes locais da rota (quando for específico daquela rota).

### Critérios: componente local vs shared UI

- Mantenha **local ao módulo/rota** quando:
  - o componente é muito específico do fluxo (ex.: “BookingTimelineCard” só existe em uma tela),
  - depende de comportamento/regra de negócio daquela rota,
  - está em evolução rápida e não há reutilização comprovada.

- Promova para **`libs/ui`** quando:
  - o componente é puramente visual e reutilizável (botões, inputs, layout, cards genéricos),
  - há pelo menos 2 usos reais em apps/rotas diferentes,
  - não depende de detalhes de GraphQL nem do domínio (ex.: não “embutir” queries/mutations no componente shared).

### Evitar “arquivos gigantes”

Regras:
- `page.tsx` deve ficar pequeno (montagem e composição).
- Se uma tela crescer:
  - mover “blocos” para um `template` em `libs/ui` (se reutilizável), ou
  - criar componentes locais próximos à rota (se específicos).
- Evitar múltiplos componentes aninhados dentro do mesmo arquivo sem necessidade.

### Formulários, filtros, tabelas, dialogs e ações

Padrão existente:
- Providers de formulário em `libs/forms` (ex.: `FormProviderSearchGarage`).

Regras recomendadas:
- Formulário com lógica/validação reutilizável: encapsular em `libs/forms/src/<feature>` (provider + schemas).
- Componentes de apresentação: `libs/ui` (atoms/molecules/organisms).
- Operações de rede: `libs/network` (documents + fetch/client) — não espalhar `fetch` cru na UI.

### O que evitar no frontend

- Duplicar lógica (ex.: transformar filtros/payloads em várias telas).
- Criar componentes “genéricos demais” sem necessidade (abstração prematura).
- Espalhar regra de negócio na UI (principalmente decisões de autorização/fluxo que deveriam vir do backend).

---

## Comunicação frontend/backend via GraphQL

### Onde o GraphQL vive no projeto

- **Schema** gerado pelo backend: `apps/api/src/schema.gql`
- **Documents (queries/mutations/fragments)**:
  - `libs/network/src/gql/queries.graphql`
- **Tipos e documents gerados (codegen)**:
  - `libs/network/src/gql/generated.tsx`
- **Config do codegen**:
  - `libs/network/codegen.ts` aponta para `../../apps/api/src/schema.gql` e gera em `libs/network/src/gql/generated.tsx`.

### Fluxo padrão (contrato)

Fluxo esperado:

UI → (template/component) → GraphQL hook/service → query/mutation → resolver → service → Prisma/banco

No Mockp hoje, duas formas principais aparecem:

- **Client-side Apollo**:
  - `libs/network/src/config/apollo.tsx` cria o `ApolloClient` e injeta `authorization` via `/api/auth/token`.
- **Server-side fetch util (NextAuth / Node)**:
  - `libs/network/src/fetch/index.ts` (`fetchGraphQL`) executa requests tipadas usando `TypedDocumentNode` do codegen.

### Regras para manter contratos estáveis

- **O frontend só depende do contrato GraphQL**, não de detalhes internos do backend.
  - Nada de “conhecer tabelas”, ids internos ou regras implícitas fora do schema.
- Mudanças no schema GraphQL devem ser:
  - **compatíveis** (de preferência) ou
  - feitas com **migração controlada** (deprecar campo, lançar novo, remover depois).
- Ao alterar:
  - **Inputs** (ex.: `Create*Input`) → revisar todos os pontos que montam `variables`.
  - **Campos de retorno** → revisar fragments e páginas que consomem.
- Evitar mudanças “silenciosas”:
  - Atualize `libs/network/src/gql/queries.graphql` (documents),
  - Rode/atualize o codegen (gera `generated.tsx`),
  - Atualize consumidores (apps e libs).

### Cuidados práticos ao alterar campos GraphQL

- Não renomear/remover campos sem:
  - procurar uso no `libs/network/src/gql/queries.graphql` e no uso de `*Document` em apps/libs,
  - ajustar fragments para reduzir repetição (o projeto já usa fragments, ex.: `BookingFields`).
- Preferir adicionar novos campos mantendo os antigos, e remover em um passo posterior.

---

## Shared UI e libs compartilhadas (`libs/*`)

### `libs/ui` (Shared UI)

Estrutura existente:
- `libs/ui/src/components/atoms`
- `libs/ui/src/components/molecules`
- `libs/ui/src/components/organisms`
- `libs/ui/src/components/templates`

Regras:
- Componentes shared devem ser:
  - **previsíveis** (props claras),
  - **sem side effects ocultos**,
  - **sem regra de negócio do domínio** (ex.: não decidir permissão/fluxo crítico dentro do componente).
- Templates podem compor atoms/molecules/organisms e receber dados/hook “de fora”.

### `libs/network` (GraphQL/network)

Responsabilidades (observadas):
- `src/gql/*`: documents + gerados (`generated.tsx`).
- `src/fetch/index.ts`: `fetchGraphQL` para execução tipada via `fetch`.
- `src/config/*`: configuração de Apollo e NextAuth:
  - `src/config/apollo.tsx`
  - `src/config/authOptions.ts`

Regras:
- Centralizar documents GraphQL em `libs/network/src/gql/*.graphql`.
- Gerados (`generated.tsx`) não devem ser editados manualmente.
- Não duplicar “fetch GraphQL” em apps; reutilizar `fetchGraphQL` ou o client configurado.

### `libs/forms` e `libs/util`

Regras:
- `libs/forms`: providers/schemas de formulários quando houver padrão reutilizável.
- `libs/util`: tipos e helpers sem dependência de UI/GraphQL.

### Importação/Exportação e acoplamento

Regras:
- Evitar dependências “cíclicas” entre libs (ex.: `ui` depender de app).
- Evitar importar caminhos muito internos de libs se existir ponto estável; quando necessário, manter o padrão consistente.
  - Ex.: hoje existe import direto `@mockp/ui/src/components/...` e `@mockp/network/src/...` (padrão existente, manter consistente).

---

## Padrões de nomenclatura (preservar o que já existe)

### Backend

- **Modules**: `<domain>.module.ts` (ex.: `bookings.module.ts`)
- **GraphQL**:
  - Resolver: `<domain>.resolver.ts`
  - Service: `<domain>.service.ts`
  - DTOs: `dtos/*.args.ts`, `dtos/*input.ts` (ex.: `CreateBookingInput`, `FindManyBookingArgs`)
  - Entity: `entity/<domain>.entity.ts`
- **REST**:
  - Controller: `<domain>.controller.ts`
- **Common**:
  - Auth: `apps/api/src/common/auth/*`
  - Prisma: `apps/api/src/common/prisma/*`

### Frontend

- **Routes**: `apps/<web-app>/src/app/<route>/page.tsx`
- **Layout**: `apps/<web-app>/src/app/layout.tsx`
- **Providers**:
  - UI providers em `libs/ui/...`
  - Forms providers em `libs/forms/...`
- **GraphQL**:
  - Documents em `libs/network/src/gql/*.graphql`
  - Generated em `libs/network/src/gql/generated.tsx`

---

## Regras para refatoração (sem caos)

- Refatorar **de forma incremental**:
  - pequenas PRs, cada uma com um objetivo claro.
- Não misturar:
  - **refatoração estrutural** (mover/renomear) com **mudança de regra de negócio**.
- Não alterar comportamento visual/funcional sem necessidade.
- Antes de mover algo para shared (`libs/ui`, `libs/forms`, `libs/util`):
  - validar reutilização real,
  - evitar “generalizar” cedo demais.
- Antes de alterar contrato GraphQL:
  - mapear consumers no frontend (`libs/network` + apps),
  - preferir mudanças compatíveis e migração controlada.
- Remover código morto:
  - apenas quando houver segurança (uso mapeado, sem rotas “ocultas”, etc.).

---

## Validação antes de finalizar alterações

### Comandos do repo

No root existem scripts Nx úteis:
- `yarn tsc`
- `yarn lint`
- `yarn build`
- `yarn validate` (formata + tsc + lint + build)

Checklist:
- Rodar pelo menos **typecheck + lint + build** na(s) área(s) alterada(s).
- Conferir:
  - imports quebrados,
  - exports das libs (`@mockp/*`),
  - GraphQL types/documents (`libs/network/src/gql/generated.tsx` atualizado quando schema mudar),
  - rotas do Next (App Router) após mover arquivos.
- Se algum comando falhar por problema pré-existente:
  - **documentar claramente** no PR/commit o erro já existente e o motivo de não ter sido corrigido.

---

## Recomendações para agentes/IA (e para contribuições em geral)

- Antes de alterar código:
  - entender a estrutura atual (apps vs libs; backend `models/*`; frontend `src/app/*`; GraphQL em `libs/network`).
- Preservar padrões já existentes:
  - backend por domínio com `graphql/` e `rest/`,
  - frontend com App Router e providers no `layout.tsx`,
  - GraphQL documents centralizados em `libs/network/src/gql`.
- Preferir mudanças pequenas e revisáveis.
- Explicar o motivo de alterações estruturais (ex.: por que mover algo para `libs/ui`).
- Não criar abstrações prematuras.
- Não mover arquivos sem atualizar todos os imports/exports.
- Não alterar contratos GraphQL sem atualizar consumidores e regenerar types.
- Ao final de uma mudança, sempre listar:
  - arquivos alterados,
  - validações executadas,
  - riscos conhecidos (ex.: mudança de contrato, migração parcial).

