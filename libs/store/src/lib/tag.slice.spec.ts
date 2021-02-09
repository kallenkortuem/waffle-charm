import { fetchTag, tagAdapter, tagReducer } from './tag.slice'

describe('tag reducer', () => {
  it('should handle initial state', () => {
    const expected = tagAdapter.getInitialState({
      loadingStatus: 'not loaded',
      error: null,
    })

    expect(tagReducer(undefined, { type: '' })).toEqual(expected)
  })

  it('should handle fetchTags', () => {
    let state = tagReducer(undefined, fetchTag.pending(null, null))

    expect(state).toEqual(
      expect.objectContaining({
        loadingStatus: 'loading',
        error: null,
        entities: {},
      })
    )

    state = tagReducer(state, fetchTag.fulfilled([{ name: 'bad' }], null, null))

    expect(state).toEqual(
      expect.objectContaining({
        loadingStatus: 'loaded',
        error: null,
        entities: { bad: { name: 'bad' } },
      })
    )

    state = tagReducer(state, fetchTag.rejected(new Error('Uh oh'), null, null))

    expect(state).toEqual(
      expect.objectContaining({
        loadingStatus: 'error',
        error: 'Uh oh',
        entities: { bad: { name: 'bad' } },
      })
    )
  })
})
