import { render } from '@testing-library/react'
import { store } from '@waffle-charm/store'
import React from 'react'
import { Provider } from 'react-redux'
import MasteryViewerSortSelect from './MasteryViewerSortSelect'
import '../../i18n'
describe('MasteryViewerSortSelect', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <Provider store={store}>
        <MasteryViewerSortSelect />
      </Provider>
    )
    expect(baseElement).toBeTruthy()
  })
})
