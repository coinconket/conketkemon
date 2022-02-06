import React from 'react';
import { useWeb3React } from '@web3-react/core';
import { Button } from 'antd';
import Web3 from 'web3';
import { toHex } from 'web3-utils';

import { BSC_TESTNET_ID } from '../../constants';
import { useWalletContext } from '../../hooks/useWallet';

const SwitchToBSCTestnetButton: React.FC = () => {
  const { chainId } = useWeb3React<Web3>();
  const { switchChain } = useWalletContext();
  const handleAddBSC = async () => {
    await switchChain({
      chainId: toHex(97),
      blockExplorerUrls: ['https://testnet.bscscan.com'],
      chainName: 'Binance Smart Chain - Testnet',
      iconUrls: [
        'https://s2.coinmarketcap.com/static/img/coins/64x64/1839.png',
      ],
      nativeCurrency: {
        decimals: 18,
        name: 'BNB',
        symbol: 'BNB',
      },
      rpcUrls: ['https://data-seed-prebsc-1-s1.binance.org:8545/'],
    });
  };

  return (
    <Button
      onClick={handleAddBSC}
      disabled={Boolean(chainId && chainId === BSC_TESTNET_ID)}
    >
      Switch to Binance Smart Chain Testnet
    </Button>
  );
};

export default SwitchToBSCTestnetButton;
