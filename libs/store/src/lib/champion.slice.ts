import {
  createAsyncThunk,
  createEntityAdapter,
  createSelector,
  createSlice,
  EntityState,
  PayloadAction,
} from '@reduxjs/toolkit'
import { ChampionData, ChampionDataDragon } from '@waffle-charm/api-interfaces'

export const CHAMPION_FEATURE_KEY = 'champion'

/*
 * Update these interfaces according to your requirements.
 */
export type ChampionEntity = ChampionData

export interface ChampionState extends EntityState<ChampionEntity> {
  loadingStatus: 'not loaded' | 'loading' | 'loaded' | 'error'
  error: string
}

export const championAdapter = createEntityAdapter<ChampionEntity>({
  selectId: (model) => model.key,
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
 *   dispatch(fetchChampion())
 * }, [dispatch]);
 * ```
 */
export const fetchChampion = createAsyncThunk(
  'champion/fetchStatus',
  async (version: string, thunkAPI) => {
    const response: ChampionDataDragon = await fetch(
      `/cdn/${version}/data/en_US/champion.json`
    ).then((_) => _.json())

    if (response.data) {
      return [...Object.values(response.data)]
    }

    throw response
  }
)

export const initialChampionState: ChampionState = championAdapter.getInitialState(
  {
    loadingStatus: 'not loaded',
    error: null,
  }
)

export const championSlice = createSlice({
  name: CHAMPION_FEATURE_KEY,
  initialState: initialChampionState,
  reducers: {
    add: championAdapter.addOne,
    remove: championAdapter.removeOne,
    // ...
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchChampion.pending, (state: ChampionState) => {
        state.loadingStatus = 'loading'
      })
      .addCase(
        fetchChampion.fulfilled,
        (state: ChampionState, action: PayloadAction<ChampionEntity[]>) => {
          championAdapter.setAll(state, action.payload)
          state.loadingStatus = 'loaded'
        }
      )
      .addCase(fetchChampion.rejected, (state: ChampionState, action) => {
        state.loadingStatus = 'error'
        state.error = action.error.message
      })
  },
})

/*
 * Export reducer for store configuration.
 */
export const championReducer = championSlice.reducer

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
 *   dispatch(championActions.add({ id: 1 }))
 * }, [dispatch]);
 * ```
 *
 * See: https://react-redux.js.org/next/api/hooks#usedispatch
 */
export const championActions = championSlice.actions

/*
 * Export selectors to query state. For use with the `useSelector` hook.
 *
 * e.g.
 * ```
 * import { useSelector } from 'react-redux';
 *
 * // ...
 *
 * const entities = useSelector(selectAllChampion);
 * ```
 *
 * See: https://react-redux.js.org/next/api/hooks#useselector
 */
const { selectAll, selectEntities, selectIds } = championAdapter.getSelectors()

export const getChampionState = (rootState: unknown): ChampionState =>
  rootState[CHAMPION_FEATURE_KEY]

export const selectAllChampion = createSelector(getChampionState, selectAll)

export const selectChampionIds = createSelector(getChampionState, selectIds)

export const selectChampionEntities = createSelector(
  getChampionState,
  selectEntities
)

export const selectAllChampionTags = createSelector(
  selectAllChampion,
  (champions) =>
    champions.reduce((totalTags, champion) => {
      champion?.tags?.forEach((t) => {
        if (!totalTags.includes(t)) {
          totalTags.push(t)
        }
      })
      return totalTags
    }, [] as string[])
)
