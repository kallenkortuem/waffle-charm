import { HttpModule, Module } from '@nestjs/common'
import { VersionController } from './version.controller'
import { VersionService } from './version.service'

@Module({
  imports: [HttpModule],
  providers: [VersionService],
  controllers: [VersionController],
  exports: [VersionService],
})
export class VersionModule {}
