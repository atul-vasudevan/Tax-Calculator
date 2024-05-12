import { MigrationInterface, QueryRunner } from "typeorm";

export class SchemaUpdate1715502323003 implements MigrationInterface {
    name = 'SchemaUpdate1715502323003'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "calculation_history" DROP COLUMN "super"`);
        await queryRunner.query(`ALTER TABLE "calculation_history" ADD "super" numeric(10,2) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "calculation_history" DROP COLUMN "super"`);
        await queryRunner.query(`ALTER TABLE "calculation_history" ADD "super" integer NOT NULL`);
    }

}
