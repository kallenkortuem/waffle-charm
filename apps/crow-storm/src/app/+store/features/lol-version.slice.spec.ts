import {
  fetchLolVersion,
  lolVersionAdapter,
  lolVersionReducer,
} from './lol-version.slice'

describe('lolVersion reducer', () => {
  it('should handle initial state', () => {
    const expected = lolVersionAdapter.getInitialState({
      loadingStatus: 'not loaded',
      error: null,
    })

    expect(lolVersionReducer(undefined, { type: '' })).toEqual(expected)
  })

  it('should handle fetchLolVersions', () => {
    let state = lolVersionReducer(
      undefined,
      fetchLolVersion.pending(null, null)
    )

    expect(state).toEqual(
      expect.objectContaining({
        loadingStatus: 'loading',
        error: null,
        entities: {},
      })
    )

    state = lolVersionReducer(
      state,
      fetchLolVersion.fulfilled(['10.22.1'], null, null)
    )

    expect(state).toEqual(
      expect.objectContaining({
        loadingStatus: 'loaded',
        error: null,
        entities: { '10.22.1': '10.22.1' },
      })
    )

    state = lolVersionReducer(
      state,
      fetchLolVersion.rejected(new Error('Uh oh'), null, null)
    )

    expect(state).toEqual(
      expect.objectContaining({
        loadingStatus: 'error',
        error: 'Uh oh',
        entities: { '10.22.1': '10.22.1' },
      })
    )
  })
})
