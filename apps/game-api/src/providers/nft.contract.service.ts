import { Injectable } from '@nestjs/common';
import { ConKetNftABI } from '@conketkemon/util/contract-abi';

import Web3 from 'web3';
import { AbiItem } from 'web3-utils';

const {
  BSC_RPC_ENDPOINT = '',
  NFT_CONTRACT_ADDRESS = '',
  NFT_MINTER_ACCOUNT_PRIVATE_KEY = '',
} = process.env;

@Injectable()
export class NftContractService {
  contract: any;
  web3: Web3;
  constructor() {
    this.web3 = new Web3(BSC_RPC_ENDPOINT);
    const account = this.web3.eth.accounts.privateKeyToAccount(
      `0x${NFT_MINTER_ACCOUNT_PRIVATE_KEY}`
    );
    this.web3.eth.accounts.wallet.add(account);
    this.web3.eth.defaultAccount = account.address;

    this.contract = new this.web3.eth.Contract(
      ConKetNftABI as unknown as AbiItem[],
      NFT_CONTRACT_ADDRESS
    );
  }

  async mintNFT(receiver: string, itemUrl: string) {
    return this.contract.methods.safeMint(receiver, itemUrl).send({
      from: this.web3.eth.defaultAccount,
      gas: 2000000,
    });
  }

  async getNFTBalance(address: string) {
    return this.contract.methods.balanceOf(address).call();
  }

  async getTokenUri(tokenId: string) {
    return this.contract.methods.tokenURI(tokenId).call();
  }

  async getTransaction(transactionHash: string) {
    return this.web3.eth.getTransaction(transactionHash);
  }
}
