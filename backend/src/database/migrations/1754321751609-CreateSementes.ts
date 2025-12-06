import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateSementes1754321751609 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "sementes",
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
            name: "outros_nomes",
            type: "varchar",
          },
          {
            name: "imagem",
            type: "LONGTEXT",
          },
          {
            name: "especie",
            type: "varchar",
          },
          {
            name: "origem",
            type: "varchar",
          },
          {
            name: "observacao",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "data",
            type: "timestamp",
          },

          {
            name: "dias_colheita",
            type: "integer",
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("sementes");
  }
}
