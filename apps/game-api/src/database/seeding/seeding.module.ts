import { Module } from '@nestjs/common';
import { PokemonsModule } from '../../endpoints/pokemons/pokemons.module';
import { SeedingService } from './seeding.service';

@Module({
  imports: [PokemonsModule],
  providers: [SeedingService],
  exports: [SeedingService],
})
export class SeedingModule {}
