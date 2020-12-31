import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { selectAllChampion } from './champion.slice'
import { selectMasteryEntities } from './mastery.slice'

export const MASTERY_VIEWER_FEATURE_KEY = 'masteryViewer'

export interface MasteryViewerState {
  searchQuery: string
  tag?: string
  level?: number
}

export const initialMasteryViewerState: MasteryViewerState = {
  searchQuery: '',
  tag: null,
  level: null,
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
    },
    // ...
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

export const selectAllJoinedChampionMastery = createSelector(
  selectAllChampion,
  selectMasteryEntities,
  (champions, masteryEntities) =>
    champions.map((champion) => ({
      champion,
      mastery: masteryEntities[parseInt(champion.key)],
    }))
)

export const selectFilteredChampionMastery = createSelector(
  selectSearchQuery,
  selectTag,
  selectLevel,
  selectAllJoinedChampionMastery,
  (searchQuery, tag, level, joinedData) => {
    return joinedData.filter(({ champion, mastery }) => {
      const inQuery =
        !searchQuery || new RegExp(searchQuery, 'i').test(champion.name)
      const inTag = !tag || champion.tags.includes(tag)
      const inLevel = !level || mastery?.championLevel === level
      return inQuery && inTag && inLevel
    })
  }
)

export const selectFilteredChampionIds = createSelector(
  selectFilteredChampionMastery,
  (data) => data.map((item) => item.champion.key)
)
