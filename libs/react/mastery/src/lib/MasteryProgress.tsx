import { Tooltip } from '@material-ui/core'
import LinearProgress from '@material-ui/core/LinearProgress'
import { createStyles, Theme, withStyles } from '@material-ui/core/styles'
import { ChampionMasteryDTO } from '@waffle-charm/api-interfaces'
import MasteryToken from './MasteryToken'
import React from 'react'
import { useTranslation } from 'react-i18next'

const getMasteryLevelProgress = (mastery: ChampionMasteryDTO): number => {
  const totalInLevel =
    mastery?.championPointsSinceLastLevel +
    mastery?.championPointsUntilNextLevel
  return Math.floor(
    (mastery?.championPointsSinceLastLevel / totalInLevel) * 100
  )
}

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

export interface MasteryProgressProps {
  mastery: ChampionMasteryDTO
}

export const MasteryProgress = (
  props: MasteryProgressProps
): React.ReactElement => {
  const { t } = useTranslation()
  const { mastery } = props
  const progress = getMasteryLevelProgress(mastery)
  switch (props.mastery.championLevel) {
    case 7:
      return (
        <Tooltip
          title={t('tokenMasteryProgress', {
            earned: 3,
            total: 3,
          })}
        >
          <span>
            <MasteryToken mastery={mastery} threshold={0} />
            <MasteryToken mastery={mastery} threshold={0} />
            <MasteryToken mastery={mastery} threshold={0} />
          </span>
        </Tooltip>
      )
    case 6:
      return (
        <Tooltip
          title={t('tokenMasteryProgress', {
            earned: mastery.tokensEarned,
            total: 3,
          })}
        >
          <span>
            <MasteryToken mastery={mastery} threshold={1} />
            <MasteryToken mastery={mastery} threshold={2} />
            <MasteryToken mastery={mastery} threshold={3} />
          </span>
        </Tooltip>
      )
    case 5:
      return (
        <Tooltip
          title={t('tokenMasteryProgress', {
            earned: mastery.tokensEarned,
            total: 2,
          })}
        >
          <span>
            <MasteryToken mastery={mastery} threshold={1} />
            <MasteryToken mastery={mastery} threshold={2} />
          </span>
        </Tooltip>
      )
    default:
      return (
        <Tooltip
          title={t('percentMasteryProgress', {
            percent: progress ?? 0,
            level: mastery.championLevel + 1,
          })}
        >
          <BorderLinearProgress
            value={progress}
            variant="determinate"
          ></BorderLinearProgress>
        </Tooltip>
      )
  }
}

export default MasteryProgress
