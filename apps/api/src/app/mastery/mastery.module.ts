import { HttpModule, Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { MasteryController } from './mastery.controller'
import { MasteryService } from './mastery.service'

@Module({
  imports: [ConfigModule, HttpModule],
  controllers: [MasteryController],
  providers: [MasteryService],
  exports: [MasteryService],
})
export class MasteryModule {}
