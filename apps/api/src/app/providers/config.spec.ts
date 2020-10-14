import { Test, TestingModule } from '@nestjs/testing';
import { Config } from '@waffle-charm/api-interfaces';
import { ConfigService } from './config.service';

describe('ConfigService', () => {
  let provider: ConfigService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ConfigService],
    }).compile();

    provider = module.get<ConfigService>(ConfigService);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });

  describe('getData', () => {
    it('should return the riot games api key', () => {
      expect(provider.getConfig()).toEqual({
        riotGamesApiKey: 'not-found',
      } as Config);
    });
  });
});
