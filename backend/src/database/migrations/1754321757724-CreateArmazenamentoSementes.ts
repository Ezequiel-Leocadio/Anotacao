import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateArmazenamentoSementes1754321757724
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "armazenamento_sementes",
        columns: [
          {
            name: "id",
            type: "integer",
            isPrimary: true,
            isGenerated: true,
            generationStrategy: "increment",
          },

          {
            name: "semente",
            type: "integer",
          },
          {
            name: "quantidade",
            type: "double",
          },
          {
            name: "local_armazenamento",
            type: "varchar",
          },
          {
            name: "tratamento",
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
            name: "data_proximo_plantio",
            type: "timestamp",
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("armazenamento_sementes");
  }
}
