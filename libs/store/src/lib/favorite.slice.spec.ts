import {
  fetchFavorite,
  favoriteAdapter,
  favoriteReducer,
} from './favorite.slice'

describe('favorite reducer', () => {
  it('should handle initial state', () => {
    const expected = favoriteAdapter.getInitialState({
      loadingStatus: 'not loaded',
      error: null,
    })

    expect(favoriteReducer(undefined, { type: '' })).toEqual(expected)
  })

  it('should handle fetchFavorites', () => {
    let state = favoriteReducer(undefined, fetchFavorite.pending(null, null))

    expect(state).toEqual(
      expect.objectContaining({
        loadingStatus: 'loading',
        error: null,
        entities: {},
      })
    )

    state = favoriteReducer(
      state,
      fetchFavorite.fulfilled([{ id: 1 }], null, null)
    )

    expect(state).toEqual(
      expect.objectContaining({
        loadingStatus: 'loaded',
        error: null,
        entities: { 1: { id: 1 } },
      })
    )

    state = favoriteReducer(
      state,
      fetchFavorite.rejected(new Error('Uh oh'), null, null)
    )

    expect(state).toEqual(
      expect.objectContaining({
        loadingStatus: 'error',
        error: 'Uh oh',
        entities: { 1: { id: 1 } },
      })
    )
  })
})
