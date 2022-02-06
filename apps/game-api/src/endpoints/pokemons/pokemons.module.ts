import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { PokemonsService } from './pokemons.service';
import { PokemonsController } from './pokemons.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pokemon } from './entities/pokemon.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Pokemon]), HttpModule],
  controllers: [PokemonsController],
  providers: [PokemonsService],
  exports: [TypeOrmModule, PokemonsService],
})
export class PokemonsModule {}
