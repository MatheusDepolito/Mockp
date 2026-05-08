# Testing Guide

Este documento registra o estado atual e a estratégia recomendada para testes no Mockp.

---

## Estado atual

No estado atual do repositório:

- [ ] não foram encontrados `*.spec.ts`
- [ ] não foram encontrados `*.test.ts`
- [ ] não foi encontrado `jest.config.*`
- [ ] não há target/script de `test` no root

Portanto, testes ainda **não** são etapa operacional confiável para agents.

---

## Regra para agents

Enquanto não houver infraestrutura real de testes:

- [ ] não inventar framework de testes sem decisão humana
- [ ] não adicionar testes em padrão isolado sem configurar o projeto
- [ ] sempre rodar pelo menos:
  - [ ] `yarn tsc`
  - [ ] `yarn lint`
  - [ ] `yarn build`
- [ ] documentar quando uma mudança não pôde ser coberta por teste automatizado

---

## Estratégia recomendada futura

### Backend

Recomendação:

- unit tests para services
- integração para resolvers/controllers críticos
- testes de autorização para roles/row-level permission

Local sugerido:

- próximo do código (`*.spec.ts`) ou pasta `test/` por app, quando decidido pelo time

### Frontend

Recomendação:

- component tests para atoms/molecules genéricos
- testes de forms/schemas em `libs/forms`
- testes de fluxos críticos com e2e no futuro

### GraphQL

Recomendação:

- validar codegen em CI
- testar queries/mutations críticas contra schema

### Database

Recomendação:

- evitar testes que dependam do banco real local sem isolamento
- se houver integração, usar banco de teste explícito

---

## Stop conditions

Pare e peça decisão humana se:

- [ ] a mudança exige garantia forte e não há teste existente
- [ ] você precisa escolher Jest/Vitest/Playwright/Cypress
- [ ] precisa configurar banco de teste
- [ ] precisa adicionar target Nx de test
- [ ] a validação manual não é suficiente para risco da mudança

---

## Checklist de encerramento

Ao finalizar mudança sem testes:

- [ ] explicar que não há infra de testes existente
- [ ] listar validações executadas (`tsc`, `lint`, `build`)
- [ ] listar risco residual
- [ ] recomendar teste futuro se o fluxo for crítico

