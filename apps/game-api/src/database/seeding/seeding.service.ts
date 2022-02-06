import { Injectable, Logger } from '@nestjs/common';
import { PokemonsService } from '../../endpoints/pokemons/pokemons.service';
import pokemonListApiResponse from '../../config/pokemon-seed.json';

@Injectable()
export class SeedingService {
  constructor(private readonly pokemonService: PokemonsService) {}

  async seed(): Promise<void> {
    try {
      await Promise.all([
        this.pokemonService.insertPokemonList(pokemonListApiResponse.results),
      ]);
    } catch (error) {
      Logger.debug('Seed: '+  error.message);
    }
  }
}
