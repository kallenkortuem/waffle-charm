import { createSelector, createSlice } from '@reduxjs/toolkit'
import { Vendors } from '@waffle-charm/api-interfaces'

export const SETTINGS_FEATURE_KEY = 'settings'

export interface SettingsState {
  open: boolean
  championVendor: Vendors
  summonerVendor: Vendors
}

export const initialSettingsState: SettingsState = {
  open: false,
  championVendor: 'op.gg',
  summonerVendor: 'porofessor.gg',
}

export const settingsSlice = createSlice({
  name: SETTINGS_FEATURE_KEY,
  initialState: initialSettingsState,
  reducers: {
    open: (state) => ({ ...state, open: true }),
    close: (state) => ({ ...state, open: false }),
    setChampionVendor: (state, action) => ({
      ...state,
      championVendor: action.payload,
    }),
    setSummonerVendor: (state, action) => ({
      ...state,
      summonerVendor: action.payload,
    }),
  },
})

/*
 * Export reducer for store configuration.
 */
export const settingsReducer = settingsSlice.reducer

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
 *   dispatch(settingsActions.add({ id: 1 }))
 * }, [dispatch]);
 * ```
 *
 * See: https://react-redux.js.org/next/api/hooks#usedispatch
 */
export const settingsActions = settingsSlice.actions

export const getSettingsState = (rootState: unknown): SettingsState =>
  rootState[SETTINGS_FEATURE_KEY]

export const selectChampionVendor = createSelector(
  getSettingsState,
  (state) => state.championVendor
)

export const selectSummonerVendor = createSelector(
  getSettingsState,
  (state) => state.summonerVendor
)
