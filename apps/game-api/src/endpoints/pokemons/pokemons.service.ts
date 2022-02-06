import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { lastValueFrom, map } from 'rxjs';
import { Repository } from 'typeorm';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { Pokemon } from './entities/pokemon.entity';

@Injectable()
export class PokemonsService {
  constructor(
    @InjectRepository(Pokemon) private pokemonRepository: Repository<Pokemon>,
    private httpService: HttpService
  ) {}

  create(createPokemonDto: CreatePokemonDto) {
    return this.pokemonRepository.insert(createPokemonDto);
  }

  async import(limit: number, offset: number) {
    const observableResponse = this.httpService
      .get(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`)
      .pipe(map((response) => response.data));
    const responseData = await lastValueFrom(observableResponse);
    return this.insertPokemonList(responseData.results);
  }

  async insertPokemonList(pokemonDtoList: any[]) {
    const pokemonEntities = pokemonDtoList.map(({ name, url }) => ({
      name: name,
      id: url
        .split('/')
        .filter((segment: string) => segment)
        .pop(),
      owner: null,
      url,
      initialPrice: this.getRandomArbitrary(100, 1000).toFixed(2),
    }));
    return this.pokemonRepository.insert(pokemonEntities);
  }

  getRandomArbitrary(min: number, max: number): number {
    return Math.random() * (max - min) + min;
  }

  findAll(): Promise<Pokemon[]> {
    return this.pokemonRepository.find({
      order: {
        id: 'ASC',
      },
    });
  }

  findOne(id: number): Promise<Pokemon> {
    return this.pokemonRepository.findOne(id);
  }

  update(id: number, updatePokemonDto: UpdatePokemonDto) {
    return `This action updates a #${id} pokemon`;
  }

  remove(id: number) {
    return `This action removes a #${id} pokemon`;
  }
}
