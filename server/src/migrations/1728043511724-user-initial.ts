import { MigrationInterface, QueryRunner } from 'typeorm';

export class User1713644582765 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS public."user"(
        id SERIAL NOT NULL,  -- Replaced UUID with SERIAL for auto-increment
        username character varying COLLATE pg_catalog."default",
        email character varying COLLATE pg_catalog."default" NOT NULL,
        password character varying COLLATE pg_catalog."default",
        phone character varying COLLATE pg_catalog."default" NOT NULL,
        "createdAt" timestamp with time zone NOT NULL DEFAULT now(),
        "updatedAt" timestamp with time zone NOT NULL DEFAULT now(),
        CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY (id),  -- id will be sequential
        CONSTRAINT "UQ_78a916df40e02a9deb1c4b75edb" UNIQUE (username)
      ) TABLESPACE pg_default;
    `);

    await queryRunner.query(`ALTER TABLE IF EXISTS public."user"OWNER to postgres;`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE IF EXISTS "user"`);
  }
}