Mockp

Mockp é um sistema de gerenciamento de garagens para carros, motos, bicicletas e caminhões, permitindo que clientes possam alugar vagas e utilizar serviços adicionais de manobristas ou motoristas. O projeto está estruturado como um monorepositório e conta com diversas tecnologias modernas para garantir escalabilidade e flexibilidade.

## Tecnologias Utilizadas

- **Monorepo:** Gerenciado com Yarn Workspaces e Nx
- **Backend:** NestJS com suporte a GraphQL e REST
- **Frontend:** Next.js para as interfaces Web
- **Banco de Dados:** PostgreSQL
- **Autenticação:** Google OAuth e Autenticação padrão
- **API:** Apollo GraphQL e Swagger para documentação
- **Containerização:** Docker
- **Pagamentos:** Integração com Stripe
- **Mapas:** Integração com MapGL
- **Gerenciamento de Mídia:** Integração com Cloudinary

## Estrutura do Projeto

O Mockp é dividido em três aplicações web distintas:

- **Cliente:** Interface para os clientes alugarem vagas e gerenciarem seus veículos.
- **Managers:** Painel de administração para gerenciar vagas, valets e configurações.
- **Valets:** Interface dedicada para os valets receberem e entregarem veículos aos clientes.

Atualmente, a API está completa, enquanto as interfaces web ainda estão em desenvolvimento.

## Como Rodar o Projeto

### 1. Requisitos
Antes de iniciar, certifique-se de ter o **Yarn** instalado em sua máquina.

### 2. Instalação
Navegue até o diretório raiz do projeto e execute:
```sh
cd mockp
yarn install
```

### 3. Configuração de Variáveis de Ambiente
Preencha corretamente os arquivos `.env` em cada módulo do projeto, conforme os exemplos disponíveis.

### 4. Subindo a API
Navegue até o diretório da API e inicie os containers do Docker:
```sh
cd apps/api
docker-compose up -d
yarn dev
```

### 5. Subindo as Interfaces Web
#### Cliente
```sh
cd apps/web
yarn dev
```
#### Managers
```sh
cd apps/web-manager
yarn dev
```
#### Valets
```sh
cd apps/web-valet
yarn dev
```

## Contato
Caso tenha interesse em saber mais sobre o projeto ou rodar a aplicação, entre em contato comigo:

- **Email:** matheussousadg@gmail.com
- **LinkedIn:** [Matheus Depolito](https://www.linkedin.com/in/matheus-d-4001811a1/)

Sinta-se à vontade para contribuir ou dar feedback sobre o projeto!

