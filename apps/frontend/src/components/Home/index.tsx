import React from 'react';
import { Route, Routes } from 'react-router-dom';
import GamePlay from '../Pages/GamePlay';
import Pokemon from '../Pages/Pokemon';

import { StyledNavBar, StyledNavItem } from './styled';

const Home: React.FC = () => {
  return (
    <div
      style={{
        margin: '16px',
      }}
    >
      <StyledNavBar>
        <StyledNavItem to="/pokemon">Pokemons</StyledNavItem>
        <StyledNavItem to="/gameplay">GamePlay</StyledNavItem>
      </StyledNavBar>
      <Routes>
        <Route path="/pokemon" element={<Pokemon />} />
        <Route path="/gameplay" element={<GamePlay />} />
        <Route path="*" element={<Pokemon />} />
      </Routes>
    </div>
  );
};

export default Home;
