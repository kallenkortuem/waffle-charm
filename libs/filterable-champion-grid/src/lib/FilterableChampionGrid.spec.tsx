import { render } from '@testing-library/react'
import { store } from '@waffle-charm/store'
import { enablei18nMocks } from '@waffle-charm/testing-utils'
import React from 'react'
import { Provider } from 'react-redux'
import FilterableChampionGrid from './FilterableChampionGrid'

enablei18nMocks()
describe('FilterableChampionGrid', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <Provider store={store}>
        <FilterableChampionGrid />
      </Provider>
    )
    expect(baseElement).toBeTruthy()
  })
})
