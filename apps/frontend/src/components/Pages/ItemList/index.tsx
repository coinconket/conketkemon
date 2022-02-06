import { Alert, Spin, Typography } from 'antd';
import React from 'react';
import PokemonCard from '../../PokemonCard';
import { useGetPokemonListQuery } from '../../../services/pokemon';

const ItemList: React.FC = () => {
  const {
    data: pokemonList,
    error,
    isLoading,
    refetch,
  } = useGetPokemonListQuery();
  return (
    <div>
      <Typography.Title level={3}>Pokemon page</Typography.Title>

      {error ? (
        <Alert type="error">Oh no, there was an error</Alert>
      ) : isLoading ? (
        <Spin style={{ width: '100%', height: '50vh' }} />
      ) : pokemonList ? (
        <>
          {pokemonList.map((p) => (
            <PokemonCard key={p.url} pokemon={p} />
          ))}
        </>
      ) : null}
    </div>
  );
};

export default ItemList;
