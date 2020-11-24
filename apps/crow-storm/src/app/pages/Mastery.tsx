import {
  Card,
  CardContent,
  CardHeader,
  Link,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@material-ui/core'
import TableContainer from '@material-ui/core/TableContainer'
import Typography from '@material-ui/core/Typography'
import Skeleton from '@material-ui/lab/Skeleton'
import { ChampionMasteryDTO } from '@waffle-charm/api-interfaces'
import { ChampionRoleFilter, getChampionInfoUrl } from '@waffle-charm/champions'
import {
  MasteryFilter,
  MasteryGridGroup,
  MasteryLinearProgress,
  MasteryProgress,
} from '@waffle-charm/mastery'
import { PageContainer } from '@waffle-charm/material'
import { getSummonerInfoUrl, ProfileAvatar } from '@waffle-charm/summoner'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import {
  selectAllChampion,
  selectAllChampionTags,
  selectChampionEntities,
} from '../+store/features/champion.slice'
import {
  fetchMastery,
  selectAllMastery,
} from '../+store/features/mastery.slice'
import { createSelectSummonerByName } from '../+store/features/summoner.slice'
import WelcomeBanner from '../components/WelcomeBanner'

export const MASTERY_LEVELS = 'masteryLevels'
export const MASTERY_LAYOUT = 'masteryLayout'

export const Mastery = (props: {
  summonerName: string
}): React.ReactElement => {
  const { summonerName } = props
  const dispatch = useDispatch()
  const { t } = useTranslation()
  const selectSummonerByName = createSelectSummonerByName()
  const summoner = useSelector((state) =>
    selectSummonerByName(state, summonerName)
  )

  const [tag, setTag] = useState('')

  const handleSetTag = (
    event: React.MouseEvent<HTMLElement>,
    value: string
  ) => {
    setTag(value)
  }

  useEffect(() => {
    if (summoner) {
      dispatch(fetchMastery(summoner?.id))
    }
  }, [summoner])

  const showWelcomeScreen = !false && !summoner

  const content = (
    <>
      <MasteryTotalProgress
        summonerName={summonerName}
        onTagChange={handleSetTag}
        tag={tag}
      />

      <Masteries tag={tag} />
    </>
  )

  return (
    <main>
      <PageContainer maxWidth="md">
        <Typography variant="h4" component="h1">
          {t('championMastery')}
        </Typography>

        {showWelcomeScreen ? <WelcomeBanner /> : content}
      </PageContainer>
    </main>
  )
}

export default Mastery

export const Masteries = (props: { tag?: string }) => {
  const { tag } = props
  const [layout, setLayout] = useState(
    () => localStorage.getItem(MASTERY_LAYOUT) ?? 'module'
  )
  const [masteryLevels, setVisibleMasteryLevels] = useState(() =>
    JSON.parse(localStorage.getItem(MASTERY_LEVELS) || '["1"]')
  )
  const handleLayoutChange = (
    event: React.MouseEvent<HTMLElement>,
    value: string
  ) => {
    if (value) {
      setLayout(value)
      localStorage.setItem(MASTERY_LAYOUT, value ?? 'module')
    }
  }
  const handleSetMasteryLevels = (
    event: React.MouseEvent<HTMLElement>,
    value: string[]
  ) => {
    if (value?.length >= 1) {
      setVisibleMasteryLevels(value)
      localStorage.setItem(MASTERY_LEVELS, JSON.stringify(value))
    }
  }
  return (
    <>
      <MasteryFilter
        layout={layout}
        masteryLevels={masteryLevels}
        onLayoutChange={handleLayoutChange}
        onMasteryLevelsChange={handleSetMasteryLevels}
      />

      {layout === 'module' ? (
        <MasteryGridView
          tag={tag}
          masteryLevels={masteryLevels}
          sortAscending={false}
        />
      ) : (
        <MasteryListView
          tag={tag}
          masteryLevels={masteryLevels}
          sortAscending={false}
        />
      )}
    </>
  )
}

export interface MasteryViewProps {
  masteryLevels: string[]
  sortAscending: boolean
  tag: string
}

export const MasteryGridView = (
  props: MasteryViewProps
): React.ReactElement => {
  const championEntities = useSelector(selectChampionEntities)
  const masteries = useSelector(selectAllMastery)
  const { masteryLevels, sortAscending, tag } = props

  const groupedMasteries: Record<number, ChampionMasteryDTO[]> = React.useMemo(
    () =>
      masteries.reduce((accum, current) => {
        if (accum[current.championLevel]) {
          accum[current.championLevel].push(current)
        } else {
          accum[current.championLevel] = [current]
        }
        return accum
      }, {}),
    [masteries]
  )

  return (
    <>
      {masteryLevels
        .sort((a, b) =>
          sortAscending ? parseInt(a) - parseInt(b) : parseInt(b) - parseInt(a)
        )
        .map((level) => {
          return (
            <MasteryGridGroup
              key={level}
              level={level}
              groupedMasteries={groupedMasteries}
              tag={tag}
              championMap={championEntities}
            ></MasteryGridGroup>
          )
        })}
    </>
  )
}

export const MasteryListView = (
  props: MasteryViewProps
): React.ReactElement => {
  const { masteryLevels, sortAscending, tag } = props
  const championEntities = useSelector(selectChampionEntities)
  const masteries = useSelector(selectAllMastery)

  const { t } = useTranslation()

  return (
    <TableContainer component={Paper} data-cy="mastery-list">
      <Table aria-label={t('masteryTable')}>
        <TableHead>
          <TableRow>
            <TableCell>{t('champion')}</TableCell>
            <TableCell>{t('masteryLevel')}</TableCell>
            <TableCell>{t('totalPoints')}</TableCell>
            <TableCell>{t('progress')}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {masteries
            .sort((a, b) =>
              sortAscending
                ? a.championLevel - b.championLevel
                : b.championLevel - a.championLevel
            )
            .filter(
              (row) =>
                masteryLevels.includes(row.championLevel.toString()) &&
                (!tag || championEntities[row.championId].tags.includes(tag))
            )
            .map((row: ChampionMasteryDTO, i) => (
              <TableRow key={row.championId}>
                <TableCell>
                  <Link
                    variant="body2"
                    href={getChampionInfoUrl(championEntities[row.championId])}
                    underline="hover"
                    color="textPrimary"
                  >
                    {championEntities[row.championId].name}
                  </Link>
                </TableCell>
                <TableCell>{row.championLevel}</TableCell>
                <TableCell>{row.championPoints.toLocaleString()}</TableCell>
                <TableCell>
                  <MasteryProgress mastery={row} />
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

const maxPoints = (1800 + 2400) * 5

function getProgress(current: number, total: number) {
  return Math.floor((current / total) * 100)
}

export interface MasteryTotalProgressProps {
  summonerName: string
  tag?: string
  onTagChange: (event: React.MouseEvent<HTMLElement>, tag: string) => void
}

export const MasteryTotalProgress = (props: MasteryTotalProgressProps) => {
  const { tag, summonerName, onTagChange } = props
  const { t } = useTranslation()
  const championEntries = useSelector(selectAllChampion)
  const masteries = useSelector(selectAllMastery)
  const selectSummonerByName = createSelectSummonerByName()
  const summoner = useSelector((state) =>
    selectSummonerByName(state, summonerName)
  )
  const allTags = useSelector(selectAllChampionTags)
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

  const championPointsProgress = getProgress(
    stats.totalCappedPoints,
    filteredChampions.length * ((1800 + 2400) * 5)
  )

  const subheader =
    t('totalMasteryPoints', {
      points: stats?.totalPoints?.toLocaleString() ?? 0,
    }) +
    '  |  ' +
    t('totalChamoionLevels', {
      levels: stats?.totalLevel?.toLocaleString() ?? 0,
    })

  const loaded = summoner && masteries?.length

  return (
    <Card>
      <CardHeader
        title={
          <Link
            variant="h5"
            underline="hover"
            color="textPrimary"
            href={getSummonerInfoUrl(summoner)}
          >
            {loaded ? summoner.name : <Skeleton width="50%" />}
          </Link>
        }
        avatar={
          loaded ? (
            <ProfileAvatar summoner={summoner} />
          ) : (
            <Skeleton variant="circle">
              <ProfileAvatar summoner={summoner} />
            </Skeleton>
          )
        }
        subheader={
          <Typography>
            {loaded ? subheader : <Skeleton width="30%" />}
          </Typography>
        }
      />
      <CardContent>
        <ChampionRoleFilter
          tag={tag}
          allTags={allTags}
          onTagChange={onTagChange}
        />
        <MasteryLinearProgress
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
