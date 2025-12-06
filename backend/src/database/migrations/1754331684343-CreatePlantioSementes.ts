import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreatePlantioSementes1754331684343 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "plantio_sementes",
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
            name: "armazenamento",
            type: "integer",
          },

          {
            name: "quantidade",
            type: "double",
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
            name: "data_colheita",
            type: "timestamp",
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("plantio_sementes");
  }
}
