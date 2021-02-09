import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { BansEntity, selectBansEntities } from './bans.slice'
import {
  ChampionEntity,
  selectAllChampion,
  selectChampionLoadingStatus,
} from './champion.slice'
import { FavoriteEntity, selectFavoriteEntities } from './favorite.slice'
import {
  defaultMastery,
  MasteryEntity,
  selectMasteryEntities,
  selectMasteryLoadingStatus,
} from './mastery.slice'
import { selectSummonerLoadingStatus } from './summoner.slice'

export const MASTERY_VIEWER_FEATURE_KEY = 'masteryViewer'

const MASTERY_LEVEL = 'masteryLevel'
const MASTERY_LAYOUT = 'masteryLayout'

export type MasteryViewerSortOptions =
  | 'mastery'
  | 'bans'
  | 'favorite'
  | 'alphabetical'

export const MasteryViewerSortOptions = {
  mastery: 'mastery' as MasteryViewerSortOptions,
  bans: 'bans' as MasteryViewerSortOptions,
  favorite: 'favorite' as MasteryViewerSortOptions,
  alphabetical: 'alphabetical' as MasteryViewerSortOptions,
}

export type MasteryViewerLayoutOption =
  | 'module'
  | 'list'
  | 'compact'
  | 'portrait'
export const MasteryViewerLayoutOption = {
  module: 'module' as MasteryViewerLayoutOption,
  list: 'list' as MasteryViewerLayoutOption,
  compact: 'compact' as MasteryViewerLayoutOption,
  portrait: 'portrait' as MasteryViewerLayoutOption,
}

export interface MasteryViewerState {
  searchQuery: string
  selectedChampionId?: string
  tag?: string
  level?: number
  layout: MasteryViewerLayoutOption
  sortBy: MasteryViewerSortOptions
  skip: number
  take: number
  pageSize: {
    portrait: number
    compact: number
    module: number
    list: number
  }
}

export const initialMasteryViewerState: MasteryViewerState = {
  searchQuery: '',
  tag: null,
  level: null,
  layout:
    (localStorage.getItem(MASTERY_LAYOUT) as MasteryViewerLayoutOption) ??
    'module',
  sortBy: 'mastery',
  skip: 0,
  take: 1,
  pageSize: {
    portrait: 10,
    compact: 30,
    module: 12,
    list: 25,
  },
}

export const masteryViewerSlice = createSlice({
  name: MASTERY_VIEWER_FEATURE_KEY,
  initialState: initialMasteryViewerState,
  reducers: {
    setSearchQuery(state: MasteryViewerState, action: PayloadAction<string>) {
      state.searchQuery = action.payload
      state.take = 1
      state.skip = 0
    },
    setTag(state: MasteryViewerState, action: PayloadAction<string>) {
      state.tag = action.payload
      state.take = 1
      state.skip = 0
    },
    setLevel(state: MasteryViewerState, action: PayloadAction<number>) {
      state.level = action.payload
      state.take = 1
      state.skip = 0
      localStorage.setItem(MASTERY_LEVEL, JSON.stringify(action.payload))
    },
    setLayout(
      state: MasteryViewerState,
      action: PayloadAction<MasteryViewerLayoutOption>
    ) {
      state.layout = action.payload ?? 'module'
      state.take = 1
      state.skip = 0
      localStorage.setItem(MASTERY_LAYOUT, action.payload ?? 'module')
      state.take = state.take = 1
    },
    setSortBy(
      state: MasteryViewerState,
      action: PayloadAction<MasteryViewerSortOptions>
    ) {
      state.sortBy = action.payload
      state.take = 1
      state.skip = 0
    },
    nextPage(state: MasteryViewerState) {
      state.take = state.take + 1
      state.skip = 0
    },
    resetFilters(state: MasteryViewerState) {
      state.level = null
      state.tag = null
      state.searchQuery = ''
      state.take = 1
      state.skip = 0
    },
    setSelectedChampionId(
      state: MasteryViewerState,
      action: PayloadAction<string>
    ) {
      state.selectedChampionId = action.payload
    },
  },
})

/*
 * Export reducer for store configuration.
 */
export const masteryViewerReducer = masteryViewerSlice.reducer

/*
 * Export action creators to be dispatched. For use with the `useDispatch` hook.
 *
 * e.g.
 * ```
 * import React, { useEffect } from 'react';
 * import { useDispatch } from 'react-redux';
 *
 * // ...
 *
 * const dispatch = useDispatch();
 * useEffect(() => {
 *   dispatch(masteryViewerActions.add({ id: 1 }))
 * }, [dispatch]);
 * ```
 *
 * See: https://react-redux.js.org/next/api/hooks#usedispatch
 */
export const masteryViewerActions = masteryViewerSlice.actions

export const getMasteryViewerState = (rootState: unknown): MasteryViewerState =>
  rootState[MASTERY_VIEWER_FEATURE_KEY]

export const selectSearchQuery = createSelector(
  getMasteryViewerState,
  (state) => state.searchQuery
)
export const selectTag = createSelector(
  getMasteryViewerState,
  (state) => state.tag
)
export const selectLevel = createSelector(
  getMasteryViewerState,
  (state) => state.level
)
export const selectLayout = createSelector(
  getMasteryViewerState,
  (state) => state.layout
)
export const selectSortBy = createSelector(
  getMasteryViewerState,
  (state) => state.sortBy
)
export const selectHasActiveFilters = createSelector(
  getMasteryViewerState,
  (state) => {
    const { level, tag, searchQuery } = state
    return tag || searchQuery || level || level === 0
  }
)

export const selectPageSize = createSelector(
  getMasteryViewerState,
  (state) => state.pageSize[state.layout]
)

export const selectTake = createSelector(
  getMasteryViewerState,
  selectPageSize,
  (state, pageSize) => state.take * pageSize
)

export const selectSkip = createSelector(
  getMasteryViewerState,
  selectPageSize,
  (state, pageSize) => state.skip * pageSize
)

export const selectSelectedChampionId = createSelector(
  getMasteryViewerState,
  (state) => state.selectedChampionId
)

const filterChampion = (
  champion: ChampionEntity,
  masteryEntities: Record<string, MasteryEntity>,
  level?: number,
  searchQueryExp?: RegExp,
  tag?: string
) => {
  const levelFilter = () =>
    level === null ||
    level === undefined ||
    (masteryEntities[champion.key] ?? defaultMastery).championLevel === level

  const tagFilter = () => !tag || champion.tags.includes(tag)
  const searchFilter = () =>
    !searchQueryExp || searchQueryExp?.test(champion.name)
  return levelFilter() && tagFilter() && searchFilter()
}

const sortByMastery = (masteryEntities: Record<string, MasteryEntity>) => (
  championAKey: string,
  championBKey: string
) => {
  const championA = masteryEntities[championAKey] ?? defaultMastery
  const championB = masteryEntities[championBKey] ?? defaultMastery

  if (championA.championLevel === championB.championLevel) {
    if (championA.championPoints === championB.championPoints) {
      return 0
    }

    return championB.championPoints - championA.championPoints
  }
  return championB.championLevel - championA.championLevel
}

const sortByFavorite = (favoriteEntities: Record<string, FavoriteEntity>) => (
  championAKey: string,
  championBKey: string
) => {
  const favoriteA = !!favoriteEntities[championAKey]
  const favoriteB = !!favoriteEntities[championBKey]

  if (favoriteA === favoriteB) {
    return 0
  }
  return favoriteA ? -1 : 1
}

const sortByBans = (bansEntities: Record<string, BansEntity>) => (
  championAKey: string,
  championBKey: string
) => {
  const banA = !!bansEntities[championAKey]
  const banB = !!bansEntities[championBKey]

  if (banA === banB) {
    return 0
  }
  return banA ? -1 : 1
}

/**
 * Select all filtered `champion.key`.
 */
export const selectFilteredChampionIds = createSelector(
  selectAllChampion,
  selectMasteryEntities,
  selectSortBy,
  selectBansEntities,
  selectFavoriteEntities,
  selectLevel,
  selectSearchQuery,
  selectTag,
  (
    allChampions: ChampionEntity[],
    masteryEntities: Record<string, MasteryEntity>,
    sortBy: MasteryViewerSortOptions,
    bansEntities: Record<string, BansEntity>,
    favoriteEntities: Record<string, FavoriteEntity>,
    level?: number,
    searchQuery?: string,
    tag?: string
  ) => {
    const searchQueryExp = searchQuery ? new RegExp(searchQuery, 'i') : null
    const championIds = []
    allChampions.forEach((champion) => {
      const passedFilter = filterChampion(
        champion,
        masteryEntities,
        level,
        searchQueryExp,
        tag
      )

      if (passedFilter) {
        championIds.push(champion.key)
      }
    })

    let sortByFn: (a, b) => 0 | -1 | 1 | number
    switch (sortBy) {
      case 'bans':
        sortByFn = sortByBans(bansEntities)
        break
      case 'favorite':
        sortByFn = sortByFavorite(favoriteEntities)
        break
      case 'mastery':
        sortByFn = sortByMastery(masteryEntities)
        break
      case 'alphabetical':
      default:
        sortByFn = (a, b) => 0
    }

    const sortedResults = championIds.sort(sortByFn)

    return sortedResults
  }
)

export const selectVisibleChampionIds = createSelector(
  selectFilteredChampionIds,
  selectSkip,
  selectTake,
  (championIds, skip, take) => {
    return championIds.slice(skip, take)
  }
)

export const createSelectFilteredChampion = () =>
  createSelector(
    selectMasteryEntities,
    selectLevel,
    selectSearchQuery,
    selectTag,
    (_, champion: ChampionEntity) => champion,
    (
      masteryEntities: Record<string, MasteryEntity>,
      level: number,
      searchQuery: string,
      tag: string,
      champion: ChampionEntity
    ) => {
      const searchQueryExp = searchQuery ? new RegExp(searchQuery, 'i') : null

      const passedFilter = filterChampion(
        champion,
        masteryEntities,
        level,
        searchQueryExp,
        tag
      )

      return passedFilter
    }
  )

export const selectMasteryViewerLoading = createSelector(
  selectSummonerLoadingStatus,
  selectChampionLoadingStatus,
  selectMasteryLoadingStatus,
  (summoner, champion, mastery) =>
    summoner === 'loading' ||
    champion === 'loading' ||
    mastery === 'loading' ||
    summoner === 'not loaded' ||
    champion === 'not loaded' ||
    mastery === 'not loaded'
)
