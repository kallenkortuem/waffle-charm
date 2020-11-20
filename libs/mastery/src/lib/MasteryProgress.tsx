import Tooltip from '@material-ui/core/Tooltip'
import { ChampionMasteryDTO } from '@waffle-charm/api-interfaces'
import React from 'react'
import { useTranslation } from 'react-i18next'
import MasteryLinearProgress from './MasteryLinearProgress'
import MasteryToken from './MasteryToken'

const getMasteryLevelProgress = (mastery: ChampionMasteryDTO): number => {
  const totalInLevel =
    mastery?.championPointsSinceLastLevel +
    mastery?.championPointsUntilNextLevel
  return Math.floor(
    (mastery?.championPointsSinceLastLevel / totalInLevel) * 100
  )
}

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
        <MasteryLinearProgress
          current={mastery.championPointsSinceLastLevel}
          total={
            mastery.championPointsUntilNextLevel +
            mastery.championPointsSinceLastLevel
          }
          label={t('percentMasteryProgress', {
            percent: progress ?? 0,
            level: mastery.championLevel + 1,
          })}
          progress={progress}
        />
      )
  }
}

export default MasteryProgress
