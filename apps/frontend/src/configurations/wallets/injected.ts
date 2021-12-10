import { InjectedConnector } from '@web3-react/injected-connector';

const BSC_MAINNET = 56;
const BSC_TESTNET = 97;

export const injected = new InjectedConnector({
  supportedChainIds: [1, 3, 4, 5, 42, BSC_MAINNET, BSC_TESTNET],
});
