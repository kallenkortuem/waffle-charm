import { ChampionData } from '@waffle-charm/api-interfaces'

export const getChampionInfoUrl = (champion: ChampionData) =>
  `https://na.op.gg/champion/${champion?.name}/statistics`
export const getChampionImageSrc = (
  champion: ChampionData,
  version = '10.22.1'
): string => `/cdn/${version}/img/champion/${champion?.image?.full}`
export const getChampionSplashImageSrc = (
  champion: ChampionData,
  version = '10.22.1',
  imageNumber = 0
): string => `/cdn/img/champion/splash/${champion?.id}_0.jpg`
