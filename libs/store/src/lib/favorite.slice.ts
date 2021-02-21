import {
  createAsyncThunk,
  createEntityAdapter,
  createSelector,
  createSlice,
  EntityState,
  PayloadAction,
} from '@reduxjs/toolkit'

export const FAVORITE_FEATURE_KEY = 'favorite'

/*
 * Update these interfaces according to your requirements.
 */
export interface FavoriteEntity {
  id: string
}

export interface FavoriteState extends EntityState<FavoriteEntity> {
  loadingStatus: 'not loaded' | 'loading' | 'loaded' | 'error'
  error: string
}

export const favoriteAdapter = createEntityAdapter<FavoriteEntity>()

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
 *   dispatch(fetchFavorite())
 * }, [dispatch]);
 * ```
 */
export const fetchFavorite = createAsyncThunk(
  'favorite/fetchStatus',
  async (_, thunkAPI) => {
    /**
     * Replace this with your custom fetch call.
     * For example, `return myApi.getFavorites()`;
     * Right now we just return an empty array.
     */
    return Promise.resolve([])
  }
)

export const initialFavoriteState: FavoriteState = favoriteAdapter.getInitialState(
  {
    loadingStatus: 'not loaded',
    error: null,
  }
)

export const favoriteSlice = createSlice({
  name: FAVORITE_FEATURE_KEY,
  initialState: initialFavoriteState,
  reducers: {
    add: favoriteAdapter.addOne,
    remove: favoriteAdapter.removeOne,
    // ...
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFavorite.pending, (state: FavoriteState) => {
        state.loadingStatus = 'loading'
      })
      .addCase(
        fetchFavorite.fulfilled,
        (state: FavoriteState, action: PayloadAction<FavoriteEntity[]>) => {
          favoriteAdapter.setAll(state, action.payload)
          state.loadingStatus = 'loaded'
        }
      )
      .addCase(fetchFavorite.rejected, (state: FavoriteState, action) => {
        state.loadingStatus = 'error'
        state.error = action.error.message
      })
  },
})

/*
 * Export reducer for store configuration.
 */
export const favoriteReducer = favoriteSlice.reducer

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
 *   dispatch(favoriteActions.add({ id: 1 }))
 * }, [dispatch]);
 * ```
 *
 * See: https://react-redux.js.org/next/api/hooks#usedispatch
 */
export const favoriteActions = favoriteSlice.actions

/*
 * Export selectors to query state. For use with the `useSelector` hook.
 *
 * e.g.
 * ```
 * import { useSelector } from 'react-redux';
 *
 * // ...
 *
 * const entities = useSelector(selectAllFavorite);
 * ```
 *
 * See: https://react-redux.js.org/next/api/hooks#useselector
 */
const { selectAll, selectEntities } = favoriteAdapter.getSelectors()

export const getFavoriteState = (rootState: unknown): FavoriteState =>
  rootState[FAVORITE_FEATURE_KEY]

export const selectAllFavorite = createSelector(getFavoriteState, selectAll)

export const selectFavoriteEntities = createSelector(
  getFavoriteState,
  selectEntities
)

export const createSelectFavoriteById = () =>
  createSelector(
    selectFavoriteEntities,
    (_, id: string) => id,
    (bansEntities: Record<string, FavoriteEntity>, id: string) => {
      return bansEntities[id]
    }
  )
