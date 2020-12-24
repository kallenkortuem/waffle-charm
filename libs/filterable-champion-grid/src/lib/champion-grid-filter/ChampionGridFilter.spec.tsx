import React from 'react'
import { render } from '@testing-library/react'

import ChampionGridFilter from './ChampionGridFilter'

describe('ChampionGridFilter', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ChampionGridFilter />)
    expect(baseElement).toBeTruthy()
  })
})
