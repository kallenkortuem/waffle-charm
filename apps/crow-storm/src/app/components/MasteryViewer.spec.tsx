import { render } from '@testing-library/react'
import React from 'react'
import { Provider } from 'react-redux'
import { store } from '../+store'
import MasteryViewer from './MasteryViewer'

describe('MasteryViewer', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <Provider store={store}>
        <MasteryViewer />
      </Provider>
    )
    expect(baseElement).toBeTruthy()
  })
})
