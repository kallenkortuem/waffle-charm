import { HttpModule, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigService } from './providers/config.service';
import { SummonerService } from './services/summoner/summoner.service';

@Module({
  imports: [HttpModule],
  controllers: [AppController],
  providers: [AppService, ConfigService, SummonerService],
})
export class AppModule {}
