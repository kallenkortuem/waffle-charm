import Typography from '@material-ui/core/Typography'
import { createSelector } from '@reduxjs/toolkit'
import { PageContainer } from '@waffle-charm/material'
import {
  createSelectSummonerByName,
  fetchMastery,
  selectAllChampion,
  selectMasteryEntities,
} from '@waffle-charm/store'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import ChampionGridContainer from './champion-grid-container/ChampionGridContainer'
import {
  ChampionGridFilter,
  ChampionGridFilterSortOption,
  sortOptions,
} from './champion-grid-filter/ChampionGridFilter'

/* eslint-disable-next-line */
export interface FilterableChampionGridProps {
  summonerName?: string
}

export function FilterableChampionGrid(props: FilterableChampionGridProps) {
  const { summonerName } = props
  const dispatch = useDispatch()
  const { t } = useTranslation()

  const [role, setRole] = React.useState<string>()
  const [sortBy, setSortyBy] = React.useState<ChampionGridFilterSortOption>(
    sortOptions[0]
  )
  const [searchQuery, setSearchQuery] = React.useState('')
  const champions = useSelector(selectAllChampion)
  const masteryEntities = useSelector(selectMasteryEntities)
  const selectSummonerByName = createSelectSummonerByName()
  const summoner = useSelector((state) =>
    selectSummonerByName(state, summonerName)
  )

  const filteredChampionIds = React.useMemo(() => {
    const substringRegex = new RegExp(searchQuery, 'i')
    return champions
      .filter((champion) => !searchQuery || substringRegex.test(champion.name))
      .sort((a, b) => {
        switch (sortBy) {
          case 'mastery':
            return (
              (masteryEntities[parseInt(b.key)]?.championPoints ?? 0) -
              (masteryEntities[parseInt(a.key)]?.championPoints ?? 0)
            )
          case 'favorite':
          case 'ban':
          case 'name':
          default:
            return 0
        }
      })
      .map((champion) => champion.key)
  }, [masteryEntities, champions, sortBy, searchQuery])

  React.useEffect(() => {
    if (summoner) {
      dispatch(fetchMastery(summoner?.id))
    }
  }, [dispatch, summoner])

  const handleSetRole = (
    event: React.MouseEvent<HTMLInputElement>,
    value: any
  ) => {
    setRole(value)
  }

  const handleSetSortBy = (
    e: React.ChangeEvent<{
      name?: string
      value: ChampionGridFilterSortOption
    }>,
    child: React.ReactNode
  ) => {
    setSortyBy(e.target.value)
  }

  const handleSetSearchQuery = (query: string) => {
    setSearchQuery(query || '')
  }

  return (
    <main>
      <PageContainer maxWidth="md">
        <Typography variant="h4" component="h1">
          {t('championMastery')}
        </Typography>
        <ChampionGridFilter
          role={role}
          sortBy={sortBy}
          searchQuery={searchQuery}
          onRoleChange={handleSetRole}
          onSortByChange={handleSetSortBy}
          onSearhQueryChange={handleSetSearchQuery}
        />
        <ChampionGridContainer championIds={filteredChampionIds} />
      </PageContainer>
    </main>
  )
}

export default FilterableChampionGrid
