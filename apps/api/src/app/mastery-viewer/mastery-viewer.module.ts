import { Module } from '@nestjs/common'
import { MasteryModule } from '../mastery/mastery.module'
import { SummonerModule } from '../summoner/summoner.module'
import { MasteryViewerController } from './mastery-viewer.controller'
import { MasteryViewerService } from './mastery-viewer.service'

@Module({
  providers: [MasteryViewerService],
  controllers: [MasteryViewerController],
  imports: [MasteryModule, SummonerModule],
})
export class MasteryViewerModule {}
