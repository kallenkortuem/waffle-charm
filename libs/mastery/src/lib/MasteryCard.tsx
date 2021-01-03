import {
  CardMedia,
  Collapse,
  createStyles,
  Link,
  makeStyles,
  Theme,
} from '@material-ui/core'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardHeader from '@material-ui/core/CardHeader'
import { Skeleton } from '@material-ui/lab'
import {
  ChampionData,
  ChampionMasteryDTO,
  Vendors,
} from '@waffle-charm/api-interfaces'
import {
  ChampionAvatar,
  getChampionInfoUrl,
  getChampionSplashImageSrc,
} from '@waffle-charm/champions'
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
    hideFullImg,
    compact,
  } = props
  const { t } = useTranslation()
  const classes = useStyles(props)

  return (
    <Card className={classes.root} elevation={3}>
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
              mastery?.championPoints.toLocaleString() ?? 0
          )
        }
      />
      <Collapse in={!hideFullImg}>
        <CardMedia
          className={classes.media}
          image={getChampionSplashImageSrc(champion)}
        ></CardMedia>
      </Collapse>
      <CardContent className={classes.content}>
        {mastery ? <MasteryProgress mastery={mastery} /> : null}
      </CardContent>
    </Card>
  )
}

export default MasteryCard
