import { Divider, Typography } from '@material-ui/core'
import {
  ChipsArray,
  CustomChip,
  LayoutOption,
  LayoutToggleGroup,
  PageContainer,
} from '@waffle-charm/material'
import {
  createSelectSummonerByName,
  fetchMastery,
  selectAllChampion,
  selectAllChampionTags,
  selectMasteryEntities,
} from '@waffle-charm/store'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import ChampionGridContainer from './champion-grid-container/ChampionGridContainer'
import { ChampionGridFilter } from './champion-grid-filter/ChampionGridFilter'
import ChampionGridSearch from './champion-grid-search/ChampionGridSearch'
import {
  ChampionGridFilterSortOption,
  sortOptions,
} from './champion-grid-sort-select/ChampionGridSortSelect'
import ChampionListContainer from './champion-list-container/ChampionListContainer'

export const MASTERY_LAYOUT = 'masteryLayout2'

export interface FilterableChampionGridProps {
  summonerName?: string
}

export function FilterableChampionGrid(props: FilterableChampionGridProps) {
  const { summonerName } = props
  const dispatch = useDispatch()
  const { t } = useTranslation()

  const [chip, setChip] = React.useState<CustomChip>()
  const [sortBy, setSortyBy] = React.useState<ChampionGridFilterSortOption>(
    sortOptions[1]
  )
  const [layout, setLayout] = React.useState<LayoutOption>(
    () =>
      (localStorage.getItem(MASTERY_LAYOUT) as LayoutOption) ??
      LayoutOption.module
  )

  const [searchQuery, setSearchQuery] = React.useState('')
  const champions = useSelector(selectAllChampion)
  const masteryEntities = useSelector(selectMasteryEntities)
  const selectSummonerByName = createSelectSummonerByName()
  const summoner = useSelector((state) =>
    selectSummonerByName(state, summonerName)
  )
  const allTags = useSelector(selectAllChampionTags)

  const chips = React.useMemo(() => {
    return [
      { key: 7, label: t('masteryLevelNumber', { level: 7 }) },
      { key: 6, label: t('masteryLevelNumber', { level: 6 }) },
      { key: 5, label: t('masteryLevelNumber', { level: 5 }) },
      { key: 4, label: t('masteryLevelNumber', { level: 4 }) },
      { key: 3, label: t('masteryLevelNumber', { level: 3 }) },
      { key: 2, label: t('masteryLevelNumber', { level: 2 }) },
      { key: 1, label: t('masteryLevelNumber', { level: 1 }) },
      ...allTags.map((tag) => ({ key: tag, label: tag })),
    ]
  }, [t, allTags])

  const filteredChampionIds = React.useMemo(() => {
    const substringRegex = new RegExp(searchQuery, 'i')
    return champions
      .filter((champion) => {
        if (searchQuery) {
          return substringRegex.test(champion.name)
        }

        if (chip) {
          return (
            masteryEntities[parseInt(champion.key)]?.championLevel ===
              chip.key || champion.tags.includes(chip.key.toString())
          )
        }

        return true
      })
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
  }, [masteryEntities, champions, sortBy, searchQuery, chip])

  React.useEffect(() => {
    if (summoner) {
      dispatch(fetchMastery(summoner?.id))
    }
  }, [dispatch, summoner])

  const handleSetSearchQuery = (query: string) => {
    setSearchQuery(query || '')
  }

  const handleSetChip = React.useCallback((selectedChip: CustomChip) => {
    setChip(selectedChip)
  }, [])

  const handleLayoutChange = (
    event: React.MouseEvent<HTMLElement>,
    value: LayoutOption
  ) => {
    if (value) {
      setLayout(value)
      localStorage.setItem(MASTERY_LAYOUT, value ?? 'module')
    }
  }

  return (
    <main>
      <PageContainer maxWidth="md">
        <div style={{}}>
          <ChipsArray
            chips={chips}
            selected={chip}
            onSelectChip={handleSetChip}
          />
          <Divider orientation="horizontal"></Divider>
          <ChampionGridFilter>
            <ChampionGridSearch
              inputProps={{ 'aria-label': t('searchPlaceholder') }}
              value={searchQuery}
              onSearhQueryChange={handleSetSearchQuery}
              edge="start"
            />
            <LayoutToggleGroup value={layout} onChange={handleLayoutChange} />
          </ChampionGridFilter>
          <Typography>{chip?.label}</Typography>
        </div>
        {layout === 'module' ? (
          <ChampionGridContainer championIds={filteredChampionIds} />
        ) : (
          <ChampionListContainer championIds={filteredChampionIds} />
        )}
      </PageContainer>
    </main>
  )
}

export default FilterableChampionGrid
