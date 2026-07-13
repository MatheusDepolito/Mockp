# Mockp — visão do produto (PT-BR)

> **Escopo:** este documento resume o que o produto **parece ser hoje** com base em evidências do repositório (apps, rotas, domínios da API e dados no Prisma).  
> **Não é um PRD oficial:** objetivos comerciais, SLA, jurídico e modelo de negócio final devem ser confirmados com a equipe de produto.  
> Para arquitetura técnica, comandos e fluxos de desenvolvimento, consulte [[START_HERE]] e [[ARCHITECTURE]].

---

## TL;DR

- O **Mockp** é uma plataforma monorepo com API NestJS e múltiplas aplicações web por perfil de operação.
- O domínio mais evidente no código atual gira em torno de **garagens, slots, reservas e operação valet**.
- Há integração com **Stripe** para checkout/sessões e uso de mídia/fotos nas jornadas.
- O documento descreve o estado observável no código; decisões de produto e regras finais exigem validação com negócio.

## O que o produto resolve

- Centraliza cadastro e operação de ativos e disponibilidade em um único ecossistema.
- Organiza jornadas diferentes para cliente final, operação/gestão e administração.
- Estrutura fluxos de reserva com estado temporal, histórico e responsabilidades por perfil.
- Sustenta cenários de cobrança digital via Stripe quando o fluxo exige pagamento.

---

## Estado atual do código (evidências)

### Base técnica confirmada

- API em **NestJS** com **GraphQL** como contrato principal e **REST** para fluxos HTTP específicos.
- Frontends em **Next.js** separados por persona operacional.
- Persistência em **PostgreSQL** via **Prisma**.

### Apps e personas (interpretação provável por rotas)

| Aplicação | Porta de dev | Interpretação provável |
| --- | --- | --- |
| **`apps/web`** (`@mockp/web`) | 3001 | App principal do usuário final: login/cadastro, busca, reservas e falha de reserva. |
| **`apps/web-manager`** (`@mockp/web-manager`) | 3002 | Operação de gestão: nova garagem, agents e visão de bookings. |
| **`apps/web-admin`** (`@mockp/web-admin`) | 3004 | Administração, incluindo gestão de administradores (`/manageAdmins`). |
| **`apps/web-agent`** (`@mockp/web-agent`) | 3003 | Perfil valet com rotas de trabalho operacional (`/my-trips`). |

Os nomes exatos das personas devem ser alinhados com produto. Consulte [[security/ROLE_PERSONA_MATRIX]] para o status de confiança por papel.

### Domínios observáveis na API e nos dados

- **Identidade e acesso:** `User`, credenciais locais/OAuth, papéis de staff (`Admin`, `Manager`, `Valet`) e cliente (`Customer`).
- **Estrutura de negócio:** `Company` e `Garage`, com `Address` e campos de verificação.
- **Capacidade operacional:** `Slot` por garagem (tipos associados ao contexto de veículo no modelo atual).
- **Reserva e ciclo de vida:** `Booking` com janela temporal, valor, estados e `BookingTimeline`.
- **Qualidade/feedback:** `Review` associada a cliente e garagem.

---

## Interpretação de negócio (com cautela)

- O produto se comporta como uma plataforma de operação de estacionamento com múltiplos perfis.
- A divisão por apps sugere separação de responsabilidades por papel (cliente, gestão, valet e admin).
- O uso de Stripe indica jornadas com etapa de cobrança em algum ponto do fluxo.

Estas leituras são úteis para contexto, mas não substituem regra oficial de produto.

---

## Mini glossário (PT-BR ↔ termos do código)

- **Usuário** ↔ `User`
- **Empresa** ↔ `Company`
- **Garagem** ↔ `Garage`
- **Endereço** ↔ `Address`
- **Vaga/slot** ↔ `Slot`
- **Reserva** ↔ `Booking`
- **Linha do tempo da reserva** ↔ `BookingTimeline`
- **Cliente** ↔ `Customer`
- **Avaliação** ↔ `Review`
- **Operador valet** ↔ `Valet`

---

## Pagamentos

O projeto integra **Stripe** no backend (checkout/sessões), e o frontend utiliza SDK público quando aplicável (variáveis em `.env.example`).  
Para detalhes técnicos, consulte os guias de REST/GraphQL e os exemplos em `docs/wiki/examples`.

---

## Limites desta visão

- Não confirma estratégia comercial final, pricing, jurídico ou SLA.
- Não garante que todo comportamento inferido por rotas está ativo em produção.
- Não substitui validação de autorização granular e regras de negócio com produto/engenharia.
- CI/CD, produção, observabilidade e segredos podem depender de infraestrutura fora do repositório.

---

## Leitura complementar

1. [[START_HERE]]  
2. [[CONTEXT_MAP]]  
3. [[ARCHITECTURE]]  
4. [[frontend/WEB_APPS_GUIDE]]  
5. [[PRODUCT_OVERVIEW_IMOBILIARIO_PT|Visão alternativa: cenário imobiliário (PT-BR)]]

---

**Manutenção:** quando o posicionamento do produto ou o comportamento do código mudar oficialmente, atualize este arquivo para manter alinhamento entre documentação e implementação.
