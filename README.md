# Store Manager

## Contexto

Este projeto trata-se de um sistema de gerenciamento de vendas no formato dropshipping em que será possível criar, visualizar, deletar e atualizar produtos e vendas. Utiliza o banco de dados MySQL para a gestão de dados.

## Técnologias usadas

Back-end:
> Desenvolvido usando: NodeJS, ExpressJS, MYSQL, Docker

## Instalando Dependências

* clone o projeto:

  ```bash
  git clone git@github.com:Andreyrvs/store-manager.git
  ```

> Dotenv

Renomeie o arquivo `.env-example` para .env e coloque as credenciais:

 ```bash
    MYSQL_HOST=store_manager_db
    MYSQL_USER=root
    MYSQL_PASSWORD=password
    MYSQL_DATABASE=StoreManager
    PORT=3000
  ```

> Docker

  Rode os serviços node e db com o comando:

  ```bash
    docker compose up -d
  ```

  Esses serviços irão inicializar um container chamado store_manager e outro chamado store_manager_db.

  Rode o container store_manager via CLI ou abri-lo no VS Code.

  ```bash
    docker exec -it store_manager bash
  ```

  Instale as dependências.

  ```bash
    npm install
  ```

  TODOS os comandos disponíveis no package.json (npm start, npm test, npm run dev, ...) devem ser executados DENTRO do container, ou seja, no terminal que aparece após a execução do comando docker exec citado acima.

> Banco de dados

  Cria o banco de dados

  ```bash
    npm run migration
  ```

  ```bash
    npm run seed
  ```

## Executando aplicação

* Para rodar o back-end:

  ```bash
     npm start
  ```

## Executando Testes

* Para rodar todos os testes:

  ```bash
    npm run test:mocha
  ```
