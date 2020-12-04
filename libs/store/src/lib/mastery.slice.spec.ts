import { fetchMastery, masteryAdapter, masteryReducer } from './mastery.slice'

describe('mastery reducer', () => {
  it('should handle initial state', () => {
    const expected = masteryAdapter.getInitialState({
      loadingStatus: 'not loaded',
      error: null,
    })

    expect(masteryReducer(undefined, { type: '' })).toEqual(expected)
  })

  it('should handle fetchMasterys', () => {
    let state = masteryReducer(undefined, fetchMastery.pending(null, null))

    expect(state).toEqual(
      expect.objectContaining({
        loadingStatus: 'loading',
        error: null,
        entities: {},
      })
    )

    state = masteryReducer(
      state,
      fetchMastery.fulfilled([{ championId: 1 }], null, null)
    )

    expect(state).toEqual(
      expect.objectContaining({
        loadingStatus: 'loaded',
        error: null,
        entities: { 1: { championId: 1 } },
      })
    )

    state = masteryReducer(
      state,
      fetchMastery.rejected(new Error('Uh oh'), null, null)
    )

    expect(state).toEqual(
      expect.objectContaining({
        loadingStatus: 'error',
        error: 'Uh oh',
        entities: { 1: { championId: 1 } },
      })
    )
  })
})
