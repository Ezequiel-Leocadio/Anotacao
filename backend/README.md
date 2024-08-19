
1º Passo Criar Arquivo .env

2º Passo Criar o Banco
### `create database notas`

3º Passo Executar as Migrations
### `yarn typeorm migration:run`

4º Instalar as Dependências

### `yarn install ou yarn`

5º Para Executar

### `yarn dev`


Exemplo arquivo .env.dev

TYPEORM_MIGRATION = ./src/database/migrations/*.ts<br>
TYPEORM_ENTITIES = ./src/entities/*.ts<br>
TYPEORM_MIGRATION_DIR = ./src/database/migrations<br>
TYPEORM_ENTITIES_DIR = ./src/entity<br>
KEY_TOKEN = senha_token<br>
DB_PASSWORD = senha_banco<br>
