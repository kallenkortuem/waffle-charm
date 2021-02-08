import { ChampionData, Vendors } from '@waffle-charm/api-interfaces'

export const getChampionInfoUrl = (
  champion: ChampionData,
  vendor: Vendors
): string => {
  if (!champion) {
    return ''
  }

  const name = champion?.id?.toLocaleLowerCase()

  switch (vendor) {
    case 'op.gg':
      return `https://na.op.gg/champion/${name}/statistics`
    case 'leagueofgraphs.com':
      return `https://www.leagueofgraphs.com/champions/builds/${name}`
    case 'u.gg':
      return `https://u.gg/lol/champions/${name}/build`
  }
}

export const getChampionImageSrc = (
  champion: ChampionData,
  version: string
): string => `/cdn/${version}/img/champion/${champion?.image?.full}`

export const getChampionSplashImageSrc = (
  champion: ChampionData,
  imageNumber = 0
): string => `/cdn/img/champion/splash/${champion?.id}_${imageNumber}.jpg`

export const getChampionLoadingSplashImageSrc = (
  champion: ChampionData,
  imageNumber = 0
): string => `/cdn/img/champion/loading/${champion?.id}_${imageNumber}.jpg`
