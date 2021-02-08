import {
  createAsyncThunk,
  createEntityAdapter,
  createSelector,
  createSlice,
  EntityState,
  PayloadAction,
} from '@reduxjs/toolkit'
import {
  ChampionFullData,
  ChampionFullDataDragon,
} from '@waffle-charm/api-interfaces'

export const CHAMPION_DETAIL_FEATURE_KEY = 'championDetail'

/*
 * Update these interfaces according to your requirements.
 */
export type ChampionDetailEntity = ChampionFullData

export interface ChampionDetailState extends EntityState<ChampionDetailEntity> {
  loadingStatus: 'not loaded' | 'loading' | 'loaded' | 'error'
  error: string
}

export const championDetailAdapter = createEntityAdapter<ChampionDetailEntity>({
  selectId: (data) => data.key,
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
 *   dispatch(fetchChampionDetail())
 * }, [dispatch]);
 * ```
 */
export const fetchChampionDetail = createAsyncThunk(
  'championDetail/fetchStatus',
  async (props: { version: string; name: string }, thunkAPI) => {
    const response: ChampionFullDataDragon = await fetch(
      `/cdn/${props.version}/data/en_US/champion/${props.name}.json`
    ).then((_) => _.json())

    if (response.data) {
      return Object.values(response.data)[0]
    }

    throw response
  }
)

export const initialChampionDetailState: ChampionDetailState = championDetailAdapter.getInitialState(
  {
    loadingStatus: 'not loaded',
    error: null,
  }
)

export const championDetailSlice = createSlice({
  name: CHAMPION_DETAIL_FEATURE_KEY,
  initialState: initialChampionDetailState,
  reducers: {
    add: championDetailAdapter.addOne,
    remove: championDetailAdapter.removeOne,
    // ...
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchChampionDetail.pending, (state: ChampionDetailState) => {
        state.loadingStatus = 'loading'
      })
      .addCase(
        fetchChampionDetail.fulfilled,
        (
          state: ChampionDetailState,
          action: PayloadAction<ChampionDetailEntity>
        ) => {
          championDetailAdapter.upsertOne(state, action.payload)
          state.loadingStatus = 'loaded'
        }
      )
      .addCase(
        fetchChampionDetail.rejected,
        (state: ChampionDetailState, action) => {
          state.loadingStatus = 'error'
          state.error = action.error.message
        }
      )
  },
})

/*
 * Export reducer for store configuration.
 */
export const championDetailReducer = championDetailSlice.reducer

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
 *   dispatch(championDetailActions.add({ id: 1 }))
 * }, [dispatch]);
 * ```
 *
 * See: https://react-redux.js.org/next/api/hooks#usedispatch
 */
export const championDetailActions = championDetailSlice.actions

/*
 * Export selectors to query state. For use with the `useSelector` hook.
 *
 * e.g.
 * ```
 * import { useSelector } from 'react-redux';
 *
 * // ...
 *
 * const entities = useSelector(selectAllChampionDetail);
 * ```
 *
 * See: https://react-redux.js.org/next/api/hooks#useselector
 */
const { selectAll, selectEntities } = championDetailAdapter.getSelectors()

export const getChampionDetailState = (
  rootState: unknown
): ChampionDetailState => rootState[CHAMPION_DETAIL_FEATURE_KEY]

export const selectAllChampionDetail = createSelector(
  getChampionDetailState,
  selectAll
)

export const selectChampionDetailEntities = createSelector(
  getChampionDetailState,
  selectEntities
)

export const selectChampionDetailLoadingStatus = createSelector(
  getChampionDetailState,
  (state) => state.loadingStatus
)
