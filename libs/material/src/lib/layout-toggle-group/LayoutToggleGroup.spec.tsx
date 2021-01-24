import { render } from '@testing-library/react'
import { store } from '@waffle-charm/store'
import React from 'react'
import { Provider } from 'react-redux'
import LayoutToggleGroup from './LayoutToggleGroup'

describe('LayoutToggleGroup', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <Provider store={store}>
        <LayoutToggleGroup />
      </Provider>
    )
    expect(baseElement).toBeTruthy()
  })
})
