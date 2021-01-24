import {
  Button,
  CardActionArea,
  createStyles,
  makeStyles,
  Theme,
  Typography,
} from '@material-ui/core'
import { ChampionAvatar } from '@waffle-charm/champions'
import {
  masteryViewerActions,
  selectChampionEntities,
  selectFilteredChampionIds,
  selectLolVersion,
  selectVisibleChampionIds,
} from '@waffle-charm/store'
import React, { ReactElement, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'

/* eslint-disable-next-line */
export interface MasteryCompactViewProps {}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {},
    compactContainer: {
      display: 'grid',
      gridTemplateColumns: `repeat(auto-fill, minmax(120px, 1fr))`,
    },
    compactItem: {
      display: 'grid',
      justifyItems: 'center',
      padding: theme.spacing(2, 2, 1, 2),
      gridGap: theme.spacing(1),
    },
  })
)

export function MasteryCompactView(
  props: MasteryCompactViewProps
): ReactElement {
  const visibleChampionIds = useSelector(selectVisibleChampionIds)
  const classes = useStyles()

  const items = useMemo(() => {
    return visibleChampionIds.map((id) => {
      return <MasteryCompactViewItemV2 key={id} championId={id} />
    })
  }, [visibleChampionIds])

  return (
    <div className={classes.root}>
      <div className={classes.compactContainer}>{items}</div>
    </div>
  )
}

const MasteryCompactViewItemV2 = (props: { championId: string }) => {
  const { championId } = props
  const champion = useSelector(selectChampionEntities)[championId]
  const version = useSelector(selectLolVersion)
  const classes = useStyles()

  return (
    <CardActionArea className={classes.compactItem}>
      <ChampionAvatar
        version={version}
        size={'large'}
        champion={champion}
        variant="rounded"
        imgProps={{ style: { width: 'unset', height: 'unset' } }}
      />
      <Typography variant="body2">{champion?.name}</Typography>
    </CardActionArea>
  )
}

export default MasteryCompactView
