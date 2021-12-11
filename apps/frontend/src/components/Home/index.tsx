import React from 'react';
import { Route, Routes } from 'react-router-dom';
import BuyToken from '../Pages/BuyToken';
import GamePlay from '../Pages/GamePlay';
import ItemList from '../Pages/ItemList';
import WalletButton from '../WalletButton';

import { StyledNavBar, StyledNavItem } from './styled';

const Home: React.FC = () => {
  return (
    <div
      style={{
        margin: '16px',
      }}
    >
      <StyledNavBar>
        <div>
          <StyledNavItem to="/pokemon">Pokemons</StyledNavItem>
          <StyledNavItem to="/gameplay">GamePlay</StyledNavItem>
          <StyledNavItem to="/buy-token">Buy Token</StyledNavItem>
        </div>
        <div>
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
