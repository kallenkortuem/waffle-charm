import { HttpService, Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { ChampionMasteryDTO } from '@waffle-charm/api-interfaces'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'

@Injectable()
export class MasteryService {
  private headers: any
  constructor(
    private configService: ConfigService,
    private httpService: HttpService
  ) {
    this.headers = {
      'X-Riot-Token': this.configService.get<string>('RIOT_GAMES_API_KEY'),
    }
  }

  getMasteriesBySummoner(
    encryptedSummonerId: string
  ): Observable<ChampionMasteryDTO[]> {
    return this.httpService
      .get<ChampionMasteryDTO[]>(
        `https://na1.api.riotgames.com/lol/champion-mastery/v4/champion-masteries/by-summoner/${encryptedSummonerId}`,
        {
          headers: this.headers,
        }
      )
      .pipe(map((resp) => resp.data))
  }
}
