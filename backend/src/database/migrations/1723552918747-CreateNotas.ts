import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateNotas1723552918747 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "notas",
        columns: [
          {
            name: "id",
            type: "integer",
            isPrimary: true,
            isGenerated: true,
            generationStrategy: "increment",
          },
          {
            name: "title",
            type: "varchar",
          },

          {
            name: "icon",
            type: "varchar",
          },
          {
            name: "id_nivel",
            type: "integer",
          },

          {
            name: "anotacao",
            type: "text",
            isNullable: true,
          },

          {
            name: "tipo",
            type: "varchar", //pasta/anotacao/lista
          },

          {
            name: "usuario",
            type: "integer",
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

        foreignKeys: [
          {
            name: "FKNotaUsuario",
            referencedTableName: "usuarios",
            referencedColumnNames: ["id"],
            columnNames: ["usuario"],
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("notas");
  }
}
