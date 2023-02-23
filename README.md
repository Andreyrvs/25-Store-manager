# Store Manager

## Contexto

Este projeto trata-se de um sistema de gerenciamento de vendas no formato dropshipping em que será possível criar, visualizar, deletar e atualizar produtos e vendas. Utiliza o banco de dados MySQL para a gestão de dados.

## Técnologias usadas

Back-end:
> Desenvolvido usando: NodeJS, ExpressJS, MYSQL, Docker, Mocha, Chai, Sinon.

## Instalando Dependências

* clone o projeto:

  ```bash
  git clone git@github.com:Andreyrvs/store-manager.git
  ```

* Entre no diretório

  ```bash
  cd store-manager
  ```

> Dotenv

* Renomeie o arquivo `.env-example` para `.env`

> Docker

Por padrão essa API utiliza a Porta **3000** que esta na variavel de ambiente `PORT=`

1. Rode os serviços node e db com o comando:

    ```bash
    docker compose up -d
    ```

    1. Esses serviços irão inicializar um container chamado store_manager e outro chamado store_manager_db.

2. Rode o container store_manager via CLI ou abri-lo no VS Code.

    ```bash
    docker exec -it store_manager bash
    ```

    1. TODOS os comandos disponíveis no `package.json` (npm start, npm test:mocha, npm migration, ...) devem ser executados **DENTRO** do container, ou seja, no terminal que aparece após a execução do comando **docker exec** citado acima.

3. Instale as dependências.

    ```bash
    npm install
    ```

> Banco de dados

1. Cria o banco de dados

    ```bash
    npm run migration
    ```

2. Popule o banco de dados

    ```bash
    npm run seed
    ```

## Executando aplicação

* Para rodar o back-end:

  ```bash
  npm start
  ```

* Acesse a url

  ```bash
  localhost:3000/products
  ```

  > Ou faça um **get** usando insomnia, postman, etc....

* O retorno será:

  ```bash
    [
      {
        "id": 1,
        "name": "Martelo de Thor"
      },
      {
        "id": 2,
        "name": "Traje de encolhimento"
      },
      {
        "id": 3,
        "name": "Escudo do Capitão América"
      }
    ]
  ```

## Executando Testes

* Para rodar todos os testes:

  ```bash
  npm run test:mocha
  ```
