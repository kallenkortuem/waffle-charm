import React from 'react'
import { render } from '@testing-library/react'

import ChampionGridContainer from './ChampionGridContainer'

describe('ChampionGridContainer', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ChampionGridContainer />)
    expect(baseElement).toBeTruthy()
  })
})
