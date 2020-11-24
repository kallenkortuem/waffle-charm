import Typography from '@material-ui/core/Typography'
import { ChampionMasteryDTO } from '@waffle-charm/api-interfaces'
import {
  MasteryFilter,
  MasteryGridView,
  MasteryListView,
  MasteryTotalProgress,
} from '@waffle-charm/mastery'
import { PageContainer } from '@waffle-charm/material'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import {
  selectAllChampionTags,
  selectChampionEntities,
} from '../+store/features/champion.slice'
import { createSelectSummonerByName } from '../+store/features/summoner.slice'
import WelcomeBanner from '../components/WelcomeBanner'

export const MASTERY_LEVELS = 'masteryLevels'
export const MASTERY_LAYOUT = 'masteryLayout'

export const Mastery = (props: {
  summonerName: string
  loading: boolean
}): React.ReactElement => {
  const { loading, summonerName } = props

  const { t } = useTranslation()
  const selectSummonerByName = createSelectSummonerByName()
  const summoner = useSelector((state) =>
    selectSummonerByName(state, summonerName)
  )
  const championMap = useSelector(selectChampionEntities)
  const allTags = useSelector(selectAllChampionTags)

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
