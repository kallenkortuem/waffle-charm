import React from 'react'
import { render } from '@testing-library/react'

import FilterableChampionGrid from './FilterableChampionGrid'

describe('FilterableChampionGrid', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<FilterableChampionGrid />)
    expect(baseElement).toBeTruthy()
  })
})
