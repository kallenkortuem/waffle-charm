import {
  Card,
  CardActionArea,
  createStyles,
  makeStyles,
  Theme,
  Typography,
} from '@material-ui/core'
import { ChampionAvatar, getChampionImageSrc } from '@waffle-charm/champions'
import {
  selectChampionEntities,
  selectLolVersion,
  selectMasteryLoadingStatus,
  selectVisibleChampionIds,
} from '@waffle-charm/store'
import clsx from 'clsx'
import React, { ReactElement, useMemo } from 'react'
import { useSelector } from 'react-redux'

/* eslint-disable-next-line */
export interface MasteryCompactViewProps {}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {},
    compactContainer: {
      display: 'grid',
      gridTemplateColumns: `repeat(auto-fill, minmax(${theme.spacing(
        17
      )}px, 1fr))`,
      gridTemplateRoles: `1fr 1fr`,
      gridGap: theme.spacing(2),
    },
    compactItem: {
      display: 'grid',
      justifyItems: 'center',
      padding: theme.spacing(2),
      gridGap: theme.spacing(1),
    },
    paper: {

    },
    paperExpanded: {
      display: 'grid',
      justifyItems: 'start',
      gridColumn: 'span 2',
      gridTemplateColumns: '1fr 1fr',
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
  const classes = useStyles()
  const champion = useSelector(selectChampionEntities)[championId]
  const version = useSelector(selectLolVersion)
  const masteryLoadingStatus = useSelector(selectMasteryLoadingStatus)

  const [expanded, setExpanded] = React.useState(false)

  const handleChange = () => {
    // TODO  setExpanded((prev) => !prev) leave disabled for now
    setExpanded((prev) => prev)
  }

  return (
    <div>
      <Card
        elevation={3}
        className={clsx(classes.paper, {
          [classes.paperExpanded]: expanded,
        })}
      >
        <CardActionArea
          className={clsx(classes.compactItem)}
          disabled
          onClick={handleChange}
        >
          <ChampionAvatar
            version={version}
            size={'large'}
            champion={champion}
            variant="rounded"
            src={
              masteryLoadingStatus === 'loaded' ?
              getChampionImageSrc(champion, version): null
            }
            imgProps={{ style: { width: 'unset', height: 'unset' } }}
          />
          <Typography variant="body2">{champion?.name}</Typography>
        </CardActionArea>
      </Card>
    </div>
  )
}

export default MasteryCompactView
