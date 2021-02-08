import {
  fetchSkinPreference,
  skinPreferenceAdapter,
  skinPreferenceReducer,
} from './skin-preference.slice'

describe('skinPreference reducer', () => {
  it('should handle initial state', () => {
    const expected = skinPreferenceAdapter.getInitialState({
      loadingStatus: 'not loaded',
      error: null,
    })

    expect(skinPreferenceReducer(undefined, { type: '' })).toEqual(expected)
  })

  it('should handle fetchSkinPreferences', () => {
    let state = skinPreferenceReducer(
      undefined,
      fetchSkinPreference.pending(null, null)
    )

    expect(state).toEqual(
      expect.objectContaining({
        loadingStatus: 'loading',
        error: null,
        entities: {},
      })
    )

    state = skinPreferenceReducer(
      state,
      fetchSkinPreference.fulfilled([{ id: 1 }], null, null)
    )

    expect(state).toEqual(
      expect.objectContaining({
        loadingStatus: 'loaded',
        error: null,
        entities: { 1: { id: 1 } },
      })
    )

    state = skinPreferenceReducer(
      state,
      fetchSkinPreference.rejected(new Error('Uh oh'), null, null)
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
