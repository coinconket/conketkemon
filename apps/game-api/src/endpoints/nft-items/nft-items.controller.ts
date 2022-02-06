import { Controller, Get, Param } from '@nestjs/common';
import { NftContractService } from '../../providers/nft.contract.service';
import { NftItemsService } from './nft-items.service';

@Controller('nft-items')
export class NftItemsController {
  constructor(
    private readonly nftItemsService: NftItemsService,
    private readonly nftContractInstanceService: NftContractService
  ) {}

  @Get('/balance-of/:address')
  getBalanceOf(@Param('address') address: string) {
    return this.nftContractInstanceService.getNFTBalance(address);
  }

  @Get('/token-uri/:tokenId')
  getTokenUri(@Param('tokenId') tokenId: string) {
    return this.nftContractInstanceService.getTokenUri(tokenId);
  }
}
