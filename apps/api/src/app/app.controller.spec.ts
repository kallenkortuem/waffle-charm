import { ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { anything, instance, mock, when } from 'ts-mockito';

import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
  let controller: AppController;
  const configService = mock(ConfigService);
  const appService = mock(AppService);

  beforeAll(() => {
    controller = new AppController(instance(appService), instance(configService));
  });

  describe('getData', () => {
    it('should return "Welcome to api!"', () => {
      const message = { message: 'Welcome to api!' };
      when(appService.getData()).thenReturn(message)
      expect(controller.getData()).toEqual(message);
    });
  });

  describe('getConfig', () => {
    it('should get the config config', () => {
      const riotGamesApiKey = 'mock-riot-games-api-key';
      when(configService.get<string>('RIOT_GAMES_API_KEY')).thenReturn(riotGamesApiKey);
      expect(controller.getConfig()).toEqual({ riotGamesApiKey });
    });
  });
});
