import {
  createStyles,
  Divider,
  makeStyles,
  Theme,
  Typography,
} from '@material-ui/core'
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
  masteryViewerActions,
  selectAllChampionTags,
  selectFilteredChampionIds,
  selectSearchQuery,
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

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {},
    heading: {
      padding: theme.spacing(0, 1),
    },
    filter: {},
  })
)

export interface FilterableChampionGridProps {
  summonerName?: string
}

export function FilterableChampionGrid(props: FilterableChampionGridProps) {
  const { summonerName } = props
  const dispatch = useDispatch()
  const { t } = useTranslation()
  const classes = useStyles()

  const [chip, setChip] = React.useState<CustomChip>()
  const [sortBy, setSortyBy] = React.useState<ChampionGridFilterSortOption>(
    sortOptions[1]
  )
  const [layout, setLayout] = React.useState<LayoutOption>(
    () =>
      (localStorage.getItem(MASTERY_LAYOUT) as LayoutOption) ??
      LayoutOption.module
  )

  const searchQuery = useSelector(selectSearchQuery)
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

  const filteredChampionIds = useSelector(selectFilteredChampionIds)

  React.useEffect(() => {
    if (summoner) {
      dispatch(fetchMastery(summoner?.id))
    }
  }, [dispatch, summoner])

  React.useEffect(() => {
    if (typeof chip?.key === 'string') {
      dispatch(masteryViewerActions.setTag(chip.key.toLocaleString()))
    }
    if (typeof chip?.key === 'number') {
      dispatch(masteryViewerActions.setLevel(chip.key))
    }
  }, [chip, dispatch])

  const handleSetSearchQuery = (query: string) => {
    dispatch(masteryViewerActions.setSearchQuery(query))
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
    <main className={classes.root}>
      <PageContainer maxWidth="md">
        <div className={classes.heading}>
          <Typography variant="h4" component="h1">
            {t('championMastery')}
          </Typography>
        </div>
        <div className={classes.filter}>
          <Divider orientation="horizontal"></Divider>
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
        </div>
        <div className={classes.heading}>
          <Typography variant="h5" component="h2">
            {searchQuery || chip?.label || t('masteryLevelFilterAll')}
          </Typography>
          <Typography variant="caption" component="p">
            {t('championWithCount', {
              count: filteredChampionIds?.length ?? 0,
            })}
          </Typography>
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
