import { fetchBans, bansAdapter, bansReducer } from './bans.slice'

describe('bans reducer', () => {
  it('should handle initial state', () => {
    const expected = bansAdapter.getInitialState({
      loadingStatus: 'not loaded',
      error: null,
    })

    expect(bansReducer(undefined, { type: '' })).toEqual(expected)
  })

  it('should handle fetchBanss', () => {
    let state = bansReducer(undefined, fetchBans.pending(null, null))

    expect(state).toEqual(
      expect.objectContaining({
        loadingStatus: 'loading',
        error: null,
        entities: {},
      })
    )

    state = bansReducer(state, fetchBans.fulfilled([{ id: 1 }], null, null))

    expect(state).toEqual(
      expect.objectContaining({
        loadingStatus: 'loaded',
        error: null,
        entities: { 1: { id: 1 } },
      })
    )

    state = bansReducer(
      state,
      fetchBans.rejected(new Error('Uh oh'), null, null)
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
