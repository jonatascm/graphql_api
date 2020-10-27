import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class initialDb1602713849444 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.createTable(
      new Table({
        name: "users",
        columns: [
          {
            name: "id",
            type: "integer",
            unsigned: true,
            isPrimary: true,
            isGenerated: true,
            generationStrategy: "increment",
          },
          {
            name: "name",
            type: "varchar",
          },
          {
            name: "login",
            type: "varchar",
          },
          {
            name: "password",
            type: "varchar",
          },
        ],
      })
    );
    await queryRunner.createTable(
      new Table({
        name: "pictures",
        columns: [
          {
            name: "id",
            type: "integer",
            unsigned: true,
            isPrimary: true,
            isGenerated: true,
            generationStrategy: "increment",
          },
          {
            name: "path",
            type: "varchar",
          },
          {
            name: "user_id",
            type: "integer",
          },
        ],
        foreignKeys: [
          {
            name: "imageUser",
            columnNames: ["user_id"],
            referencedTableName: "users",
            referencedColumnNames: ["id"],
            onUpdate: "CASCADE",
            onDelete: "CASCADE",
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.dropTable("users");
    await queryRunner.dropTable("pictures");
  }
}
