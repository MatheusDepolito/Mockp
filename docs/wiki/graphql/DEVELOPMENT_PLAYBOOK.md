# GraphQL Development Playbook (Contracts + Codegen)

Este documento é um checklist operacional para mudanças em **GraphQL** (contrato) e no fluxo de **codegen**, seguindo:
- [`docs/wiki/ARCHITECTURE.md`](../ARCHITECTURE.md)
- [`docs/wiki/START_HERE.md`](../START_HERE.md)
- [`CONTRACT_CHANGE_GUIDE.md`](./CONTRACT_CHANGE_GUIDE.md)

> Padrões reais do projeto:
> - Schema gerado: `apps/api/src/schema.gql`
> - Operations/fragments: `libs/network/src/gql/queries.graphql`
> - Tipos/documents gerados: `libs/network/src/gql/generated.tsx`
> - Config do codegen: `libs/network/codegen.ts` (schema aponta para `../../apps/api/src/schema.gql`)
> - Script real: `yarn workspace @mockp/network codegen` (executa `graphql-codegen --config codegen.ts`)

---

## Antes de mudar qualquer coisa

- [ ] Se a mudança altera schema/input/output/query/mutation, leia [`CONTRACT_CHANGE_GUIDE.md`](./CONTRACT_CHANGE_GUIDE.md).
- [ ] Identificar se é:
  - [ ] mudança de schema (backend)
  - [ ] mudança de operations/fragments (frontend/libs)
  - [ ] ambos
- [ ] Mapear consumidores no frontend:
  - [ ] uso de fragments/queries no `libs/network/src/gql/queries.graphql`
  - [ ] uso de `*Document` (documents tipados) em apps/libs

---

## Como o contrato vira tipos compartilhados (padrão do projeto)

No Mockp, o “compartilhamento de tipos” backend → frontend é feito via **GraphQL codegen**:

- **Schema source**: `apps/api/src/schema.gql`
- **Operations source**: `libs/network/src/gql/queries.graphql`
- **Output (SSOT para consumo)**: `libs/network/src/gql/generated.tsx`

Regras (MUST):
- [ ] `generated.tsx` é artefato gerado — não editar manualmente.
- [ ] Apps e libs devem importar **types e documents** do `generated.tsx`.
- [ ] Não “replicar” types do backend no frontend; a fonte é o contrato GraphQL.

Ponto de atenção real:
- [ ] O `codegen.ts` está com `watch: true`; em automação/CI pode ser necessário ajustar o modo de execução para não ficar em watch, se essa etapa for formalizada.

## Checklist obrigatório (MUST)

- [ ] **Não remover/renomear campo** sem mapear consumidores e planejar migração.
- [ ] **Evitar expor detalhes internos do backend** no schema (contrato deve ser estável).
- [ ] **Manter nomes consistentes** entre:
  - types
  - inputs
  - payloads
  - operações no `queries.graphql`
- [ ] Quando o schema mudar:
  - [ ] atualizar operations/fragments se necessário
  - [ ] regenerar/atualizar `libs/network/src/gql/generated.tsx`
  - [ ] atualizar consumidores (apps/libs)

---

## Evolução compatível (SHOULD)

- [ ] Preferir:
  - [ ] adicionar campos novos
  - [ ] manter campos antigos por um período
  - [ ] migrar consumidores
  - [ ] remover campos só depois

---

## Anti-padrões (AVOID)

- [ ] Mudança “silenciosa” no schema que quebra várias telas.
- [ ] Duplicar a mesma query/mutation fora de `libs/network/src/gql/queries.graphql`.
- [ ] Editar manualmente `generated.tsx`.

---

## Validação antes de finalizar

- [ ] Revisar `apps/api/src/schema.gql` (se foi regenerado/alterado).
- [ ] Revisar `libs/network/src/gql/queries.graphql` e fragments.
- [ ] Garantir coerência de tipos em `libs/network/src/gql/generated.tsx`.
- [ ] Rodar no root:
  - [ ] `yarn tsc`
  - [ ] `yarn lint`
  - [ ] `yarn build`

---

## Checklist de encerramento

- **Resumo**:
- **Schema mudou?**:
- **Operations/fragments mudaram?**:
- **Consumidores atualizados?**:
- **Validações executadas**:
- **Riscos conhecidos**:

