import { HttpService, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MatchlistDto } from '@waffle-charm/api-interfaces';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class MatchService {
  private headers;
  constructor(
    private configService: ConfigService,
    private httpService: HttpService
  ) {
    this.headers = {
      'X-Riot-Token': this.configService.get<string>('RIOT_GAMES_API_KEY'),
    };
  }

  getByAccount(accountId: string): Observable<MatchlistDto> {
    return this.httpService
      .get<MatchlistDto>(
        `https://na1.api.riotgames.com/lol/match/v4/matchlists/by-account/${accountId}`,
        {
          headers: this.headers,
        }
      )
      .pipe(map((resp) => resp.data));
  }
}
