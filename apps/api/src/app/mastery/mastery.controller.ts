import { Controller, Get, Param } from '@nestjs/common'
import { MasteryService } from './mastery.service'

@Controller('mastery')
export class MasteryController {
  constructor(private masteryService: MasteryService) {}

  @Get('by-summoner/:encryptedSummonerId')
  getMasteriesBySummoner(
    @Param('encryptedSummonerId') accountId: string
  ): Promise<any[]> {
    return this.masteryService.getMasteriesBySummoner(accountId).toPromise()
  }
}
