import React from 'react'
import { render } from '@testing-library/react'

import ChampionGridSearch from './ChampionGridSearch'

describe('ChampionGridSearch', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ChampionGridSearch />)
    expect(baseElement).toBeTruthy()
  })
})
