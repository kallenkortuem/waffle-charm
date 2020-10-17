import { instance, mock, when } from 'ts-mockito';
import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
  let controller: AppController;
  const appService = mock(AppService);

  beforeAll(() => {
    controller = new AppController(instance(appService));
  });

  describe('getData', () => {
    it('should return "Welcome to api!"', () => {
      const message = { message: 'Welcome to api!' };
      when(appService.getData()).thenReturn(message);
      expect(controller.getData()).toEqual(message);
    });
  });
});
