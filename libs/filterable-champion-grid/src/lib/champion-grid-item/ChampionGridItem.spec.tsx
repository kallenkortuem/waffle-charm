import React from 'react'
import { render } from '@testing-library/react'

import ChampionGridItem from './ChampionGridItem'

describe('ChampionGridItem', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ChampionGridItem />)
    expect(baseElement).toBeTruthy()
  })
})
