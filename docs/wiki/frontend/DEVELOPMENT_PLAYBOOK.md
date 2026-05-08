# Frontend Development Playbook (Next.js/React) — `apps/web*`

Este documento é um checklist operacional para implementar mudanças no **frontend** seguindo os padrões descritos em:
- [`docs/wiki/ARCHITECTURE.md`](../ARCHITECTURE.md)
- [`docs/wiki/START_HERE.md`](../START_HERE.md)
- [`COMPONENT_GUIDE.md`](./COMPONENT_GUIDE.md)

> Padrões reais do projeto:
> - Rotas: `apps/web/src/app/*` (App Router)
> - `libs/ui`: contém UI compartilhada e também componentes/templates de produto em `components/{atoms,molecules,organisms,templates}`
> - Forms: `libs/forms/*`
> - GraphQL: `libs/network/src/gql/queries.graphql` + `libs/network/src/gql/generated.tsx`

---

## Antes de implementar

- [ ] Identificar qual app será alterado (`apps/web`, `apps/web-admin`, `apps/web-manager`, `apps/web-valet`).
- [ ] Mapear rota(s) afetadas em `src/app/<route>/`.
- [ ] Procurar template/componente existente em `libs/ui/src/components/*` antes de criar um novo.
- [ ] Classificar mudança:
  - [ ] bugfix
  - [ ] feature
  - [ ] refatoração
  - [ ] ajuste de contrato GraphQL

---

## Onde colocar a mudança (decisão rápida)

- [ ] `apps/<web-app>/src/app/<route>/page.tsx`: montagem/composição (não virar “arquivo gigante”).
- [ ] `libs/ui/src/components/*`: UI compartilhada e feature UI reutilizada entre apps.
- [ ] `libs/forms/*`: providers/schemas/estado de formulário reaproveitável.
- [ ] `libs/network/*`: documents/tipos/config de GraphQL (não espalhar `fetch` cru na UI).

---

## Como o frontend “referencia os tipos do backend” (padrão do projeto)

No Mockp, o compartilhamento de tipos entre backend e frontend acontece via **contrato GraphQL + codegen**, não por import direto de types do backend.

Fluxo real:
- Backend gera/expõe schema em `apps/api/src/schema.gql`
- `libs/network/codegen.ts` aponta para esse schema e gera:
  - `libs/network/src/gql/generated.tsx`
- Os apps/imports usam os types/documents gerados (ex.: `LoginDocument`, `GetAuthProviderDocument`, `AuthProviderType`)

Regras (MUST):
- [ ] **Não importar tipos do backend** diretamente nos apps web (evitar acoplamento).
- [ ] Usar sempre:
  - [ ] documents/fragments em `libs/network/src/gql/queries.graphql`
  - [ ] types/documents gerados em `libs/network/src/gql/generated.tsx`

---

## Padrões de chamadas de API no frontend (GraphQL e REST)

### GraphQL

Existem dois caminhos reais no projeto:

- **Client-side (Apollo)**:
  - Provider em `libs/network/src/config/apollo.tsx`
  - Usado no layout do app (ex.: `apps/web/src/app/layout.tsx`)
- **Server-side (fetch tipado)**:
  - `fetchGraphQL` em `libs/network/src/fetch/index.ts`
  - Usado por integrações server-side (ex.: NextAuth em `libs/network/src/config/authOptions.ts`)

Regras (MUST):
- [ ] Para GraphQL, preferir `libs/network` (não criar `fetch('/graphql')` novo em cada app).

### REST (quando necessário)

O backend expõe REST em `apps/api/src/models/<domain>/rest/*.controller.ts`.  
Quando o frontend precisar consumir REST (recomendação: apenas quando fizer sentido), seguir:

Regra do projeto:

> Use GraphQL para dados da aplicação e telas. Use REST para integrações, webhooks, arquivos, redirects e endpoints HTTP específicos.  
> Só gere contratos REST tipados quando o frontend realmente consumir esses endpoints.

Regras (SHOULD):
- [ ] Centralizar chamadas REST também em `libs/network` (recomendação), em um helper similar ao `fetchGraphQL` (ex.: `fetchREST`) para:
  - padronizar headers/auth
  - padronizar tratamento de erro
  - evitar duplicação por app
- [ ] Evitar “misturar” REST e GraphQL para o mesmo caso de uso sem motivo claro.
- [ ] Se o endpoint REST interno for consumido pelo frontend, seguir o playbook: [`../rest/DEVELOPMENT_PLAYBOOK.md`](../rest/DEVELOPMENT_PLAYBOOK.md).

## Atomic Design em `libs/ui` (como decidir)

> Estrutura real: `libs/ui/src/components/{atoms,molecules,organisms,templates}`.

Ponto de atenção real:
- [ ] `libs/ui` não contém apenas componentes genéricos; vários `organisms`/`templates` atuais usam GraphQL, `next-auth`, permissões ou regras de tela. Ao editar esses arquivos, trate-os como feature UI compartilhada, não como atoms/molecules genéricos.
- [ ] Para decisões de local vs shared UI, leia [`COMPONENT_GUIDE.md`](./COMPONENT_GUIDE.md).

- [ ] **Atom**: peça mínima (visual), “dumb”, sem domínio.
  - Ex.: `Container` já é usado no layout do app.
- [ ] **Molecule**: composição pequena (atoms), pode ter lógica leve de UI.
- [ ] **Organism**: bloco maior/seção (ex.: `Header`).
- [ ] **Template**: composição de página reutilizável (ex.: `SearchPage`).

### Regra de fronteira (MUST)

- [ ] Se depende de regra de negócio, permissão específica, ou detalhes de GraphQL:
  - [ ] **não** promover como atom/molecule genérico em `libs/ui`
  - [ ] manter local à rota/feature ou em lib específica (recomendação)

---

## Checklist obrigatório (MUST)

- [ ] Antes de criar componente novo, procurar se já existe em `libs/ui`.
- [ ] Manter `page.tsx` pequeno (monta providers + template/component).
- [ ] Ao refatorar, preservar comportamento visual e funcional.
- [ ] Ao mover/renomear arquivos, atualizar todos os imports/exports.
- [ ] Evitar duplicar lógica de filtro/form/dialog/actions em várias telas:
  - [ ] extrair para hook/provider/util quando houver padrão repetido

---

## Integrações já existentes (referência real)

- Apollo client/provider está em `libs/network/src/config/apollo.tsx`.
- NextAuth config está em `libs/network/src/config/authOptions.ts`.

Regras:
- [ ] Não duplicar configuração de client/auth por app sem motivo forte.
- [ ] Preferir reuso via `libs/network` e `libs/ui`.

---

## Validação antes de finalizar

No root:
- [ ] `yarn tsc`
- [ ] `yarn lint`
- [ ] `yarn build`

Se mexeu em GraphQL:
- [ ] garantir que documents/tipos (`libs/network/src/gql/*`) estão coerentes com o schema do backend.

---

## Checklist de encerramento (resposta do agente/dev)

- **Resumo**:
- **Arquivos alterados**:
- **Padrões seguidos**:
- **Validações executadas**:
- **Riscos conhecidos**:
- **Próximos passos**:

