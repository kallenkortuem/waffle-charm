import { render } from '@testing-library/react'
import { store } from '@waffle-charm/store'
import { enablei18nMocks } from '@waffle-charm/testing-utils'
import React from 'react'
import { Provider } from 'react-redux'
import RoleToggleButtonGroup from './RoleToggleButtonGroup'

enablei18nMocks()
describe('RoleToggleButtonGroup', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <Provider store={store}>
        <RoleToggleButtonGroup />
      </Provider>
    )
    expect(baseElement).toBeTruthy()
  })
})
