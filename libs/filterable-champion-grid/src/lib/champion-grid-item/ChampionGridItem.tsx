import {
  Card,
  createStyles,
  makeStyles,
  Theme,
  Typography,
} from '@material-ui/core'
import { ChampionAvatar } from '@waffle-charm/champions'
import {
  selectChampionEntities,
  selectChampionVendor,
  selectLolVersion,
  selectMasteryEntities,
} from '@waffle-charm/store'
import React from 'react'
import { useSelector } from 'react-redux'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: theme.spacing(2, 1),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      overflow: 'hidden',
    },
    avatar: {
      margin: theme.spacing(0, 0, 1, 0),
    },
  })
)

/* eslint-disable-next-line */
export interface ChampionGridItemProps {
  championId: string
}
export function ChampionGridItem(props: ChampionGridItemProps) {
  const classes = useStyles()
  const { championId } = props
  const champion = useSelector(selectChampionEntities)[championId]
  const version = useSelector(selectLolVersion)
  const championVendor = useSelector(selectChampionVendor)

  const masteries = useSelector(selectMasteryEntities)
  const mastery = masteries[parseInt(championId)]

  return (
    <Card className={classes.root}>
      <ChampionAvatar
        className={classes.avatar}
        champion={champion}
        version={version}
        size="small"
      ></ChampionAvatar>
      <Typography variant="body1" component="span">
        {champion.name}
      </Typography>
    </Card>
  )
}

export default ChampionGridItem
