import { render } from '@testing-library/react'
import React from 'react'
import { Provider } from 'react-redux'
import { store } from '@waffle-charm/store'
import ChampionSettings from './ChampionSettings'
import '../../i18n'
describe('ChampionSettings', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <Provider store={store}>
        <ChampionSettings />
      </Provider>
    )
    expect(baseElement).toBeTruthy()
  })
})
