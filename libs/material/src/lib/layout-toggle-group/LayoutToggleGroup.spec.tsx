import React from 'react'
import { render } from '@testing-library/react'

import LayoutToggleGroup from './LayoutToggleGroup'

describe('LayoutToggleGroup', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<LayoutToggleGroup />)
    expect(baseElement).toBeTruthy()
  })
})
