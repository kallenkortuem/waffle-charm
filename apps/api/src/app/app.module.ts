import { HttpModule, Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { MasteryViewerModule } from './mastery-viewer/mastery-viewer.module'
import { MasteryModule } from './mastery/mastery.module'
import { MatchModule } from './match/match.module'
import { SummonerModule } from './summoner/summoner.module'

@Module({
  imports: [
    HttpModule,
    ConfigModule.forRoot({ isGlobal: true }),
    SummonerModule,
    MatchModule,
    MasteryModule,
    MasteryViewerModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
