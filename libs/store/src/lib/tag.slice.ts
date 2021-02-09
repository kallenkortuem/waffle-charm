import {
  createAsyncThunk,
  createEntityAdapter,
  createSelector,
  createSlice,
  EntityState,
  PayloadAction,
} from '@reduxjs/toolkit'

export const TAG_FEATURE_KEY = 'tag'

/*
 * Update these interfaces according to your requirements.
 */
export interface TagEntity {
  name: string
  /**
   * The championIds map to the `champion.key` property from `ChampionEntity`
   */
  championIds: string[]
}

export interface TagState extends EntityState<TagEntity> {
  loadingStatus: 'not loaded' | 'loading' | 'loaded' | 'error'
  error: string
}

export const tagAdapter = createEntityAdapter<TagEntity>({
  selectId: (data) => data.name,
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
 *   dispatch(fetchTag())
 * }, [dispatch]);
 * ```
 */
export const fetchTag = createAsyncThunk(
  'tag/fetchStatus',
  async (_, thunkAPI) => {
    /**
     * Replace this with your custom fetch call.
     * For example, `return myApi.getTags()`;
     * Right now we just return an empty array.
     */
    return Promise.resolve([])
  }
)

export const initialTagState: TagState = tagAdapter.getInitialState({
  loadingStatus: 'not loaded',
  error: null,
})

export const tagSlice = createSlice({
  name: TAG_FEATURE_KEY,
  initialState: initialTagState,
  reducers: {
    add: tagAdapter.addOne,
    remove: tagAdapter.removeOne,
    upsertOne: tagAdapter.upsertOne,
    // ...
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTag.pending, (state: TagState) => {
        state.loadingStatus = 'loading'
      })
      .addCase(
        fetchTag.fulfilled,
        (state: TagState, action: PayloadAction<TagEntity[]>) => {
          tagAdapter.setAll(state, action.payload)
          state.loadingStatus = 'loaded'
        }
      )
      .addCase(fetchTag.rejected, (state: TagState, action) => {
        state.loadingStatus = 'error'
        state.error = action.error.message
      })
  },
})

/*
 * Export reducer for store configuration.
 */
export const tagReducer = tagSlice.reducer

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
 *   dispatch(tagActions.add({ id: 1 }))
 * }, [dispatch]);
 * ```
 *
 * See: https://react-redux.js.org/next/api/hooks#usedispatch
 */
export const tagActions = tagSlice.actions

/*
 * Export selectors to query state. For use with the `useSelector` hook.
 *
 * e.g.
 * ```
 * import { useSelector } from 'react-redux';
 *
 * // ...
 *
 * const entities = useSelector(selectAllTag);
 * ```
 *
 * See: https://react-redux.js.org/next/api/hooks#useselector
 */
const { selectAll, selectEntities } = tagAdapter.getSelectors()

export const getTagState = (rootState: unknown): TagState =>
  rootState[TAG_FEATURE_KEY]

export const selectAllTag = createSelector(getTagState, selectAll)

export const selectTagEntities = createSelector(getTagState, selectEntities)

export const selectTagChampionEntities = createSelector(
  selectTagEntities,
  (tagEntities) =>
    Object.values(tagEntities)?.reduce((tagChampionEntities, tag) => {
      tag.championIds.forEach((championId) => {
        if (tagChampionEntities[championId]) {
          tagChampionEntities[championId].push(tag)
        } else {
          tagChampionEntities[championId] = [tag]
        }
      })
      return tagChampionEntities
    }, {} as Record<string, TagEntity[]>)
)
