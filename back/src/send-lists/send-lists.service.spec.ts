import { Test, TestingModule } from '@nestjs/testing';
import { SendListsService } from './send-lists.service';

describe('SendListsService', () => {
  let service: SendListsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SendListsService],
    }).compile();

    service = module.get<SendListsService>(SendListsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
