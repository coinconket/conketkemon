import React from 'react';
import { Button } from 'antd';
import { useWeb3React } from '@web3-react/core';
import { injected } from '../../configurations/wallets/injected';

const WalletButton: React.FC = () => {
  const { activate, account, library, connector, active, deactivate } =
    useWeb3React();
  const handleConnect = async () => {
    try {
      await activate(injected);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDisconnect = async () => {
    try {
      await deactivate();
    } catch (error) {
      console.log(error);
    }
  };

  return active ? (
    <Button onClick={handleDisconnect}>Disconnect</Button>
  ) : (
    <Button onClick={handleConnect}>Connect to MetaMask</Button>
  );
};

export default WalletButton;
