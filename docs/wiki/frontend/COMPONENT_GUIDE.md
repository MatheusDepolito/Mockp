# Frontend Component Guide

Este guia ajuda a decidir onde criar componentes, hooks, forms e lógica de UI no frontend do Mockp.

Leia junto com:
- [`DEVELOPMENT_PLAYBOOK.md`](./DEVELOPMENT_PLAYBOOK.md)
- [`../graphql/CONTRACT_CHANGE_GUIDE.md`](../graphql/CONTRACT_CHANGE_GUIDE.md)

---

## Estado real do projeto

- Apps usam Next.js App Router em `apps/web*/src/app/*`.
- `page.tsx` costuma montar providers/templates.
- `libs/ui` contém:
  - atoms/molecules genéricos
  - organisms/templates reutilizados
  - feature UI que consome GraphQL, sessão e permissões
- `libs/forms` centraliza `react-hook-form`, `zod`, providers e schemas.
- `libs/network` centraliza GraphQL codegen/Apollo/fetch.
- `libs/util` contém hooks/utilitários compartilhados.

---

## Onde criar uma nova tela

1. [ ] Criar rota em `apps/<web-app>/src/app/<route>/page.tsx`.
2. [ ] Manter `page.tsx` pequeno.
3. [ ] Se precisar de provider de form, usar/criar em `libs/forms`.
4. [ ] Se a tela é reutilizável entre apps, criar template em `libs/ui/src/components/templates`.
5. [ ] Se a tela é específica de um app e não há reuso, manter composição local.

---

## Component local vs `libs/ui`

### Manter local quando

- [ ] só é usado em uma rota/app
- [ ] depende de regra específica daquela tela
- [ ] está em descoberta/refatoração
- [ ] usa GraphQL muito específico e não há reuso

### Mover para `libs/ui` quando

- [ ] é usado por mais de uma tela/app
- [ ] tem API de props clara
- [ ] não depende de `apps/*`
- [ ] é um building block visual ou feature UI compartilhada

### Atom/Molecule genérico

Use para componentes visuais puros:

- `Button`
- `Container`
- input/label/error
- badge/switch/dialog genérico

Regras:

- [ ] sem GraphQL
- [ ] sem regra de negócio
- [ ] sem permissão
- [ ] props simples

### Organism/Template de produto

Pode conter GraphQL/sessão/permissão quando for feature UI compartilhada.

Regras:

- [ ] nome deve refletir domínio/uso
- [ ] imports de `@mockp/network/src/gql/generated` são aceitáveis quando o componente realmente orquestra dados
- [ ] não promover para atom/molecule genérico

---

## Hooks/services no frontend

Estado atual:

- Hooks utilitários vivem em `libs/util/hooks/*`.
- Form hooks/providers vivem em `libs/forms/*`.
- GraphQL client/documents vivem em `libs/network`.
- Muitos componentes usam `useQuery`/`useMutation` diretamente em `libs/ui`.

Recomendação:

- [ ] Hook genérico sem domínio → `libs/util/hooks`
- [ ] Hook/form schema de formulário → `libs/forms`
- [ ] Operação de rede/GraphQL → `libs/network` para contract; consumo pode ficar no componente/template
- [ ] Não criar “service” frontend por padrão se o padrão local usa Apollo hooks diretamente

---

## Forms

Padrão real:

- `react-hook-form`
- `zod`
- `zodResolver`
- providers em `libs/forms`

Checklist:

- [ ] criar schema com `zod`
- [ ] exportar `FormType*` com `z.infer`
- [ ] criar hook `useForm*`
- [ ] criar provider se a tela precisa compartilhar estado entre componentes
- [ ] alinhar payload final com GraphQL input gerado em `libs/network`

---

## Stop conditions

Pare e revise se:

- [ ] um componente “genérico” precisa importar GraphQL
- [ ] um componente local começou a ser usado em 2+ apps
- [ ] um template ficou com múltiplas responsabilidades
- [ ] há duplicação de form schema/filtro/action
- [ ] uma mudança visual altera comportamento funcional
- [ ] uma mudança em `libs/ui` afeta vários apps

