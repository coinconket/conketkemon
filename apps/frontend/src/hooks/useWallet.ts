import { notification } from 'antd';
import { toHex } from 'web3-utils';
import { injected } from '../configurations/wallets/injected';
import { AddChainParameter, WatchAssetParameters } from '../types/wallet';

export const useWalletContext = () => {
  async function watchAsset({ type, options }: WatchAssetParameters) {
    const provider = await injected.getProvider();
    try {
      await provider.request({
        method: 'wallet_watchAsset',
        params: {
          type: type,
          options: {
            ...options,
          },
        },
      });
    } catch (error: any) {
      notification.error({
        message: '',
        description: error.massage,
        placement: 'bottomRight',
      });
    }
  }

  async function addChain(chain: AddChainParameter) {
    const provider = await injected.getProvider();
    try {
      await provider.request({
        method: 'wallet_addEthereumChain',
        params: [chain],
      });
    } catch (error: any) {
      notification.error({
        message: error.message,
      });
    }
  }

  async function switchChain(chain: AddChainParameter) {
    const provider = await injected.getProvider();
    try {
      await provider.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: toHex(chain.chainId) }],
      });
      window.location.reload();
    } catch (error: any) {
      if (error.code === 4902) {
        await addChain(chain);
        window.location.reload();
      }
      console.log('Switch chain: ', error);
    }
  }

  return {
    watchAsset,
    addChain,
    switchChain,
  };
};
