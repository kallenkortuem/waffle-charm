import { Injectable } from '@nestjs/common'
import { MasteryViewerDTO } from '@waffle-charm/api-interfaces'
import { Observable } from 'rxjs'
import { exhaustMap, map } from 'rxjs/operators'
import { MasteryService } from '../mastery/mastery.service'
import { SummonerService } from '../summoner/summoner.service'

@Injectable()
export class MasteryViewerService {
  constructor(
    private masteryService: MasteryService,
    private summonerService: SummonerService
  ) {}

  getByName(summonerName: string): Observable<MasteryViewerDTO> {
    return this.summonerService.getByNameV2(summonerName).pipe(
      exhaustMap((summonerResponse) => {
        const { data: summoner } = summonerResponse
        return this.masteryService.getMasteriesBySummonerV2(summoner.id).pipe(
          map((masteryResponse) => {
            const { data: masteries } = masteryResponse
            return {
              summoner,
              masteries,
            }
          })
        )
      })
    )
  }
}
