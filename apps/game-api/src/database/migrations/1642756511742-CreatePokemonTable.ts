import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreatePokemonTable1642756511742 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS pokemons(
        id INT PRIMARY KEY,
        name VARCHAR(100),
        url VARCHAR(320),
        owner VARCHAR(64),
        initial_price VARCHAR(20),
        is_active BOOLEAN DEFAULT TRUE
      )
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE IF EXISTS pokemons;`);
  }
}
