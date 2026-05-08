# Nx Development Playbook

Este documento descreve o uso real do Nx no Mockp.

> Estado atual: o projeto usa `nx` no root para orquestrar targets (`build`, `lint`, `tsc`) e cache. Não há `project.json` por app/lib no repositório hoje; os targets são inferidos principalmente pelos scripts dos `package.json`.

---

## Arquivos reais

- `nx.json`
- `package.json` (root)
- `apps/*/package.json`
- `libs/*/package.json`

---

## Scripts reais no root

No `package.json` raiz:

- `yarn tsc` → `yarn nx run-many -t tsc`
- `yarn lint` → `yarn nx run-many -t lint`
- `yarn build` → `yarn nx run-many -t build`
- `yarn validate` → `yarn format:write && yarn tsc && yarn lint && yarn build`

---

## Configuração real em `nx.json`

Targets com cache:

- `build`
- `lint`
- `tsc`

Relações configuradas:

- `build`, `lint` e `tsc` usam `dependsOn` para rodar dependências (`^build`, `^lint`, `^tsc`).
- `build` declara outputs como `.next`, `build` e `dist`.
- `defaultBase` é `main`.
- Nx Cloud está configurado por `nxCloudId`.

---

## Como usar em mudanças

- [ ] Ao alterar app/lib, preferir rodar validação via scripts do root:
  - [ ] `yarn tsc`
  - [ ] `yarn lint`
  - [ ] `yarn build`
- [ ] Se estiver mexendo em uma área específica, é aceitável rodar o script do package afetado primeiro (ex.: `apps/api` ou `apps/web`), e depois validar no root.
- [ ] Não adicionar `project.json` ou targets Nx customizados sem necessidade clara.

---

## Recomendações (não implementadas hoje)

- [ ] Adicionar scripts `affected` se o projeto passar a precisar de validação incremental mais formal em CI.
- [ ] Criar configuração explícita de projects somente se os inferred targets não forem suficientes.
- [ ] Adicionar target de `test` quando houver infraestrutura real de testes.

---

## Pontos de atenção

- Não há configuração de testes encontrada (`jest.config.*`, `*.spec.ts`, `*.test.ts`) no estado atual.
- Nem todas as libs têm scripts `build/lint/tsc`; validar run-many pode depender do que o Nx infere de cada package.

