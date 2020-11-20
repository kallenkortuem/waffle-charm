import { createStyles, makeStyles, Theme } from '@material-ui/core'
import Avatar, { AvatarProps } from '@material-ui/core/Avatar'
import { SummonerDTO } from '@waffle-charm/api-interfaces'
import React from 'react'

export interface ProfileAvatarProps extends AvatarProps {
  summoner: SummonerDTO
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: theme.spacing(10),
      height: theme.spacing(10),
    },
  })
)

export const ProfileAvatar = (props: ProfileAvatarProps) => {
  const classes = useStyles()
  return (
    <Avatar
      className={classes.root}
      imgProps={{ width: '80px', height: '80px' }}
      src={`/cdn/10.23.1/img/profileicon/${props.summoner?.profileIconId}.png`}
    />
  )
}

export default ProfileAvatar
