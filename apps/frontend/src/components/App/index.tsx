import React, { StrictMode } from 'react';

import 'antd/dist/antd.css';
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import Home from '../Home';

const App: React.FC = () => <Home />;

const Providers: React.FC = () => {
  return (
    <StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </StrictMode>
  );
};

export default Providers;
