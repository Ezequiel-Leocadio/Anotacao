import { MigrationInterface, QueryRunner } from "typeorm";

export class InsertUser1723567999828 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager
      .createQueryBuilder()
      .insert()
      .into("usuarios")
      .values({
        id: 1,
        nome: "admin",
        usuario: "admin",
        senha: "$2a$08$lsEz.aKealIZZi4Xb9oyY.k6kfasmOVA4jfh8oEDPka/j39J1CW.K", //123
        ativo: true,
        admin: true,
      })
      .execute();
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager
      .createQueryBuilder()
      .delete()
      .from("usuarios")
      .where({ id: 1 })
      .execute();
  }
}
