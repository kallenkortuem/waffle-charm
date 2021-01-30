import { render } from '@testing-library/react'
import { store } from '@waffle-charm/store'
import React from 'react'
import { Provider } from 'react-redux'
import MasteryViewerLevelSelect from './MasteryViewerLevelSelect'
import '../../i18n'
describe('MasteryViewerLevelSelect', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <Provider store={store}>
        <MasteryViewerLevelSelect />
      </Provider>
    )
    expect(baseElement).toBeTruthy()
  })
})
