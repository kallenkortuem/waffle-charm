import { render } from '@testing-library/react'
import { store } from '@waffle-charm/store'
import { enablei18nMocks } from '@waffle-charm/testing-utils'
import React from 'react'
import { Provider } from 'react-redux'
import MasteryLevelToggleGroup from './MasteryLevelToggleGroup'

enablei18nMocks()
describe('MasteryLevelToggleGroup', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <Provider store={store}>
        <MasteryLevelToggleGroup />
      </Provider>
    )
    expect(baseElement).toBeTruthy()
  })
})
