import { render } from '@testing-library/react'
import { store } from '@waffle-charm/store'
import { enablei18nMocks } from '@waffle-charm/testing-utils'
import React from 'react'
import { Provider } from 'react-redux'
import MasteryViewerTagSelect from './MasteryViewerTagSelect'

enablei18nMocks()
describe('MasteryViewerTagSelect', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <Provider store={store}>
        <MasteryViewerTagSelect />
      </Provider>
    )
    expect(baseElement).toBeTruthy()
  })
})
