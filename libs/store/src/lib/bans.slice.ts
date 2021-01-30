import {
  createAsyncThunk,
  createEntityAdapter,
  createSelector,
  createSlice,
  EntityState,
  PayloadAction,
} from '@reduxjs/toolkit'

export const BANS_FEATURE_KEY = 'bans'

/*
 * Update these interfaces according to your requirements.
 */
export interface BansEntity {
  id: string
}

export interface BansState extends EntityState<BansEntity> {
  loadingStatus: 'not loaded' | 'loading' | 'loaded' | 'error'
  error: string
  featureEnabled: boolean
}

export const bansAdapter = createEntityAdapter<BansEntity>()

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
 *   dispatch(fetchBans())
 * }, [dispatch]);
 * ```
 */
export const fetchBans = createAsyncThunk(
  'bans/fetchStatus',
  async (_, thunkAPI) => {
    /**
     * Replace this with your custom fetch call.
     * For example, `return myApi.getBanss()`;
     * Right now we just return an empty array.
     */
    return Promise.resolve([])
  }
)

export const initialBansState: BansState = bansAdapter.getInitialState({
  loadingStatus: 'not loaded',
  error: null,
  featureEnabled: false,
})

export const bansSlice = createSlice({
  name: BANS_FEATURE_KEY,
  initialState: initialBansState,
  reducers: {
    add: bansAdapter.addOne,
    remove: bansAdapter.removeOne,
    // ...
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBans.pending, (state: BansState) => {
        state.loadingStatus = 'loading'
      })
      .addCase(
        fetchBans.fulfilled,
        (state: BansState, action: PayloadAction<BansEntity[]>) => {
          bansAdapter.setAll(state, action.payload)
          state.loadingStatus = 'loaded'
        }
      )
      .addCase(fetchBans.rejected, (state: BansState, action) => {
        state.loadingStatus = 'error'
        state.error = action.error.message
      })
  },
})

/*
 * Export reducer for store configuration.
 */
export const bansReducer = bansSlice.reducer

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
 *   dispatch(bansActions.add({ id: 1 }))
 * }, [dispatch]);
 * ```
 *
 * See: https://react-redux.js.org/next/api/hooks#usedispatch
 */
export const bansActions = bansSlice.actions

/*
 * Export selectors to query state. For use with the `useSelector` hook.
 *
 * e.g.
 * ```
 * import { useSelector } from 'react-redux';
 *
 * // ...
 *
 * const entities = useSelector(selectAllBans);
 * ```
 *
 * See: https://react-redux.js.org/next/api/hooks#useselector
 */
const { selectAll, selectEntities } = bansAdapter.getSelectors()

export const getBansState = (rootState: unknown): BansState =>
  rootState[BANS_FEATURE_KEY]

export const selectAllBans = createSelector(getBansState, selectAll)

export const selectBansEntities = createSelector(getBansState, selectEntities)

export const createSelectBansById = () =>
  createSelector(
    selectBansEntities,
    (_, id: string) => id,
    (bansEntities: Record<string, BansEntity>, id: string) => {
      return bansEntities[id]
    }
  )

export const selectBansFeatureEnabled = createSelector(
  getBansState,
  (state) => state.featureEnabled
)
