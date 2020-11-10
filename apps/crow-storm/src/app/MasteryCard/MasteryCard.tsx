import Avatar from '@material-ui/core/Avatar'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardHeader from '@material-ui/core/CardHeader'
import { ChampionData, ChampionMasteryDTO } from '@waffle-charm/api-interfaces'
import React from 'react'
import { createStyles, withStyles, Theme } from '@material-ui/core/styles'
import LinearProgress from '@material-ui/core/LinearProgress'
import CheckCircleRoundedIcon from '@material-ui/icons/CheckCircleRounded'
import CheckCircleOutlineRoundedIcon from '@material-ui/icons/CheckCircleOutlineRounded'

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
  const icons = (count: number) =>
    mastery.tokensEarned >= count ? (
      <CheckCircleRoundedIcon />
    ) : (
      <CheckCircleOutlineRoundedIcon />
    )

  const src = `/cdn/10.22.1/img/champion/${champion?.image?.full}`
  const subheader = `Total Points: ${mastery?.championPoints.toLocaleString()}`
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
          aria-label={`${progress}% progress towards mastery level ${
            mastery.championLevel + 1
          }`}
        ></BorderLinearProgress>
      </CardContent>
    ) : null
  const levelSixTokens =
    mastery.championLevel === 5 ? (
      <RightAlignedCardContent
        aria-label={`${mastery.tokensEarned} of 2 Tokens Earned`}
      >
        {icons(2)}
        {icons(1)}
      </RightAlignedCardContent>
    ) : null
  const levelSevenTokens =
    mastery.championLevel === 6 ? (
      <RightAlignedCardContent
        aria-label={`${mastery.tokensEarned} of 3 Tokens Earned`}
      >
        {icons(3)}
        {icons(2)}
        {icons(1)}
      </RightAlignedCardContent>
    ) : null
  return (
    <Card>
      <CardHeader
        avatar={<Avatar alt="" src={src} />}
        title={champion?.name}
        subheader={subheader}
      />
      {levelProgress}
      {levelSixTokens}
      {levelSevenTokens}
    </Card>
  )
}
