import { render } from '@testing-library/react'
import React from 'react'
import { Provider } from 'react-redux'
import { store } from '@waffle-charm/store'
import SummonerSettings from './SummonerSettings'
import '../../i18n'
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
