import { Test, TestingModule } from '@nestjs/testing';
import { SummonerService } from './summoner.service';
import { instance, mock } from 'ts-mockito';
import { HttpService } from '@nestjs/common';

describe('SummonerService', () => {
  let service: SummonerService;
  const http = mock(HttpService);

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SummonerService,
        { provide: HttpService, useValue: instance(http) },
      ],
    }).compile();

    service = module.get<SummonerService>(SummonerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
