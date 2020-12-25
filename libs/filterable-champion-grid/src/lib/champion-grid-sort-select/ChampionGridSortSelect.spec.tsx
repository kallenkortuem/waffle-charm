import React from 'react'
import { render } from '@testing-library/react'

import ChampionGridSortSelect from './ChampionGridSortSelect'

describe('ChampionGridSortSelect', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ChampionGridSortSelect />)
    expect(baseElement).toBeTruthy()
  })
})
