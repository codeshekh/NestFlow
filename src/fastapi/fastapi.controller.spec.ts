import { Test, TestingModule } from '@nestjs/testing';
import { FastapiController } from './fastapi.controller';

describe('FastapiController', () => {
  let controller: FastapiController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FastapiController],
    }).compile();

    controller = module.get<FastapiController>(FastapiController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
