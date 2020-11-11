import Avatar from '@material-ui/core/Avatar'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardHeader from '@material-ui/core/CardHeader'
import LinearProgress from '@material-ui/core/LinearProgress'
import { createStyles, Theme, withStyles } from '@material-ui/core/styles'
import CheckCircleRoundedIcon from '@material-ui/icons/CheckCircleRounded'
import { ChampionData, ChampionMasteryDTO } from '@waffle-charm/api-interfaces'
import React from 'react'
import { useTranslation } from 'react-i18next'
const BorderLinearProgress = withStyles((theme: Theme) =>
  createStyles({
    root: {
      height: theme.spacing(1),
      borderRadius: theme.spacing(0.5),
    },
    bar: {
      borderRadius: theme.spacing(0.5),
    },
  })
)(LinearProgress)

const RightAlignedCardContent = withStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      justifyContent: 'flex-end',
    },
  })
)(CardContent)

export default function MasteryCard(props: {
  mastery: ChampionMasteryDTO
  champion: ChampionData
}): React.ReactElement {
  const { champion, mastery } = props
  const { t } = useTranslation()
  const src = `/cdn/10.22.1/img/champion/${champion?.image?.full}`
  const subheader = t('totalMasteryPoints', {
    points: mastery?.championPoints?.toLocaleString() ?? 0,
  })
  const totalInLevel =
    mastery?.championPointsSinceLastLevel +
    mastery?.championPointsUntilNextLevel
  const progress = Math.floor(
    (mastery?.championPointsSinceLastLevel / totalInLevel) * 100
  )
  const levelProgress =
    mastery.championLevel < 5 ? (
      <CardContent>
        <BorderLinearProgress
          value={progress}
          variant="determinate"
          aria-label={t('percentMasteryProgress', {
            percent: progress ?? 0,
            level: mastery.championLevel + 1,
          })}
        ></BorderLinearProgress>
      </CardContent>
    ) : null
  const levelSixTokens =
    mastery.championLevel === 5 ? (
      <RightAlignedCardContent
        aria-label={t('tokenMasteryProgress', {
          earned: mastery.tokensEarned,
          total: 2,
        })}
      >
        <CheckCircleRoundedIcon
          color={mastery.tokensEarned >= 1 ? 'primary' : 'disabled'}
        />
        <CheckCircleRoundedIcon
          color={mastery.tokensEarned >= 2 ? 'primary' : 'disabled'}
        />
      </RightAlignedCardContent>
    ) : null
  const levelSevenTokens =
    mastery.championLevel === 6 ? (
      <RightAlignedCardContent
        aria-label={t('tokenMasteryProgress', {
          earned: mastery.tokensEarned,
          total: 3,
        })}
      >
        <CheckCircleRoundedIcon
          color={mastery.tokensEarned >= 1 ? 'primary' : 'disabled'}
        />
        <CheckCircleRoundedIcon
          color={mastery.tokensEarned >= 2 ? 'primary' : 'disabled'}
        />
        <CheckCircleRoundedIcon
          color={mastery.tokensEarned >= 3 ? 'primary' : 'disabled'}
        />
      </RightAlignedCardContent>
    ) : null
  return (
    <Card>
      <CardHeader
        avatar={
          <Avatar
            alt=""
            imgProps={{ width: '40px', height: '40px' }}
            src={src}
          />
        }
        title={champion?.name}
        subheader={subheader}
      />
      {levelProgress}
      {levelSixTokens}
      {levelSevenTokens}
    </Card>
  )
}
