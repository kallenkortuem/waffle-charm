import { Box, Divider } from '@material-ui/core'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardHeader from '@material-ui/core/CardHeader'
import {
  ChampionData,
  ChampionMasteryDTO,
  SummonerDTO,
} from '@waffle-charm/api-interfaces'
import ChampionRoleFilter from '@waffle-charm/champions/ChampionRoleFilter'
import React from 'react'
import { useTranslation } from 'react-i18next'
import MasteryLinearProgress from './MasteryLinearProgress'

const maxPoints = (1800 + 2400) * 5

function getProgress(current: number, total: number) {
  return Math.floor((current / total) * 100)
}

export interface MasteryTotalProgressProps {
  masteries: ChampionMasteryDTO[]
  championMap: Record<number, ChampionData>
  summoner: SummonerDTO
  allTags: string[]
  tag?: string
  onTagChange: (event: React.MouseEvent<HTMLElement>, tag: string) => void
}

export const MasteryTotalProgress = (props: MasteryTotalProgressProps) => {
  const { masteries, championMap, tag, summoner, allTags, onTagChange } = props
  const { t } = useTranslation()

  const championEntries = React.useMemo(() => {
    return Object.values(championMap)
  }, [championMap])

  const filteredChampions = React.useMemo(() => {
    return championEntries.filter(
      (champion) => !tag || champion.tags.includes(tag)
    )
  }, [championEntries, tag])

  const stats: {
    totalLevel: number
    totalPoints: number
    totalCappedPoints: number
  } = React.useMemo(
    () =>
      (championEntries || []).reduce(
        (acc, champion) => {
          if (!tag || champion.tags.includes(tag)) {
            const mastery = masteries.find(
              (m) => m.championId === parseInt(champion.key)
            )
            if (mastery) {
              const cappedChampionPoints = [7, 6, 5].includes(
                mastery.championLevel
              )
                ? maxPoints
                : mastery.championPoints

              acc.totalLevel += mastery.championLevel
              acc.totalPoints += mastery.championPoints
              acc.totalCappedPoints += cappedChampionPoints
            }
          }
          return acc
        },
        {
          totalLevel: 0,
          totalPoints: 0,
          totalCappedPoints: 0,
        }
      ),
    [masteries, tag, championEntries]
  )

  const championLevelsProgress = getProgress(
    stats.totalLevel,
    filteredChampions.length * 7
  )

  const championPointsProgress = getProgress(
    stats.totalCappedPoints,
    filteredChampions.length * ((1800 + 2400) * 5)
  )

  return (
    <Card>
      <CardHeader
        title={summoner?.name}
        subheader={t('totalMasteryPoints', {
          points: stats?.totalPoints?.toLocaleString() ?? 0,
        }) + ' | Total Levels: ' + stats?.totalLevel?.toLocaleString() ?? 0 }
      />
      <CardContent>
        <ChampionRoleFilter
          tag={tag}
          allTags={allTags}
          onTagChange={onTagChange}
        />
        <MasteryLinearProgress
          color="secondary"
          current={stats.totalCappedPoints}
          total={filteredChampions.length * ((1800 + 2400) * 5)}
          label={t('percentMasteryProgress', {
            percent: championPointsProgress ?? 0,
            level: 5,
          })}
          progress={championPointsProgress}
        />
      </CardContent>
    </Card>
  )
}

export default MasteryTotalProgress
