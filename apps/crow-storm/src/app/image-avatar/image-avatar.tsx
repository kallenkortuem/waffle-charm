import React from 'react'
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'
import Avatar from '@material-ui/core/Avatar'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      '& > *': {
        margin: theme.spacing(1),
      },
    },
    small: {
      width: theme.spacing(3),
      height: theme.spacing(3),
    },
    large: {
      width: theme.spacing(7),
      height: theme.spacing(7),
    },
  })
)

export default function ImageAvatar(props: {
  src: string
  alt: string
}): React.ReactElement {
  const { src, alt } = props
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <Avatar alt={alt} src={src} className={classes.large} />
    </div>
  )
}
