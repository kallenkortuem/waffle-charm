import { createStyles, makeStyles, Theme } from '@material-ui/core'
import Avatar, { AvatarProps } from '@material-ui/core/Avatar'
import { SummonerDTO } from '@waffle-charm/api-interfaces'
import { useLolVersion } from '@waffle-charm/store'
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
  const { lolVersion } = useLolVersion()

  return (
    <Avatar
      className={classes.root}
      imgProps={{ width: '80px', height: '80px' }}
      src={
        props.summoner
          ? `/cdn/10.23.1/img/profileicon/${props.summoner?.profileIconId}.png`
          : ''
      }
      alt=""
    />
  )
}

export default ProfileAvatar
