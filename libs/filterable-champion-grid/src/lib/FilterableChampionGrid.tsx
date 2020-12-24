import Typography from '@material-ui/core/Typography'
import { createSelector } from '@reduxjs/toolkit'
import { PageContainer } from '@waffle-charm/material'
import {
  createSelectSummonerByName,
  fetchMastery,
  selectAllChampion,
  selectSummonerLoadingStatus,
} from '@waffle-charm/store'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import ChampionGridContainer from './champion-grid-container/ChampionGridContainer'
import {
  ChampionGridFilter,
  sortOptions,
} from './champion-grid-filter/ChampionGridFilter'

const createSelectFilteredChampionIds = () =>
  createSelector(
    selectAllChampion,
    (_, searchQuery: string) => searchQuery,
    (_, role: string) => role,
    (_, sortBy: string) => sortBy,
    (champions, searchQuery, role, sortBy) => {
      const substringRegex = new RegExp(searchQuery, 'i')
      return champions
        .filter(
          (champion) => !searchQuery || substringRegex.test(champion.name)
        )
        .map((champion) => champion.key)
    }
  )
/* eslint-disable-next-line */
export interface FilterableChampionGridProps {
  summonerName?: string
}

export function FilterableChampionGrid(props: FilterableChampionGridProps) {
  const { summonerName } = props
  const dispatch = useDispatch()
  const { t } = useTranslation()

  const [tag, setTag] = React.useState('')
  const [role, setRole] = React.useState<string>()
  const [sortBy, setSortyBy] = React.useState<string>(sortOptions[0])
  const [searchQuery, setSearchQuery] = React.useState('')

  const selectSummonerByName = createSelectSummonerByName()
  const summoner = useSelector((state) =>
    selectSummonerByName(state, summonerName)
  )
  const summonerLoading = useSelector(selectSummonerLoadingStatus)
  const selectFilteredChampionIds = createSelectFilteredChampionIds()
  const filteredChampionIds = useSelector((state) =>
    selectFilteredChampionIds(state, searchQuery, role, sortBy)
  )

  const handleSetTag = (
    event: React.MouseEvent<HTMLElement>,
    value: string
  ) => {
    setTag(value)
  }

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
    e: React.ChangeEvent<{ name?: string; value: string }>,
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
