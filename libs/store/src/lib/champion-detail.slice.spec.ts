import {
  fetchChampionDetail,
  championDetailAdapter,
  championDetailReducer,
} from './champion-detail.slice'

describe('championDetail reducer', () => {
  it('should handle initial state', () => {
    const expected = championDetailAdapter.getInitialState({
      loadingStatus: 'not loaded',
      error: null,
    })

    expect(championDetailReducer(undefined, { type: '' })).toEqual(expected)
  })

  it('should handle fetchChampionDetails', () => {
    let state = championDetailReducer(
      undefined,
      fetchChampionDetail.pending(null, null)
    )

    expect(state).toEqual(
      expect.objectContaining({
        loadingStatus: 'loading',
        error: null,
        entities: {},
      })
    )

    state = championDetailReducer(
      state,
      fetchChampionDetail.fulfilled([{ id: 1 }], null, null)
    )

    expect(state).toEqual(
      expect.objectContaining({
        loadingStatus: 'loaded',
        error: null,
        entities: { 1: { id: 1 } },
      })
    )

    state = championDetailReducer(
      state,
      fetchChampionDetail.rejected(new Error('Uh oh'), null, null)
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
