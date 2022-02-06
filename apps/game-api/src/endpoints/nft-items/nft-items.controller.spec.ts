import { Test, TestingModule } from '@nestjs/testing';
import { NftItemsController } from './nft-items.controller';
import { NftItemsService } from './nft-items.service';

describe('NftItemsController', () => {
  let controller: NftItemsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NftItemsController],
      providers: [NftItemsService],
    }).compile();

    controller = module.get<NftItemsController>(NftItemsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
