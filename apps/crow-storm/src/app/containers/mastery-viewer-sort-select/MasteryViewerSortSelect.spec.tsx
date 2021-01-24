import { render } from '@testing-library/react'
import React from 'react'
import { Provider } from 'react-redux'
import MasteryViewerSortSelect from './MasteryViewerSortSelect'

describe('MasteryViewerSortSelect', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <Provider>
        <MasteryViewerSortSelect />
      </Provider>
    )
    expect(baseElement).toBeTruthy()
  })
})
