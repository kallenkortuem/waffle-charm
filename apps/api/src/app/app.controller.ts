import { Controller, Get } from '@nestjs/common';

import { Config, Message } from '@waffle-charm/api-interfaces';

import { AppService } from './app.service';
import { ConfigService } from './providers/config.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService, private readonly config: ConfigService) {}

  @Get('hello')
  getData(): Message {
    return this.appService.getData();
  }

  @Get('config')
  getConfig(): Config {
    return this.config.getConfig();
  }
}
