import { Box } from '@material-ui/core'
import Tooltip from '@material-ui/core/Tooltip'
import { ChampionMasteryDTO } from '@waffle-charm/api-interfaces'
import React from 'react'
import { useTranslation } from 'react-i18next'
import MasteryLinearProgress from './MasteryLinearProgress'
import MasteryToken from './MasteryToken'

const getMasteryLevelProgress = (
  untilNextLevel: number,
  sinceLastLevel: number
): number => {
  const totalInLevel = sinceLastLevel + untilNextLevel
  return Math.floor((sinceLastLevel / totalInLevel) * 100)
}

export const calculateLevelPoints = (lvl: number): number =>
  1800 + 2400 * (lvl - 1)

const calculateChampionLevelMemo = {}
export const calculateChampionLevel = (
  mastery: ChampionMasteryDTO
): {
  uncappedLevel: number
  uncappedPointsUntilNextLevel: number
  uncappedPointsSinceLastLevel: number
} => {
  if (calculateChampionLevelMemo[mastery.championPoints]) {
    return calculateChampionLevelMemo[mastery.championPoints]
  }

  let totalAccumulatedPointsForLevel = 0
  let pointsForLevel = 0
  let uncappedLevel = 0
  for (let x = 1; x < 100; x++) {
    pointsForLevel = calculateLevelPoints(x)
    uncappedLevel++
    totalAccumulatedPointsForLevel += pointsForLevel
    if (totalAccumulatedPointsForLevel > mastery.championPoints) {
      break
    }
  }

  const uncappedPointsUntilNextLevel =
    totalAccumulatedPointsForLevel - mastery.championPoints
  const uncappedPointsSinceLastLevel =
    pointsForLevel - uncappedPointsUntilNextLevel

  return {
    uncappedLevel: uncappedLevel,
    uncappedPointsSinceLastLevel: uncappedPointsSinceLastLevel,
    uncappedPointsUntilNextLevel: uncappedPointsUntilNextLevel,
  }
}

export interface MasteryProgressProps {
  mastery: ChampionMasteryDTO
}

export const MasteryProgress = (
  props: MasteryProgressProps
): React.ReactElement => {
  const { t } = useTranslation()
  const { mastery } = props
  const progress = getMasteryLevelProgress(
    mastery.championPointsUntilNextLevel,
    mastery.championPointsSinceLastLevel
  )

  const {
    uncappedLevel,
    uncappedPointsSinceLastLevel,
    uncappedPointsUntilNextLevel,
  } = calculateChampionLevel(mastery)
  const uncappedProgress = getMasteryLevelProgress(
    uncappedPointsUntilNextLevel,
    uncappedPointsSinceLastLevel
  )

  switch (props.mastery.championLevel) {
    case 7:
      return (
        <Box display="flex" flexDirection="column" justifyContent="flex-end">
          <MasteryLinearProgress
            color="secondary"
            current={uncappedPointsSinceLastLevel}
            total={uncappedPointsUntilNextLevel + uncappedPointsSinceLastLevel}
            label={t('percentMasteryProgress', {
              percent: uncappedProgress ?? 0,
              level: uncappedLevel + 1,
            })}
            progress={uncappedProgress}
          />
        </Box>
      )
    case 6:
      return (
        <Tooltip
          title={t('tokenMasteryProgress', {
            earned: mastery.tokensEarned,
            total: 3,
          })}
        >
          <Box display="flex" justifyContent="flex-end">
            <MasteryToken mastery={mastery} threshold={1} />
            <MasteryToken mastery={mastery} threshold={2} />
            <MasteryToken mastery={mastery} threshold={3} />
          </Box>
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
          <Box display="flex" justifyContent="flex-end">
            <MasteryToken mastery={mastery} threshold={1} />
            <MasteryToken mastery={mastery} threshold={2} />
          </Box>
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
