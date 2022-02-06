import { Button, Typography } from 'antd';
import React from 'react';
import {
  CONKET_CONTRACT_ADDRESS,
  CONKET_CONTRACT_SYMBOL,
} from '../../../configurations/blockchain';
import { useWalletContext } from '../../../hooks/useWallet';

const BuyToken: React.FC = () => {
  const { watchAsset } = useWalletContext();

  const handleAddToken = async () => {
    await watchAsset({
      type: 'ERC20',
      options: {
        address: CONKET_CONTRACT_ADDRESS,
        symbol: CONKET_CONTRACT_SYMBOL,
        decimals: 18,
      },
    });
  };

  return (
    <div>
      <Typography.Title level={3}>Buy CONKET token</Typography.Title>
      <Button
        onClick={handleAddToken}
        style={{
          marginLeft: 10,
        }}
      >
        Add CONKET Token
      </Button>
      <Typography.Paragraph>
        I created an LP of <b>2BNB</b> and <b>2_000_000_000 CONKET</b>{' '}
      </Typography.Paragraph>
      <Typography>
        You can request BNB on testnet :{' '}
        <a
          href="https://testnet.binance.org/faucet-smart"
          target="_blank"
          rel="noreferrer"
        >
          https://testnet.binance.org/faucet-smart
        </a>{' '}
        then swap the BNB for CONKET , suggested value is{' '}
        <strong>0.001 BNB</strong>
      </Typography>
      <Typography>
        CONKET contract address:{' '}
        <a
          href={`https://testnet.bscscan.com/token/${CONKET_CONTRACT_ADDRESS}`}
          target="_blank"
          title={CONKET_CONTRACT_ADDRESS}
          rel="noreferrer"
        >
          0xD461B07e3d3040D9eD4E77837d6De87538F9b32f
        </a>
      </Typography>
      <Typography>
        DEX - PancakeSwap Testnet{' '}
        <a
          href="https://pancake.kiemtienonline360.com/#/swap"
          target="_blank"
          rel="noreferrer"
        >
          https://pancake.kiemtienonline360.com/#/swap
        </a>
      </Typography>
    </div>
  );
};

export default BuyToken;
