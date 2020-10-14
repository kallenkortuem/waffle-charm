import { HttpService, Injectable } from '@nestjs/common';
import { SummonerDTO } from '@waffle-charm/api-interfaces';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class SummonerService {
  private headers;
  constructor(
    private configService: ConfigService,
    private httpService: HttpService
  ) {
    this.headers = {
      'X-Riot-Token': this.configService.get<string>('RIOT_GAMES_API_KEY'),
    };
  }

  getByName(summonerName: string): Observable<SummonerDTO> {
    return this.httpService
      .get<SummonerDTO>(
        `https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${summonerName}`,
        {
          headers: this.headers,
        }
      )
      .pipe(
        map((resp) => resp.data),
        catchError((error) => of(error))
      );
  }
}
