import { Controller, Get, Param } from '@nestjs/common';

import { Config, Message, SummonerDTO } from '@waffle-charm/api-interfaces';

import { AppService } from './app.service';
import { ConfigService } from './providers/config.service';
import { SummonerService } from './services/summoner/summoner.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService, private readonly config: ConfigService, private readonly summoner: SummonerService) {}

  @Get('hello')
  getData(): Message {
    return this.appService.getData();
  }

  @Get('config')
  getConfig(): Config {
    return this.config.getConfig();
  }

  @Get('summoner/:name')
  getSummoner(@Param('name') name: string): Promise<SummonerDTO> {
    return this.summoner.getByName(name).toPromise();
  }
}
