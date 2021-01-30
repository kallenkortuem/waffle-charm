import { Module } from '@nestjs/common'
import { MasteryViewerService } from './mastery-viewer.service'
import { MasteryViewerController } from './mastery-viewer.controller'

@Module({
  providers: [MasteryViewerService],
  controllers: [MasteryViewerController],
})
export class MasteryViewerModule {}
