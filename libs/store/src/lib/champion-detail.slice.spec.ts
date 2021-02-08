import { ChampionFullData } from '@waffle-charm/api-interfaces'
import {
  championDetailAdapter,
  championDetailReducer,
  fetchChampionDetail,
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
      fetchChampionDetail.fulfilled(
        { key: '123' } as ChampionFullData,
        null,
        null
      )
    )

    expect(state).toEqual(
      expect.objectContaining({
        loadingStatus: 'loaded',
        entities: { '123': { key: '123' } },
        error: null,
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
        entities: { '123': { key: '123' } },
      })
    )
  })
})
