import { Controller, Get, Param } from '@nestjs/common'
import { ChampionMasteryDTO } from '@waffle-charm/api-interfaces'
import { MasteryService } from './mastery.service'

@Controller('mastery')
export class MasteryController {
  constructor(private masteryService: MasteryService) {}

  @Get('by-summoner/:encryptedSummonerId')
  getMasteriesBySummoner(
    @Param('encryptedSummonerId') accountId: string
  ): Promise<ChampionMasteryDTO[]> {
    return this.masteryService.getMasteriesBySummoner(accountId).toPromise()
  }
}
