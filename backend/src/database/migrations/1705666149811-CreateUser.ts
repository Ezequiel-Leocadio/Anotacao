import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateUser1705666149811 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "usuarios",
        columns: [
          {
            name: "id",
            type: "integer",
            isPrimary: true,
            isGenerated: true,
            generationStrategy: "increment",
          },
          {
            name: "nome",
            type: "varchar",
          },
          {
            name: "usuario",
            type: "varchar",
            isUnique: true,
          },

          {
            name: "senha",
            type: "varchar",
          },

          {
            name: "ativo",
            type: "boolean",
          },

          {
            name: "admin",
            type: "boolean",
            default: false,
          },

          {
            name: "createdAt",
            type: "timestamp",
            default: "now()",
          },
          {
            name: "updatedAt",
            type: "timestamp",
            default: "now()",
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("usuarios");
  }
}
