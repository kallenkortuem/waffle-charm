import {
  createAsyncThunk,
  createEntityAdapter,
  createSelector,
  createSlice,
  EntityState,
  PayloadAction,
} from '@reduxjs/toolkit'
import { ChampionMasteryDTO } from '@waffle-charm/api-interfaces'

export const MASTERY_FEATURE_KEY = 'mastery'

/*
 * Update these interfaces according to your requirements.
 */
export interface MasteryEntity extends ChampionMasteryDTO {}

export interface MasteryState extends EntityState<MasteryEntity> {
  loadingStatus: 'not loaded' | 'loading' | 'loaded' | 'error'
  error: string
}

export const masteryAdapter = createEntityAdapter<MasteryEntity>({
  selectId: (model) => model.championId,
})

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
 *   dispatch(fetchMastery())
 * }, [dispatch]);
 * ```
 */
export const fetchMastery = createAsyncThunk(
  'mastery/fetchStatus',
  async (summonerId: string, thunkAPI) => {
    const response = await fetch(
      `/api/mastery/by-summoner/${summonerId}`
    ).then((_) => _.json())
    if (response.statusCode) {
      throw response
    }

    return [...response]
  }
)

export const initialMasteryState: MasteryState = masteryAdapter.getInitialState(
  {
    loadingStatus: 'not loaded',
    error: null,
  }
)

export const masterySlice = createSlice({
  name: MASTERY_FEATURE_KEY,
  initialState: initialMasteryState,
  reducers: {
    add: masteryAdapter.addOne,
    remove: masteryAdapter.removeOne,
    // ...
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMastery.pending, (state: MasteryState) => {
        state.loadingStatus = 'loading'
      })
      .addCase(
        fetchMastery.fulfilled,
        (state: MasteryState, action: PayloadAction<MasteryEntity[]>) => {
          masteryAdapter.setAll(state, action.payload)
          state.loadingStatus = 'loaded'
        }
      )
      .addCase(fetchMastery.rejected, (state: MasteryState, action) => {
        state.loadingStatus = 'error'
        state.error = action.error.message
      })
  },
})

/*
 * Export reducer for store configuration.
 */
export const masteryReducer = masterySlice.reducer

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
 *   dispatch(masteryActions.add({ id: 1 }))
 * }, [dispatch]);
 * ```
 *
 * See: https://react-redux.js.org/next/api/hooks#usedispatch
 */
export const masteryActions = masterySlice.actions

/*
 * Export selectors to query state. For use with the `useSelector` hook.
 *
 * e.g.
 * ```
 * import { useSelector } from 'react-redux';
 *
 * // ...
 *
 * const entities = useSelector(selectAllMastery);
 * ```
 *
 * See: https://react-redux.js.org/next/api/hooks#useselector
 */
const { selectAll, selectEntities } = masteryAdapter.getSelectors()

export const getMasteryState = (rootState: unknown): MasteryState =>
  rootState[MASTERY_FEATURE_KEY]

export const selectAllMastery = createSelector(getMasteryState, selectAll)

export const selectMasteryEntities = createSelector(
  getMasteryState,
  selectEntities
)

export const selectMasteryLoadingStatus = createSelector(
  getMasteryState,
  (state) => state.loadingStatus
)
