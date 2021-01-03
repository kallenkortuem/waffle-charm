import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit'
import {
  ChampionEntity,
  selectAllChampion,
  selectChampionIds,
  selectChampionLoadingStatus,
} from './champion.slice'
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

export interface MasteryViewerState {
  searchQuery: string
  tag?: string
  level?: number
  layout: 'module' | 'list'
}

export const initialMasteryViewerState: MasteryViewerState = {
  searchQuery: '',
  tag: null,
  level: JSON.parse(localStorage.getItem(MASTERY_LEVEL) || '1'),
  layout:
    (localStorage.getItem(MASTERY_LAYOUT) as 'module' | 'list') ?? 'module',
}

export const masteryViewerSlice = createSlice({
  name: MASTERY_VIEWER_FEATURE_KEY,
  initialState: initialMasteryViewerState,
  reducers: {
    setSearchQuery(state: MasteryViewerState, action: PayloadAction<string>) {
      state.searchQuery = action.payload
    },
    setTag(state: MasteryViewerState, action: PayloadAction<string>) {
      state.tag = action.payload
    },
    setLevel(state: MasteryViewerState, action: PayloadAction<number>) {
      state.level = action.payload
      localStorage.setItem(MASTERY_LEVEL, JSON.stringify(action.payload))
    },
    setLayout(
      state: MasteryViewerState,
      action: PayloadAction<'list' | 'module'>
    ) {
      state.layout = action.payload
      localStorage.setItem(MASTERY_LAYOUT, action.payload ?? 'module')
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

const filterChampion = (
  champion: ChampionEntity,
  masteryEntities: Record<string, MasteryEntity>,
  level?: number,
  searchQueryExp?: RegExp,
  tag?: string
) =>
  //
  (!searchQueryExp &&
    // tag match as a last resort
    (level === null ||
      level === undefined ||
      (masteryEntities[champion.key] ?? defaultMastery).championLevel ===
        level) &&
    (!tag || champion.tags.includes(tag))) ||
  // query match
  searchQueryExp?.test(champion.name)

const sortChampion = (masteryEntities: Record<string, MasteryEntity>) => (
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

export const selectSortedMasteryChampionIds = createSelector(
  selectChampionIds,
  selectMasteryEntities,
  (championIds: string[], masteryEntities: Record<string, MasteryEntity>) => {
    return [...championIds].sort(sortChampion(masteryEntities))
  }
)

/**
 * Select all filtered `champion.key`.
 */
export const selectFilteredChampionIds = createSelector(
  selectAllChampion,
  selectMasteryEntities,
  selectLevel,
  selectSearchQuery,
  selectTag,
  (
    allChampions: ChampionEntity[],
    masteryEntities: Record<string, MasteryEntity>,
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

    const sortedResults = championIds.sort(sortChampion(masteryEntities))

    return sortedResults
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
