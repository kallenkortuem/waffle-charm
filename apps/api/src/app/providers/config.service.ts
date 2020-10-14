import { Injectable } from '@nestjs/common';
import { Config } from '@waffle-charm/api-interfaces';

@Injectable()
export class ConfigService {
  getConfig(): Config {
    return {
      riotGamesApiKey: process?.env?.RIOT_GAMES_API || 'RGAPI-a318ebb2-fa6e-44fc-8589-79872c967ea8',
    };
  }
}
