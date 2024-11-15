import { MigrationInterface, QueryRunner } from "typeorm";

export class UserUpdate1728549627609 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "user"
            DROP COLUMN "username",
            ALTER COLUMN "phone" DROP NOT NULL;
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "user"
            ADD COLUMN "username" character varying COLLATE pg_catalog."default",
            ALTER COLUMN "phone" SET NOT NULL;
        `);
    }
}
