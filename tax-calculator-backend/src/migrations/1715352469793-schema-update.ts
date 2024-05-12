import { MigrationInterface, QueryRunner } from "typeorm";

export class SchemaUpdate1715352469793 implements MigrationInterface {
    name = 'SchemaUpdate1715352469793'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "calculation_history" ("id" SERIAL NOT NULL, "super" integer NOT NULL, "income" integer NOT NULL, "super_included" boolean NOT NULL, "calculated_value" json NOT NULL, "created" TIMESTAMP NOT NULL DEFAULT now(), "userId" integer, CONSTRAINT "PK_29e4e767a26d2ddd26a2471a21c" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "username" character varying NOT NULL, "first_name" character varying NOT NULL, "last_name" character varying NOT NULL, "user_uuid" character varying NOT NULL, "created" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "calculation_history" ADD CONSTRAINT "FK_1c71e7fca8011001d949e585b7e" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "calculation_history" DROP CONSTRAINT "FK_1c71e7fca8011001d949e585b7e"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "calculation_history"`);
    }

}
