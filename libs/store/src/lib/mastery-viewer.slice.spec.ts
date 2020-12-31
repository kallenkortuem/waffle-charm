import {
  masteryViewerActions,
  masteryViewerReducer,
} from './mastery-viewer.slice'

describe('masteryViewer reducer', () => {
  it('should handle fetchMasteryViewers', () => {
    let state = masteryViewerReducer(
      undefined,
      masteryViewerActions.setLevel(2)
    )

    expect(state).toEqual(
      expect.objectContaining({
        level: 2,
      })
    )

    state = masteryViewerReducer(
      state,
      masteryViewerActions.setSearchQuery('kal')
    )

    expect(state).toEqual(
      expect.objectContaining({
        level: 2,
        searchQuery: 'kal',
      })
    )

    state = masteryViewerReducer(state, masteryViewerActions.setTag('top'))

    expect(state).toEqual(
      expect.objectContaining({
        level: 2,
        searchQuery: 'kal',
        tag: 'top',
      })
    )
  })
})
