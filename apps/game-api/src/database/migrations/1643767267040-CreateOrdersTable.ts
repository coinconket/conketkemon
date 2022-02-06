import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateOrdersTable1643767267040 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DROP TYPE IF EXISTS order_status;
        CREATE TYPE order_status AS ENUM ('open', 'processing', 'closed', 'complete');
      `);

    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS orders(
        id INT GENERATED ALWAYS AS IDENTITY,
        from_address VARCHAR(100) NOT NULL,
        to_address VARCHAR(100) NOT NULL,
        transaction_hash VARCHAR(100) NOT NULL,
        transaction_json json NOT NULL,
        status order_status DEFAULT 'open' NOT NULL,
        created_at TIMESTAMPTZ DEFAULT now(),
        updated_at TIMESTAMPTZ DEFAULT now(),

        pokemon_id int NOT NULL,

        CONSTRAINT fk_pokemon
          FOREIGN KEY(pokemon_id)
            REFERENCES pokemons(id)
      )
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('orders');
    await queryRunner.query(`DROP TYPE order_status;`);
  }
}
