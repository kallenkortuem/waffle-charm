import {
  Card,
  CardContent,
  CardHeader,
  Hidden,
  Link,
  Typography,
} from '@material-ui/core'
import Skeleton from '@material-ui/lab/Skeleton'
import { ChampionRoleFilter } from '@waffle-charm/champions'
import { MasteryLinearProgress } from '@waffle-charm/mastery'
import { getSummonerInfoUrl, ProfileAvatar } from '@waffle-charm/summoner'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import {
  ChampionEntity,
  selectAllChampion,
  selectAllChampionTags,
} from '../+store/features/champion.slice'
import {
  MasteryEntity,
  selectAllMastery,
} from '../+store/features/mastery.slice'
import { selectSummonerVendor } from '../+store/features/settings.slice'
import { createSelectSummonerByName } from '../+store/features/summoner.slice'

const maxPoints = (1800 + 2400) * 5

function getProgress(current: number, total: number) {
  return Math.floor((current / total) * 100)
}

const getTotals = (
  masteries: MasteryEntity[],
  filteredChampions: ChampionEntity[]
): {
  totalLevel: number
  totalPoints: number
  totalCappedPoints: number
} =>
  (filteredChampions || []).reduce(
    (acc, champion) => {
      const mastery = masteries.find(
        (m) => m.championId === parseInt(champion.key)
      )
      if (mastery) {
        const cappedChampionPoints = [7, 6, 5].includes(mastery.championLevel)
          ? maxPoints
          : mastery.championPoints

        acc.totalLevel += mastery.championLevel
        acc.totalPoints += mastery.championPoints
        acc.totalCappedPoints += cappedChampionPoints
      }

      return acc
    },
    {
      totalLevel: 0,
      totalPoints: 0,
      totalCappedPoints: 0,
    }
  )

export const TotalSubheader = (props: {
  points: number
  level: number
  loaded: boolean
}): React.ReactElement => {
  const { t } = useTranslation()
  return (
    <>
      <Typography>
        {props.loaded ? (
          t('totalMasteryPoints') + ' ' + props?.points?.toLocaleString() ?? 0
        ) : (
          <Skeleton width="40%" />
        )}
      </Typography>
      <Typography>
        {props.loaded ? (
          t('totalChampionLevels') + ' ' + props.level?.toLocaleString() ?? 0
        ) : (
          <Skeleton width="30%" />
        )}
      </Typography>
    </>
  )
}

export interface MasteryTotalProgressProps {
  summonerName: string
  tag?: string
  onTagChange: (event: React.MouseEvent<HTMLElement>, tag: string) => void
}

export const MasteryTotalProgress = (
  props: MasteryTotalProgressProps
): React.ReactElement => {
  const { tag, summonerName, onTagChange } = props
  const { t } = useTranslation()
  const champions = useSelector(selectAllChampion)
  const masteries = useSelector(selectAllMastery)
  const summonerVendor = useSelector(selectSummonerVendor)
  const selectSummonerByName = createSelectSummonerByName()
  const summoner = useSelector((state) =>
    selectSummonerByName(state, summonerName)
  )
  const allTags = useSelector(selectAllChampionTags)
  const filteredChampions = React.useMemo(
    () => champions.filter((champion) => !tag || champion.tags.includes(tag)),
    [champions, tag]
  )

  const totalStats = React.useMemo(() => getTotals(masteries, champions), [
    masteries,
    champions,
  ])

  const filteredTotalStats = React.useMemo(
    () => getTotals(masteries, filteredChampions),
    [masteries, filteredChampions]
  )

  const filteredPointsProgress = getProgress(
    filteredTotalStats.totalCappedPoints,
    filteredChampions.length * maxPoints
  )

  const pointsProgress = getProgress(
    totalStats.totalCappedPoints,
    champions.length * maxPoints
  )

  const loaded = !!(summoner && masteries.length)

  return (
    <Card>
      <CardHeader
        title={
          <Link
            variant="h5"
            underline="hover"
            color="textPrimary"
            href={getSummonerInfoUrl(summoner, summonerVendor)}
            data-cy="summoner-name"
          >
            {loaded ? summoner.name : <Skeleton width="60%" />}
          </Link>
        }
        avatar={
          loaded ? (
            <ProfileAvatar summoner={summoner} data-cy="summoner-avatar" />
          ) : (
            <Skeleton variant="circle">
              <ProfileAvatar summoner={summoner} />
            </Skeleton>
          )
        }
        subheader={
          <>
            <Hidden smUp>
              <TotalSubheader
                loaded={loaded}
                points={totalStats?.totalPoints}
                level={totalStats?.totalLevel}
              />
            </Hidden>
            <Hidden only="xs">
              <TotalSubheader
                loaded={loaded}
                points={filteredTotalStats?.totalPoints}
                level={filteredTotalStats?.totalLevel}
              />
            </Hidden>
          </>
        }
      />
      <CardContent>
        <Hidden smUp>
          <MasteryLinearProgress
            current={totalStats.totalCappedPoints}
            total={champions.length * maxPoints}
            label={t('percentMasteryProgress', {
              percent: pointsProgress ?? 0,
              level: 5,
            })}
            progress={pointsProgress}
          />
        </Hidden>
        <Hidden only="xs">
          <ChampionRoleFilter
            tag={tag}
            allTags={allTags}
            onTagChange={onTagChange}
          />
          <MasteryLinearProgress
            current={filteredTotalStats.totalCappedPoints}
            total={filteredChampions.length * maxPoints}
            label={t('percentMasteryProgress', {
              percent: filteredPointsProgress ?? 0,
              level: 5,
            })}
            progress={filteredPointsProgress}
          />
        </Hidden>
      </CardContent>
    </Card>
  )
}

export default MasteryTotalProgress
