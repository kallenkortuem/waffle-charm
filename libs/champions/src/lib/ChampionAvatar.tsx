import Avatar from '@material-ui/core/Avatar'
import { ChampionData } from '@waffle-charm/api-interfaces'
import React from 'react'

export const getChampionImageSrc = (champion: ChampionData): string =>
  `/cdn/10.22.1/img/champion/${champion?.image?.full}`

export interface ChampionAvatarProps {
  size: 'small' | 'large'
  champion: ChampionData
}

export const ChampionAvatar = (
  props: ChampionAvatarProps
): React.ReactElement => (
  <Avatar
    alt=""
    imgProps={{ width: '40px', height: '40px' }}
    src={getChampionImageSrc(props.champion)}
  />
)

export default ChampionAvatar
