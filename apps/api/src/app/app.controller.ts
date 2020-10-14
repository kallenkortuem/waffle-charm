import { Controller, Get } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Config, Message } from '@waffle-charm/api-interfaces';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly configService: ConfigService
  ) {}

  @Get('hello')
  getData(): Message {
    return this.appService.getData();
  }

  @Get('config')
  getConfig(): Config {
    return {
      riotGamesApiKey: this.configService.get<string>('RIOT_GAMES_API_KEY'),
    };
  }
}
