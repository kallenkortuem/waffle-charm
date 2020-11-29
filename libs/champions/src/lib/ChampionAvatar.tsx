import { createStyles, makeStyles, Theme } from '@material-ui/core'
import Avatar, { AvatarProps } from '@material-ui/core/Avatar'
import { ChampionData } from '@waffle-charm/api-interfaces'
import React from 'react'
import { getChampionImageSrc } from './utils'

export interface ChampionAvatarProps extends AvatarProps {
  size: 'small' | 'large'
  champion: ChampionData
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: theme.spacing(12),
      height: theme.spacing(12),
    },
  })
)

export const ChampionAvatar = (
  props: ChampionAvatarProps
): React.ReactElement => {
  const { size, champion, ...avatarProps } = props
  const classes = useStyles()
  return (
    <Avatar
      {...avatarProps}
      alt=""
      variant="circle"
      className={size === 'large' ? classes.root : null}
      imgProps={{ width: '120px', height: '120px' }}
      src={getChampionImageSrc(props.champion)}
    />
  )
}

export default ChampionAvatar
