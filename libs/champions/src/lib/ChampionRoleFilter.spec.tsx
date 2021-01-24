import { render } from '@testing-library/react'
import { store } from '@waffle-charm/store'
import { enablei18nMocks } from '@waffle-charm/testing-utils'
import React from 'react'
import { Provider } from 'react-redux'
import ChampionRoleFilter from './ChampionRoleFilter'

enablei18nMocks()
describe('ChampionRoleFilter', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <Provider store={store}>
        <ChampionRoleFilter />
      </Provider>
    )
    expect(baseElement).toBeTruthy()
  })
})
