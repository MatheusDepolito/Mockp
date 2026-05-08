# REST Development Playbook (OpenAPI + Typed REST)

Este documento define a estratégia e o passo a passo para endpoints REST no Mockp.

Regra principal:

> Use GraphQL para dados da aplicação e telas. Use REST para integrações, webhooks, arquivos, redirects e endpoints HTTP específicos.  
> Só gere contratos REST tipados quando o frontend realmente consumir esses endpoints.

Este playbook complementa:
- [`../ARCHITECTURE.md`](../ARCHITECTURE.md)
- [`../backend/DEVELOPMENT_PLAYBOOK.md`](../backend/DEVELOPMENT_PLAYBOOK.md)
- [`../frontend/DEVELOPMENT_PLAYBOOK.md`](../frontend/DEVELOPMENT_PLAYBOOK.md)

---

## Quando usar REST

Use REST quando o endpoint for mais adequado ao protocolo HTTP do que ao contrato GraphQL:

- [ ] webhooks e callbacks externos (Stripe, provedores externos)
- [ ] redirects e fluxos que dependem de resposta HTTP específica
- [ ] upload/download/streaming de arquivos
- [ ] healthchecks/status
- [ ] integrações que exigem endpoint REST
- [ ] casos em que cache HTTP/CDN é parte importante da solução

Evite REST para dados normais de tela quando GraphQL já atende bem.

---

## Quando gerar contrato REST tipado

Não gerar contrato REST tipado para todo controller automaticamente só porque ele existe.

Gerar contrato tipado quando:

- [ ] o frontend consome o endpoint REST diretamente
- [ ] há risco de payload/response divergir entre backend e frontend
- [ ] o endpoint tem DTO de entrada/saída estável
- [ ] o endpoint será reutilizado por mais de um app/lib

Exemplo candidato atual:
- `POST /stripe`, consumido por `libs/ui/src/components/organisms/BookSlotPopup.tsx`

---

## Fonte de verdade para REST tipado

Fluxo recomendado:

```txt
NestJS Controller/DTOs REST
        ↓
Swagger/OpenAPI (`@nestjs/swagger`)
        ↓
openapi.json
        ↓
openapi-typescript
        ↓
libs/network/src/rest/generated/schema.ts
        ↓
fetchREST/client tipado em libs/network
        ↓
apps/libs frontend consomem sem types manuais
```

Regras:

- [ ] DTOs REST do backend continuam sendo a origem do contrato.
- [ ] `openapi.json` é o contrato publicado/gerado.
- [ ] Types gerados em `libs/network` são o contrato consumido pelo frontend.
- [ ] Não criar types REST manuais no frontend quando houver contrato gerado.

---

## Passo a passo para criar endpoint REST

### 1) Backend: controller e service

- [ ] Escolher o domínio em `apps/api/src/models/<domain>/rest/`.
- [ ] Criar/alterar `<domain>.controller.ts`.
- [ ] Manter controller fino:
  - [ ] recebe `@Body`, `@Query`, `@Param`
  - [ ] aplica auth/permissão quando necessário
  - [ ] delega para service
- [ ] Preferir o mesmo service usado pelo GraphQL quando a regra de negócio for a mesma.

### 2) Backend: DTOs e Swagger

- [ ] Criar/ajustar DTOs em `rest/dtos/*`.
- [ ] Derivar DTOs REST a partir de `rest/entity/*` quando fizer sentido.
- [ ] Usar decorators do `@nestjs/swagger` nos controllers:
  - [ ] `@ApiTags(...)`
  - [ ] `@ApiBearerAuth()` quando autenticado
  - [ ] `@ApiOkResponse(...)`, `@ApiCreatedResponse(...)`, etc.
- [ ] Criar DTO/entity de response se o retorno não estiver claro no OpenAPI.

### 3) Gerar/atualizar OpenAPI

Recomendação para implementação futura:

- [ ] criar um script no backend para gerar `apps/api/openapi.json` sem depender de servidor rodando
- [ ] usar a mesma configuração de Swagger que hoje está em `apps/api/src/main.ts`
- [ ] versionar ou validar o output conforme decisão do time

### 4) Gerar types REST para frontend

Recomendação de tooling:

- [ ] usar `openapi-typescript`
- [ ] gerar output em `libs/network/src/rest/generated/schema.ts`

Estrutura sugerida:

```txt
libs/network/
  src/
    rest/
      generated/
        schema.ts
      fetchREST.ts
      endpoints/
        stripe.ts
```

### 5) Criar consumo tipado em `libs/network`

- [ ] Centralizar chamadas REST internas em `libs/network`.
- [ ] Criar wrapper/helper tipado (ex.: `fetchREST`) ou endpoint helper específico.
- [ ] Padronizar:
  - [ ] base URL (`NEXT_PUBLIC_API_URL`)
  - [ ] headers
  - [ ] auth token quando necessário
  - [ ] tratamento de erro

### 6) Migrar o frontend

- [ ] Remover `fetch` direto do componente/app quando for endpoint interno.
- [ ] Consumir helper tipado de `libs/network`.
- [ ] Não criar `interface`/`type` manual do payload ou response se existir type gerado.

### 7) Validar

- [ ] `yarn tsc`
- [ ] `yarn lint`
- [ ] `yarn build`
- [ ] conferir se OpenAPI/types gerados estão atualizados

---

## Scripts sugeridos (quando implementar)

Exemplo de intenção, não implementado ainda:

```json
{
  "scripts": {
    "codegen:gql": "yarn workspace @mockp/network codegen",
    "codegen:rest:openapi": "tsx apps/api/scripts/generate-openapi.ts",
    "codegen:rest:types": "openapi-typescript apps/api/openapi.json -o libs/network/src/rest/generated/schema.ts",
    "codegen:rest": "yarn codegen:rest:openapi && yarn codegen:rest:types",
    "codegen": "yarn codegen:gql && yarn codegen:rest"
  }
}
```

---

## Anti-padrões

- [ ] Usar REST para contornar um contrato GraphQL que deveria ser evoluído.
- [ ] Criar types manuais no frontend para endpoint REST já tipado por OpenAPI.
- [ ] Gerar client/types REST para controllers que o frontend não usa.
- [ ] Duplicar regra de negócio entre resolver GraphQL e controller REST.
- [ ] Deixar Swagger incompleto e assumir que types gerados serão confiáveis.

---

## Checklist de encerramento

Ao finalizar uma mudança REST:

- **Endpoint REST criado/alterado**:
- **Motivo para usar REST**:
- **OpenAPI atualizado?**:
- **Types REST gerados?**:
- **Frontend usa helper tipado em `libs/network`?**:
- **Validações executadas**:
- **Riscos conhecidos**:

