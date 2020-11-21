import Typography from '@material-ui/core/Typography'
import {
  ChampionData,
  ChampionDataDragon,
  ChampionMasteryDTO,
  SummonerDTO,
} from '@waffle-charm/api-interfaces'
import PageContainer from '@waffle-charm/material/PageContainer'
import MasteryFilter from '@waffle-charm/mastery/MasteryFilter'
import MasteryGridView from '@waffle-charm/mastery/MasteryGridView'
import MasteryListView from '@waffle-charm/mastery/MasteryListView'
import MasteryTotalProgress from '@waffle-charm/mastery/MasteryTotalProgress'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import WelcomeBanner from '../components/WelcomeBanner'

export const MASTERY_LEVELS = 'masteryLevels'
export const MASTERY_LAYOUT = 'masteryLayout'

export const Mastery = (props: {
  summoner: SummonerDTO
  championData: ChampionDataDragon
  loading: boolean
  onError: (value: { statusCode: number; message: string }) => void
}): React.ReactElement => {
  const { loading, summoner, championData, onError } = props

  const { t } = useTranslation()

  const championMap: Record<number, ChampionData> = React.useMemo(
    () =>
      Object.entries(championData?.data || []).reduce(
        (accumulated, [_, entry]) => {
          accumulated[entry.key] = entry
          return accumulated
        },
        {}
      ) || {},
    [championData]
  )

  const allTags: string[] = React.useMemo(
    () =>
      Object.values(championData?.data || []).reduce((totalTags, champion) => {
        champion.tags.forEach((t) => {
          if (!totalTags.includes(t)) {
            totalTags.push(t)
          }
        })
        return totalTags
      }, []),
    [championData]
  )

  const [masteryLevels, setVisibleMasteryLevels] = useState(() =>
    JSON.parse(localStorage.getItem(MASTERY_LEVELS) || '["1"]')
  )
  const [tag, setTag] = useState('')
  const [masteries, setMasteries] = useState<ChampionMasteryDTO[]>([])
  const [layout, setLayout] = useState(
    () => localStorage.getItem(MASTERY_LAYOUT) ?? 'module'
  )
  const [sortAscending] = useState(false)

  const handleSetMasteryLevels = (
    event: React.MouseEvent<HTMLElement>,
    value: string[]
  ) => {
    if (value?.length >= 1) {
      setVisibleMasteryLevels(value)
      localStorage.setItem(MASTERY_LEVELS, JSON.stringify(value))
    }
  }

  const handleSetTag = (
    event: React.MouseEvent<HTMLElement>,
    value: string
  ) => {
    setTag(value)
  }

  const handleLayoutChange = (
    event: React.MouseEvent<HTMLElement>,
    value: string
  ) => {
    if (value) {
      setLayout(value)
      localStorage.setItem(MASTERY_LAYOUT, value ?? 'module')
    }
  }

  useEffect(() => {
    if (!summoner) {
      setMasteries([])
      return
    }

    fetch(`/api/mastery/by-summoner/${summoner.id}`)
      .then((_) => _.json())
      .then((value) => {
        if (value && !value.statusCode && Array.isArray(value)) {
          setMasteries(value)
        } else {
          onError(value)
        }
      })
      .catch((error) => {
        if (error?.statusCode) {
          onError(error)
        }
      })
  }, [summoner])

  const showWelcomeScreen = !loading && !summoner

  const content = (
    <>
      <MasteryTotalProgress
        allTags={allTags}
        onTagChange={handleSetTag}
        summoner={summoner}
        tag={tag}
        championMap={championMap}
        masteries={masteries}
      />
      <MasteryFilter
        layout={layout}
        masteryLevels={masteryLevels}
        onLayoutChange={handleLayoutChange}
        onMasteryLevelsChange={handleSetMasteryLevels}
      />

      {layout === 'module' ? (
        <MasteryGridView
          championMap={championMap}
          tag={tag}
          masteries={masteries}
          masteryLevels={masteryLevels}
          sortAscending={sortAscending}
        />
      ) : (
        <MasteryListView
          championMap={championMap}
          tag={tag}
          masteries={masteries}
          masteryLevels={masteryLevels}
          sortAscending={sortAscending}
        />
      )}
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
