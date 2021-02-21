import {
  Button,
  Collapse,
  createStyles,
  IconButton,
  makeStyles,
  Paper,
  Theme,
  Typography,
} from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close'
import {
  ExpandButton,
  LayoutToggleGroup,
  SearchInput,
} from '@waffle-charm/material'
import {
  masteryViewerActions,
  selectFilteredChampionIds,
  selectHasActiveFilters,
  selectLayout,
  selectLevel,
  selectPageSize,
  selectSearchQuery,
  selectTag,
  selectVisibleChampionIds,
} from '@waffle-charm/store'
import React, { lazy, Suspense, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
// import { MasteryPortraitView } from './mastery-portrait-view/MasteryPortraitView'
import MasteryViewerLevelSelect from './mastery-viewer-level-select/MasteryViewerLevelSelect'
import MasteryViewerSortSelect from './mastery-viewer-sort-select/MasteryViewerSortSelect'
import MasteryViewerTagSelect from './mastery-viewer-tag-select/MasteryViewerTagSelect'

// const MasteryCompactView = lazy(
//   () => import('./mastery-compact-view/MasteryCompactView')
// )
const MasteryModuleView = lazy(
  () => import('./mastery-module-view/MasteryModuleView')
)
const MasteryListView = lazy(
  () => import('./mastery-list-view/MasteryListView')
)

export const MASTERY_LEVEL = 'masteryLevel'
export const MASTERY_LAYOUT = 'masteryLayout'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'grid',
      gridGap: theme.spacing(2),
    },
    searchContainer: {
      width: '100%',
    },
    iconButton: {
      padding: theme.spacing(1),
    },
    advancedFilter: {
      display: 'grid',
      gridTemplateColumns: `repeat(auto-fill, minmax(300px, 1fr))`,
      gridGap: theme.spacing(2),
      padding: theme.spacing(2),
    },
  })
)

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface MasteryViewerProps {}

export const MasteryViewer = (
  props: MasteryViewerProps
): React.ReactElement => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const classes = useStyles()

  const layout = useSelector(selectLayout)
  const level = useSelector(selectLevel)
  const tag = useSelector(selectTag)
  const pageSize = useSelector(selectPageSize)

  const hasFiltersActive = useSelector(selectHasActiveFilters)
  const filteredChampionIds = useSelector(selectFilteredChampionIds)
  const visibleChampionIds = useSelector(selectVisibleChampionIds)

  const [advancedFilterOpen, setAdvancedFilterOpen] = useState(false)
  const handleExpand = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAdvancedFilterOpen((value) => !value)
  }

  const handleClear = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAdvancedFilterOpen(false)
    dispatch(masteryViewerActions.resetFilters())
  }

  const searchQuery = useSelector(selectSearchQuery)
  const handleSetQuery = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(masteryViewerActions.setSearchQuery(event.target.value || ''))
  }

  const title = React.useMemo(() => {
    if (!hasFiltersActive) {
      return t('masteryLevelFilterAll')
    }

    const results = []

    if (searchQuery) {
      results.push(searchQuery)
    }

    if (level || level === 0) {
      results.push(t('mastery') + ' ' + level)
    }

    if (tag) {
      results.push(tag)
    }

    return results.join(' + ')
  }, [searchQuery, level, tag, t, hasFiltersActive])

  return (
    <div className={classes.root}>
      <div>
        <Paper className={classes.searchContainer}>
          <SearchInput
            inputProps={{
              'aria-label': t('championSearchFilter'),
              placeholder: t('championSearchFilter'),
            }}
            value={searchQuery}
            onChange={handleSetQuery}
            actions={
              <>
                {hasFiltersActive && (
                  <IconButton
                    className={classes.iconButton}
                    onClick={handleClear}
                    aria-label={t('clearFilter')}
                  >
                    <CloseIcon />
                  </IconButton>
                )}
                <ExpandButton
                  className={classes.iconButton}
                  onClick={handleExpand}
                  expanded={advancedFilterOpen}
                />
                <LayoutToggleGroup />
              </>
            }
          />
          <Collapse in={advancedFilterOpen}>
            <div className={classes.advancedFilter}>
              <MasteryViewerSortSelect />
              <MasteryViewerLevelSelect />
              <MasteryViewerTagSelect />
            </div>
          </Collapse>
        </Paper>
      </div>
      <div>
        <Typography variant="h5" component="h1">
          {title}
        </Typography>
        <Typography variant="body2" component="span">
          {t('championWithCount', { count: filteredChampionIds?.length ?? 0 })}
        </Typography>
      </div>

      <Suspense fallback={<Paper style={{ minHeight: '500px' }} />}>
        {layout === 'module' && <MasteryModuleView />}
        {layout === 'list' && <MasteryListView />}
        {/* {layout === 'compact' && <MasteryCompactView />} */}
        {/* {layout === 'portrait' && <MasteryPortraitView />} */}
        {visibleChampionIds.length < filteredChampionIds.length ? (
          <Button onClick={() => dispatch(masteryViewerActions.nextPage())}>
            {t('showMore', { pageSize })}
          </Button>
        ) : null}
      </Suspense>
    </div>
  )
}

export default MasteryViewer
