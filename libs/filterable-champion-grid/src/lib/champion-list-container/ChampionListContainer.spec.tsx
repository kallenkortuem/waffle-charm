import React from 'react'
import { render } from '@testing-library/react'

import ChampionListContainer from './ChampionListContainer'
import { Provider } from 'react-redux'
import { store } from '@waffle-charm/store'

describe('ChampionListContainer', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <Provider store={store}>
        <ChampionListContainer championIds={[]} />
      </Provider>
    )
    expect(baseElement).toBeTruthy()
  })
})
