interface NativeCurrency {
  name: string;
  symbol: string;
  decimals: number;
}

interface Ens {
  registry: string;
}

interface Explorer {
  name: string;
  url: string;
  standard: string;
}

export interface Chain {
  name: string;
  chain: string;
  icon: string;
  rpc: string[];
  faucets: any[];
  nativeCurrency: NativeCurrency;
  infoURL: string;
  shortName: string;
  chainId: number;
  networkId: number;
  slip44: number;
  ens: Ens;
  explorers: Explorer[];
}
