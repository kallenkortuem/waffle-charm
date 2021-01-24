import { render } from '@testing-library/react'
import React from 'react'
import { Provider } from 'react-redux'
import { store } from '@waffle-charm/store'
import Component from './RoleToggleButtonGroup'

describe('MasteryViewer', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <Provider store={store}>
        <Component />
      </Provider>
    )
    expect(baseElement).toBeTruthy()
  })
})
