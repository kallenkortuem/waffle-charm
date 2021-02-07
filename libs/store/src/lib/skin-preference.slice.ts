import {
  createAsyncThunk,
  createEntityAdapter,
  createSelector,
  createSlice,
  EntityState,
  PayloadAction,
} from '@reduxjs/toolkit'

export const SKIN_PREFERENCE_FEATURE_KEY = 'skinPreference'

/*
 * Update these interfaces according to your requirements.
 */
export interface SkinPreferenceEntity {
  id: string
  skinNum: number
}

export interface SkinPreferenceState extends EntityState<SkinPreferenceEntity> {
  loadingStatus: 'not loaded' | 'loading' | 'loaded' | 'error'
  error: string
}

export const skinPreferenceAdapter = createEntityAdapter<SkinPreferenceEntity>()

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
 *   dispatch(fetchSkinPreference())
 * }, [dispatch]);
 * ```
 */
export const fetchSkinPreference = createAsyncThunk(
  'skinPreference/fetchStatus',
  async (_, thunkAPI) => {
    /**
     * Replace this with your custom fetch call.
     * For example, `return myApi.getSkinPreferences()`;
     * Right now we just return an empty array.
     */
    return Promise.resolve([])
  }
)

export const initialSkinPreferenceState: SkinPreferenceState = skinPreferenceAdapter.getInitialState(
  {
    loadingStatus: 'not loaded',
    error: null,
  }
)

export const skinPreferenceSlice = createSlice({
  name: SKIN_PREFERENCE_FEATURE_KEY,
  initialState: initialSkinPreferenceState,
  reducers: {
    upsertOne: skinPreferenceAdapter.upsertOne,
    remove: skinPreferenceAdapter.removeOne,
    // ...
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSkinPreference.pending, (state: SkinPreferenceState) => {
        state.loadingStatus = 'loading'
      })
      .addCase(
        fetchSkinPreference.fulfilled,
        (
          state: SkinPreferenceState,
          action: PayloadAction<SkinPreferenceEntity[]>
        ) => {
          skinPreferenceAdapter.setAll(state, action.payload)
          state.loadingStatus = 'loaded'
        }
      )
      .addCase(
        fetchSkinPreference.rejected,
        (state: SkinPreferenceState, action) => {
          state.loadingStatus = 'error'
          state.error = action.error.message
        }
      )
  },
})

/*
 * Export reducer for store configuration.
 */
export const skinPreferenceReducer = skinPreferenceSlice.reducer

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
 *   dispatch(skinPreferenceActions.add({ id: 1 }))
 * }, [dispatch]);
 * ```
 *
 * See: https://react-redux.js.org/next/api/hooks#usedispatch
 */
export const skinPreferenceActions = skinPreferenceSlice.actions

/*
 * Export selectors to query state. For use with the `useSelector` hook.
 *
 * e.g.
 * ```
 * import { useSelector } from 'react-redux';
 *
 * // ...
 *
 * const entities = useSelector(selectAllSkinPreference);
 * ```
 *
 * See: https://react-redux.js.org/next/api/hooks#useselector
 */
const { selectAll, selectEntities } = skinPreferenceAdapter.getSelectors()

export const getSkinPreferenceState = (
  rootState: unknown
): SkinPreferenceState => rootState[SKIN_PREFERENCE_FEATURE_KEY]

export const selectAllSkinPreference = createSelector(
  getSkinPreferenceState,
  selectAll
)

export const selectSkinPreferenceEntities = createSelector(
  getSkinPreferenceState,
  selectEntities
)
