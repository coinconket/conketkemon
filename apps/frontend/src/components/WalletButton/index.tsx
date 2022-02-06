import React, { useEffect } from 'react';
import Web3 from 'web3';
import { Button } from 'antd';
import { useWeb3React } from '@web3-react/core';
import { injected } from '../../configurations/wallets/injected';
import { useEagerConnect } from '../../hooks/useAuth';

const WalletButton: React.FC = () => {
  useEagerConnect();
  const { activate, active, deactivate } = useWeb3React<Web3>();

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
    <Button onClick={handleDisconnect} danger>
      Disconnect
    </Button>
  ) : (
    <Button onClick={handleConnect}>Connect to MetaMask</Button>
  );
};

export default WalletButton;
