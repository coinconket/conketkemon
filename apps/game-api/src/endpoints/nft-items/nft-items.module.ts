import { Module } from '@nestjs/common';
import { NftItemsService } from './nft-items.service';
import { NftItemsController } from './nft-items.controller';
import { NftContractService } from '../../providers/nft.contract.service';

@Module({
  controllers: [NftItemsController],
  providers: [NftItemsService, NftContractService],
})
export class NftItemsModule {}
