import { Typography } from 'antd';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PokemonCard from '../../PokemonCard';
import { Pokemon } from '../../../types/pokemon';

const ItemList: React.FC = () => {
  const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);
  useEffect(() => {
    const fetchPokemonList = async () => {
      const { data } = await axios.get(
        'https://pokeapi.co/api/v2/pokemon?limit=100&offset=0'
      );
      setPokemonList(data.results);
    };
    fetchPokemonList();
  }, []);

  return (
    <div>
      <Typography.Title level={3}>Pokemon page</Typography.Title>
      {pokemonList.map((p) => (
        <PokemonCard key={p.url} pokemon={p} />
      ))}
    </div>
  );
};

export default ItemList;
