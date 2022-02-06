export interface Explorer {
  apiEndpoint: string;
  url: string;
  name: string;
  standard: string;
}

export interface Ens {
  registry: string;
}

export interface NativeCurrency {
  name: string;
  symbol: string;
  decimals: number;
}

// https://github.com/ethereum/EIPs/blob/master/EIPS/eip-747.md
export interface WatchAssetParameters {
  type: string;
  options: {
    address: string;
    symbol: string;
    decimals: number;
    image?: string;
  };
}

export interface AddChainParameter {
  chainId: string;
  blockExplorerUrls?: string[];
  chainName?: string;
  iconUrls?: string[];
  nativeCurrency?: {
    name: string;
    symbol: string;
    decimals: number;
  };
  rpcUrls?: string[];
}
