import {
  Card,
  CardActionArea,
  createStyles,
  makeStyles,
  Paper,
  Theme,
  Typography,
  Zoom,
} from '@material-ui/core'
import { ChampionAvatar } from '@waffle-charm/champions'
import {
  selectChampionEntities,
  selectLolVersion,
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
    },
    compactItem: {
      display: 'grid',
      justifyItems: 'center',
      padding: theme.spacing(2),
      gridGap: theme.spacing(1),
    },
    paper: {
      margin: theme.spacing(1),
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
    <Paper className={classes.root}>
      <div className={classes.compactContainer}>{items}</div>
    </Paper>
  )
}

const MasteryCompactViewItemV2 = (props: { championId: string }) => {
  const { championId } = props
  const champion = useSelector(selectChampionEntities)[championId]
  const version = useSelector(selectLolVersion)
  const classes = useStyles()

  const [expanded, setExpanded] = React.useState(false)

  const handleChange = () => {
    // TODO  setExpanded((prev) => !prev) leave disabled for now
    setExpanded((prev) => prev)
  }

  return (
    <Zoom in={true} style={{ transitionDelay: '200ms' }}>
      <Card
        variant="outlined"
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
            imgProps={{ style: { width: 'unset', height: 'unset' } }}
          />
          <Typography variant="body2">{champion?.name}</Typography>
        </CardActionArea>
      </Card>
    </Zoom>
  )
}

export default MasteryCompactView
