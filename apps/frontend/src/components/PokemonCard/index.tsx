import React from 'react';
import { Avatar, Button, Typography } from 'antd';
import { useWeb3React } from '@web3-react/core';
import useConKetTokenContract from '../../hooks/useContract';
import { Pokemon } from '../../types/pokemon';
import { StyledPokemonCard } from './styled';
import Web3 from 'web3';
import { BSC_TESTNET_ID } from '../../constants';
import {
  useCreateOrderMutation,
  useGetPokemonListQuery,
} from '../../services/pokemon';

const PokemonCard: React.FC<{
  pokemon: Pokemon;
}> = ({ pokemon }) => {
  const { refetch } = useGetPokemonListQuery();
  const { active, chainId } = useWeb3React<Web3>();
  const id = pokemon.id;
  const { sendToken } = useConKetTokenContract();
  const [createOrder, result] = useCreateOrderMutation();

  const handleBuyItem = async () => {
    const amount = pokemon.initialPrice || '0';
    const transaction = await sendToken(amount);
    if (transaction) {
      await createOrder({
        pokemonId: pokemon.id,
        transactionHash: transaction.transactionHash,
        fromAddress: transaction.from,
        toAddress: transaction.to,
        transactionJson: JSON.stringify(transaction),
      });
      refetch();
    }
  };

  return (
    <StyledPokemonCard title={pokemon.name} style={{ width: 256 }}>
      <Avatar
        shape="square"
        size={64}
        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`}
      />
      <Typography>
        ID: <strong>{pokemon.id}</strong>
      </Typography>
      <Typography>
        Price: <strong>{pokemon.initialPrice} CONKET</strong>
      </Typography>
      <Button
        disabled={!active || chainId !== BSC_TESTNET_ID || !!pokemon.owner}
        onClick={handleBuyItem}
        title={active ? 'Click to Buy' : 'Connect wallet first'}
      >
        {pokemon.owner ? 'SOLD' : 'BUY'}
      </Button>
    </StyledPokemonCard>
  );
};

export default PokemonCard;
