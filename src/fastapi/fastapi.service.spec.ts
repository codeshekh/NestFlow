import { Test, TestingModule } from '@nestjs/testing';
import { FastapiService } from './fastapi.service';

describe('FastapiService', () => {
  let service: FastapiService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FastapiService],
    }).compile();

    service = module.get<FastapiService>(FastapiService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
