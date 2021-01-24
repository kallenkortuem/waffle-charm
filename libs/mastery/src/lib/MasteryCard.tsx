import {
  CardActions,
  Collapse,
  createStyles,
  IconButton,
  Link,
  makeStyles,
  Theme,
} from '@material-ui/core'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardHeader from '@material-ui/core/CardHeader'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import { Skeleton } from '@material-ui/lab'
import {
  ChampionData,
  ChampionMasteryDTO,
  Vendors,
} from '@waffle-charm/api-interfaces'
import { ChampionAvatar, getChampionInfoUrl } from '@waffle-charm/champions'
import clsx from 'clsx'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { MasteryProgress } from './MasteryProgress'

export interface MasteryCardProps {
  mastery: ChampionMasteryDTO
  loading: boolean
  champion: ChampionData
  version: string
  championVendor: Vendors
  hideFullImg?: boolean
  compact?: boolean
  actionCTAs?: React.ReactNode
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexDirection: (props: MasteryCardProps) =>
        props.compact ? 'row' : 'column',
      justifyContent: 'space-between',
    },
    header: {},
    content: {
      padding: theme.spacing(2),
      '&:last-child': {
        paddingBottom: theme.spacing(2),
      },
      flexGrow: (props: MasteryCardProps) => (props.compact ? 0.5 : 0),
      alignSelf: (props: MasteryCardProps) =>
        props.compact ? 'flex-end' : 'unset',
    },
    expand: {
      transform: 'rotate(0deg)',
      marginLeft: 'auto',
      transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
      }),
    },
    expandOpen: {
      transform: 'rotate(180deg)',
    },
    media: {
      height: 0,
      paddingTop: '56.25%', // 16:9
    },
  })
)

export function MasteryCard(props: MasteryCardProps): React.ReactElement {
  const {
    loading,
    champion,
    mastery,
    version,
    championVendor,
    actionCTAs,
  } = props
  const { t } = useTranslation()
  const classes = useStyles(props)
  const [expanded, setExpanded] = React.useState(false)

  const handleExpandClick = () => {
    setExpanded(!expanded)
  }

  return (
    <Card className={classes.root} elevation={3} data-cy="mastery-card">
      <CardHeader
        className={classes.header}
        avatar={
          loading ? (
            <Skeleton variant="circle" width={40} height={40} />
          ) : (
            <ChampionAvatar
              version={version}
              size="small"
              champion={champion}
            />
          )
        }
        title={
          loading ? (
            <Skeleton />
          ) : (
            <Link
              variant="body2"
              href={getChampionInfoUrl(champion, championVendor)}
              underline="hover"
              color="textPrimary"
            >
              {champion.name}
            </Link>
          )
        }
        subheader={
          loading ? (
            <Skeleton />
          ) : (
            t('totalMasteryPoints') +
            ' ' +
            (mastery?.championPoints.toLocaleString() ?? 0)
          )
        }
      />
      <CardActions disableSpacing>
        {actionCTAs}
        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent className={classes.content}>
          {mastery ? <MasteryProgress mastery={mastery} /> : null}
        </CardContent>
      </Collapse>
    </Card>
  )
}

export default MasteryCard
