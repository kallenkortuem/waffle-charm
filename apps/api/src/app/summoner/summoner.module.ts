import { HttpModule, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SummonerController } from './summoner.controller';
import { SummonerService } from './summoner.service';

@Module({
  imports: [ConfigModule, HttpModule],
  controllers: [SummonerController],
  providers: [SummonerService],
})
export class SummonerModule {}
