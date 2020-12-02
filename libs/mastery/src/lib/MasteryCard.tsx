import {
  CardMedia,
  createStyles,
  Link,
  makeStyles,
  Theme,
} from '@material-ui/core'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardHeader from '@material-ui/core/CardHeader'
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
  champion: ChampionData
  version: string
  championVendor: Vendors
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {},
    header: {},
    media: {
      height: 0,
      paddingTop: '56.25%', // 16:9
    },
  })
)

export default function MasteryCard(
  props: MasteryCardProps
): React.ReactElement {
  const { champion, mastery, version, championVendor } = props
  const { t } = useTranslation()
  const classes = useStyles()

  return (
    <Card className={classes.root}>
      <CardHeader
        className={classes.header}
        avatar={
          <ChampionAvatar version={version} size="small" champion={champion} />
        }
        title={
          <Link
            variant="body2"
            href={getChampionInfoUrl(champion, championVendor)}
            underline="hover"
            color="textPrimary"
          >
            {champion?.name}
          </Link>
        }
        subheader={
          t('totalMasteryPoints') +
            ' ' +
            mastery?.championPoints?.toLocaleString() ?? 0
        }
      />
      <CardMedia
        className={classes.media}
        image={getChampionSplashImageSrc(champion)}
      ></CardMedia>

      <CardContent>
        <MasteryProgress mastery={mastery} />
      </CardContent>
    </Card>
  )
}
