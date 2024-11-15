import { MigrationInterface, QueryRunner } from "typeorm";

export class UserUpdateId1728564987942 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        // 1. Add a new UUID column with default value
        await queryRunner.query(`
            ALTER TABLE "user"
            ADD COLUMN "id_new" uuid DEFAULT uuid_generate_v4();
          `);
      
          // 2. Copy the data from the old 'id' column into the new 'id_new' column (for existing records)
          await queryRunner.query(`
            UPDATE "user" SET "id_new" = uuid_generate_v4();
          `);
      
          // 3. Drop the old 'id' column
          await queryRunner.query(`
            ALTER TABLE "user" DROP COLUMN "id";
          `);
      
          // 4. Rename 'id_new' to 'id'
          await queryRunner.query(`
            ALTER TABLE "user" RENAME COLUMN "id_new" TO "id";
          `);
      
          // 5. Set the 'id' column as the primary key again
          await queryRunner.query(`
            ALTER TABLE "user" ADD PRIMARY KEY ("id");
          `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
         // 1. Add the old 'id' column back as integer
    await queryRunner.query(`
        ALTER TABLE "user" ADD COLUMN "id_old" serial;
      `);
  
      // 2. Drop the UUID 'id' column
      await queryRunner.query(`
        ALTER TABLE "user" DROP COLUMN "id";
      `);
  
      // 3. Rename 'id_old' to 'id'
      await queryRunner.query(`
        ALTER TABLE "user" RENAME COLUMN "id_old" TO "id";
      `);
  
      // 4. Set the 'id' column as the primary key again
      await queryRunner.query(`
        ALTER TABLE "user" ADD PRIMARY KEY ("id");
      `);
    }

}
