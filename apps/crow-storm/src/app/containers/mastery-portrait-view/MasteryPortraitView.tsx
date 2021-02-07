import {
  Card,
  CardActionArea,
  createStyles,
  makeStyles,
  Theme,
} from '@material-ui/core'
import { getChampionLoadingSplashImageSrc } from '@waffle-charm/champions'
import {
  fetchChampionDetail,
  selectChampionDetailEntities,
  selectChampionDetailLoadingStatus,
  selectChampionEntities,
  selectLolVersion,
  selectMasteryLoadingStatus,
  selectVisibleChampionIds,
} from '@waffle-charm/store'
import React, { ReactElement, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

/* eslint-disable-next-line */
export interface MasteryPortraitViewProps {}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {},
    champions: {
      display: 'grid',
      gridTemplateColumns: 'repeat(5, 1fr)',
      gridGap: theme.spacing(3),
    },
    champion: {
      width: '100%',
      height: '100%',
      display: 'flex',
      overflow: 'hidden',
      borderRadius: theme.shape.borderRadius,
    },
    championImage: {
      width: `104%`,
      height: `104%`,
      margin: theme.spacing(0, 0, 0, 0),
    },
  })
)

export function MasteryPortraitView(
  props: MasteryPortraitViewProps
): ReactElement {
  const visibleChampionIds = useSelector(selectVisibleChampionIds)
  const classes = useStyles()

  const items = useMemo(() => {
    return visibleChampionIds.map((id) => {
      return <MasteryPortraitViewItem key={id} championId={id} />
    })
  }, [visibleChampionIds])

  return (
    <div className={classes.root}>
      <div className={classes.champions}>{items}</div>
    </div>
  )
}

function MasteryPortraitViewItem(props: { championId: string }): ReactElement {
  const { championId } = props
  const dispatch = useDispatch()
  const classes = useStyles()
  const champion = useSelector(selectChampionEntities)[championId]
  const version = useSelector(selectLolVersion)
  const masteryLoadingStatus = useSelector(selectMasteryLoadingStatus)
  const championDetailLoadingStatus = useSelector(
    selectChampionDetailLoadingStatus
  )
  const championDetail = useSelector(selectChampionDetailEntities)[championId]
  const [num, setNum] = useState(0)

  const handleClick = () => {
    if (!championDetail) {
      dispatch(fetchChampionDetail({ version, name: champion?.id }))
    }
  }

  return (
    <CardActionArea className={classes.champion} onClick={handleClick}>
      <img
        className={classes.championImage}
        src={getChampionLoadingSplashImageSrc(champion, num)}
        alt={champion.name}
      />
    </CardActionArea>
  )
}
