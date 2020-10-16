import { Controller, Get, Param } from '@nestjs/common';
import { MatchlistDto } from '@waffle-charm/api-interfaces';
import { MatchService } from './match.service';

@Controller('match')
export class MatchController {
  constructor(
    private matchService: MatchService
  ) {}

  @Get(':accountId')
  getSummoner(@Param('accountId') accountId: string): Promise<MatchlistDto> {
    return this.matchService.getByAccount(accountId).toPromise();
  }
}
