import { Test, TestingModule } from '@nestjs/testing';
import { SendListsController } from './send-lists.controller';

describe('SendListsController', () => {
  let controller: SendListsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SendListsController],
    }).compile();

    controller = module.get<SendListsController>(SendListsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
