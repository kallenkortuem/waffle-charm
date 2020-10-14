export interface Message {
  message: string;
}

export interface Config {
  riotGamesApiKey: string;
}

export interface SummonerDTO {
  /**
   * Encrypted summoner ID. Max length 63 characters.
   */
  id: string;
  /**
   * Encrypted account ID. Max length 56 characters.
   */
  accountId: string;
  /**
   * Encrypted PUUID. Exact length of 78 characters.
   */
  puuid: string;
  /**
   * Summoner name.
   */
  name: string;
  /**
   * ID of the summoner icon associated with the summoner.
   */
  profileIconId: number;
  /**
   * Date summoner was last modified specified as epoch milliseconds. The following events will update this timestamp: summoner name change, summoner level change, or profile icon change.
   */
  revisionDate: number;
  /**
   * Summoner level associated with the summoner.
   */
  summonerLevel: number;
}
