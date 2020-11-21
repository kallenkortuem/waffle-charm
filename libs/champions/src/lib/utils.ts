import { ChampionData } from '@waffle-charm/api-interfaces'

export const getChampionInfoUrl = (champion: ChampionData) =>
  `https://na.op.gg/champion/${champion?.name}/statistics`
export const getChampionImageSrc = (champion: ChampionData): string =>
  `/cdn/10.22.1/img/champion/${champion?.image?.full}`
