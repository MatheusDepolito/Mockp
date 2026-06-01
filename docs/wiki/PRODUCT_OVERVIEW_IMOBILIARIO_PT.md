# Mockp como produto imobiliário — visão (PT)

> **Status:** cenário de produto paralelo (reenquadramento estratégico)
>
> Este documento descreve uma leitura de negócio em que a plataforma é usada para **imóveis** (casas/apartamentos para alugar ou vender).  
> O código atual do repositório continua refletindo majoritariamente o domínio de garagem/parking.  
> Use este texto como visão de produto e discussão de direção, não como contrato técnico já implementado.
>
> Para o retrato fiel do estado atual do código, veja [[PRODUCT_OVERVIEW_PT]].

---

## Em poucas palavras

Nesta visão, o **Mockp** é uma plataforma digital onde **corretor(a)** ou **empresa corretora** cadastra imóveis (casas e apartamentos), publica informações do ativo e conecta pessoas interessadas em **aluguel** ou **compra**.

A base técnica segue a mesma estrutura do monorepo:

- API NestJS (GraphQL como contrato principal, REST para fluxos HTTP específicos);
- aplicações web por perfil operacional;
- persistência em PostgreSQL com Prisma;
- integrações como Stripe e suporte a mídia/fotos.

---

## Quem opera a plataforma nesta visão

- **Corretora/empresa do corretor:** mantém carteira de imóveis e operação comercial.
- **Corretor(a):** cadastra imóveis, acompanha interesse e andamento de negociação/visitas.
- **Cliente final:** pesquisa imóveis e interage com anúncios/fluxos de interesse.
- **Administração:** governa permissões, contas e operação sistêmica.

Os nomes e os limites de atuação por papel devem ser validados com produto e regras de autorização da implementação.

---

## Modelo corretora, corretor e imóvel

- **Corretora (`Brokerage`):** carteira organizacional de imóveis e equipe.
- **Corretor (`Agent`):** pode atuar **sozinho** (`brokerageId` opcional) ou **vinculado** a uma corretora.
- **Imóvel (`Property`):** pode pertencer a uma corretora (`brokerageId` opcional) e sempre tem **corretor responsável** (`responsibleAgentId`).
- **Características (`PropertyFeature`):** contagens tipadas (quartos, ar-condicionado, vagas, etc.) via enum `PropertyFeatureType`.

Glossário técnico completo: [[DOMAIN_GLOSSARY_IMOBILIARIO_PT]].

---

## Cadastro de imóveis e características

Em vez de cadastro de garagem, esta visão trata cada registro como **imóvel/listagem** com:

- tipo do imóvel (ex.: casa, apartamento);
- finalidade comercial (alugar, vender, ou ambas);
- endereço e dados de localização;
- características do imóvel, incluindo contagens como:
  - quantidade de vagas para carros;
  - quantidade de aparelhos de ar-condicionado;
  - outros atributos relevantes para a comercialização.

As **fotos já suportadas** podem ser narradas como fotos do imóvel no anúncio.

---

## Apps e interpretação por persona (visão imobiliária)

| Aplicação | Interpretação nesta visão |
| --- | --- |
| **`apps/web`** | Portal do cliente: descoberta de imóveis, interesse e jornadas principais de usuário final. |
| **`apps/web-manager`** | Operação da corretora: cadastro e gestão de carteira de imóveis, organização do trabalho comercial. |
| **`apps/web-admin`** | Administração de contas, usuários administrativos e governança da plataforma. |
| **`apps/web-valet`** | Camada operacional de campo (ex.: apoio a visitas/rotinas presenciais), apenas como analogia de papel. |

> As rotas e labels atuais ainda podem mostrar terminologia de parking/valet. Esta tabela é uma interpretação de produto, não garantia de UX já renomeada.

---

## Pagamentos e fluxos financeiros

Nesta leitura, Stripe pode sustentar casos como:

- sinal/taxa de reserva;
- cobrança de serviços complementares;
- fluxos financeiros ligados à jornada comercial.

No estado atual do código, a evidência técnica é integração com checkout/sessões Stripe; o uso exato em vendas/aluguel depende de evolução de regras de negócio.

---

## Apêndice — mapeamento do repo atual para domínio imobiliário

| Conceito atual (repo) | Paralelo em imóveis | Fit | Observações |
| --- | --- | --- | --- |
| `Company` | Corretora / imobiliária | Forte | Estrutura organizacional equivalente. |
| `User` + papéis de staff | Corretor(a), admin, operação | Médio | Nomes e permissões exigem ajuste de semântica e política. |
| `Garage` | Imóvel ou listagem | Médio | Conceito de unidade física existe, mas vocabulário e regras mudam. |
| `Address` | Endereço do imóvel | Forte | Semântica praticamente direta. |
| `Slot` (tipos ligados a veículo) | Inventário/características do imóvel | Fraco | Requer remodelagem de schema, formulários e validações. |
| `Booking` + timeline/status | Interesse, visita, proposta, reserva de negociação | Fraco a médio | Pode inspirar jornada temporal, mas estados atuais são de parking/valet. |
| `Valet`/`my-trips` | Operação de campo para visitas | Fraco | Analogia útil, porém sem correspondência direta no naming atual. |
| Mídia/fotos | Fotos do imóvel | Médio | Viável por analogia; depende de onde o vínculo de mídia está hoje no modelo. |
| Stripe checkout/session | Taxa/sinal de jornada imobiliária | Médio | Base técnica existe; produto precisa definir quais eventos monetizar. |

---

## Limites e próximos passos

- Este documento não afirma que o domínio imobiliário já está implementado ponta a ponta.
- Para tornar a visão efetiva no produto, será necessário revisar modelo de dados, nomenclatura de rotas, formulários, permissões e regras de workflow.
- Mantenha [[PRODUCT_OVERVIEW_PT]] como referência de “estado atual do código” e este arquivo como “narrativa de direção de produto”.
