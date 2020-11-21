import { SummonerDTO } from '@waffle-charm/api-interfaces'

export const getSummonerInfoUrl = (summoner: SummonerDTO) =>
  `https://porofessor.gg/live/na/${summoner?.name}`
