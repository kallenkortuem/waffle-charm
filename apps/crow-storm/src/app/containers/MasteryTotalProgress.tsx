import {
  Card,
  CardContent,
  CardHeader,
  createStyles,
  Hidden,
  Link,
  makeStyles,
  Theme,
  Typography,
} from '@material-ui/core'
import Skeleton from '@material-ui/lab/Skeleton'
import { MasteryLinearProgress } from '@waffle-charm/mastery'
import {
  ChampionEntity,
  createSelectSummonerByName,
  MasteryEntity,
  selectAllChampion,
  selectAllMastery,
  selectSummonerVendor,
  selectTag,
} from '@waffle-charm/store'
import { getSummonerInfoUrl, ProfileAvatar } from '@waffle-charm/summoner'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'

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
}

export const MasteryTotalProgress = (
  props: MasteryTotalProgressProps
): React.ReactElement => {
  const { summonerName } = props
  const { t } = useTranslation()
  const champions = useSelector(selectAllChampion)
  const masteries = useSelector(selectAllMastery)
  const summonerVendor = useSelector(selectSummonerVendor)
  const tag = useSelector(selectTag)
  const selectSummonerByName = createSelectSummonerByName()
  const summoner = useSelector((state) =>
    selectSummonerByName(state, summonerName)
  )

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

  const loaded = !!(summoner && masteries.length)

  return (
    <Card variant="outlined">
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
        <MasteryLinearProgress
          current={filteredTotalStats.totalCappedPoints}
          total={filteredChampions.length * maxPoints}
          label={t('percentMasteryProgress', {
            percent: filteredPointsProgress ?? 0,
            level: 5,
          })}
          progress={filteredPointsProgress}
        />
      </CardContent>
    </Card>
  )
}

export default MasteryTotalProgress
