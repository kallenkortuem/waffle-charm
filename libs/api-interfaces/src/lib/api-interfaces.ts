export interface Message {
  message: string
}

export interface Config {
  riotGamesApiKey: string
}

export interface SummonerDTO {
  /**
   * Encrypted summoner ID. Max length 63 characters.
   */
  id: string
  /**
   * Encrypted account ID. Max length 56 characters.
   */
  accountId: string
  /**
   * Encrypted PUUID. Exact length of 78 characters.
   */
  puuid: string
  /**
   * Summoner name.
   */
  name: string
  /**
   * ID of the summoner icon associated with the summoner.
   */
  profileIconId: number
  /**
   * Date summoner was last modified specified as epoch milliseconds. The following events will update this timestamp: summoner name change, summoner level change, or profile icon change.
   */
  revisionDate: number
  /**
   * Summoner level associated with the summoner.
   */
  summonerLevel: number
}

export interface MatchReferenceDto {
  gameId: number
  role: string
  season: number
  platformId: string
  champion: number
  queue: number
  lane: string
  timestamp: number
}

export interface MatchlistDto {
  startIndex: number
  /**
   * There is a known issue that this field doesn't correctly return the total number of games that match the parameters of the request. Please paginate using beginIndex until you reach the end of a player's matchlist.
   */
  totalGames: number
  endIndex: number
  matches: MatchReferenceDto[]
}


export interface Test {
  
}