import { HttpModule, Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { ConfigModule } from '@nestjs/config'
import { SummonerModule } from './summoner/summoner.module'
import { MatchModule } from './match/match.module'
import { MasteryModule } from './mastery/mastery.module'

@Module({
  imports: [
    HttpModule,
    ConfigModule.forRoot({ isGlobal: true }),
    SummonerModule,
    MatchModule,
    MasteryModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
