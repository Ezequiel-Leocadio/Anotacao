import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateLista1723552926658 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "listas",
        columns: [
          {
            name: "id",
            type: "integer",
            isPrimary: true,
            isGenerated: true,
            generationStrategy: "increment",
          },

          {
            name: "id_nota",
            type: "integer",
          },

          {
            name: "posicao",
            type: "integer",
          },

          {
            name: "descricao",
            type: "text",
          },

          {
            name: "marcado",
            type: "booleam",
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

        foreignKeys: [
          {
            name: "FKListaNotas",
            referencedTableName: "notas",
            referencedColumnNames: ["id"],
            columnNames: ["id_nota"],
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("listas");
  }
}
