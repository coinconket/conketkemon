import { Injectable } from '@nestjs/common';

@Injectable()
export class NftItemsService {
  findAll() {
    return `This action returns all nftItems`;
  }

  findOne(id: number) {
    return `This action returns a #${id} nftItem`;
  }
}
