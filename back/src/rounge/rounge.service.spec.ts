import { Test, TestingModule } from '@nestjs/testing';
import { RoungeService } from './rounge.service';

describe('RoungeService', () => {
  let service: RoungeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RoungeService],
    }).compile();

    service = module.get<RoungeService>(RoungeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
