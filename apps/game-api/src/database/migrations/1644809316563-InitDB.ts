import {MigrationInterface, QueryRunner} from "typeorm";

export class InitDB1644809316563 implements MigrationInterface {
    name = 'InitDB1644809316563'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "pokemons" (
                "id" integer NOT NULL,
                "name" character varying NOT NULL,
                "url" character varying NOT NULL,
                "owner" character varying,
                "initial_price" character varying NOT NULL,
                "is_active" boolean NOT NULL DEFAULT true,
                CONSTRAINT "PK_a3172290413af616d9cfa1fdc9a" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE TYPE "public"."orders_status_enum" AS ENUM('open', 'processing', 'complete', 'closed')
        `);
        await queryRunner.query(`
            CREATE TABLE "orders" (
                "id" SERIAL NOT NULL,
                "from_address" character varying NOT NULL,
                "to_address" character varying NOT NULL,
                "transaction_hash" character varying NOT NULL,
                "transaction_json" character varying NOT NULL,
                "status" "public"."orders_status_enum" NOT NULL DEFAULT 'open',
                "created_at" TIMESTAMP NOT NULL DEFAULT '"2022-02-14T03:28:37.879Z"',
                "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
                "pokemon_id" integer,
                CONSTRAINT "PK_710e2d4957aa5878dfe94e4ac2f" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            ALTER TABLE "orders"
            ADD CONSTRAINT "FK_51ca501505e6cea2c70b0803887" FOREIGN KEY ("pokemon_id") REFERENCES "pokemons"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "orders" DROP CONSTRAINT "FK_51ca501505e6cea2c70b0803887"
        `);
        await queryRunner.query(`
            DROP TABLE "orders"
        `);
        await queryRunner.query(`
            DROP TYPE "public"."orders_status_enum"
        `);
        await queryRunner.query(`
            DROP TABLE "pokemons"
        `);
    }

}
