import {
  createAsyncThunk,
  createEntityAdapter,
  createSelector,
  createSlice,
  EntityState,
  PayloadAction,
} from '@reduxjs/toolkit'
import { SummonerDTO } from '@waffle-charm/api-interfaces'

export const SUMMONER_FEATURE_KEY = 'summoner'

/*
 * Update these interfaces according to your requirements.
 */
export type SummonerEntity = SummonerDTO

export interface SummonerState extends EntityState<SummonerEntity> {
  loadingStatus: 'not loaded' | 'loading' | 'loaded' | 'error'
  error: string
}

export const summonerAdapter = createEntityAdapter<SummonerEntity>()

/**
 * Export an effect using createAsyncThunk from
 * the Redux Toolkit: https://redux-toolkit.js.org/api/createAsyncThunk
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
 *   dispatch(fetchSummoner())
 * }, [dispatch]);
 * ```
 */
export const fetchSummoner = createAsyncThunk(
  'summoner/fetchStatus',
  async (summonerName: string, thunkAPI) => {
    if (!summonerName) {
      throw `summonerName is required`
    }

    if (summonerName.length < 3) {
      throw `summonerName must be longer than 3 characters`
    }

    const response = await fetch(`/api/summoner/${summonerName}`).then((_) =>
      _.json()
    )
    if (!response || response.statusCode) {
      throw response
    }

    return [response] as SummonerDTO[]
  }
)

export const initialSummonerState: SummonerState = summonerAdapter.getInitialState(
  {
    loadingStatus: 'not loaded',
    error: null,
  }
)

export const summonerSlice = createSlice({
  name: SUMMONER_FEATURE_KEY,
  initialState: initialSummonerState,
  reducers: {
    add: summonerAdapter.addOne,
    remove: summonerAdapter.removeOne,
    // ...
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSummoner.pending, (state: SummonerState) => {
        state.loadingStatus = 'loading'
      })
      .addCase(
        fetchSummoner.fulfilled,
        (state: SummonerState, action: PayloadAction<SummonerEntity[]>) => {
          summonerAdapter.setAll(state, action.payload)
          state.loadingStatus = 'loaded'
        }
      )
      .addCase(fetchSummoner.rejected, (state: SummonerState, action) => {
        state.loadingStatus = 'error'
        state.error = action.error.message
      })
  },
})

/*
 * Export reducer for store configuration.
 */
export const summonerReducer = summonerSlice.reducer

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
 *   dispatch(summonerActions.add({ id: 1 }))
 * }, [dispatch]);
 * ```
 *
 * See: https://react-redux.js.org/next/api/hooks#usedispatch
 */
export const summonerActions = { ...summonerSlice.actions }

/*
 * Export selectors to query state. For use with the `useSelector` hook.
 *
 * e.g.
 * ```
 * import { useSelector } from 'react-redux';
 *
 * // ...
 *
 * const entities = useSelector(selectAllSummoner);
 * ```
 *
 * See: https://react-redux.js.org/next/api/hooks#useselector
 */
const { selectAll, selectEntities } = summonerAdapter.getSelectors()

export const getSummonerState = (rootState: unknown): SummonerState =>
  rootState[SUMMONER_FEATURE_KEY]

export const selectAllSummoner = createSelector(getSummonerState, selectAll)

export const selectSummonerEntities = createSelector(
  getSummonerState,
  selectEntities
)

export const selectSummonerLoadingStatus = createSelector(
  getSummonerState,
  (state) => state.loadingStatus
)

export const createSelectSummonerByName = () =>
  createSelector(
    selectAllSummoner,
    (_, summonerName: string) => summonerName,
    (summoners, summonerName) =>
      summonerName &&
      summoners.find(
        (summoner) =>
          summoner.name.toLocaleLowerCase() === summonerName.toLocaleLowerCase()
      )
  )
