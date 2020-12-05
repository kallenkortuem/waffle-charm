import { render } from '@testing-library/react'
import React from 'react'
import { Provider } from 'react-redux'
import { store } from '../+store'
import SummonerSettings from './SummonerSettings'

describe('SummonerSettings', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <Provider store={store}>
        <SummonerSettings />
      </Provider>
    )
    expect(baseElement).toBeTruthy()
  })
})
