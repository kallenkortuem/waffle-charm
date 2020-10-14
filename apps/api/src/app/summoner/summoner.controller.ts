import { Controller, Get, Param } from '@nestjs/common';
import { SummonerDTO } from '@waffle-charm/api-interfaces';
import { SummonerService } from './summoner.service';

@Controller('summoner')
export class SummonerController {
  constructor(
    private summoner: SummonerService
  ) {}

  @Get(':name')
  getSummoner(@Param('name') name: string): Promise<SummonerDTO> {
    return this.summoner.getByName(name).toPromise();
  }
}
