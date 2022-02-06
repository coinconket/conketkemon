import { useWeb3React } from '@web3-react/core';
import { Alert, Typography } from 'antd';
import React, { useMemo } from 'react';
import { Route, Routes } from 'react-router-dom';
import Web3 from 'web3';
import { BSC_TESTNET_ID } from '../../constants';
import { useGetChainListQuery } from '../../services/chainlist';
import { Chain } from '../../types/chain';
import BuyToken from '../Pages/BuyToken';
import GamePlay from '../Pages/GamePlay';
import ItemList from '../Pages/ItemList';
import SwitchToBSCTestnetButton from '../SwitchToBSCTestnetButton';
import WalletButton from '../WalletButton';

import { StyledNavBar, StyledNavItem } from './styled';

const Home: React.FC = () => {
  const { chainId, account } = useWeb3React<Web3>();
  const { data } = useGetChainListQuery();
  const handleClose = () => {
    //
  };

  const currentChain = useMemo(() => {
    if (data && chainId) {
      return data.find((chain: Chain) => chain.chainId === chainId);
    }
    return;
  }, [data, chainId]);

  return (
    <div
      style={{
        margin: '16px',
      }}
    >
      <Alert
        message={
          chainId !== BSC_TESTNET_ID ? (
            <Typography>
              <strong>Binance Smart Chain Testnet </strong> is required.{' '}
              {chainId && (
                <>
                  {' '}
                  Connected chain is <strong>{currentChain?.name}</strong>
                </>
              )}
            </Typography>
          ) : (
            <Typography>
              Connected to <strong>{currentChain?.name}</strong>{' '}
              <Typography.Text copyable>{account}</Typography.Text>
            </Typography>
          )
        }
        type={chainId === BSC_TESTNET_ID ? 'success' : 'error'}
        closable
        onClose={handleClose}
      />
      <StyledNavBar>
        <div>
          <StyledNavItem to="/pokemon">Pokemons</StyledNavItem>
          <StyledNavItem to="/gameplay">GamePlay</StyledNavItem>
          <StyledNavItem to="/buy-token">Buy Token</StyledNavItem>
        </div>
        <div>
          {chainId !== undefined && chainId !== BSC_TESTNET_ID ? (
            <span style={{ marginRight: '.5rem' }}>
              <SwitchToBSCTestnetButton />
            </span>
          ) : null}
          <WalletButton />
        </div>
      </StyledNavBar>
      <Routes>
        <Route path="/pokemon" element={<ItemList />} />
        <Route path="/gameplay" element={<GamePlay />} />
        <Route path="/buy-token" element={<BuyToken />} />
        <Route path="*" element={<ItemList />} />
      </Routes>
    </div>
  );
};

export default Home;
