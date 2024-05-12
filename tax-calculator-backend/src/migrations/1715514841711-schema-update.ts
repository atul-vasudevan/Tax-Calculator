import { MigrationInterface, QueryRunner } from "typeorm";

export class SchemaUpdate1715514841711 implements MigrationInterface {
    name = 'SchemaUpdate1715514841711'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "calculation_history" ADD "year" integer NOT NULL DEFAULT '2022'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "calculation_history" DROP COLUMN "year"`);
    }

}
