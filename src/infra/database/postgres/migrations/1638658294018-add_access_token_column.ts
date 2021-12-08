import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class addAccessTokenColumn1638658294018 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      "account",
      new TableColumn({
        name: "access_token",
        type: "varchar",
        isNullable: true,
        isUnique: true,
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn("account", "access_token");
  }
}
