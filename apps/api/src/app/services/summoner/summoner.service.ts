import { HttpService, Injectable } from '@nestjs/common';
import { SummonerDTO } from '@waffle-charm/api-interfaces';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ConfigService } from '../../providers/config.service';

@Injectable()
export class SummonerService {
  private headers;
  constructor(
    private readonly config: ConfigService,
    private http: HttpService
  ) {
    this.headers = {
      'X-Riot-Token': this.config.getConfig().riotGamesApiKey,
    };
  }

  getByName(summonerName: string): Observable<SummonerDTO> {
    return this.http
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
