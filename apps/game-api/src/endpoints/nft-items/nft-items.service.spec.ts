import { Test, TestingModule } from '@nestjs/testing';
import { NftItemsService } from './nft-items.service';

describe('NftItemsService', () => {
  let service: NftItemsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NftItemsService],
    }).compile();

    service = module.get<NftItemsService>(NftItemsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
