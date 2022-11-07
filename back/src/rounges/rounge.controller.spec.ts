import { Test, TestingModule } from '@nestjs/testing';
import { RoungeController } from './rounge.controller';

describe('RoungeController', () => {
  let controller: RoungeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RoungeController],
    }).compile();

    controller = module.get<RoungeController>(RoungeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
