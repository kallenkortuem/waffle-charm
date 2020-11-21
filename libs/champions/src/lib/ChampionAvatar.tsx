import Avatar, { AvatarProps } from '@material-ui/core/Avatar'
import { ChampionData } from '@waffle-charm/api-interfaces'
import React from 'react'
import { getChampionImageSrc } from './utils'

export interface ChampionAvatarProps extends AvatarProps {
  size: 'small' | 'large'
  champion: ChampionData
}

export const ChampionAvatar = (
  props: ChampionAvatarProps
): React.ReactElement => {
  const { size, champion, ...avatarProps } = props
  return (
    <Avatar
      alt=""
      imgProps={{ width: '40px', height: '40px' }}
      src={getChampionImageSrc(props.champion)}
      {...avatarProps}
    />
  )
}

export default ChampionAvatar
