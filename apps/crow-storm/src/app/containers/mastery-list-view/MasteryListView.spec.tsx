import { render } from '@testing-library/react'
import { store } from '@waffle-charm/store'
import React from 'react'
import { Provider } from 'react-redux'
import MasteryListView from './MasteryListView'

describe('MasteryListView', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <Provider store={store}>
        <MasteryListView />
      </Provider>
    )
    expect(baseElement).toBeTruthy()
  })
})
