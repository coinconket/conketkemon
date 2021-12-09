import { Avatar, Button, Card, Typography } from 'antd';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { StyledPokemonCard } from './styled';

interface Pokemon {
  name: string;
  url: string;
}

const Pokemon: React.FC = () => {
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

const PokemonCard: React.FC<{
  pokemon: Pokemon;
}> = ({ pokemon }) => {
  const id = pokemon.url.slice(0, -1).split('/').pop();
  return (
    <StyledPokemonCard title={pokemon.name} style={{ width: 256 }}>
      <Avatar
        shape="square"
        size={64}
        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`}
      />
      <Typography>Price: {id} CONKET</Typography>
      <Button>BUY</Button>
    </StyledPokemonCard>
  );
};

export default Pokemon;
