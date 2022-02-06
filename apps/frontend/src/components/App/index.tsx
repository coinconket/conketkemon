import React, { StrictMode } from 'react';

import Web3 from 'web3';
import { BrowserRouter } from 'react-router-dom';
import { Web3ReactProvider } from '@web3-react/core';
import { Provider as ReduxProvider } from 'react-redux';

import 'antd/dist/antd.css';
import './App.css';

import Home from '../Home';
import { store } from '../../stores';

const App: React.FC = () => <Home />;

const Providers: React.FC = () => {
  return (
    <StrictMode>
      <ReduxProvider store={store}>
        <Web3ReactProvider getLibrary={getWeb3Library}>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </Web3ReactProvider>
      </ReduxProvider>
    </StrictMode>
  );
};

function getWeb3Library(provider: any) {
  return new Web3(provider);
}

export default Providers;
