import {
  createAction,
  createAsyncThunk,
  createEntityAdapter,
  createSelector,
  createSlice,
  EntityState,
  PayloadAction,
} from '@reduxjs/toolkit'

export const LOL_VERSION_FEATURE_KEY = 'lolVersion'

/*
 * Update these interfaces according to your requirements.
 */
export type LolVersionEntity = string

export interface LolVersionState extends EntityState<LolVersionEntity> {
  loadingStatus: 'not loaded' | 'loading' | 'loaded' | 'error'
  error: string
  selected?: string
}

export const lolVersionAdapter = createEntityAdapter<LolVersionEntity>({
  selectId: (model) => model,
})

const setLolVersion = createAction(
  'lolVersion/set',
  function prepare(lolVersion: string) {
    return {
      payload: {
        lolVersion,
        createdAt: new Date().toISOString(),
      },
    }
  }
)
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
 *   dispatch(fetchLolVersion())
 * }, [dispatch]);
 * ```
 */
export const fetchLolVersion = createAsyncThunk(
  'lolVersion/fetchStatus',
  async (_, thunkAPI) => {
    /**
     * Replace this with your custom fetch call.
     * For example, `return myApi.getLolVersions()`;
     * Right now we just return an empty array.
     */
    const result: string[] = await fetch('/api/version').then((_) => _.json())
    return result
  }
)

export const initialLolVersionState: LolVersionState = lolVersionAdapter.getInitialState(
  {
    loadingStatus: 'not loaded',
    error: null,
    entities: ['10.25.1'],
    keys: ['10.25.1'],
    selected: null,
  }
)

export const lolVersionSlice = createSlice({
  name: LOL_VERSION_FEATURE_KEY,
  initialState: initialLolVersionState,
  reducers: {
    add: lolVersionAdapter.addOne,
    remove: lolVersionAdapter.removeOne,
    // ...
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchLolVersion.pending, (state: LolVersionState) => {
        state.loadingStatus = 'loading'
      })
      .addCase(
        fetchLolVersion.fulfilled,
        (state: LolVersionState, action: PayloadAction<LolVersionEntity[]>) => {
          state = lolVersionAdapter.setAll(state, action.payload)
          state.selected = action.payload[0]
          state.loadingStatus = 'loaded'
        }
      )
      .addCase(fetchLolVersion.rejected, (state: LolVersionState, action) => {
        state.loadingStatus = 'error'
        state.error = action.error.message
      })
  },
})

/*
 * Export reducer for store configuration.
 */
export const lolVersionReducer = lolVersionSlice.reducer

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
 *   dispatch(lolVersionActions.add({ id: 1 }))
 * }, [dispatch]);
 * ```
 *
 * See: https://react-redux.js.org/next/api/hooks#usedispatch
 */
export const lolVersionActions = lolVersionSlice.actions

/*
 * Export selectors to query state. For use with the `useSelector` hook.
 *
 * e.g.
 * ```
 * import { useSelector } from 'react-redux';
 *
 * // ...
 *
 * const entities = useSelector(selectAllLolVersion);
 * ```
 *
 * See: https://react-redux.js.org/next/api/hooks#useselector
 */
const { selectAll, selectEntities } = lolVersionAdapter.getSelectors()

export const getLolVersionState = (rootState: unknown): LolVersionState =>
  rootState[LOL_VERSION_FEATURE_KEY]

export const selectAllLolVersion = createSelector(getLolVersionState, selectAll)
export const selectLolVersion = createSelector(
  getLolVersionState,
  (state) => state.selected
)
export const selectLolVersionEntities = createSelector(
  getLolVersionState,
  selectEntities
)
