import { render } from '@testing-library/react'
import { enablei18nMocks } from '@waffle-charm/testing-utils'
import React from 'react'
import ChampionGridSortSelect from './ChampionGridSortSelect'

enablei18nMocks()
describe('ChampionGridSortSelect', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ChampionGridSortSelect value={`name`} />)
    expect(baseElement).toBeTruthy()
  })
})
