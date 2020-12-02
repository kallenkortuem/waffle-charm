import { SummonerDTO, Vendors } from '@waffle-charm/api-interfaces'

export const getSummonerInfoUrl = (
  summoner: SummonerDTO,
  vendor: Vendors
): string => {
  if (!summoner) {
    return ''
  }

  const name = summoner?.name?.toLocaleLowerCase()

  switch (vendor) {
    case 'op.gg':
      return `https://na.op.gg/summoner/userName=${name}`
    case 'leagueofgraphs.com':
      return `https://www.leagueofgraphs.com/summoner/na/${name}`
    case 'u.gg':
      return `https://u.gg/lol/profile/na1/${name}/overview`
    case 'porofessor.gg':
      return `https://porofessor.gg/live/na/${name}`
  }
}
