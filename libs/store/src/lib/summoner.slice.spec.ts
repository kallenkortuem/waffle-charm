import {
  fetchSummoner,
  summonerAdapter,
  summonerReducer,
} from './summoner.slice'

describe('summoner reducer', () => {
  it('should handle initial state', () => {
    const expected = summonerAdapter.getInitialState({
      loadingStatus: 'not loaded',
      error: null,
    })

    expect(summonerReducer(undefined, { type: '' })).toEqual(expected)
  })

  it('should handle fetchSummoners', () => {
    let state = summonerReducer(undefined, fetchSummoner.pending(null, null))

    expect(state).toEqual(
      expect.objectContaining({
        loadingStatus: 'loading',
        error: null,
        entities: {},
      })
    )

    state = summonerReducer(
      state,
      fetchSummoner.fulfilled([{ id: 1 }], null, null)
    )

    expect(state).toEqual(
      expect.objectContaining({
        loadingStatus: 'loaded',
        error: null,
        entities: { 1: { id: 1 } },
      })
    )

    state = summonerReducer(
      state,
      fetchSummoner.rejected(new Error('Uh oh'), null, null)
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
