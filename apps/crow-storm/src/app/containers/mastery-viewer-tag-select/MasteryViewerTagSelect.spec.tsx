import { render } from '@testing-library/react'
import { store } from '@waffle-charm/store'
import React from 'react'
import { Provider } from 'react-redux'
import MasteryViewerTagSelect from './MasteryViewerTagSelect'

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
