import { render } from '@testing-library/react'
import { store } from '@waffle-charm/store'
import React from 'react'
import { Provider } from 'react-redux'
import ChampionGridItem from './ChampionGridItem'

describe('ChampionGridItem', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <Provider store={store}>
        <ChampionGridItem championId={'Fiddlesticks'} />
      </Provider>
    )
    expect(baseElement).toBeTruthy()
  })
})
